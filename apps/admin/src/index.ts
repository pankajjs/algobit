import ServerConfig from "./config";
import app from "./app";

const PORT = ServerConfig.PORT;

app.listen(PORT, () => {
	logger.info(`Admin service is running on port=${PORT}`);
});
