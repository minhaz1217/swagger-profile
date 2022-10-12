import { Profile } from '../popup/models/Profile';
import { generateNewId } from './IDGeneratorService';
import { setStorageData, getStorageData } from './StorageService';

export const updateProfile = async (newProfile: Profile): Promise<boolean> => {
  if (newProfile.id === null || newProfile.id === '') {
    return false;
  }

  const data = await getStorageData('profiles');
  if (data == null ||
    data?.profiles == null ||
    !Array.isArray(data?.profiles)
  ) {
    const profiles = [];
    profiles.push(newProfile);
    setStorageData({ profiles });
  } else {
    data.profiles = data.profiles.filter((item) => item.id !== newProfile.id);
    data.profiles.push(newProfile);
    const profiles = data.profiles;
    setStorageData({ profiles });
  }
  return true;
};

export const createProfile = async (profile: Profile): Promise<boolean> => {
  const data = await getStorageData('profiles');
  if (data == null ||
    data?.profiles == null ||
    !Array.isArray(data?.profiles)
  ) {
    const profiles = [];
    profiles.push(profile);
    setStorageData({ profiles });
  } else {
    data.profiles.push(profile);
    const profiles = data.profiles;
    setStorageData({ profiles });
  }
  return true;
};

export const deleteProfile = async (profileId: string): Promise<boolean> => {
  if (profileId == null || profileId == '') {
    return false;
  }

  const data = await getStorageData('profiles');
  const profiles = [];
  if (data == null ||
    data?.profiles == null ||
    !Array.isArray(data?.profiles)
  ) {
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
};

// returns all the profiles sorted by display order.
export const getAllProfiles = async (): Promise<Profile[]> => {
  const data = await getStorageData('profiles');
  if (!(data == null ||
    data?.profiles == null ||
    !Array.isArray(data?.profiles))
  ) {
    data.profiles.sort((a, b) => {
      return a.displayOrder >= b.displayOrder;
    });
    return data.profiles;
  } else {
    return [];
  }
};
