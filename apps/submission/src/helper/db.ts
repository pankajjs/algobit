import { PrismaClient } from "@prisma/client/submission";

const db = new PrismaClient();
type DbClient = PrismaClient;

export {
    db,
    DbClient
}
