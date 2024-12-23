"use client";

import { request } from "@/api/request";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "./ui/separator";

const loginFormSchema = z.object({
  email: z
    .string({ required_error: "O email é obrigatório" })
    .email({ message: "Email inválido" }),
  password: z
    .string({ required_error: "A senha é obrigatória" })
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

type LoginForm = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
  });

  const { control, handleSubmit } = form;

  async function onSubmit(data: LoginForm) {
    console.log("data", data);

    await request({
      url: "https://rickandmortyapi.com/api/episode",
      params: {
        method: "GET",
      },
    });
  }

  return (
    <Card className="w-full max-w-[500px] mx-auto my-auto">
      <CardHeader>
        <CardTitle>RealChat</CardTitle>
        <CardDescription>Entrar</CardDescription>
      </CardHeader>

      <Separator />

      <CardContent>
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
                  <Input
                    {...field}
                    placeholder="email@email.com"
                    id={field.name}
                  />
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
                </FormItem>
              )}
            />

            <Button type="submit" className="w-[100%]">
              Entrar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
