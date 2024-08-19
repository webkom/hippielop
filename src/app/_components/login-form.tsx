"use client";

import { signIn } from "next-auth/react";

export default function LoginForm() {
  return (
    <>
      <span>Kode:</span>
      <button
        className="border-1 rounded-lg border-amber-400 bg-amber-200 p-3"
        onClick={() => signIn("lego")}
      >
        Logg inn med Abakus.no
      </button>
    </>
  );
}
