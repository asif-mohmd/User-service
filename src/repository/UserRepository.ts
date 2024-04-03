import { IUserRepository } from "../interfaces/IUserRepository";
import UserModel,{ IUser } from "../model/schemas/user.schema";
import { User } from "../entities/user.entities";



export class UserRepository implements IUserRepository{


    async updateOne(email: string, password: string): Promise<any> {
        try {
            const result = await UserModel.updateOne({ email: email }, { $set: { password: password } });
            return result;
        } catch (error) {
            throw new Error("Error updating password");
        }
    }

    

    register(userData: User): Promise<IUser | null> {
        console.log(userData,"repository........................")
        try {
          return UserModel.create(userData);
        } catch (e: any) {
          throw new Error("db error");
        }
      }


    async findOne(email: string): Promise<IUser | null> {
        try{
            console.log("find one method")
            const user = await UserModel.findOne({email});
            console.log(user,"user")
            return user;
        } catch (e: any) {
            throw new Error("db error");
        }
    }
    findById(id: string): Promise<IUser | null> {
        throw new Error("Method not implemented.");
    }
    findByIdAndUpdate(id: string, name: string): Promise<IUser | null> {
        throw new Error("Method not implemented.");
    }
    avatarUpdate(id: string, avatar: string): Promise<IUser | null> {
        throw new Error("Method not implemented.");
    }
    updatePassword(id: string, password: string): Promise<IUser | null> {
        throw new Error("Method not implemented.");
    }

    

   

}

