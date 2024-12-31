import { RouteObject } from "react-router";
import PersonalInformation from "./personal-information/personal-information";
import UserKYC from "./kyc/kyc";
import User from "./user";
import EditInformation from "./personal-information/edit-information";
import { AccessControlGuard } from "../../shared/AccessControlGuard";

const userRoutes: RouteObject[] = [
  {
    path: "user",
    element: (
      <AccessControlGuard>
        <User />
      </AccessControlGuard>
    ),
    children: [
      {
        path: ":name/pi",
        element: <PersonalInformation />,
      },
      {
        path: ":name/edit",
        element: <EditInformation />,
      },
      {
        path: ":name/kyc",
        element: <UserKYC></UserKYC>,
      },
    ],
  },
];

export default userRoutes;
