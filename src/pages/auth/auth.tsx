import { Outlet } from "react-router";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";

const Auth = () => {
  // For flowbite's javascript to work properly
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <div className="bg-gray-100">
      <Outlet></Outlet>
    </div>
  );
};

export default Auth;
