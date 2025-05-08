import { NextResponse } from "next/server";

export const handleApiRoute = (getToken: () => Promise<string | null>) => {
  return async () => {
    const token = await getToken();
    const response = NextResponse.next();
    if (token) response.headers.set("Authorization", `Bearer ${token}`);
    return response;
  };
};

export const handleRedirectToSignIn = (
  req: Request,
  redirectToSignIn: string
) => {
  return NextResponse.redirect(new URL(redirectToSignIn, req.url));
};

export const redirectTo = (url: string, req: Request) => {
  return NextResponse.redirect(new URL(url, req.url));
};
