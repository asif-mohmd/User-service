
import { IUserInteractor } from "../interfaces/IUserInteractor";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../entities/user.entities";
import { generateToken } from "../utils/generateToken";
import { IUser } from "../model/schemas/user.schema";

import { sendMail } from "../utils/nodeMailer";

export class UserInteractor implements IUserInteractor {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }




  async passwordUpdate(email: string, password: string) {
    try {
      const passwordUpdate = await this.repository.updateOne(email, password);
      if (passwordUpdate) {
        return true;
      }
    } catch (err) {}
  }

  
  
  async forgotPassword(email: string, password: string) {
    try {
      const isEmailExist = await this.repository.findOne(email);

      if (isEmailExist) {
        let forgotPasswordStatus = true;
        let email = isEmailExist.email;
        let password = isEmailExist.password;
        let userData = { forgotPasswordStatus, email, password };

        let activationToken = generateToken(userData);
        let options = {
          email: userData.email,
          otp: activationToken.activationCode,
        };
        sendMail(options);

        return { forgotPasswordStatus, activationToken };
      }
      let forgotPasswordStatus = false;
      return forgotPasswordStatus;
    } catch (err) {
      console.log(err, "errrr user forgot");
    }
  }



  async userRegister(userData: User) {
    try {
      const isEmailExist = await this.repository.findOne(userData.email);

      if (isEmailExist) {
        let registerStatus = false;

        return registerStatus;
      }
      let activationToken = generateToken(userData);
      let registerStatus = true;
      let options = {
        email: userData.email,
        otp: activationToken.activationCode,
      };
      sendMail(options);
      return { registerStatus, activationToken };
    } catch (err) {
      console.log(err, "errrr user regisssssss");
    }
  }



  async activateUser(userData: {
    name: string;
    email: string;
    password: string;
  }) {
    const userDataWithVerification = {
      ...userData,
      isVerified: true, // Assuming you want to set it to false initially
    };

    const response = await this.repository.register(userDataWithVerification);

    if (response) {
      return true;
    }
  }



  async userLogin(email: string, password: string) {
    try {
      const user: IUser | null = await this.repository.findOne(email);
      if (!user) {
        return { msg: "Login failed", status: 401 };
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      const activationToken = generateToken(user.id);
      let loginStatus: boolean = true;
      console.log(activationToken,"]]]]]]]]]]]]]]]]]]]]]]")
      const response = { msg: "Login successful", status: 201, activationToken , loginStatus };

      return response;
    } catch (err: any) {
      let loginStatus: boolean = false;
      const response = { msg: "Login Failed", status: 201, loginStatus };
      return response;
    }
  }



  getUser(id: string): Promise<any> {
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
