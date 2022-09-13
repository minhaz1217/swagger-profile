'use strict';

function addNewProfile(){
    getStorageData();
    openExtensionPage("../extension-page/add_new_profile.html", "Add New Profile");
}

function showAllProfiles(){
    setStorageData();
    openExtensionPage("../extension-page/show_all.html", "Show All Profiles");
}

function getStorageData(key){
    let gettingItem = browser.storage.local.get();
    gettingItem.then(onGot, onError);
}

function setStorageData(){
    browser.storage.local.set({
        kitten:  {name:"Mog", eats:"mice"},
        monster: {name:"Kraken", eats:"people"}
      });
}

function onGot(item) {
    console.log(item);
  }
  
  function onError(error) {
    console.log(`Error: ${error}`);
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