import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <Button
      className="bg-blue-600 text-white text-lg hover:bg-blue-400  rounded-2xl px-4 py-1"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
