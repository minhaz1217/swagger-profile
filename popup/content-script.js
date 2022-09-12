'use strict';

function addNewProfile(){
    openExtensionPage("../extension-page/add_new_profile.html", "Add New Profile");
}

function showAllProfiles(){
    openExtensionPage("../extension-page/show_all.html", "Show All Profiles");
}

function openExtensionPage(url, titlePreface){
    let createData = {
        titlePreface: titlePreface,
        type: "popup",
        url: url,
        width: 500,
        height: 300
      };
      let creating = browser.windows.create(createData);
      
}

document.querySelector("#addNewProfile").addEventListener('click', addNewProfile);
document.querySelector("#showAllProfiles").addEventListener('click', showAllProfiles);