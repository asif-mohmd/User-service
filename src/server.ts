import dotenv from "dotenv";
import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import path from "path"
import { UserController } from "./controllers/userController";
import { UserService } from "./service/user.service";
import { UserRepository } from "./repository/UserRepository";
import { connectDB } from "./config/mongodb/db";

dotenv.config();


connectDB()


interface UserData {
    name: string;
    email: string;
    password: string;
    avatar: string;
    role: string;
}

const port = process.env.PORT || 3001;


const packageDefinition = protoLoader.loadSync(path.join(__dirname,"/protos/user.proto"),
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });


const userProto = grpc.loadPackageDefinition(packageDefinition)

const repository = new UserRepository()
const service = new UserService(repository)
const controller = new UserController(service)

const server = new grpc.Server()

const grpcServer = () =>{
    server.bindAsync(`0.0.0.0:${process.env.USER_GRPC_PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err,port)=>{
        if(err){
            console.log(err,"error happened grpc user service");
            return
        }
        console.log("grpc user server started on port:",port)
    }
    )
}

    server.addService((userProto.UserService as any).service, {
        Register : controller.onRegister.bind(controller),
        
        // Implementation of service methods
    });
grpcServer();

