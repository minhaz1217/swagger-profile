import {generateNewId} from "../../services/IDGeneratorService";
/**
 * A model for a token Profile.
 * @param {string} id td of the profile.
 * @param {string} name name of the profile that will be used as the profile's name.
 * @param {string} token token of the profile, that will be applied.
 * @param {number} displayOrder displayOrder of the profile, that will be used to sort.
 */
class Profile {
  id: string;
  name: string;
  token: string;
  displayOrder: number;


  constructor(name: string, token: string, displayOrder: number, id?: string) {
    this.id = id ?? generateNewId();
    this.name = name;
    this.token = token;
    this.displayOrder = displayOrder;
  }
}
export {Profile};
