// Storage
function setStorageData(data) {
    browser.storage.local.set(data).then(printData, printError);
}

async function getStorageData(key) {
    var data = null;
    await browser.storage.local.get(key).then(
        (val) => {
            data = val;
            console.log(key, data);
            return val;
        },
        printError
    );
    return data;
}

function printData(data) { if (data != null) console.log("Data Received: ", data); }
function printError(error) { console.log("Error: ", error); }


async function addNewProfile(profile) {

    Object.assign(profile, { id: newId() });

    let data = await getStorageData("profiles");
    if (data == null || data?.profiles == null || !Array.isArray(data?.profiles)) {
        let profiles = [];
        profiles.push(profile);
        setStorageData({ profiles });
    } else {
        data.profiles.push(profile);
        let profiles = data.profiles;
        setStorageData({ profiles });
    }
}