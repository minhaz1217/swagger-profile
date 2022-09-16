'use strict';

async function addNewProfile(){
    await getStorageData();
    setStorageData({ Hi: 3 });
    openExtensionPage("../extension-page/add_new_profile.html", "Add New Profile");
}

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



// Storage
function setStorageData(data) {
  browser.storage.local.set(data).then(printData, printError);
}

async function getStorageData(key) {
  var data = null;
  await browser.storage.local.get(key).then(
      val => { data = val; console.log("Reached: ", data); return val; },
      printError
  );
  return data;
}

function printData(data) { if (data != null) console.log(data); }
function printError(error) { console.log(error); }


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