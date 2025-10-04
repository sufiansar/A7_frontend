import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // You can add additional middleware logic here if needed
    console.log("Middleware executed for:", req.nextUrl.pathname);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user has a valid token for dashboard routes
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
