import server from "./app";
import ServerConfig from "./config";

const PORT = ServerConfig.PORT;

server.listen(PORT, () => {
	logger.info(`Ws service is running on PORT=${PORT}`);
});
