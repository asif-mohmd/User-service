import { IUserRepository } from "../interfaces/IUserRepository";
import UserModel,{ IUser } from "../model/schemas/user.schema";
import { User } from "../model/user.entities";



export class UserRepository implements IUserRepository{

    register(userData: User): Promise<IUser | null> {
        try {
          return UserModel.create(userData);
        } catch (e: any) {
          throw new Error("db error");
        }
      }

      
    findOne(email: string): Promise<IUser | null> {
        throw new Error("Method not implemented.");
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
