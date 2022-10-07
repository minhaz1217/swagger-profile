// Storage
export const setStorageData = (data) => {
    browser.storage.local.set(data).then(printData, printError);
}

export const getStorageData = async (key) => {
    var data = null;
    await browser.storage.local.get(key).then(
        (val) => {
            data = val;
            return val;
        },
        printError
    );
    return data;
}

const printData = (data) => {
    //if (data != null) console.log("Data Received: ", data); 
}
const printError = (error) => { console.log("Error: ", error); }