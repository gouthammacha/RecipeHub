
import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInValues = z.infer<typeof signInSchema>;

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInValues) => {
    toast({
      title: "Welcome back!",
      description: "You have successfully signed in.",
    });
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-md">
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            className="pl-10"
                            {...field}
                          />
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 pr-10"
                            {...field}
                          />
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <button
                            type="button"
                            className="absolute right-3 top-2.5 text-gray-400"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-recipe-primary hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
