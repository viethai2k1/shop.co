import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const providers = [
  CredentialsProvider({
    name: "Credentials",
    id: "credentials",
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credential) {
      const url = "http://localhost:8080/api/auth/login";
      const payload = {
        email: credential.email,
        password: credential.password,
      };
      const options = {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch(url, options);
      const user = await response.json();

      if (!user.ok) {
        throw new Error("Wrong username or password");
      }

      return user.data;
    },
  }),
];

const callbacks = {
  async jwt({ token, user }) {
    if (user) {
      token = user;
    }
    return token;
  },
  async session({ session, token }) {
    session.user = token;
    return session;
  },
};

export const options = {
  providers,
  callbacks,
  pages: {
    signIn: "/",
  },
};

export default (req, res) => NextAuth(req, res, options);
