import {useEffect, useState} from "react"
import { Link, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import toast, { Toaster } from 'react-hot-toast';
import { clearMessage } from "../../store/reducers/globalReducer";
import Wrapper from "./Wrapper"
import { useGetProductsQuery, useGetProductspdspotQuery,useDeleteProductMutation, useCProductMutation,useGetUseralldatasearchQuery, useGetProductsforrefQuery } from "../../store/services/productService";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";


// useGetProductsforrefQuery
const SearchUserdata = () => {


//query for just signle user get 
    const [email, setEmail] = useState('');
    const [refref, setRefref] = useState();

    const { data, error, isLoading,isFetching} = useGetUseralldatasearchQuery(email);
  
    console.log("1signe user data from data",data)
    console.log("2signe user data from what error",error)
    console.log("3signe user data from what loading",isLoading)
    // let refcode =data?.referralCode  || "not  A TOLL"

  // const {dataforref = [], error:erm, isLoading:erc, isFetching} = useGetProductsforrefQuery(data?.referralCode);
  // console.log("4user referal list from admin",dataforref)
  // console.log("5user referal list from admin error",erm)
  // console.log("6user referal list from admin isloading ",erc)

  const handleSearch = async () => {
    // This will trigger the query with the provided email
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleBlur = () => {
    // Trigger the API call when the user leaves the email input field
    handleSearch();
  };



  const formatDate = (date) => {
    // Convert the MongoDB Date object to a formatted string
    return new Date(date).toLocaleString();
  };


  useEffect(() => {

    if (!isLoading) {
   
      setRefref(data)  }
}, [refref]);


    return(
       <Wrapper>
         {/* <ScreenHeader>
          <Link to="/dashboard/create-product" className="btn-dark">create product</Link>
          <Toaster position="top-right" />
          </ScreenHeader> */}

    {/* <input
        type="email"
        value={email}
        className="text-black"
        onChange={(e) => setEmail(e.target.value)}
      /> */}

<input type="email"  className="text-black w-full p-4 rounded-md " placeholder="search user with email" value={email} onChange={handleEmailChange} onBlur={handleBlur} />

      <button className="bg-blue-600 text-white px-8 py-4  rounded-md  hover:bg-red-500 mt-2" onClick={handleSearch} >
        Search
      </button>



      {isLoading && <p>Loading...</p>}
      {data && (
        <div>
          <h2>User Details:</h2>
          <p>Email: {data.email}</p>
          {/* Display other user details as needed */}
        </div>
      )}
      {error && <p className="bg-red-600 p-4 mt-2">Error: {error.data.message}</p>}

      {/* {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>} */}

      {/* <ul>
        {data?.users > 0 && dataf?.users.map((user) => (
          <li key={user._id}>{user.name} - {user.email}</li>
        ))}
      </ul> */}




          {data?.users && (  <div>
            <table className="w-full bg-gray-900 rounded-md">
            <thead>
                    <tr className="border-b border-gray-800 text-left">
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">name</th>
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">emil</th>
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">Phone</th>

                       <th className="p-3 uppercase text-sm font-medium text-gray-500">Total Deposit</th>
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">Active Deposit</th>
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">Daily Profit</th>
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">Balance</th>
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">Total Withdraw</th>
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">Pending Withdraw</th>
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">Referal Commison</th>
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">Total Referal</th>
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">Regier Date</th>

                    </tr>
                 </thead>
                 <tbody>
                  {/* {data?.responce?.map(product => ( */}
                     <tr className="odd:bg-gray-800" key={data._id}>
                        <td className="p-3 capitalize text-sm font-normal text-gray-400">{data.name}</td>
                        <td className="p-3 capitalize text-sm font-normal text-gray-400">{data.email}</td>
                        <td className="p-3 capitalize text-sm font-normal text-gray-400">{data.phonenm}</td>


                        
                        <td className="p-3 capitalize text-sm font-normal text-gray-400">{data.totaldeposit}</td>
                        <td className="p-3 capitalize text-sm font-normal text-gray-400">{data.activedeposit}</td>
                        <td className="p-3 capitalize text-sm font-normal text-gray-400">{data.dailyroi}</td>
                        <td className="p-3 capitalize text-sm font-normal text-gray-400">{data.withdraw}</td>
                        <td className="p-3 capitalize text-sm font-normal text-gray-400">{data.totalwithdraw}</td>
                        <td className="p-3 bg-red-700 capitalize text-sm font-normal text-gray-400">{data.pendingwithdraw}</td>
                        <td className="p-3 capitalize text-sm font-normal text-gray-400">{data.referalcommison}</td>
                        <td className="p-3 capitalize text-sm font-normal text-gray-400">{data.totalreferal}</td>
                        <td className="p-3 capitalize text-sm font-normal text-gray-400">{formatDate(data.createdAt)}</td>

                       
                        {/* <td className="p-3 capitalize text-sm font-normal text-gray-400"><Link to={`/dashboard/edit-product/${product._id}`} className="btn btn-warning">edit</Link></td> */}



                        {/* <td className="p-3 capitalize text-sm font-normal text-gray-400" >Update Daily ROI</td> */}





                        {/* <td className="p-3 capitalize text-sm font-normal text-gray-400"><span className="btn btn-danger cursor-pointer" onClick={() => deleteProduct(product._id)}>delete</span></td> */}
                     </tr>
                  {/* ))} */}
                 </tbody>
            </table>
          </div>)}
  
          {/* : 'No products!' : <Spinner />} */}


                    

        

          {data &&  <div className="bg-yellow-300 text-black w-full p-4 flex items-start gap-3 flex-col justify-evenly rounded-lg">
                  <h1 className="text-2xl font-semibold  ">User Complete DATA</h1>
                  <div className="w-full flex flex-row  bg-green-500 p-4  ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">1 : Name</h1>
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">{data?.users.name}</h1>

                  </div>

                  <div className="w-full flex flex-row justify-between bg-green-500 p-4  ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">2 : Email</h1>
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">{data?.users.email}</h1>

                  </div>

                  <div className="w-full flex flex-row justify-between bg-green-500 p-4  ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">3 : Phone</h1>
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">{data?.users.phonenm}</h1>

                  </div>

                  <div className="w-full flex flex-row justify-between bg-green-500 p-4  ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">4 : Total Deposit</h1>
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">{data?.users.totaldeposit}</h1>

                  </div>

                  <div className="w-full flex flex-row justify-between bg-green-500 p-4  ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">5 : Active Deposit</h1>
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">{data?.users.activedeposit}</h1>

                  </div>

                  <div className="w-full flex flex-row justify-between bg-green-500 p-4  ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">6 : Daily Roi</h1>
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">{data?.users.dailyroi}</h1>

                  </div>

                  <div className="w-full flex flex-row justify-between bg-green-500 p-4  ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">7 : Withdraw</h1>
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">{data?.users.withdraw}</h1>

                  </div>

                  
                  <div className="w-full flex flex-row justify-between bg-green-500 p-4  ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">8 : Total Withdraw</h1>
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">{data?.users.totalwithdraw}</h1>

                  </div>

                  <div className="w-full flex flex-row justify-between bg-green-500 p-4  ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">9 : Pending Withdraw</h1>
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">{data?.users.pendingwithdraw}</h1>

                  </div>

                  <div className="w-full flex flex-row justify-between bg-green-500 p-4  ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">10 : Referaal Commision</h1>
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">{data?.users.referalcommison}</h1>

                  </div>

                  <div className="w-full flex flex-row justify-between bg-green-500 p-4  ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">11 : Total Referall</h1>
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">{data?.users.totalreferal}</h1>

                  </div>

                  
                  <div className="w-full flex flex-row justify-between bg-green-500 p-4  ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">12 : Register Date Time</h1>
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">{formatDate(data?.users.createdAt)}</h1>

                  </div>

                  <div className="w-full flex flex-row justify-between bg-green-500 p-4  ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">13 : Last Time Update data</h1>
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">{formatDate(data?.users.updatedAt)}</h1>

                  </div>

                  <div className="w-full flex flex-row justify-between bg-green-500 p-4  ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">14 : Parent Referal Code</h1>
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">{data?.users.Parentrefcode}</h1>

                  </div>


                  <div className="w-full flex flex-row justify-between bg-green-500 p-4  ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">15 : Pending Deposit</h1>
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">{data?.users.pendingdp}</h1>

                  </div>


                  <div className="w-full flex flex-row justify-between bg-green-500 p-4  ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">16 : Referal Code</h1>
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">{data?.users.referralCode}</h1>

                  </div>

                  <div className="w-full flex flex-row justify-between bg-green-500 p-4  ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">17 : Wallet Address</h1>
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">{data?.users.udtwalletadres}</h1>

                  </div>

                  <div className="w-full flex flex-row justify-between bg-green-500 p-4  ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">18 : TRX hASH</h1>
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">{data?.users.transationhashvbv}</h1>

                  </div>

                  <div className="w-full flex flex-row justify-between bg-green-500 p-4  ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">19 : User Id</h1>
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">{data?.users._id}</h1>

                  </div>


                  <div className="w-full flex flex-row justify-between bg-green-500 p-4  ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">20 : Deposit date</h1>
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">{data?.users.depositday}</h1>

                  </div>

                  <div className="w-full flex flex-row justify-between bg-green-500 p-4  ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">21 : Withdraw Date</h1>
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">{data?.users.withdrawday}</h1>

                  </div>  
                 
                 

                  
                  <h1 className="text-3xl font-bold">Thanks For data base search 
                  </h1>

                  </div>}


                  <div >
<h1 className="bg-blue-500 text-white  mt-6 p-6 text-2xl">Referall List</h1>
<h1 className="bg-blue-500 text-white  mt-6 p-6 text-2xl"> Totall Referall is <span className="bg-red-700 ml-8"> {data?.responseu?.responserefc}</span></h1>


{!isFetching ? data?.response?.length > 0 ? <div>

<table className="w-full bg-gray-900 rounded-md mt-6">

<thead>
      <tr className="border-b border-blue-500 text-left">
         <th className="p-3 uppercase text-sm font-medium text-gray-500">name</th>
         <th className="p-3 uppercase text-sm font-medium text-gray-500">emil</th>
        
         <th className="p-3 uppercase text-sm font-medium text-gray-500">Total Deposit</th>
         <th className="p-3 uppercase text-sm font-medium text-gray-500">Referal commison</th>

      
      </tr>
   </thead>
   <tbody>
    {data?.response?.map(product => (
       <tr className="odd:bg-green-800" key={product._id}>
          <td className="p-3 capitalize text-bold font-normal text-white  ">{product.name}</td>
          <td className="p-3 capitalize text-bold font-normal text-white">{product.email}</td>


          
          <td className="p-3 capitalize text-bold font-normal text-white">{product.activedeposit}</td>
          <td className="p-3 capitalize text-bold font-normal text-white">{product.activedeposit/100 *10}</td>
     

          {/* <td className="p-3 capitalize text-sm font-normal text-gray-400">
             <img src={`/images/${product.image1}`} alt="image name" className="w-20 h-20 rounded-md object-cover" />
          </td> */}








       </tr>
    ))}
   </tbody>
</table>
</div>
















: 'No products!' : <Spinner />}

</div>




       </Wrapper>
    )
}
export default SearchUserdata;