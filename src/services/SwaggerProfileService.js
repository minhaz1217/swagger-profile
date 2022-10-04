import { GenerateNewId } from "./IDGeneratorService";
import { setStorageData, getStorageData } from "./StorageService";

export const saveProfile = async (profile) => {
    Object.assign(profile, { id: GenerateNewId() });

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
    return true;
}

export const deleteProfile = async (profileId) => {
    if (profileId == null || profileId == "") {
        return false;
    }

    let data = await getStorageData("profiles");
    let profiles = [];
    if (data == null || data?.profiles == null || !Array.isArray(data?.profiles)) {
        return false;
    } else {
        for (let i = 0; i < data.profiles.length; i++) {
            if (data.profiles[i].id != profileId) {
                profiles.push(data.profiles[i]);
            }
        }
    }
    setStorageData({ profiles });
    return true;
}