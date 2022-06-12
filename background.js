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
    browser.tabs.executeScript({
        code: setBearerToken
    }).then(
        executed => {
            console.log(`Token Changed: `, executed);
        },
        error => {
            console.log(error);
        }
    );
}

function profileSelected(e) {
    changeBearerToken("Hello 123");
    // console.log(document.querySelector(".auth-container form"));
    // console.log(tabs.get());
    // console.log(e);
    return;
}