"use client";

import { request } from "@/api/request";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z
    .string({ required_error: "O email é obrigatório" })
    .email({ message: "Email inválido" }),
  password: z
    .string({ required_error: "A senha é obrigatória" })
    .min(3, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

type LoginForm = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
  });

  const { control, handleSubmit } = form;

  async function onSubmit(data: LoginForm) {
    const response = await request({
      url: `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
      params: {
        method: "POST",
        body: JSON.stringify(data),
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          return handleSubmit(onSubmit)();
        }}
        className="space-y-4"
      >
        <FormField
          name="email"
          control={control}
          render={({ field }) => (
            <FormItem>
              <Label htmlFor={field.name}>Email</Label>
              <Input {...field} placeholder="email@email.com" id={field.name} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={control}
          render={({ field }) => (
            <FormItem>
              <Label htmlFor={field.name}>Senha</Label>
              <Input {...field} placeholder="S3nh4F0rt3-" id={field.name} />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-[100%]">
          Entrar
        </Button>
      </form>
    </Form>
  );
}
