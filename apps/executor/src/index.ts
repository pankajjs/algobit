import app from "./app";
import ServerConfig from "./config";
import { requestQueueWorker } from "./worker";

const PORT = ServerConfig.PORT; 

app.listen(PORT, () => {
    requestQueueWorker.run();
    logger.info(`Executor service is running on port=${PORT}`);
})
