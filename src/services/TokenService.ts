
const browser = require("webextension-polyfill");

// declare global{
//   interface Chrome{
//     tabs: any
//   }
// }
enum Browser {
  Chromium,
  Firefox
}
const detectBrowser = () => {
  if (typeof globalThis.browser === "undefined" || Object.getPrototypeOf(globalThis.browser) !== Object.prototype) {
    return Browser.Chromium;
  } else {
    return Browser.Firefox;
  }
}


// Execute the code in the browser.
// In browser the JS code has access to the DOM.
const executeBrowserScriptForFirefox = (code: string): void => {
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

const executeBrowserScriptForChrome = async (func: Function, args: any) => {
  // if (func == null) {
  //   return;
  // }
  const getCurrentTab = async () => {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    // console.log(tabs);
    return tab;
  }


  const tab = await getCurrentTab();
  chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    func: func,
    args: args
  });
}


export function setBearerTokenFunc(token?: string, alertMessage?: string) {
  console.log("Token: ", alertMessage);
  // Open the form
  if (document.querySelector(".auth-wrapper .authorize.locked") !== null) {
    let openAuthFormButton: HTMLElement = document.querySelector(".auth-wrapper .authorize.locked");
    openAuthFormButton.click();
  } else if (document.querySelector(".auth-wrapper .authorize.unlocked") !== null) {
    let openAuthFormButton: HTMLElement = document.querySelector(".auth-wrapper .authorize.unlocked");
    openAuthFormButton.click();
  }

  setTimeout(function () {
    // if logout button is showing we at first click on it, then we paste the token.
    if (document.getElementsByClassName("auth authorize")[0] === undefined) {
      (document.getElementsByClassName("auth")[0] as HTMLElement).click();
    }
    var tokenInput = document.querySelector(".auth-container input");
    var authButton: HTMLElement = document.querySelector(".auth-btn-wrapper .modal-btn.auth");
    var closeButton: HTMLElement = document.querySelector("button.btn-done");
    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    nativeInputValueSetter.call(tokenInput, "${token}");

    var inputEvent = new Event('input', { bubbles: true });
    tokenInput.dispatchEvent(inputEvent);
    authButton.click();
    closeButton.click();
    alert(alertMessage);
  }, 500);
}

// Changes the Bearer token by UI.
export const changeBearerToken = (token: string, name?: string) => {
  const alertMessage = `"Profile ${name} is set.\\nApplied token: ${token}"`;
  console.log(alertMessage);
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
        alert(${alertMessage});
    }, 500);
    }`;
  let browser = detectBrowser();
  if (browser == Browser.Chromium) {
    let val = "Hello World"; 
    executeBrowserScriptForChrome((val : string) => {
      console.log(val.toString());
    }, [val]);
  } else {
    executeBrowserScriptForFirefox(setBearerToken);
  }
};

// Shows console log in the client browser.
export const showInBrowserConsole = (data: any) => {
  const stringData = JSON.stringify(data);
  executeBrowserScriptForFirefox(`console.log(${stringData})`);
};
