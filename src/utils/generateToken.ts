import jwt,{ Secret } from "jsonwebtoken";
import { User } from "../model/user.entities";
import "dotenv/config";



interface IActivationToken {
    token: string;
    activationCode: string;
  }

  export const generateToken = (userData: Object): IActivationToken => {
    console.log("gen 1")
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    console.log("gen 2")

    const token = jwt.sign(
      {
        userData,
        activationCode,
      },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: "5m",
      }
    );
    console.log("gen 3")

    return { token, activationCode };
  };