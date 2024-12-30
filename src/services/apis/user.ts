import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "../configurations/query.configuration";
import { EditInfoFormValues } from "../types/EditInfoFormValues";

interface UserInformation {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  address: string;
  phoneNumber: string;
  email: string;
  birthday: string;
  organization: string;
  department: string;
  role: string;
  zipCode: string;
  picture: string;
}

interface UpdateUserEditInfoResponse {
  message: string;
}

// Create an API slice
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getUserInformation: builder.query<UserInformation, void>({
      query: () => ({
        url: "c/43b1-69d0-4bf6-a4db",
        method: "GET",
      }),
    }),
    getUserEditInformation: builder.query<EditInfoFormValues, void>({
      query: () => ({
        url: "c/f6a6-4b7a-4df3-8798",
        method: "GET",
      }),
    }),
    updateUserEditInformation: builder.mutation<
      UpdateUserEditInfoResponse,
      EditInfoFormValues
    >({
      query: (body) => ({
        url: "c/06fb-e35e-4714-a587",
        method: "PUT",
        body,
      }),
    }),
  }),
});

// Export the query hook
export const {
  useGetUserInformationQuery,
  useGetUserEditInformationQuery,
  useUpdateUserEditInformationMutation,
} = userApi;
