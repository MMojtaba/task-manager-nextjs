"use client";

import { authLogin } from "@/app/auth/authActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import { tmpSendEmail } from "@/app/dataAccess/label";

// export const metadata: Metadata = {
//   title: "Login",
// };

export default function Page() {
  const { toast } = useToast();
  const router = useRouter();

  // for testing sending emails using resend
  async function tmpHandleSendEmail() {
    await tmpSendEmail();
  }

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, { message: "Please enter your password." }),
  });

  const loginForm = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onFormSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await authLogin(values);
      if (res.status !== 200) throw new Error(res?.message);
      router.push("/");
    } catch (err) {
      console.error("Error loggin in", err);
      toast({ title: "Wrong email or password", variant: "destructive" });
    }
  }

  return (
    <div className="m-4">
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onFormSubmit)}
          className="space-y-8"
        >
          <FormField
            control={loginForm.control}
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
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} placeholder="password..." />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-4">
            <Link href="/register" className="text-slate-200 hover:underline">
              Don't have an account? Register
            </Link>
            <Button type="submit">Login</Button>
          </div>
        </form>
      </Form>
      <Button onClick={tmpHandleSendEmail}>Send Email</Button>
    </div>
  );

  // return (
  //   <form className="form-control" action={authLogin}>
  //     <label className="input input-bordered m-1 flex items-center gap-2">
  //       <Input type="text" className="grow" placeholder="Email" name="email" />
  //     </label>

  //     <div className="grid w-full max-w-sm items-center gap-1.5">
  //       <label className="input input-bordered m-1 flex items-center gap-2">
  //         <Input
  //           type="password"
  //           className="grow"
  //           placeholder="Password"
  //           name="password"
  //         />
  //       </label>
  //     </div>
  //     <Button className="btn btn-accent m-1">Login</Button>
  //   </form>
  // );
}
