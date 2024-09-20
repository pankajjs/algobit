import Fastify from "fastify";
import app from "./app";
import ServerConfig from "./config";
import { worker } from "./worker";

const fastify = Fastify({logger: false});

fastify.register(app);

const PORT = ServerConfig.PORT;

fastify.get("/healthcheck", (_, res)=>{
  return res.send("Request service is alive");
});

// start the service
(async function(){
    try {
        await fastify.listen({
            port: Number(PORT)
        })
        worker.run();
    } catch (err: any) {
        logger.error(err);
        logger.error(`Error while starting app: ${err.message}`);
        process.exit(1)
    }
})()