import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
type DbClient = PrismaClient;

export {
    db,
    DbClient
}
