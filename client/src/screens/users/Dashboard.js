import { useSelector, useDispatch } from "react-redux";
import { useEffect ,useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Nav from "../../components/home/Nav";
import Header from "../../components/home/Header";
import AccountList from "../../components/home/AccountList";
import { useVerifyPaymentQuery } from "../../store/services/paymentService";
import { emptyCart } from "../../store/reducers/cartReducer";
import { useGetProductsQuery, useGetProductsforrefQuery} from "../../store/services/productService";
import Spinner from "../../components/Spinner";


// import { useUserLoginMutation } from "../../../store/services/authService";

// import {
//   useUpdateProductMutation,
//   useGetProductQuery,
// } from "../../store/services/productService";


// import axios from 'axios';

const Dashboard = () => {
  const { user , userdetails} = useSelector((state) => state.authReducer);

  // const {data = [], isFetching} = useGetProductsforrefQuery(refcode);
  // console.log("referall data",data)



// store user data to local storage 
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('useritems'));
    if (items) {
     setItems(items);
    }
  }, []);

  let refcode =items.referralCode || "not  A TOLL"
  const {data = [], isFetching} = useGetProductsforrefQuery(refcode);
  console.log("referall data",data)
  console.log("first referal",data.responseu)
  console.log("first count",data?.responserefc)


let reffff=0;
if(data?.responserefc){
  reffff=data?.responserefc;
}




  // if(items?.referralCode){
  //   const {data = [], isFetching} = useGetProductsforrefQuery(refcode);
  //   console.log("referall data",data)

  // }
  //    refcode =items.referralCode || "not  A TOLL"
  // const {data = [], isFetching} = useGetProductsforrefQuery(refcode);
  // console.log("referall data",data)

  console.log("local storage data",items)
  // store user data to local storage 




// get data from reducerss
  console.log("user detail in dashboard",userdetails)
// get data from reducerss

  const [params] = useSearchParams();
  const id = params.get("session_id");


  const [state, setState] = useState({
    name: "",
    totaldeposit: 0,
    discount: 0,
    stock: 0,
    category: "",
    colors: [],
  });
  


  const navigate = useNavigate();


  useEffect(() => {

      if (userdetails?.admin) {
     
      navigate("/user");
    }
  }, [userdetails]);

  return (
    <>
      <Nav />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="mt-[70px] bg-yellow-500 h-[800px]">
        {/* <Header>my account</Header> */}
        <div className="my-container mt-[40px]  ">
          <div className="flex flex-wrap -mx-6">
            <div className="w-full md:w-[15%] p-6">
              <AccountList />
            </div>
            <div className="w-full md:w-[85%] p-6">



{
  
}

              <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">



                <div className="bg-blue-600 p-4 flex items-center flex-col  rounded-lg ">
                  <h1 className="text-2xl font-semibold text-white ">Total Deposit</h1>
                  <h1 className="text-3xl font-bold text-white">{data?.responseu?.totaldeposit} $
                  </h1>
        
                </div>

                <div className="bg-green-800 p-4 flex items-center flex-col  rounded-lg ">
                  <h1 className="text-2xl font-semibold text-white ">Active Deposit</h1>
                  <h1 className="text-3xl font-bold text-white">{data?.responseu?.activedeposit} $
                  </h1>
        
                </div>



                <div className="bg-red-600 p-4 flex items-center flex-col  rounded-lg ">
                  <h1 className="text-2xl font-semibold text-white ">Daily Profit</h1>
                  <h1 className="text-3xl font-bold text-white">{data?.responseu?.dailyroi} $
                  </h1>
        
                </div>




                <div className="bg-pink-500 p-4 flex items-center flex-col  rounded-lg ">
                  <h1 className="text-2xl font-semibold text-white ">Balance</h1>
                  <h1 className="text-3xl font-bold text-white">{data?.responseu?.dailyroi} $
                  </h1>
        
                </div>



                <div className="bg-[#b676b1] p-4 flex items-center flex-col  rounded-lg ">
                  <h1 className="text-2xl font-semibold text-white ">Total Withdraw</h1>
                  <h1 className="text-3xl font-bold text-white">{items.totalwithdraw} $
                  </h1>
        
                </div>


                <div className="bg-[#FF5733] p-4 flex items-center flex-col  rounded-lg ">
                  <h1 className="text-2xl font-semibold text-white ">Pending Withdraw</h1>
                  <h1 className="text-3xl font-bold text-white">{data?.responseu?.pendingwithdraw} $
                  </h1>
        
                </div>



                <div className="bg-[#D7197A] p-4 flex items-center flex-col  rounded-lg ">
                  <h1 className="text-2xl font-semibold text-white ">Referal Commison</h1>
                  <h1 className="text-3xl font-bold text-white">{data?.responseu?.referalcommison} $
                  </h1>
                </div>




                <div className="bg-[#CA6104] p-4 flex items-center flex-col  rounded-lg ">
                  <h1 className="text-2xl font-semibold text-white ">Total Referal</h1>
                  <h1 className="text-3xl font-bold text-white">{reffff} $
                  </h1>
        
                </div>



{/* 
                <div className="bg-[#8928CB] p-4 flex items-center flex-col  rounded-lg ">
                  <h1 className="text-2xl font-semibold text-white ">Total Deposit</h1>
                  <h1 className="text-3xl font-bold text-white">50 $
                  </h1>
        
                </div>




                <div className="bg-[#356778] p-4 flex items-center flex-col  rounded-lg ">
                  <h1 className="text-2xl font-semibold text-white ">Total Deposit</h1>
                  <h1 className="text-3xl font-bold text-white">50 $
                  </h1>
        
                </div> */}





              </div>






              {/* data?.responseu?referralCode */}

<div >
<h1 className="bg-blue-500 text-white  mt-6 p-6 text-2xl">Referall List</h1>
<h1 className="bg-blue-500 text-white  mt-6 p-6 text-2xl"> Tour Referall Code Is<span className="bg-red-700 ml-8"> {data?.responseu?.referralCode}</span></h1>


{!isFetching ? data?.products?.length > 0 ? <div>

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
    {data?.products?.map(product => (
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

           


















            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
