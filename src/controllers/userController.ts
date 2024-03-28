import { IUserService } from "../interfaces/IUserInterface";

export class UserController {
  private service: IUserService;

  constructor(service: IUserService) {
    this.service = service;
  }

  onPasswordUpdate: any = async(call:any, callback: any) =>{
    try{

      console.log("contoll forgot password");

      const request = call.request as {
        email: string;
        password: string;
      };

      const response = await this.service.passwordUpdate(
        request.email,
        request.password
      );

      console.log("update apss res posne:",response)
if(response){
  console.log("controll pass updtaet")
  callback(null,{
    passwordUpdate : true
  })
}else{
  callback(null,{
    passwordUpdate : false
  })
}
      

    }catch(err){

    }

  }

  onForgotPassword: any = async (call: any, callback: any) => {
    try {
      console.log("contoll forgot password");

      const request = call.request as {
        email: string;
        password: string;
      };

      const response = await this.service.forgotPassword(
        request.email,
        request.password
      );
      console.log("----------", response);
      console.log("555555555", response.activatonToken);
      if (response.forgotPasswordStatus) {
        console.log(response.activationToken, "===========================");
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
      console.log("controller call");
      const request = call.request as {
        name: string;
        email: string;
        password: string;
      };
      const response = await this.service.userRegister(request);
      console.log("-----------registerrr resss------------------", response);
      if (response.registerStatus) {
        console.log(response.activationToken, "===========================");
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
      console.log("on activate", call.request, "-----------");

      const request = call.request as {
        name: string;
        email: string;
        password: string;
      };
      const response = await this.service.activateUser(request);
      console.log(response, "-----------------");
      if (response) {
        console.group("res sett");
        callback(null, {
          status: true,
        });
      } else {
        console.log("222222222222222");
        callback(null, {
          status: false,
        });
      }
    } catch (err) {
      callback(err);
    }
  };

  onLogin: any = async (call: any, callback: any) => {
    try {
      console.log("controller call");
      const { email, password } = call.request as {
        email: string;
        password: string;
      };
      const response = await this.service.userLogin(email, password);

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
