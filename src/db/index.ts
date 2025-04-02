import dotenv from 'dotenv'
dotenv.config()

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

// drizzle schema and relations for query feature
import * as schame from './schema'
import * as relations from './relations'

const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: Number(process.env.DB_PORT),
        keepAliveInitialDelay: 10000, // 0 by default. 10 วินาที
        enableKeepAlive: true, // false by default.
        connectTimeout: 60000, 
    });

const dbSingleton = async () => {
    return drizzle({ client: await connection, schema: { ...schame, ...relations }, mode: 'default' })
}
declare const globalThis: {
    dbGlobal: ReturnType<typeof dbSingleton>;
} & typeof global;
const conn = globalThis.dbGlobal ?? dbSingleton()
export default conn;
if (process.env.NODE_ENV !== 'production') globalThis.dbGlobal = conn