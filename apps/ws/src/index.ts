import {server} from "./app";
import { ServerConfig } from "./config/server_config";

const PORT = ServerConfig.PORT

server.listen(PORT, ()=>{
    console.log(`Ws service is running on PORT=${PORT}`);
})