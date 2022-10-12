import { generateNewId } from "../../services/IDGeneratorService";

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
export { Profile };