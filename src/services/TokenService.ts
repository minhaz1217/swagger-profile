const browser = require("webextension-polyfill");

// Execute the code in the browser.
// In browser the JS code has access to the DOM.
const executeBrowserScript = (code: string) : void => {
  if (code == null || code == "") {
    return;
  }
  browser.tabs.executeScript({
    code: code,
  }).then(
    (executed) => {
      // console.log("Executed: ", executed);
    },
    (error) => {
      console.log("Error: ", error);
    },
  );
};

// Changes the Bearer token by UI.
export const changeBearerToken = (token: string) => {
  const setBearerToken = `{
    // Open the form
    if(document.querySelector(".auth-wrapper .authorize.locked") !== null){
        let openAuthFormButton = document.querySelector(".auth-wrapper .authorize.locked");
        openAuthFormButton.click();
    }else if(document.querySelector(".auth-wrapper .authorize.unlocked") !== null){
        let openAuthFormButton = document.querySelector(".auth-wrapper .authorize.unlocked");
        openAuthFormButton.click();
    }
    
    setTimeout(function() {
        // if logout button is showing we at first click on it, then we paste the token.
        if(document.getElementsByClassName("auth authorize")[0] === undefined){
            document.getElementsByClassName("auth")[0].click();
        }
        var tokenInput = document.querySelector(".auth-container input");
        var authButton = document.querySelector(".auth-btn-wrapper .modal-btn.auth");
        var closeButton = document.querySelector("button.btn-done");
        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(tokenInput, "${token}");
        
        var inputEvent = new Event('input', { bubbles: true});
        tokenInput.dispatchEvent(inputEvent);
        authButton.click();
        closeButton.click();
        alert("Token set to: ${token}");
    }, 500);
    }`;
  executeBrowserScript(setBearerToken);
};

// Shows console log in the client browser.
export const showInBrowserConsole = (data: any) => {
  const stringData = JSON.stringify(data);
  executeBrowserScript(`console.log(${stringData})`);
};
