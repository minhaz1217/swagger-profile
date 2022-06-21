'use strict';

function addNewProfile(){
    console.log("Add New Profile Clicked");
}

function showAllProfiles(){
    console.log("Show all profiles clicked");
}

document.querySelector("#addNewProfile").addEventListener('click', addNewProfile);
document.querySelector("#showAllProfiles").addEventListener('click', showAllProfiles);