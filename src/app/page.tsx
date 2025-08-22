import { Suspense } from "react";
import LoginForm from "~/app/_components/login-form";

export default async function Home() {
  return (
    <Suspense>
      <div className="absolute flex h-screen w-screen items-center justify-center px-4">
        <LoginForm />
      </div>
    </Suspense>
  );
}
