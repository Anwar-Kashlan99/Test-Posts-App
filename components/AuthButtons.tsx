"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import LogoutButton from "./LogoutButton";

const AuthButtons = () => {
  const token = localStorage.getItem("token");
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  };
  const handeSignup = () => {
    router.push("/signup");
  };
  const handePosts = () => {
    router.push("/posts");
  };

  if (!token) {
    return (
      <div className="flex justify-center items-center gap-7">
        <Button
          className="bg-blue-600 text-white rounded-2xl hover:bg-blue-400  text-lg px-4 py-1"
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button
          className="bg-blue-600 text-white rounded-2xl hover:bg-blue-400 text-lg px-4 py-1"
          onClick={handeSignup}
        >
          Signup
        </Button>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center gap-7">
        <LogoutButton />
        <Button
          className="bg-blue-600 text-white hover:bg-blue-400  rounded-2xl text-lg px-4 py-1"
          onClick={handePosts}
        >
          posts
        </Button>
      </div>
    );
  }
};

export default AuthButtons;
