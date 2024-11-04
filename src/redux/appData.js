import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUserInfo } from "./slices/userSlice";
import { setCredentials } from "./slices/authSlice";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000/",
   baseUrl: "https://jobkonnecta.com/api/",
  prepareHeaders: (headers) => {
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
  tagTypes: [
    "AllUsers",
    "AllJobApp",
    "Messages",
    "Jobs",
    "UnApprovedUsers",
    "Rating",
  ],
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: () => "job/all-jobs",
    }),
    getAllAppliedJobs: builder.query({
      query: () => "job/get-applied-jobs",
    }),
    getAllJobsByEmployer: builder.query({
      query: (id) => `job/get-jobs-by-employer/${id}`,
      providesTags: ["Jobs"],
    }),
    getRating: builder.query({
      query: (id) => `review/get-rating/${id}`,
      providesTags: ["Rating"],
    }),

    addRating: builder.mutation({
      query: ({ credentials, ownerId }) => ({
        url: `review/add-rating/${ownerId}`,
        method: "POST",
        body: credentials,
      }),

      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.error(" failed to add rating:", err);
        }
      },
      invalidatesTags: ["Rating"],
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
    getAdminBalance: builder.query({
      query: () => `payment/total-sales`,
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
    getEmployerPlan: builder.query({
      query: () => `user/plan`,
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
      providesTags: ["AllJobApp"],
    }),

    getAllCategory: builder.query({
      query: () => "category/all",
    }),
    getAllUsers: builder.query({
      query: () => "user/all-users",
      providesTags: ["AllUsers"],
    }),
    getAllMessages: builder.query({
      query: () => "contact/messages",
      providesTags: ["Messages"],
    }),
    updateMessage: builder.mutation({
      query: ({ credentials, contactId }) => ({
        url: `contact/${contactId}`,
        method: "PATCH",
        body: credentials,
      }),

      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.error(" failed to update message status:", err);
        }
      },
      invalidatesTags: ["Messages"],
    }),
    getVerifyPayment: builder.query({
      query: (reference) => `payment/verify-payment/${reference}`,
    }),
    getSubscriptionVerifyPayment: builder.query({
      query: (reference) => `subscription/verify-payment/${reference}`,
    }),
    getUnapprovedUsers: builder.query({
      query: () => `user/all-unapproved-users`,
      providesTags: ["UnApprovedUsers"],
    }),
    getMyReferals: builder.query({
      query: () => `referal/user-referrals`,
    }),

    approveUser: builder.mutation({
      query: (credentials) => ({
        url: `user/approve-user`,
        method: "POST",
        body: credentials,
      }),

      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.error(" failed to uapprove:", err);
        }
      },
      invalidatesTags: ["UnApprovedUsers"],
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
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `job/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.error(" failed to delete job:", err);
        }
      },
      invalidatesTags: ["Jobs"],
    }),
    updateJob: builder.mutation({
      query: ({ updatedJob, id }) => ({
        url: `job/${id}`,
        method: "PATCH",
        body: updatedJob,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.error(" failed to update job:", err);
        }
      },
      invalidatesTags: ["Jobs"],
    }),
    shortlist: builder.mutation({
      query: ({ data, id }) => ({
        url: `job/shortlist-application/${id}`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.error(" failed to shortlist:", err);
        }
      },
      invalidatesTags: ["AllJobApp"],
    }),
    reject: builder.mutation({
      query: ({ data, id }) => ({
        url: `job/reject-application/${id}`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.error(" failed to reject:", err);
        }
      },
      invalidatesTags: ["AllJobApp"],
    }),
    sendMessage: builder.mutation({
      query: (credentials) => ({
        url: `contact/send-message`,
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
    // addRating: builder.mutation({
    //   query: ({ data, owner }) => ({
    //     url: `user/add-rating/${owner}`,
    //     method: "POST",
    //     body: data,
    //   }),
    //   onQueryStarted: async (arg, { queryFulfilled }) => {
    //     try {
    //       await queryFulfilled;
    //     } catch (err) {
    //       console.error(" failed to shortlist:", err);
    //     }
    //   },
    //   invalidatesTags: ["AllJobApp"],
    // }),
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
    subscribe: builder.mutation({
      query: (credentials) => ({
        url: `subscription/purchase`,
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.error("failed to pay for subscription:", err);
        }
      },
    }),

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
  }),
});

export const {
  useLoginMutation,
  useWithdrawMutation,
  useRegisterMutation,
  useGetAllJobsQuery,
  useGetSuccessfulOrdersQuery,

  useGetAllAppliedJobsQuery,
  useGetAllCategoryQuery,
  useGetAllUsersQuery,
  useGetAllMessagesQuery,
  useGetAllJobsByEmployerQuery,
  useGetJobAppQuery,
  useAddJobMutation,
  useAddPackageMutation,
  useHireMutation,
  useShortlistMutation,
  useRejectMutation,
  useSendCVMutation,
  useGetSubscriptionVerifyPaymentQuery,
  useGetVerifyPaymentQuery,
  useApplyJobMutation,
  useShareJobMutation,
  usePaymentMutation,
  useSubscribeMutation,
  useSendMessageMutation,
  useSuspendMutation,
  useGetAllPackagesQuery,
  useGetAllPackagesGlobalQuery,
  useGetBalanceQuery,
  useGetAdminBalanceQuery,
  useGetEmployerPlanQuery,
  useGetBankQuery,
  useLazyGetBankAccountNameQuery,
  useGetMyReferalsQuery,
  useUpdateMessageMutation,

  useGetUnapprovedUsersQuery,
  useApproveUserMutation,
  useDeleteJobMutation,
  useUpdateJobMutation,
  useGetRatingQuery,
  useAddRatingMutation,

  // untreated
  useGetAllOrdersQuery,
  useGetUserOrdersQuery,
} = productsApi;
