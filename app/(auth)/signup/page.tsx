"use client";

import { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import withAuth from "@/lib/withAuth";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      router.push("/login");
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <main className="flex justify-center max-w-screen-2xl px-4 items-center h-screen">
      <form
        onSubmit={handleSignup}
        className="auth-form p-8 rounded-2xl bg-black-300 border shadow-md"
      >
        <h1 className="text-2xl mb-4 text-center">Sign Up</h1>

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
          className="w-full mb-4 py-3  bg-white text-black-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-4 py-3  bg-white text-black-100"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" className="form-btn" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
        <p className="text-center mt-4">
          You alrady have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </main>
  );
};

export default withAuth(Signup);
