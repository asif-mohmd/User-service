import { IUserInteractor } from "../interfaces/IUserInteractor";

export class UserInteractor implements IUserInteractor{
    userRegister(input: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    updateUser(input: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    loginUser(input: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}