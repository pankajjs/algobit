import { app } from "./app";
import { ServerConfig } from "./config/server_config";
import { requestQueueWorker } from "./worker/request_worker";

const PORT = ServerConfig.PORT; 

app.listen(PORT, () => {
    requestQueueWorker.run();
    console.log(`Executor service is running on port=${PORT}`);
})
