import {useEffect, useState} from "react"
import { Link, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import toast, { Toaster } from 'react-hot-toast';
import { clearMessage } from "../../store/reducers/globalReducer";
import Wrapper from "./Wrapper"
import { useGetProductsQuery,useGetProductspdQuery, useDeleteProductMutation, useCProductMutation } from "../../store/services/productService";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";



const Pendingdp = () => {
   let {page} = useParams();
   if(!page) {
      page = 1;
   }


   const [state,setState]=useState({});


   const {data = [], isFetching} = useGetProductspdQuery(page);
   console.log("data from backend for pending dp",data);
   const {success} = useSelector(state => state.globalReducer);
    const dispatch = useDispatch();
    useEffect(() => {
     if(success) {
       toast.success(success);
     }
     return () => {
        dispatch(clearMessage())
     }
    }, [])
    const [delProduct, response] = useDeleteProductMutation();
    
    const deleteProduct = id => {
      if(window.confirm("Are you really want to delete this product?")) {
          delProduct(id);
      }
    }

    const [createNewProduct,] = useCProductMutation();
    console.log("dgasfgasdhgfasdjhgfjasdg")

    const updateDailyROI = async () => {
      try {
        // Trigger the backend route to update daily ROI
        createNewProduct(state)
            
      //   await axios.post('/users/update-daily-roi');
        alert('Daily ROI updated successfully');
        // Refresh user data after the update
      //   fetchUsers();
      } catch (error) {
        console.error('Error updating daily ROI:', error);
      }
    };









    return(
       <Wrapper>
         <ScreenHeader>
          <Link to="/dashboard/create-product" className="btn-dark">create product</Link>
          <Toaster position="top-right" />
          </ScreenHeader>

          <div >
          <button className="bg-red-700 text-2xl text-white p-2 mb-2"  onClick={updateDailyROI}>Update Daily ROI</button>
          {/* <ul>
            {data?.products?.map((user) => (
              <li key={user._id}>{`User ID: ${user._id}, Investment: $${user.activedeposit}, ROI: ${user.dailyroi}%`}</li>
            ))}
          </ul> */}
        </div>     




          {!isFetching ? data?.products?.length > 0 ? <div>
            <table className="w-full bg-gray-900 rounded-md">
            <thead>
                    <tr className="border-b border-gray-800 text-left">
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">name</th>
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">emil</th>
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">Phone</th>

                       <th className="p-3 uppercase text-sm font-medium text-gray-500">Wallet Adddress</th>
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">TRX Hash</th>
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">Deposit Amount</th>
                       {/* <th className="p-3 uppercase text-sm font-medium text-gray-500">Balance</th> */}
                       {/* <th className="p-3 uppercase text-sm font-medium text-gray-500">Total Withdraw</th> */}
                       {/* <th className="p-3 uppercase text-sm font-medium text-gray-500">Pending Withdraw</th> */}
                       {/* <th className="p-3 uppercase text-sm font-medium text-gray-500">Referal Commison</th> */}
                       {/* <th className="p-3 uppercase text-sm font-medium text-gray-500">Total Referal</th> */}
                    </tr>
                 </thead>
                 <tbody>
                  {data?.products?.map(product => (
                     <tr className="odd:bg-gray-800" key={product._id}>
                        <td className="p-3 capitalize text-sm font-normal text-gray-400">{product.name}</td>
                        <td className="p-3 capitalize text-sm font-normal text-gray-400">{product.email}</td>
                        <td className="p-3 capitalize text-sm font-normal text-gray-400">{product.phonenm}</td>


                        
                        <td className="p-3 capitalize text-sm font-normal text-gray-400">{product.udtwalletadres}</td>
                        <td className="p-3 capitalize text-sm font-normal text-gray-400">{product.transationhashvbv}</td>
                        <td className="p-3 bg-red-700 capitalize text-sm font-normal text-gray-400">{product.pendingdp}</td>
                        {/* <td className="p-3 capitalize text-sm font-normal text-gray-400">{product.withdraw}</td> */}
                        {/* <td className="p-3 capitalize text-sm font-normal text-gray-400">{product.totalwithdraw}</td> */}
                        {/* <td className="p-3 capitalize text-sm font-normal text-gray-400">{product.pendingwithdraw}</td> */}
                        {/* <td className="p-3 capitalize text-sm font-normal text-gray-400">{product.referalcommison}</td> */}
                        {/* <td className="p-3 capitalize text-sm font-normal text-gray-400">{product.totalreferal}</td> */}

                        {/* <td className="p-3 capitalize text-sm font-normal text-gray-400">
                           <img src={`/images/${product.image1}`} alt="image name" className="w-20 h-20 rounded-md object-cover" />
                        </td> */}
                        <td className="p-3 capitalize text-sm font-normal text-gray-400"><Link to={`/dashboard/edit-product/${product._id}`} className="btn btn-warning">edit</Link></td>



                        <td className="p-3 capitalize text-sm font-normal text-gray-400" >Update Daily ROI</td>





                        <td className="p-3 capitalize text-sm font-normal text-gray-400"><span className="btn btn-danger cursor-pointer" onClick={() => deleteProduct(product._id)}>delete</span></td>
                     </tr>
                  ))}
                 </tbody>
            </table>
            {/* <Pagination page={parseInt(page)} perPage={data.perPage} count={data.count} path="dashboard/products" /> */}
          </div>
          
          
   
          
          
          
          
          
          
          
          
          
          
          
          
          
          : 'No products!' : <Spinner />}
       </Wrapper>
    )
}
export default Pendingdp;