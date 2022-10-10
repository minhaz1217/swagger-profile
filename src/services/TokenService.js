var browser = require("webextension-polyfill");

// Execute the code in the browser. In browser the JS code has access to the DOM.
const executeBrowserScript = (code) => {
    if (code == null || code == "") {
        return;
    }

    browser.tabs.executeScript({
        code: code
    }).then(
        executed => {
            // console.log("Executed: ", executed);
        },
        error => {
            console.log("Error: ", error);
        }
    );
}

// Changes the Bearer token by UI.
export const changeBearerToken = (token) => {
    const setBearerToken = `    
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
    `;
    executeBrowserScript(setBearerToken);
}


// Confirms before deleting the profile.
export const deleteProfileWebConfirmation = (profileId) => {
    if (profileId == null || profileId == "") {
        return;
    }
    let getConfirmationForProfileDelete = `
        var choice = confirm("Are you sure? You want to delete this profile?");
        if(choice === true){
            // because firefox supports the chrome api, but chrome doesn't support the browser api.
            chrome.runtime.sendMessage({"type": "delete", "data": "${profileId}"});
        }
    `;
    executeBrowserScript(getConfirmationForProfileDelete);
}