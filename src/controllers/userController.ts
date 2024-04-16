import { IUserInteractor } from "../interfaces/IUserInteractor";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  msg: string;
  status: string;
  otp: string;
  loginStatus: boolean;
}

export class UserController {
  private interactor: IUserInteractor;

  constructor(interactor: IUserInteractor) {
    this.interactor = interactor;
  }

  onPasswordUpdate: any = async (call: any, callback: any) => {
    try {
      const request = call.request as {
        email: string;
        password: string;
      };
      const response = await this.interactor.passwordUpdate(
        request.email,
        request.password
      );

      if (response) {
        console.log("controll pass updtaet");
        callback(null, {
          passwordUpdate: true,
        });
      } else {
        callback(null, {
          passwordUpdate: false,
        });
      }
    } catch (err) {}
  };

  onForgotPassword: any = async (call: any, callback: any) => {
    try {
      const request = call.request as {
        email: string;
        password: string;
      };

      const response = await this.interactor.forgotPassword(
        request.email,
        request.password
      );
      if (response.forgotPasswordStatus) {
        callback(null, {
          forgotPasswordStatus: true,
          forgotData: response.activationToken,
        });
      } else {
        callback(null, {
          registerStatus: false,
        });
      }
    } catch (error: any) {
      callback(error);
    }
  };

  onRegister: any = async (call: any, callback: any) => {
    try {
      const request = call.request as {
        name: string;
        email: string;
        password: string;
      };
      const response = await this.interactor.userRegister(request);
      if (response.registerStatus) {
        callback(null, {
          msg: "OTP send",
          registerStatus: true,
          userData: response.activationToken,
        });
      } else {
        callback(null, {
          msg: "Auth error",
          registerStatus: false,
        });
      }
    } catch (error) {
      callback(error);
    }
  };

  onActivateUser: any = async (call: any, callback: any) => {
    try {
      const request = call.request as {
        name: string;
        email: string;
        password: string;
      };
      const response = await this.interactor.activateUser(request);
      if (response) {
        callback(null, {
          status: true,
        });
      } else {
        callback(null, {
          status: false,
        });
      }
    } catch (err) {
      callback(err);
    }
  };

  onLogin: any = async (call: any, callback: any) => {
    console.log(call,"------============----------------------")
    try {
      const { email, password } = call.request as {
        email: string;
        password: string;
      };
      const response = await this.interactor.userLogin(email, password);
      callback(null, {
        msg: response.msg,
        status: response.status,
        otp: response.otp,
        loginStatus: response.loginStatus,
      });
    } catch (error) {
      callback(error);
    }
  };
}
