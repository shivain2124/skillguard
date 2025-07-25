import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import connectDB from "./lib/mongodb";
import User from "./lib/models/User";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
        async authorize(credentials) {
          const email = credentials?.email;
          const password = credentials?.password;
          
          if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
            return null;
          }

          try {
            await connectDB();
            const user = await User.findOne({ email });
            
            if (!user || !user.password) {
              return null;
            }

            const isValid = await bcrypt.compare(password, user.password);
            
            if (!isValid) {
              return null;
            }

            return {
              id: user._id.toString(),
              email: user.email,
              name: user.name,
            };
          } catch (error) {
            console.error("Auth error:", error);
            return null;
          }
        }

    })
  ],
});
