import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const authService = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/'
    }),
    endpoints: (builder) => {
       return {
           authLogin: builder.mutation({
               query: (loginData) => {
                   return {
                       url: '/adminvbc',
                       method: 'POST',
                       body: loginData
                   }
               }
           }),
           //user registration
           userRegister: builder.mutation({
            query: data => {
                return {
                    url: '/register',
                    method: 'POST',
                    body: data
                }
            }
           }),
           userLogin: builder.mutation({
            query: loginData => {
                return {
                    url: '/login',
                    method: 'POST',
                    body: loginData
                }
            }
           }),

           //
        //    forgetPassword
        forgetPassword: builder.mutation({
            query: loginData => {
                return {
                    url: '/forgot-password',
                    method: 'POST',
                    body: loginData
                }
            }
           }),
           //

           //reset password
            //    forgetPassword
        restPassword: builder.mutation({
            query: loginData => {
                return {
                    url: '/reset-password',
                    method: 'POST',
                    body: loginData
                }
            }
           })
           //
           //
       }
    }
});
export const {useAuthLoginMutation, useUserRegisterMutation,useRestPasswordMutation,useForgetPasswordMutation, useUserLoginMutation} = authService
export default authService