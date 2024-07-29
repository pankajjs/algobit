import { app } from "./app";
import { ServerConfig } from "./config";

const PORT = ServerConfig.PORT;

app.listen(PORT, ()=>{
    console.log(`Create problem service is running on port=${PORT}`);
})