const browser = require("webextension-polyfill");

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
};


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
  const getCurrentTab = async () => {
    const queryOptions = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  };


  const tab = await getCurrentTab();
  await chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    func: func as any,
    args: args,
  });
};


// Changes the Bearer token by UI.
export const changeBearerToken = (token: string, name?: string) => {
  const alertMessage = `"Profile ${name} is set.\\nApplied token: ${token}"`;
  const setBearerTokenFunctionString = `{
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
        let authButtons = document.getElementsByClassName("auth");
        console.log(authButtons);
        for (let i = 0; i < authButtons.length; i++) {
          if (authButtons[i].innerHTML === "Logout") {
            authButtons[i].click();
          }
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

  const setBearerTokenFunction = (token: string, name: string) => {
    const alertMessage = `"Profile ${name} is set.\nApplied token: ${token}"`;
    // Open the form
    if (document.querySelector(".auth-wrapper .authorize.locked") !== null) {
      const openAuthFormButton: HTMLElement = document.querySelector(".auth-wrapper .authorize.locked");
      openAuthFormButton.click();
    } else if (document.querySelector(".auth-wrapper .authorize.unlocked") !== null) {
      const openAuthFormButton: HTMLElement = document.querySelector(".auth-wrapper .authorize.unlocked");
      openAuthFormButton.click();
    }

    setTimeout(function () {
      // if logout button is showing we at first click on it, then we paste the token.
      const authButtons: HTMLCollectionOf<Element> = document.getElementsByClassName("auth");
      for (let i = 0; i < authButtons.length; i++) {
        if (authButtons[i].innerHTML === "Logout") {
          (authButtons[i] as HTMLElement).click();
        }
      }

      const tokenInput = document.querySelector(".auth-container input");
      const authButton: HTMLElement = document.querySelector(".auth-btn-wrapper .modal-btn.auth");
      const closeButton: HTMLElement = document.querySelector("button.btn-done");
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
      nativeInputValueSetter.call(tokenInput, token);

      const inputEvent = new Event("input", { bubbles: true });
      tokenInput.dispatchEvent(inputEvent);
      authButton.click();
      closeButton.click();
      alert(alertMessage);
    }, 500);
  };
  const browser = detectBrowser();
  if (browser === Browser.Chromium) {
    executeBrowserScriptForChrome(setBearerTokenFunction, [token, name]);
  } else {
    executeBrowserScriptForFirefox(setBearerTokenFunctionString);
  }
};

// Shows console log in the client browser.
export const showInBrowserConsole = (data: any) => {
  const stringData = JSON.stringify(data);
  executeBrowserScriptForFirefox(`console.log(${stringData})`);
};
