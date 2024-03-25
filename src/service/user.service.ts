import { error } from "console";
import { IUserService } from "../interfaces/IUserInterface";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../model/user.entities";




export class UserService implements IUserService{
    private repository: IUserRepository;

    constructor(repository: IUserRepository){
        this.repository = repository
    }

    

    async userRegister(userData: User) {
        try{
            console.log("serviceeeeeeeeeeeeeeeeeeeeeeeee")
            const isEmailExist = await this.repository.findOne(userData.email)

            if(isEmailExist){
                if(!userData.avatar){
                    throw new Error("upload avatar")
                }
            }
            console.log("after email")

            const user = await this.repository.register(userData);
            return {user}

        }catch(err){
            console.log(err,"errrr user regisssssss")

        }
    }
    activateUser(data: { token: string; activationCode: string; }) {
        throw new Error("Method not implemented.");
    }
    getUser(id: string): Promise<any> {;
        throw new Error("Method not implemented.");
    }
    userLogin(email: string, password: string) {
        throw new Error("Method not implemented.");
    }
    updateUserInfo(id: string, name: string) {
        throw new Error("Method not implemented.");
    }
    updateAvatar(data: Buffer, fieldName: string, mimeType: string, id: string) {
        throw new Error("Method not implemented.");
    }
    updatePassword(oldPassword: string, newPassword: string, userId: string) {
        throw new Error("Method not implemented.");
    }

   
}