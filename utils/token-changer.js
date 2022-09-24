
// Changes the Bearer token by UI.
function changeBearerToken(token) {
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

// Execute the code in the browser. In browser the JS code has access to the DOM.
function executeBrowserScript(code) {
    if(code == null || code == ""){
        return;
    }

    browser.tabs.executeScript({
        code: code
    }).then(
        executed => {
            console.log("Executed: ", executed);
        },
        error => {
            console.log("Error: ", error);
        }
    );
}
function deleteIt(token){
    console.log("HI");
}

function deleteProfileById(profileId){
    if(profileId == null || profileId == ""){
        return;
    }
    const deleteTokenCode = `
        var choice = confirm("Are you sure? You want to delete this profile?");
        if(choice === true){
            let myPort = browser.runtime.connect({name:"port-from-cs"});
            myPort.postMessage({greeting: "Delete the ${profileId}"});
        }else{
            console.log("No Delete");
        }
    `;
    executeBrowserScript(deleteTokenCode);
    
}