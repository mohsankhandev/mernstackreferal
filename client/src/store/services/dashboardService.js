import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const dashboardService = createApi({
    reducerPath: 'userdashboard',
    tagTypes: 'userdashboard',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/',
        prepareHeaders: (headers, {getState}) => {
            const reducers = getState();
            console.log("reducers",reducers)
            const token = reducers?.authReducer?.userToken;
            console.log(token)
            headers.set('authorization', token ? `Bearer ${token}` : '');
            return headers;
        }
    }),
    endpoints: (builder) => {
        return {
        

//coming from depositg component 2

            updateProductdp: builder.mutation({
                query: data => {
                    return {
                       url: '/productdp',
                       method: 'PUT',
                       body: data
                    }
                },
                invalidatesTags: ['userdashboard']
            }),   
 
            //coming from withdraw componnent  page 3
            updateUserdeposit: builder.mutation({
                query: data => {
                    return {
                       url: '/updateuserdeposit',
                       method: 'PUT',
                       body: data
                    }
                },
                invalidatesTags: ['userdashboard']
            }),




//coming from user dashboard componennt 1
            getProductsforref: builder.query({
                query: (refcode) => {
                 return {
                     url: `/productsforref/${refcode}`,
                     method: 'GET'
                 }
                },
                providesTags: ['products']
            }),

// get user for  withdraw page from user dashboard 4
            getuserdepandwit: builder.query({
                query: (refcode) => {
                 return {
                     url: `/getuserdepandwit/${refcode}`,
                     method: 'GET'
                 }
                },
                providesTags: ['products']
            }),


         

        }
    }
})
export const {useCProductMutation, useDeleteProductMutation,useUpdateUserdepositMutation ,useUpdateProductdpMutation, useUpdateProductMutation,useGetuserdepandwitQuery ,useGetProductsQuery,useGetProductspdQuery, useGetProductspdspotQuery,useGetProductsforrefQuery, useGetProductQuery,useGetUseralldatasearchQuery} = dashboardService;
export default dashboardService