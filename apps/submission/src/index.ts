import { app } from "./app";
import { ServerConfig } from "./config/server_config";
import Fastify from "fastify";

const fastify = Fastify({logger: true});

fastify.register(app);

const PORT = ServerConfig.PORT;

fastify.get("/healthcheck", (_, res)=>{
  return res.send("Submission service is alive");
});

// start the service
(async function(){
    try {
        await fastify.listen({ port:  PORT})
      } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})()