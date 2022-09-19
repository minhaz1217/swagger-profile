'use strict';

// async function addNewProfile(){
//     await getStorageData();
//     setStorageData({ Hi: 3 });
//     openExtensionPage("../extension-page/add_new_profile.html", "Add New Profile");
// }

function showAllProfiles(){
    let hello = { Hi: 1, Hi2: 2 };
    let monster = {
      name: "Kraken",
      tentacles: true,
      eyeCount: 10
    }
    
    let kitten = {
      name: "Moggy",
      tentacles: false,
      eyeCount: 2
    }
    browser.storage.local.set({hello, kitten, monster}).then(printData, printError);
    // setStorageData(hello, kitten, monster);
    openExtensionPage("../extension-page/show_all.html", "Show All Profiles");
}

function openExtensionPage(url, titlePreface){
  return;
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