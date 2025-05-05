"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getClerkErrorMessage } from "@/lib/helper";
import { LoginSchema, loginSchema } from "@/lib/schema";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const FormContent = () => {
  const { signIn, setActive } = useSignIn();
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginSchema) => {
    try {
      const result = await signIn?.create({
        identifier: data.userName,
        password: data.password,
      });

      if (result?.status === "complete") {
        await setActive?.({ session: result.createdSessionId });
        toast.success("Logged in successfully");
        router.push("/dashboard"); // or wherever your app routes after login
      } else {
        toast.error("Login incomplete. Please try again.");
      }
    } catch (err: unknown) {
      toast.error(
        getClerkErrorMessage({ err, defaultMessage: "Login failed." })
      );
    }
  };

  //   const handleGoogleLogin = async () => {
  //     try {
  //       const result = await signIn?.authenticateWithRedirect({
  //         strategy: "oauth_google",
  //         redirectUrl: "/onboarding",
  //         redirectUrlComplete: "/dashboard",
  //       });

  //       console.log(result);
  //     } catch (err: unknown) {
  //       console.log(err);
  //       toast.error(
  //         getClerkErrorMessage({ err, defaultMessage: "Login failed." })
  //       );
  //     }
  //   };

  return (
    <div className="flex flex-col gap-6">
      <div className="pt-4">
        {/* <CustomGoogleOneTap>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Login with Google
          </Button>
        </CustomGoogleOneTap> */}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <div className="grid gap-6">
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email or Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email or username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </div>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Register
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormContent;
