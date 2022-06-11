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
    console.log(token);
    const makeItGreen = 'document.body.style.border = "5px solid green"';
    browser.tabs.executeScript({
        code: makeItGreen
    }).then(
        executed => {
            console.log(`We made it green `, executed);
        },
        error => {
            console.log(`Error: ${error}`);
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