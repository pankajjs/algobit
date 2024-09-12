import { PrismaClient } from "@prisma/client/admin";

const db = new PrismaClient();
type DbClient = PrismaClient;

export {
    db,
    DbClient
}
