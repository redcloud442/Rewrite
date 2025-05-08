import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  handleApiRoute,
  handleRedirectToSignIn,
  redirectTo,
} from "./lib/serverside-function";
import { RuleType } from "./types/types";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/register(.*)",
  "/",
]);

const isOnboardingRoute = createRouteMatcher(["/onboarding"]);

const isProtectedRoute = createRouteMatcher(["/app(.*)"]);

const isApiRoute = createRouteMatcher(["/api(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, getToken } = await auth();

  const onboardingComplete = sessionClaims?.metadata?.onboardingComplete;

  const rules = [
    {
      type: RuleType.Api,
      condition: () => isApiRoute(req),
      action: async () => handleApiRoute(getToken)(),
    },
    {
      type: RuleType.NoUserMustSignIn,
      condition: () => !userId && !isPublicRoute(req),
      action: () => handleRedirectToSignIn(req, "/sign-in"),
    },
    {
      type: RuleType.MustFinishOnboarding,
      condition: () => userId && !onboardingComplete && !isOnboardingRoute(req),
      action: () => redirectTo("/onboarding", req),
    },
    {
      type: RuleType.ProtectedRoute,
      condition: () => userId && onboardingComplete && isProtectedRoute(req),
      action: () => NextResponse.next(),
    },
    {
      type: RuleType.PublicToPrivateRedirect,
      condition: () => userId && isPublicRoute(req),
      action: () => redirectTo("/app", req),
    },
    {
      type: RuleType.DefaultAllow,
      condition: () => true,
      action: () => NextResponse.next(),
    },
  ];

  for (const rule of rules) {
    if (rule.condition()) {
      // Optional: for debugging, you can log the matched rule
      // console.log("Matched rule:", RuleType[rule.type]);
      return await rule.action();
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
