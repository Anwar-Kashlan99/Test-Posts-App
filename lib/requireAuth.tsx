"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const requireAuth = (WrappedComponent: React.FC) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
      } else {
        setLoading(false);
      }
    }, []);

    if (loading) {
      return <p>Loading...</p>;
    }

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default requireAuth;
