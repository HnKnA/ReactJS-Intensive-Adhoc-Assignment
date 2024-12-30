import { useContext } from "react";
import { AuthenticatedContext } from "../shared/Authenticated";

const useOfficerMode = () => {
  const { user } = useContext(AuthenticatedContext);
  const isOfficer = user?.role === "officer" || false;

  return {
    isOfficer,
    readOnly: isOfficer,
    disabled: isOfficer,
  };
};

export default useOfficerMode;
