import authConfig from "./server/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  if (
    (nextUrl.pathname === "/game" || nextUrl.pathname === "/admin") &&
    !isLoggedIn
  ) {
    return Response.redirect(new URL("/", nextUrl as URL));
  }

  if (nextUrl.pathname === "/" && isLoggedIn) {
    if (req.auth?.user?.isAdmin) {
      return Response.redirect(new URL("/admin", nextUrl as URL));
    } else {
      return Response.redirect(new URL("/game", nextUrl as URL));
    }
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
