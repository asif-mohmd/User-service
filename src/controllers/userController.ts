import { IUserService } from "../interfaces/IUserInterface";

export class UserController {
    private service: IUserService;

    constructor(service: IUserService) {
        this.service=service
    }

    onRegister: any = async (call: any,callback: any) =>{
        try{
           const request = call.request as {name:string; email:string; password:string;}
           const response = await this.service.userRegister(request)
           console.log("userControoooo",response)
        }catch{
            
        }
    }


}
