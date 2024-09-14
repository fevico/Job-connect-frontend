import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUserInfo } from "./slices/userSlice";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000/",
  baseUrl: "https://jobkonnecta.com/api/",
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    const token = Cookies.get("authToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  // Custom response handler to handle text responses
  async responseHandler(response) {
    const text = await response.text();
    try {
      const jsonResponse = JSON.parse(text);
      // console.log(jsonResponse)
      // Check for token expiration
      if (jsonResponse && jsonResponse.message === "Token has expired") {
        // Handle expired token here, e.g., clear credentials and user info
        // You can dispatch actions or handle the logic here
        Cookies.remove("authToken");
        window.location.href = "/login";
        // Optionally, you might want to redirect the user to the login page or show a message
        // For example: window.location.href = '/login';
      }

      return jsonResponse;
    } catch {
      return text; // If JSON parsing fails, return the raw text
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
  tagTypes: ["AllUsers"],
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: () => "job/all-jobs",
    }),
    getAllAppliedJobs: builder.query({
      query: () => "job/get-applied-jobs",
    }),
    getAllJobsByEmployer: builder.query({
      query: (id) => `job/get-jobs-by-employer/${id}`,
    }),
    getAllPackages: builder.query({
      query: () => `product/user/product`,
    }),
    getAllPackagesGlobal: builder.query({
      query: () => `product/all`,
    }),
    getBalance: builder.query({
      query: () => `wallet/get-balance`,
    }),
    getBank: builder.query({
      query: () => `wallet/get-bank-list`,
    }),
    getBankAccountName: builder.query({
      query: ({ bank_code, account_number }) =>
        `wallet/get-account-name?bank_code=${bank_code}&account_number=${account_number}`,
    }),
    withdraw: builder.mutation({
      query: ({
        bank_code,
        account_number,
        narration,
        amount,
        name_enquiry_reference,
      }) => ({
        url: `wallet/bank-transfer?bank_code=${bank_code}&account_number=${account_number}&narration=${narration}&amount=${amount}&name_enquiry_reference=${name_enquiry_reference}`,
        method: "POST",
        body: {
          bank_code,
          account_number,
          narration,
          amount,
          name_enquiry_reference,
        },
      }),
    }),

    getSuccessfulOrders: builder.query({
      query: (productId) => `payment/get-successful-orders/${productId}`,
    }),
    getAllOrders: builder.query({
      query: () => `payment/all-orders`,
    }),
    getUserOrders: builder.query({
      query: () => `payment/user-orders`,
    }),
    getJobApp: builder.query({
      query: (id) => `job/get-applications-by-job/${id}`,
    }),

    getAllCategory: builder.query({
      query: () => "category/all",
    }),
    getAllUsers: builder.query({
      query: () => "user/all-users",
      providesTags: ["AllUsers"],
    }),
    getVerifyPayment: builder.query({
      query: (reference) => `payment/verify-payment/${reference}`,
    }),
    addJob: builder.mutation({
      query: (credentials) => ({
        url: `job/create`,
        method: "POST",
        body: credentials,
      }),

      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.error(" failed to create job:", err);
        }
      },
    }),
    addPackage: builder.mutation({
      query: (credentials) => ({
        url: `product/create`,
        method: "POST",
        body: credentials,
      }),

      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.error(" failed to create job:", err);
        }
      },
    }),
    hire: builder.mutation({
      query: ({ data, id }) => ({
        url: `job/hire-applicant/${id}`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.error(" failed to hire:", err);
        }
      },
    }),
    sendCV: builder.mutation({
      query: (data) => ({
        url: `/product/upload-cv`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.error(" failed to upload cv:", err);
        }
      },
    }),
    applyJob: builder.mutation({
      query: (credentials) => ({
        url: `job/apply-job`,
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.error("failed to apply job:", err);
        }
      },
    }),
    shareJob: builder.mutation({
      query: (data) => ({
        url: `referal/refer-candidate`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.error("failed to apply job:", err);
        }
      },
    }),
    payment: builder.mutation({
      query: (credentials) => ({
        url: `payment/create-payment`,
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.error("failed to pay for service:", err);
        }
      },
    }),
    // verifyPayment: builder.mutation({
    //   query: ({credentials, reference}) => ({
    //     url: `payment/verify-payment/${reference}`,
    //     method: "POST",
    //     body: credentials,
    //   }),
    //   onQueryStarted: async (arg, { queryFulfilled }) => {
    //     try {
    //       await queryFulfilled;
    //     } catch (err) {
    //       console.error(" failed to verify payment:", err);
    //     }
    //   },
    // }),

    suspend: builder.mutation({
      query: (credentials) => ({
        url: `user/suspend`,
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.error("failed:", err);
        }
      },
      invalidatesTags: ["AllUsers"],
    }),
    // getOneProduct: builder.query({
    //       query: (id) => `products/${id}`,
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
  useWithdrawMutation,
  useRegisterMutation,
  useGetAllJobsQuery,
  useGetSuccessfulOrdersQuery,

  useGetAllAppliedJobsQuery,
  useGetAllCategoryQuery,
  useGetAllUsersQuery,
  useGetAllJobsByEmployerQuery,
  useGetJobAppQuery,
  useAddJobMutation,
  useAddPackageMutation,
  useHireMutation,
  useSendCVMutation,
  useGetVerifyPaymentQuery,
  useApplyJobMutation,
  useShareJobMutation,
  usePaymentMutation,
  useSuspendMutation,
  useGetAllPackagesQuery,
  useGetAllPackagesGlobalQuery,
  useGetBalanceQuery,
  useGetBankQuery,
  useLazyGetBankAccountNameQuery,

  // untreated
  useGetAllOrdersQuery,
  useGetUserOrdersQuery,
} = productsApi;
