import { prismaClient } from "@/app/lib/db";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID ?? "your-client-id",
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "your-client-secret"
        })
    ],
    secret: process.env.NEXTAUTH_SECRET ?? "secret",
    callbacks:{
        async signIn(params){
            if(!params.user.email){
                throw new Error("Email is required");
            }
            try {
                await prismaClient.user.create({
                    data: {
                        email:params.user.email,
                        provider:"Github"
                    }
                })
                return true;
            } catch (error) {
                console.error("error during sign-in ",error)
                return false;
            }
        }
    }
});

export { handler as GET, handler as POST };
