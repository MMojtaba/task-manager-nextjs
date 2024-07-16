"use client";

import { authLogin } from "@/app/auth/authActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
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

// export const metadata: Metadata = {
//   title: "Login",
// };

export default function Page() {
  const formSchema = z.object({
    // TODO: uncomment
    email: z.string(), //.email({ message: "Please enter your email address." }),
    password: z.string(), //.min(3, { message: "Please enter your password." }),
  });

  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onFormSubmit(values: z.infer<typeof formSchema>) {
    await authLogin(values);
  }

  return (
    <div className="mx-2">
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
                  <Input placeholder="email" {...field} />
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
                  <Input type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
        </form>
      </Form>
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
