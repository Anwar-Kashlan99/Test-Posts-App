"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import withAuth from "@/lib/withAuth";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      setLoading(false);
      router.push("/");
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <main className="flex justify-center max-w-screen-2xl px-4 items-center h-screen">
      <form
        onSubmit={handleLogin}
        className="auth-form p-8 rounded-2xl bg-black-300 border shadow-md"
      >
        <h1 className="text-2xl mb-4 text-center">Login</h1>

        <Input
          type="email"
          placeholder="Email"
          className="w-full mb-4 py-3  bg-white text-black-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 bg-white  text-black-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" className="form-btn" disabled={loading}>
          {loading ? "Logging In..." : "Login"}
        </Button>

        <p className="text-center mt-4">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up here
          </a>
        </p>
      </form>
    </main>
  );
};

export default withAuth(Login);
