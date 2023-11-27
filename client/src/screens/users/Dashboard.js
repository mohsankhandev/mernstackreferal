import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Nav from "../../components/home/Nav";
import Header from "../../components/home/Header";
import AccountList from "../../components/home/AccountList";
import { useVerifyPaymentQuery } from "../../store/services/paymentService";
import { emptyCart } from "../../store/reducers/cartReducer";
// import { useGetProductsQuery, useGetProductsforrefQuery} from "../../store/services/productService";
import { BiAbacus, } from 'react-icons/bi'; // Assuming you're using react-icons for Bootstrap icons

// useGetProductsforrefQuery

import Spinner from "../../components/Spinner";
import { useGetProductsforrefQuery } from "../../store/services/dashboardService";
import Wrapper from "../dashboard/Wrapper";
import UserWrapper from "./UserWrapper";


const Dashboard = () => {
  const { user, userdetails } = useSelector((state) => state.authReducer);
  console.log("1 user detail in dashboard", userdetails)

  const [items, setItems] = useState([]);

  const [walletAddress, setWalletAddress] = useState(""); // Replace this with the actual wallet address
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyToClipboard = async () => {
    navigator.clipboard
      .writeText(walletAddress)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 1500); // Reset the copy success message after 1.5 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        // Handle any errors here
      });
  };


  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('useritems'));
    if (items) {
      console.log("2 local storage data", items)
      setWalletAddress(items.referralCode)

      setItems(items);

    }
  }, []);

  let refcode = items.referralCode || "not  A TOLL"
  const { data = [], isFetching } = useGetProductsforrefQuery(refcode);
  console.log("3 referall data", data)
  console.log(" 4 first referal", data.responseu)
  console.log("5 first count", data?.responserefc)
  console.log("6 pending withdraw", data?.pendingWithdrawal)
  // let reffaadad=data?.responseu?.referralCode ? data?.responseu?.referralCode :"refresh"
  // pendingWithdrawals

  let reffff = 0;
  if (data?.responserefc) {
    reffff = data?.responserefc;
  }

  // const copyToClipboard = () => {
  //   copy(data?.responseu?.referralCode);
  //   setCopied(true);
  //   setTimeout(() => {
  //     setCopied(false);
  //   }, 1500);
  // };





  // console.log("local storage data",items)
  // store user data to local storage 




  // get data from reducerss
  // console.log("user detail in dashboard",userdetails)
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
    <UserWrapper>
      <Toaster position="top-right" reverseOrder={false} />

      {/* <div className=" bg-[#111827] md:h-[800px]"> */}
      <div className=" bg-gray-500 md:h-[800px]">
        <div className="my-container   ">
          <div className="flex flex-wrap -mx-6">

            <div className="w-full  p-6">





              <div className="bg-black w-full p-4 mb-2">
                <h1 className="text-white  text-lg">Well come Mr<span className="text-red-600 ml-3">{data?.responseu?.name ? data?.responseu?.name : "Anonymous"}</span> </h1>
              </div>


              {/* <div className="flex items-center justify-between">
      <div className="w-1/3 p-4">
        <img src="your_image_path.jpg" alt="Your Image" className="w-full h-auto" />
      </div>
      <div className="w-2/3 flex flex-col justify-between p-4">
        <div className="bg-gray-200 p-4 mb-4">
          <h3 className="text-lg font-semibold">Total Deposit</h3>
          <p className="text-xl">$5000</p>
        </div>
        
      </div>
    </div> */}


              <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">



                {/* <div className="bg-white p-6 flex items-center flex-row  rounded-lg ">
                  
                <div className="me-3">
                <img src="/src/assets/images/header.jpg" alt="Your Image" className="h-[40px]" />
                </div>
                <div className="flex flex-col ">
                <h3 className=" text-sm text-black text-[22px]">{data?.responseu?.totaldeposit} $</h3>

                <h1 className=" text-black ">Total Deposit</h1>

                   </div>
                 


                  

                </div> */}
                {/* {data?.responseu?.totaldeposit} $ */}


                <div className="bg-black p-4 flex items-center flex-col  rounded-lg ">
                  <h1 className="text-[18px] font-sm text-white ">Total Deposit</h1>
                  <h1 className="text-[22px] font-bold text-white">{data?.responseu?.totaldeposit} $
                  </h1>

                </div>

                <div className="bg-black  p-4 flex items-center flex-col  rounded-lg ">
                  <h1 className="text-[18px] font-sm text-white ">Active Deposit</h1>
                  <h1 className="text-[22px] font-bold text-white">{data?.responseu?.activedeposit} $
                  </h1>

                </div>



                <div className="bg-black  p-4 flex items-center flex-col  rounded-lg ">
                  <h1 className="text-[18px] font-sm text-white ">Daily Profit</h1>
                  <h1 className="text-[22px] font-bold text-white">{data?.responseu?.dailyroi} $
                  </h1>

                </div>




                <div className="bg-black  p-4 flex items-center flex-col  rounded-lg ">
                  <h1 className="text-[18px] font-sm text-white ">Balance</h1>
                  <h1 className="text-[22px] font-bold text-white">{data?.responseu?.dailyroi} $
                  </h1>

                </div>



                <div className="bg-black  p-4 flex items-center flex-col  rounded-lg ">
                  <h1 className="text-[18px] font-sm text-white ">Total Withdraw</h1>
                  <h1 className="text-[22px] font-bold text-white">{data?.responseu?.totalwithdraw ? data?.responseu?.totalwithdraw : 0} $
                  </h1>

                </div>

                <div className="bg-black  p-4 flex items-center flex-col  rounded-lg ">
                  <h1 className="text-[18px] font-sm text-white ">Pending Deposit</h1>
                  <h1 className="text-[22px] font-bold text-white">{data?.responseu?.pendingdp ? data?.responseu?.pendingdp : 0} $
                  </h1>

                </div>


                <div className="bg-black  p-4 flex items-center flex-col  rounded-lg ">
                  <h1 className="text-[18px] font-sm text-white ">Pending Withdraw</h1>
                  <h1 className="text-[22px] font-bold text-white">{data?.responseu?.pendingwithdraw} $
                  </h1>

                </div>



                <div className="bg-black  p-4 flex items-center flex-col  rounded-lg ">
                  <h1 className="text-[18px] font-sm text-white ">Referal Commison</h1>
                  <h1 className="text-[22px] font-bold text-white">{data?.responseu?.referalcommison} $
                  </h1>
                </div>




                <div className="bg-black  p-4 flex items-center flex-col  rounded-lg ">
                  <h1 className="text-[18px] font-sm text-white ">Total Referal</h1>
                  <h1 className="text-[22px] font-bold text-white">{reffff}
                  </h1>

                </div>






              </div>







              <div >
                <h1 className="bg-blue-500 text-white  mt-6 p-6 text-2xl">Referall List</h1>

                <div className="bg-blue-500 flex flex-row items-center mt-6 w-full">

                  <h1 className="bg-blue-500 text-white   p-6 text-2xl"> Your Referall Code Is<span className="bg-red-700 ml-8"> {data?.responseu?.referralCode}</span></h1>
                  <div>

                    <button
                      className="bg-red-600 p-2"
                      onClick={handleCopyToClipboard}
                    >
                      Copy Wallet Address
                    </button>



                    {copySuccess && (
                      <span style={{ color: "red" }}>
                        Copied to clipboard!
                      </span>
                    )}
                  </div>

                </div>
                {/* <h1 className="bg-blue-500 text-white  mt-6 p-6 text-2xl"> Tour Referall Code Is<span className="bg-red-700 ml-8"> {data?.responseu?.referralCode}</span></h1> */}
                {/* <button
                      className="bg-red-600 p-2"
                      onClick={handleCopyToClipboard}
                    >
                      Copy Wallet Address
                    </button>
                    {copySuccess && (
                      <span style={{ color: "green" }}>
                        Copied to clipboard!
                      </span>
                    )} */}

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
                          <td className="p-3 capitalize text-bold font-normal text-white">{product.activedeposit / 100 * 10}</td>


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


    </UserWrapper>
    //     <>
    //       <Nav />
    //       <Toaster position="top-right" reverseOrder={false} />
    //       <div className="mt-[70px] bg-[#111827] md:h-[800px]">
    //         <div className="my-container mt-[40px]  ">
    //           <div className="flex flex-wrap -mx-6">
    //             <div className="w-full md:w-[15%] p-6 bg-gray-500">
    //               <AccountList />
    //             </div>
    //             <div className="w-full md:w-[85%] p-6">



    // {

    // }

    // <div className="bg-indigo-200 w-full p-4">

    // </div>


    //               <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">



    //                 <div className="bg-blue-600 p-4 flex items-center flex-col  rounded-lg ">
    //                   <h1 className="text-2xl font-semibold text-white ">Total Deposit</h1>
    //                   <h1 className="text-3xl font-bold text-white">{data?.responseu?.totaldeposit} $
    //                   </h1>

    //                 </div>

    //                 <div className="bg-green-800 p-4 flex items-center flex-col  rounded-lg ">
    //                   <h1 className="text-2xl font-semibold text-white ">Active Deposit</h1>
    //                   <h1 className="text-3xl font-bold text-white">{data?.responseu?.activedeposit} $
    //                   </h1>

    //                 </div>



    //                 <div className="bg-red-600 p-4 flex items-center flex-col  rounded-lg ">
    //                   <h1 className="text-2xl font-semibold text-white ">Daily Profit</h1>
    //                   <h1 className="text-3xl font-bold text-white">{data?.responseu?.dailyroi} $
    //                   </h1>

    //                 </div>




    //                 <div className="bg-pink-500 p-4 flex items-center flex-col  rounded-lg ">
    //                   <h1 className="text-2xl font-semibold text-white ">Balance</h1>
    //                   <h1 className="text-3xl font-bold text-white">{data?.responseu?.dailyroi} $
    //                   </h1>

    //                 </div>



    //                 <div className="bg-[#b676b1] p-4 flex items-center flex-col  rounded-lg ">
    //                   <h1 className="text-2xl font-semibold text-white ">Total Withdraw</h1>
    //                   <h1 className="text-3xl font-bold text-white">{data?.responseu?.totalwithdraw ? data?.responseu?.totalwithdraw : 0} $
    //                   </h1>

    //                 </div>

    //                 <div className="bg-[#b676b1] p-4 flex items-center flex-col  rounded-lg ">
    //                   <h1 className="text-2xl font-semibold text-white ">Pending Deposit</h1>
    //                   <h1 className="text-3xl font-bold text-white">{data?.responseu?.pendingdp ? data?.responseu?.pendingdp : 0} $
    //                   </h1>

    //                 </div>


    //                 <div className="bg-[#FF5733] p-4 flex items-center flex-col  rounded-lg ">
    //                   <h1 className="text-2xl font-semibold text-white ">Pending Withdraw</h1>
    //                   <h1 className="text-3xl font-bold text-white">{data?.responseu?.pendingwithdraw} $
    //                   </h1>

    //                 </div>



    //                 <div className="bg-[#D7197A] p-4 flex items-center flex-col  rounded-lg ">
    //                   <h1 className="text-2xl font-semibold text-white ">Referal Commison</h1>
    //                   <h1 className="text-3xl font-bold text-white">{data?.responseu?.referalcommison} $
    //                   </h1>
    //                 </div>




    //                 <div className="bg-[#CA6104] p-4 flex items-center flex-col  rounded-lg ">
    //                   <h1 className="text-2xl font-semibold text-white ">Total Referal</h1>
    //                   <h1 className="text-3xl font-bold text-white">{reffff} $
    //                   </h1>

    //                 </div>






    //               </div>







    // <div >
    // <h1 className="bg-blue-500 text-white  mt-6 p-6 text-2xl">Referall List</h1>
    // <h1 className="bg-blue-500 text-white  mt-6 p-6 text-2xl"> Tour Referall Code Is<span className="bg-red-700 ml-8"> {data?.responseu?.referralCode}</span></h1>


    // {!isFetching ? data?.products?.length > 0 ? <div>

    // <table className="w-full bg-gray-900 rounded-md mt-6">

    // <thead>
    //       <tr className="border-b border-blue-500 text-left">
    //          <th className="p-3 uppercase text-sm font-medium text-gray-500">name</th>
    //          <th className="p-3 uppercase text-sm font-medium text-gray-500">emil</th>

    //          <th className="p-3 uppercase text-sm font-medium text-gray-500">Total Deposit</th>
    //          <th className="p-3 uppercase text-sm font-medium text-gray-500">Referal commison</th>


    //       </tr>
    //    </thead>
    //    <tbody>
    //     {data?.products?.map(product => (
    //        <tr className="odd:bg-green-800" key={product._id}>
    //           <td className="p-3 capitalize text-bold font-normal text-white  ">{product.name}</td>
    //           <td className="p-3 capitalize text-bold font-normal text-white">{product.email}</td>



    //           <td className="p-3 capitalize text-bold font-normal text-white">{product.activedeposit}</td>
    //           <td className="p-3 capitalize text-bold font-normal text-white">{product.activedeposit/100 *10}</td>


    //           {/* <td className="p-3 capitalize text-sm font-normal text-gray-400">
    //              <img src={`/images/${product.image1}`} alt="image name" className="w-20 h-20 rounded-md object-cover" />
    //           </td> */}








    //        </tr>
    //     ))}
    //    </tbody>
    // </table>
    // </div>
















    // : 'No products!' : <Spinner />}

    // </div>




















    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </>
  );
};

export default Dashboard;
