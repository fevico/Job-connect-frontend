// src/service/dummyData.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { useDispatch } from "react-redux";
import { clearCredentials, setCredentials } from "./slices/authSlice";
import { clearUserInfo } from "./slices/userSlice";
import { setUserInfo } from "./slices/userSlice";
import { jwtDecode } from "jwt-decode";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000/api/",
  baseUrl: "http://localhost:3000/",
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Token ${token}`);
    }
    return headers;
  },
  // Custom response handler to handle text responses
  async responseHandler(response) {
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  },
});

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:3000/",
//   prepareHeaders: (headers, { getState }) => {
//     headers.set("Content-Type", "application/json");
//     const token = getState().auth.token;
//     if (token) {
//       headers.set("Authorization", `Token ${token}`);
//     }
//     return headers;
//   },
// });

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery,
  endpoints: (builder) => ({
    // getAllProduct: builder.query({
    //   query: () => "/products",
    // }),
    //     getOneProduct: builder.query({
    //       query: (id) => `products/${id}`,
    //     }),
    //     addProduct: builder.mutation({
    //       query: (newProduct) => ({
    //         url: `products/add`,
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: newProduct,
    //       }),
    //     }),
    //     updateProduct: builder.mutation({
    //       query: ({ id, updatedProduct }) => ({
    //         url: `products/${id}`,
    //         method: "PUT",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: updatedProduct,
    //       }),
    //     }),
    // getProfile: builder.query({
    //   query: () => ({ url: "/profile", method: "GET" }),
    //   async onQueryStarted(_, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       dispatch(setUserInfo(data));
    //     } catch (error) {
    //       console.error("Failed to fetch profile:", error);
    //     }
    //   },
    // }),
    // editProfile: builder.mutation({
    //   query: (updatedProfile) => ({
    //     url: `edit_account`,
    //     method: "POST",
    //     body: updatedProfile,
    //   }),
    //   onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
    //     try {
    //       const { data } = await queryFulfilled;
    //       // const response = await queryFulfilled;

    //       dispatch(setUserInfo(data));
    //       console.log("update successful:", data);
    //     } catch (err) {
    //       console.error("update failed:", err);
    //     }
    //   },
    // }),

    // editWidgetConfig: builder.mutation({
    //   query: (updatedConfig) => ({
    //     url: `edit_widget_config`,
    //     method: "POST",
    //     body: updatedConfig,
    //   }),
    //   onQueryStarted: async (arg, { queryFulfilled }) => {
    //     try {
    //       await queryFulfilled;

    //       // const { data } = await queryFulfilled;
    //       // console.log("update widget config successful:");
    //     } catch (err) {
    //       console.error("save failed:", err);
    //     }
    //   },
    // }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const token = response.data; // Assuming the response data is the JWT

          const decodedToken = jwtDecode(token);

          // Extract required fields from the decoded token
          const { name, email, isAdmin, _id } = decodedToken;

          // Dispatch actions with decoded data
          dispatch(setCredentials({ token }));
          dispatch(setUserInfo({ name, email, isAdmin, _id }));

          // console.log("Login successful:");
        } catch (err) {
          console.error("Login failed:", err);
        }
      },
    }),

    register: builder.mutation({
      query: (credentials) => ({
        url: "/user/register",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          // console.log("registered");
          const response = await queryFulfilled;
          console.log(response);
        } catch (err) {
          console.error("Register failed:", err);
        }
      },
    }),

    // logout: builder.mutation({
    //   queryFn: () => ({ data: null }), // No API call, just return success
    //   onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
    //     try {
    //       await queryFulfilled;
    //       dispatch(clearCredentials());
    //       dispatch(clearUserInfo());
    //     } catch (err) {
    //       console.error("Logout failed:", err);
    //     }
    //   },
    // }),
    // getAllQuestionnaires: builder.query({
    //   query: () => "categories",
    // }),
    // getAllClients: builder.query({
    //   query: () => "clients",
    // }),

    // markAsHomeWork: builder.mutation({
    //   query: ({ code, credential }) => ({
    //     url: `/categories/${code}/mark_as_homework`,
    //     method: "POST",
    //     body: credential,
    //   }),
    //   onQueryStarted: async (arg, { queryFulfilled }) => {
    //     try {
    //       await queryFulfilled;
    //     } catch (err) {
    //       console.error("Register failed:", err);
    //     }
    //   },
    // }),
    // generateAiClinicalNote: builder.mutation({
    //   query: (credentials) => ({
    //     url: "get_ai_clinical_recommendation",
    //     method: "POST",
    //     body: credentials,
    //   }),
    //   onQueryStarted: async (arg, { queryFulfilled }) => {
    //     try {
    //       await queryFulfilled;
    //     } catch (err) {
    //       console.error("Text generate failed:", err);
    //     }
    //   },
    // }),
    // addNote: builder.mutation({
    //   query: ({ client, credentials }) => ({
    //     url: `clients/${client}/generate_client_clinical_recommendation_note`,
    //     method: "POST",
    //     body: credentials,
    //   }),
    //   onQueryStarted: async (arg, { queryFulfilled }) => {
    //     try {
    //       await queryFulfilled;
    //     } catch (err) {
    //       console.error("Register failed:", err);
    //     }
    //   },
    // }),
    // getAllNotes: builder.mutation({
    //   query: ({ client }) => ({
    //     url: `clients/${client}/get_client_clinical_notes`,
    //     method: "GET",
    //   }),
    //   onQueryStarted: async (arg, { queryFulfilled }) => {
    //     try {
    //       await queryFulfilled;
    //     } catch (err) {
    //       console.error("fetch failed:", err);
    //     }
    //   },
    // }),
    // editNote: builder.mutation({
    //   query: ({ credentials }) => ({
    //     url: `clients/${credentials.pk}/edit_client_clinical_notes`,
    //     method: "POST",
    //     body: credentials,
    //   }),
    //   onQueryStarted: async (arg, { queryFulfilled }) => {
    //     try {
    //       await queryFulfilled;
    //     } catch (err) {
    //       console.error("fetch failed:", err);
    //     }
    //   },
    // }),
    // deleteNote: builder.mutation({
    //   query: ({ credentials }) => ({
    //     url: `clients/${credentials.pk}/delete_client_clinical_notes`,
    //     method: "POST",
    //     body: credentials,
    //   }),
    //   onQueryStarted: async (arg, { queryFulfilled }) => {
    //     try {
    //       await queryFulfilled;
    //     } catch (err) {
    //       console.error("fetch failed:", err);
    //     }
    //   },
    // }),
  }),
});

export const {
  // useGetAllQuestionnairesQuery,
  // useGetAllClientsQuery,
  // useMarkAsHomeWorkMutation,
  // useEditProfileMutation,
  // useEditWidgetConfigMutation,
  // useGetProfileQuery,
  // useGetAllNotesMutation,
  useLoginMutation,
  useRegisterMutation,
  useGetAllProductQuery,
  // useLogoutMutation,
  // useGenerateAiClinicalNoteMutation,
  // useAddNoteMutation,
  // useEditNoteMutation,
  // useDeleteNoteMutation,
} = productsApi;
