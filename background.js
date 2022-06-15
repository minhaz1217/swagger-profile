browser.contextMenus.create({
    id: "profiles",
    // title: browser.i18n.getMessage("menuItemProfiles"),
    title: "Profiles",
    documentUrlPatterns: ["*://*/swagger/index.html"]
});

addContextMenuItem("profile-1", "Profile-1", "radio", "profiles", profileSelected);
addContextMenuItem("changeToken", "Change Token", "radio", "profiles", changeTokenByPrompt);


function addContextMenuItem(id, title, type, parentId = null, onClick = null) {
    browser.contextMenus.create({
        id: id,
        title: title,
        type: type,
        parentId: parentId,
        onclick: onClick
    });
}


var userToken = "Hello World";

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
            executed => {},
            error => {console.log("Error: ", error);}
        );


        // const channel = new BroadcastChannel("token-exchange-channel");
        // channel.postMessage({ token: userToken });
    `;

    executeBrowserScript(changeTokenCode);
}

var defaultData = {
    tokens: [
        { name: "Profile 1", token: "Hello World" }
    ]
};

// Sets up message passing listener that's used to pass message from UI to background.
function setupMessagePassingListener() {
    browser.runtime.onMessage.addListener(function (message, callback) {
        // console.log("Message Received: ", message);
        if (message.type == "passingToken") {
            userToken = message.content;
            browser.storage.local.set({ "token": "My Token" }).then(printData, printError);
        };
    });
}
setupMessagePassingListener();

var count = 0;
// Is executed when one of the profile menu item is clicked.
async function profileSelected(e) {
    // changeBearerToken(userToken);

    await getStorageData();
    setStorageData({ "data": "Hi This is the data " + count++ });

    return;
}
function setStorageData(data) {
    browser.storage.local.set(data).then(printData, printError);
}

async function getStorageData() {
    var data = null;
    await browser.storage.local.get().then(
        val => { data = val; console.log("Reached: ", data); return val; },
        printError
    );
    console.log("Reached Here: ", data);
    return data;
}
function initStorage() {
    browser.storage.local.get().then(
        val => {
            if (val == null) {

            }
            console.log(val);
        },
        error => { console.log("Error: ", error); }
    );
}

function printData(data) { if (data != null) console.log(data); }
function printError(error) { console.log(error); }