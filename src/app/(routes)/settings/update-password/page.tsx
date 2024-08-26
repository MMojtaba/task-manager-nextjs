"use client";

import { updatePassword } from "@/app/dataAccess/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function Page() {
  const { toast } = useToast();

  const formSchema = z
    .object({
      currentPassword: z.string(),
      newPassword: z.string().min(3),
      confirmNewPassword: z.string(),
    })
    .refine((values) => values.newPassword === values.confirmNewPassword, {
      message: "Password must match",
      path: ["confirmNewPassword"],
    });

  const resetPassForm = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  async function onFormSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await updatePassword(values);
      if (res.status === 200) {
        toast({ title: "Password updated!" });
        resetPassForm.reset();
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      console.error("Error updating password", err);
      toast({ title: "Failed to update password", variant: "destructive" });
    }
  }

  return (
    <Form {...resetPassForm}>
      <form
        onSubmit={resetPassForm.handleSubmit(onFormSubmit)}
        className="space-y-4"
      >
        <FormField
          control={resetPassForm.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="current password..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={resetPassForm.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="new password..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={resetPassForm.control}
          name="confirmNewPassword"
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
        <span className="flex">
          <Button className="w-full" type="submit">
            Update Password
          </Button>
        </span>
      </form>
    </Form>
  );
}
