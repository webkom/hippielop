"use client";

import { login } from "~/actions/auth";
import { useState } from "react";

export default function LoginForm() {
  const [code, setCode] = useState("");

  const handleLogin = async () => {
    try {
      await login(code);
      window.location.href = "/game";
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <span>Kode:</span>
      <input onInput={(e) => setCode(e.currentTarget.value)} value={code} />
      <button
        className="border-1 rounded-lg border-amber-400 bg-amber-200 p-3"
        onClick={handleLogin}
      >
        Opne brettet
      </button>
    </>
  );
}
