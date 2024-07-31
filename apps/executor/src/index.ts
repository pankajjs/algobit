import { app } from "./app";
import { ServerConfig } from "./config/server_config";
import { submissionWorker } from "./worker/submission_worker";

const PORT = ServerConfig.PORT; 

app.listen(PORT, () => {
    submissionWorker.run();
    console.log(`Executor service is running on port=${PORT}`);
})
