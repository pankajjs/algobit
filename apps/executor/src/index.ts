import { app } from "./app";
import { ServerConfig } from "./config/server_config";

const PORT = ServerConfig.PORT; 

app.listen(PORT, () => {
    console.log(`Executor service is running on port=${PORT}`);
})
