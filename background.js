browser.contextMenus.create({
    id: "profiles",
    // title: browser.i18n.getMessage("menuItemProfiles"),
    title: "Profiles",
    documentUrlPatterns: ["*://*/swagger/index.html"]
});

browser.contextMenus.create({
    id: "profile-1",
    parentId: "profiles",
    type: "radio",
    title: "Profile 1",
    onclick: profileSelected
});

browser.contextMenus.create({
    id: "profile-2",
    parentId: "profiles",
    type: "radio",
    title: "Profile 2",
    onclick: profileSelected
});

browser.contextMenus.create({
    id: "profile-3",
    parentId: "profiles",
    type: "radio",
    title: "Profile 3",
    onclick: profileSelected
});
browser.contextMenus.create({
    id: "changeToken",
    parentId: "profiles",
    type: "radio",
    title: "Change Token",
    onclick: changeTokenByPrompt
});

var userToken = "Hello World";


// Changes the Bearer token by UI.
function changeBearerToken(token) {
    console.log("Token: " + token);
    const setBearerToken = `
    
    // Open the form
    if(document.querySelector(".auth-wrapper .authorize.locked") !== null){
        console.log("Hi 2");
        let openAuthFormButton = document.querySelector(".auth-wrapper .authorize.locked");
        openAuthFormButton.click();
    }else if(document.querySelector(".auth-wrapper .authorize.unlocked") !== null){
        console.log("Hi 1");
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

// Changes the default token by asking with a prompt.
function changeTokenByPrompt() {
    var changeTokenCode = `
        var userToken = prompt("Enter Token: ");

        
        const sending = browser.runtime.sendMessage({type: "passingToken", content: userToken});
        sending.then(
            executed => {console.log("Sent: ", executed);},
            error => {console.log("Error: ", error);}
        );


        // const channel = new BroadcastChannel("token-exchange-channel");
        // channel.postMessage({ token: userToken });

        console.log({ token: userToken });
    `;

    executeBrowserScript(changeTokenCode);
}


// Sets up message passing listener that's used to pass message from UI to background.
function setupMessagePassingListener() {
    browser.runtime.onMessage.addListener(function (message, callback) {
        console.log("Message Received: ", message);
        if (message.type == "passingToken") {
            userToken = message.content;
        };
    });
}

setupMessagePassingListener();


// Is executed when one of the profile menu item is clicked.
function profileSelected(e) {
    changeBearerToken(userToken);
    return;
}