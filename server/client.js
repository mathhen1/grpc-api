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

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)
const userPackage = protoDescriptor.user

const main = () => {
    const client = new userPackage.UserService("localhost:50051", grpc.credentials.createInsecure())

    client.GetUser({ name: "Matheus" }, (err, res) => {
        if (err) {
            console.log(err)
            return
        }
        console.log("Resposta: ", res)
    })
}

main()