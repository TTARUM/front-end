import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";




const handler = NextAuth({

    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: "secret",
    },
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID || "",
            clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
    },
});

export { handler as GET, handler as POST };