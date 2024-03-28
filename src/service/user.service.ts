import { error } from "console";
import { IUserService } from "../interfaces/IUserInterface";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../model/user.entities";
import { generateToken } from "../utils/generateToken";
import { IUser } from "../model/schemas/user.schema";
import { response } from "express";
import { sendMail } from "../utils/nodeMailer";

export class UserService implements IUserService {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async passwordUpdate(email: string, password: string) {
    try {
      console.log(email, "serviceeeeeeeeeeeeeeeeeeeeeeeee");
      const passwordUpdate = await this.repository.updateOne(email, password);
      if (passwordUpdate) {
        console.log(passwordUpdate);
        console.log("passupdate here");
        return true;
      }
    } catch (err) {}
  }
  async forgotPassword(email: string, password: string) {
    try {
      console.log(email, "serviceeeeeeeeeeeeeeeeeeeeeeeee");
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

        console.log("0000000000000", activationToken);

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
      console.log(userData, "serviceeeeeeeeeeeeeeeeeeeeeeeee");
      const isEmailExist = await this.repository.findOne(userData.email);

      if (isEmailExist) {
        let registerStatus = false;

        return registerStatus;
      }
      let activationToken = generateToken(userData);
      console.log(activationToken);
      let registerStatus = true;
      console.log("after email");
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
    console.log(userDataWithVerification, "userDataWithVerification");
    const response = await this.repository.register(userDataWithVerification);
    console.log("-------", response);
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
      console.log("stage 1");
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      console.log("stage 2");

      const activationToken = generateToken(user.id);
      console.log(activationToken, ":activation token");
      console.log("stage 3");

      let loginStatus: boolean = true;

      const response = { msg: "Login successful", status: 201, loginStatus };
      console.log("stage 4");
      console.log(response);
      return response;
    } catch (err: any) {
      let loginStatus: boolean = false;
      console.error("An error occurred during login:", err.message);
      const response = { msg: "Login successful", status: 201, loginStatus };

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
