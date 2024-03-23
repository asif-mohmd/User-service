import dotenv from "dotenv";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

dotenv.config();

const USER_GRPC_PORT = process.env.USER_GRPC_PORT || 80800;

const packageDefinition = protoLoader.loadSync(path.join(__dirname, "./protos/user.proto"), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const usersProto = grpc.loadPackageDefinition(packageDefinition);

function main() {
    const server = new grpc.Server();

    // Ensure that UserService is defined
    if (usersProto && usersProto.UserService) {
        server.addService((usersProto.UserService as any).service, {
            
            Register: (call:any, callback:any) => {
                console.log("lllllllllllllllll")
                console.log(call.request,"calllllllllllllllllllllllllllllll datta")
                callback(null);
            }
            // Implement your service methods here
        });
    } else {
        console.error("UserService not found in the loaded proto definition.");
        return;
    }

    server.bindAsync(`0.0.0.0:${USER_GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), (err, boundPort) => {
        if (err) {
            console.error("Error occurred while binding server:", err);
        } else {
            console.log(`Server is running on port ${USER_GRPC_PORT}`);
        }
    });
}

main();
