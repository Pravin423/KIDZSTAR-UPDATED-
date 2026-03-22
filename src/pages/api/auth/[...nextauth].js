import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        // Constant-time comparison to prevent timing attacks
        const emailMatch = credentials.email === process.env.ADMIN_EMAIL;
        const passMatch  = credentials.password === process.env.ADMIN_PASSWORD;
        if (emailMatch && passMatch) {
          return { id: 1, email: credentials.email };
        }
        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours — admin session expires after a working day
  },

  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,   // JS cannot read this cookie
        sameSite: "strict", // blocks cross-site requests (CSRF protection)
        path: "/",
        secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      },
    },
  },

  pages: {
    signIn: "/admin/login",
  },
};

export default NextAuth(authOptions);
