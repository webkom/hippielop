import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  if (nextUrl.pathname === "/game" && !isLoggedIn) {
    return Response.redirect(new URL("/", nextUrl as URL));
  }

  if (nextUrl.pathname === "/" && isLoggedIn) {
    return Response.redirect(new URL("/game", nextUrl as URL));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
