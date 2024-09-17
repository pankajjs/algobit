import { PrismaClient } from "@prisma/client/admin";

const db = new PrismaClient();
export type DbClient = PrismaClient;

export default db;