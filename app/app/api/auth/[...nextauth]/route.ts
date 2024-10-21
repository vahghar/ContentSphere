import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID ?? "your-client-id",
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "your-client-secret"
        })
    ]
});

export { handler as GET, handler as POST };
