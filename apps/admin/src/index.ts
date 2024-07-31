import { app } from "./app";
import { ServerConfig } from "./config/config";

const PORT = ServerConfig.PORT;

app.listen(PORT, ()=>{
    console.log(`Admin service is running on port=${PORT}`);
})