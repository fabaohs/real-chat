import { request } from "@/api/request";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerFormSchema = z.object({
  name: z
    .string({ required_error: "Nome é obrigatório" })
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
  email: z
    .string({ required_error: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
  password: z
    .string({ required_error: "Senha é obrigatória" })
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

type RegisterForm = z.infer<typeof registerFormSchema>;

export function RegisterForm() {
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerFormSchema),
  });

  const { control, handleSubmit } = form;

  async function onSubmit(data: RegisterForm) {
    const response = await request({
      url: `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      params: {
        method: "POST",
        body: JSON.stringify(data),
      },
    });

    console.log(response);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <Input {...field} placeholder="Digite seu nome" />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input {...field} placeholder="Digite seu email" />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <Input {...field} placeholder="Digite sua senha" />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Cadastrar
        </Button>
      </form>
    </Form>
  );
}
