import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: { label: "email", type: "text", placeholder: "Email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "Passoword",
        },
      },
      async authorize(credentials: unknown) {
        // get email and password
        // await prisma.user.findOne({
        // where:{
        //   email:email,
        //   password:password
        // }
        // })
        // return null
        // validation
        return { id: "User1", name: "Gaurav" };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      console.log(token);
      token.userId = token.sub;
      return token;
    },

    async session({ session, token, user }: unknown) {
      session.user.id = token.userId;
      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },
};
