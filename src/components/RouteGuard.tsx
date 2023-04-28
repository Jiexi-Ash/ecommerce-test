import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

type TRouteGuard = {
  children: React.ReactNode;
};
function RouteGuard({ children }: TRouteGuard) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const user = useUser();

  useEffect(() => {
    if (user) {
      //  push using router mark as void

      setIsLoggedIn(true);
    }
  }, [user]);

  return <>{children}</>;
}

export default RouteGuard;
