import { createLogger, format, transports, type transport } from "winston";

const { combine, timestamp, prettyPrint, json, colorize } = format;
const { Console } = transports;

const loggerTransports: transport[] = [];

loggerTransports.push(
	new Console({
		format: combine(
			json(),
			timestamp(),
			prettyPrint(),
			colorize({ all: true }),
		),
	}),
);

const logger = createLogger({
	transports: loggerTransports,
});

export default logger;
export type logger = typeof logger;
