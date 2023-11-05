// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LoginUserInfo,
  RegisterUserInfo,
  ResponseLogin,
  ResponseRegister,
} from "../../shared/type";

// Define a service using a base URL and expected endpoints
export const contactApi = createApi({
  reducerPath: "contactApi",

  tagTypes: ["contact"],

  baseQuery: fetchBaseQuery({
    baseUrl: " https://contact-app.mmsdev.site/api/v1/",
  }),

  endpoints: (builder) => ({
    createRegister: builder.mutation<ResponseRegister, RegisterUserInfo>({
      query: (userInfo) => ({
        url: `register`,
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["contact"],
    }),

    createLogin: builder.mutation<ResponseLogin, LoginUserInfo>({
      query: (userInfo) => ({
        url: `login`,
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["contact"],
    }),
    // user-logout
    userLogout: builder.mutation({
      query: (token) => ({
        url: `user-logout`,
        headers: { authorization: `Bearer ${token}` },
        method: "POST",
      }),
      invalidatesTags: ["contact"],
    }),

    // password change
    passwordChange: builder.mutation({
      query: ({ token, data }) => ({
        url: `change-password`,
        headers: { authorization: `Bearer ${token}` },
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contact"],
    }),

    contacts: builder.query({
      query: (token) => ({
        url: `contact`,
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["contact"],
    }),

    getContact: builder.query({
      query: ({ token, id }) => ({
        url: `contact/${id}`,
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["contact"],
    }),

    getProfile: builder.query({
      query: (token) => ({
        url: `user-profile`,
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["contact"],
    }),

    update: builder.mutation({
      query: ({ data, token, id }) => ({
        url: `contact/${id}`,
        method: "PUT",
        headers: { authorization: `Bearer ${token}` },
        body: data,
      }),
      invalidatesTags: ["contact"],
    }),

    deleteContact: builder.mutation({
      query: ({ token, id }) => ({
        url: `contact/${id}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      }),
    }),

    createContact: builder.mutation<ResponseLogin, unknown>({
      query: ({ data, token }) => ({
        url: `contact`,
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: data,
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateRegisterMutation,
  useCreateLoginMutation,
  useUserLogoutMutation,
  useCreateContactMutation,
  usePasswordChangeMutation,
  useUpdateMutation,
  useGetProfileQuery,
  useGetContactQuery,
  useContactsQuery,
  useDeleteContactMutation,
} = contactApi;
