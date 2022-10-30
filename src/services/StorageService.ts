const browser = require("webextension-polyfill");
// Storage
export const setStorageData = (data: object) => {
  browser.storage.local.set(data).then(printData, printError);
};

export const getStorageData = async (key: string) => {
  let data = null;
  await browser.storage.local.get(key).then(
    (val) => {
      data = val;
      return val;
    },
    printError,
  );
  return data;
};

const printData = (data) => { // eslint-disable-line @typescript-eslint/no-unused-vars
  // if (data != null) console.log("Data Received: ", data);
};
const printError = (error) => {
  console.log("Error: ", error);
};
