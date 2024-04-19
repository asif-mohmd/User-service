import { IUserRepository } from "../interfaces/IUserRepository";
import UserModel, { IUser } from "../model/schemas/user.schema";
import { User } from "../entities/user.entities";



export class UserRepository implements IUserRepository {


    async blockUnblock(userId: string, isVerified: Boolean): Promise<Boolean | any> {
        try {
            console.log("44444444444444444444444444",isVerified,"44444444444444444444444444444444444444")
            const updatedUser = await UserModel.findByIdAndUpdate(userId, { isVerified }, { new: true });

            if (!updatedUser) {
                console.log("User not found");
                return false; // Or handle the error accordingly
            }

            console.log("User updated successfully:", updatedUser);
            return true; // Or you can return the updated user object or any other relevant data
        } catch (error) {
            console.error("Error updating user:", error);
            throw error; // Or handle the error accordingly
        }
    }


    async updateOne(email: string, password: string): Promise<any> {
        try {
            const result = await UserModel.updateOne({ email: email }, { $set: { password: password } });
            return result;
        } catch (error) {
            throw new Error("Error updating password");
        }
    }



    register(userData: User): Promise<IUser | null> {
        console.log(userData, "repository........................")
        try {
            return UserModel.create(userData);
        } catch (e: any) {
            throw new Error("db error");
        }
    }


    async findOne(email: string): Promise<IUser | null> {
        try {
            console.log("find one method")
            const user = await UserModel.findOne({ email });
            console.log(user, "user")
            return user;
        } catch (e: any) {
            throw new Error("db error");
        }
    }

    async getUsers() {
        try {
            const userList = await UserModel.find()
            console.log(userList, "user repossssss list")
            return userList
        } catch (error) {

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

