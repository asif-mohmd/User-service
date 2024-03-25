import { IUserService } from "../interfaces/IUserInterface";

export class UserController {
  private service: IUserService;

  constructor(service: IUserService) {
    this.service = service;
  }

  onRegister: any = async (call: any, callback: any) => {
    try {
      console.log("controller call");
      const request = call.request as {
        name: string;
        email: string;
        password: string;
      };
      const response = await this.service.userRegister(request);
      console.log(response.user.name, "-----------------------------");
      let res = response.user.name;
      callback(null, {
        msg: "registered",
        status: 200, // Set status to 200 for successful registration
        data: res,
      });
    } catch (error) {
      // Handle errors appropriately
      callback(error); // Pass the error to the callback
    }
  };

  



}
