import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "../configurations/query.configuration";
import { EditInfoFormValues } from "../types/EditInfoFormValues";
import { KycFormValues } from "../types/KycFormValues";

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

interface UpdateUserInfoResponse {
  message: string;
}

export enum Status {
  Active = "Active",
  Pending = "Pending",
  Inactive = "Inactive",
}

interface User {
  name: string;
  status: Status;
  date: string;
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
    getUserKycInformation: builder.query<KycFormValues, void>({
      query: () => ({
        url: "c/23e4-cda0-4b53-aae5",
        method: "GET",
      }),
    }),
    getUserList: builder.query<User[], void>({
      query: () => ({
        url: "c/24b8-80f1-4157-adc8",
        method: "GET",
      }),
    }),
    updateUserEditInformation: builder.mutation<
      UpdateUserInfoResponse,
      EditInfoFormValues
    >({
      query: (body) => ({
        url: "c/06fb-e35e-4714-a587",
        method: "PUT",
        body,
      }),
    }),
    updateUserKycInformation: builder.mutation<
      UpdateUserInfoResponse,
      KycFormValues
    >({
      query: (body) => ({
        url: "c/b674-d5e1-441d-8799",
        method: "PUT",
        body,
      }),
    }),
    reviewKycSubmission: builder.mutation<UpdateUserInfoResponse, void>({
      query: () => ({
        url: "c/859f-84d8-43c3-ade8",
        method: "POST",
      }),
    }),
  }),
});

// Export the query hook
export const {
  useGetUserInformationQuery,
  useGetUserEditInformationQuery,
  useGetUserKycInformationQuery,
  useGetUserListQuery,
  useUpdateUserEditInformationMutation,
  useUpdateUserKycInformationMutation,
  useReviewKycSubmissionMutation,
} = userApi;
