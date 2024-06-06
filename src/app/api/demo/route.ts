import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  const queryParams = new URL(request.url).searchParams;
  const email = queryParams.get("email");
  if (!email) {
    return NextResponse.redirect("/error-page");
  }

  const token = jwt.sign(
    {
      email,
    },
    `nx!^devB@&Nk%`,
    {
      expiresIn: "30d",
    }
  );

  const cookieValue = "nx-access-token";
  const cookieOptions = {
    maxAge: 60 * 60 * 24, // 1 day in seconds
    path: "/", // the path where the cookie is valid
    // httpOnly: true, 
  };

  const response = NextResponse.json({ redirect: "/en/main" });
  response.cookies.set(cookieValue, token, cookieOptions);

  return response;
}
