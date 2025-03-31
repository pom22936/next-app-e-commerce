import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import conn from "@/db"; // your drizzle instance
import { account, session, user, verification } from "@/db/schema";

const db = await conn;

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "mysql", // or "mysql", "sqlite"
        schema: {
            user,
            account,
            session,
            verification
        },
        usePlural: false,
    }),
    emailAndPassword: {  
        enabled: true,
        autoSignIn: false, //defaults to true สมัครเสร็จ login ทันที ให้เปิด true
        requireEmailVerification: false, //defaults to true ยืนยันตัวตน auto ให้เปิด true
        minPasswordLength: 4
    },
    // socialProviders: { 
    //     github: { 
    //         clientId: process.env.GITHUB_CLIENT_ID, 
    //         clientSecret: process.env.GITHUB_CLIENT_SECRET, 
    //     } 
    // }, 
});