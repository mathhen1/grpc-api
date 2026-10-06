import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const protoPath = path.join(__dirname, "/proto/service.proto")

const packageDefinition = protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

const grpcObj = grpc.loadPackageDefinition(packageDefinition)
const userPackage = grpcObj.user

const GetUser = (call, callback) => {
    callback(null, { message: `Eae, ${call.request.name}, seja bem vindo!` })
}

const main = () => {
    const server = new grpc.Server()

    server.addService(userPackage.UserService.service, {
        GetUser: GetUser
    })

    server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.log("Error: ", err)
            return
        }
        console.log("Servidor gRPC rodando na porta: ", port)
    })
}

main()