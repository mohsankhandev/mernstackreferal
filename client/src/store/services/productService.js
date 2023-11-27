import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const productService = createApi({
    reducerPath: 'products',
    tagTypes: 'products',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/',
        prepareHeaders: (headers, {getState}) => {
            const reducers = getState();
            const token = reducers?.authReducer?.adminToken;
            console.log(token)
            headers.set('authorization', token ? `Bearer ${token}` : '');
            return headers;
        }
    }),
    endpoints: (builder) => {
        return {
            cProduct: builder.mutation({
                query: (data) => {
                   return {
                       url: '/create-product',
                       method: 'POST',
                       body: data
                   }
                },
                invalidatesTags: ['products']
            }),
            updateProduct: builder.mutation({
                query: data => {
                    return {
                       url: '/product',
                       method: 'PUT',
                       body: data
                    }
                },
                invalidatesTags: ['products']
            }),



            // updateProductdp: builder.mutation({
            //     query: data => {
            //         return {
            //            url: '/productdp',
            //            method: 'PUT',
            //            body: data
            //         }
            //     },
            //     invalidatesTags: ['products']
            // }),   
            
            // updateUserdeposit: builder.mutation({
            //     query: data => {
            //         return {
            //            url: '/updateuserdeposit',
            //            method: 'PUT',
            //            body: data
            //         }
            //     },
            //     invalidatesTags: ['products']
            // }),



            deleteProduct: builder.mutation({
                query: id => {
                    return {
                        url: `/delete/${id}`,
                        method: 'DELETE'
                    }
                },
                invalidatesTags: ['products']
            }),


            //coming from admin dashboard from pendingwithdrawlist ompo to change user withdraw status
            withdrawstatuscg: builder.mutation({
                query: data => {
                    return {
                        url: `/withdrawstatuscgro`,
                        method: 'PUT',
                        body: data
                    }
                },
                invalidatesTags: ['products']
            }),


            // depositstatuscgro


              //coming from admin dashboard from pendingdeposit ompo to change user deposit status
              depositstatuscg: builder.mutation({
                query: data => {
                    return {
                        url: `/depositstatuscgro`,
                        method: 'PUT',
                        body: data
                    }
                },
                invalidatesTags: ['products']
            }),

            getProducts: builder.query({
                query: (page) => {
                 return {
                     url: `/products/${page}`,
                     method: 'GET'
                 }
                },
                providesTags: ['products']
            }),



                 getProductspd: builder.query({
                query: (page) => {
                 return {
                    
                     url: `/productspdeposit/${page}`,
                     method: 'GET'
                 }
                },
                providesTags: ['products']
            }),


            // getpddespot

            getProductspdspot: builder.query({
                query: (page) => {
                 return {
                    
                     url: `/productspdspot/${page}`,
                     method: 'GET'
                 }
                },
                providesTags: ['products']
            }),


            // getProductsforref: builder.query({
            //     query: (refcode) => {
            //      return {
            //          url: `/productsforref/${refcode}`,
            //          method: 'GET'
            //      }
            //     },
            //     providesTags: ['products']
            // }),

// get user for deposit and withdraw page from user dashboard
            // getuserdepandwit: builder.query({
            //     query: (refcode) => {
            //      return {
            //          url: `/getuserdepandwit/${refcode}`,
            //          method: 'GET'
            //      }
            //     },
            //     providesTags: ['products']
            // }),


            getProduct: builder.query({
                query: id => {
                return {
                    url: `/product/${id}`,
                    method: 'GET'
                }
                },
                providesTags: ['products']
            }),

            //start user data search from data base using SearchUserdata.js component 


            
            getUseralldatasearch: builder.query({
                query: (email) => {
                 return {
                    
                     url: `/user/search/${email}`,
                     method: 'GET'
                 }
                },
                // providesTags: ['products']
            }),

            //start user data search from data base using SearchUserdata.js component 

        }
    }
})

// useGetProductsforrefQuery    ,useUpdateProductdpMutation useUpdateUserdepositMutation useGetuserdepandwitQuery
export const {useCProductMutation, useDeleteProductMutation,useDepositstatuscgMutation ,useWithdrawstatuscgMutation, useUpdateProductMutation ,useGetProductsQuery,useGetProductspdQuery, useGetProductspdspotQuery, useGetProductQuery,useGetUseralldatasearchQuery} = productService;
export default productService