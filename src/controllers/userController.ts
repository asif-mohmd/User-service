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
      console.log( "-----------------------------",response);
      if(response.registerStatus){
        
        callback(null, {
            msg: "OTP send",
            registerStatus: true,
            userData :response.activationToken
             // Set status to 200 for successful registration
           
          });
      }else{
        callback(null, {
            msg: "Auth error",
            registerStatus: false, // Set status to 200 for successful registration
           
          });
      }
     
    } catch (error) {
      // Handle errors appropriately
      callback(error); // Pass the error to the callback
    }
  };

  onActivateUser: any = async (call:any, callback:any) =>{
    try{
        console.log("on activate",call.request,"-----------")

        const request = call.request as {
            name:string;
            email:string;
            password:string;
        }
        const response = await this.service.activateUser(request);
        console.log(response,"-----------------")
        if(response){
          callback(null,{
            status:true
          })
        }else{
          callback(null,{
            status:false
          })
        }
       

    }catch(err){
        callback(err);
    }
  }




  onLogin: any = async (call: any, callback: any) => {
    try {
      console.log("controller call");
      const {email,password} = call.request as {
        email: string;
        password: string;
      };
      const response = await this.service.userLogin(email,password);
  
      callback(null, {
        
        msg: response.msg,
        status: response.status, 
        otp:response.otp,
        loginStatus:response.loginStatus
        // Set status to 200 for successful registration

      });
    } catch (error) {
      // Handle errors appropriately
      callback(error); // Pass the error to the callback
    }
  };

  


  
}
