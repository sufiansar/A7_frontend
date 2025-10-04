import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: string;
  }
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          console.error("Email or Password is missing");
          return null;
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!res?.ok) {
            console.error("Login Failed", await res.text());
            return null;
          }

          const response = await res.json();
          console.log("User response:", response);

          if (response?.data?.user?.id) {
            const user = response.data.user;
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.picture || null,
              accessToken: response.data.accessToken,
            };
          }

          console.error("No user ID in response");
          console.error(
            "Expected format: { data: { user: { id, name, email, ... } } }"
          );
          return null;
        } catch (err) {
          console.error("Authorize Error:", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.accessToken = (user as { accessToken?: string }).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Handle callback URL parameter
      if (url.includes("callbackUrl")) {
        const urlParams = new URLSearchParams(url.split("?")[1]);
        const callbackUrl = urlParams.get("callbackUrl");
        if (callbackUrl) {
          return decodeURIComponent(callbackUrl);
        }
      }

      // If url is a relative path, prepend baseUrl
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      // If url is same origin, allow it
      if (new URL(url).origin === baseUrl) {
        return url;
      }

      // Default redirect to dashboard after login
      return `${baseUrl}/dashboard`;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};
