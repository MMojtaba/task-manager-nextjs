"use client";

import { createUser } from "@/app/_api/user";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const { toast } = useToast();
  const router = useRouter();

  const formSchema = z
    .object({
      email: z.string().email(),
      password: z.string().min(3),
      confirmPassword: z.string(),
    })
    .refine((values) => values.password === values.confirmPassword, {
      message: "Password must match",
      path: ["confirmPassword"],
    });

  const registerForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onFormSubmit(values: z.infer<typeof formSchema>) {
    const res = await createUser(values);
    if (res.status === 200) {
      toast({ title: "Account created!" });
      router.push("/login");
    } else {
      toast({ title: "Failed to create account", variant: "destructive" });
    }
  }

  return (
    <div className="m-4">
      <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(onFormSubmit)}
          className="space-y-8"
        >
          <FormField
            control={registerForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={registerForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-enter</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="re-enter password..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-4">
            <Link href="/login" className="text-slate-200 hover:underline">
              Already have an account? Login
            </Link>
            <Button type="submit">Register</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
