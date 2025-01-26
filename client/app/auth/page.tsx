"use client";

import { LoginForm } from "@/app/auth/components/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "./components/register-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

enum AuthTab {
  LOGIN = "login",
  REGISTER = "register",
}

export default function AuthPage() {
  return (
    <div className="min-h-screen w-full flex items-center bg-slate-900 ">
      <Card className="w-full max-w-[500px] mx-auto my-auto min-h-96 overflow-y-scroll">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold">
            RealChat
          </CardTitle>
          <CardDescription className="text-center">
            Entre ou cadastre-se
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue={AuthTab.LOGIN}>
            <TabsList>
              <TabsTrigger value={AuthTab.LOGIN}>Login</TabsTrigger>
              <TabsTrigger value={AuthTab.REGISTER}>Register</TabsTrigger>
            </TabsList>

            <TabsContent value={AuthTab.LOGIN}>
              <LoginForm />
            </TabsContent>

            <TabsContent value={AuthTab.REGISTER}>
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
