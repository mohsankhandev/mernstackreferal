import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Nav from "../../components/home/Nav";
import Header from "../../components/home/Header";
import AccountList from "../../components/home/AccountList";
import { useVerifyPaymentQuery } from "../../store/services/paymentService";
import { emptyCart } from "../../store/reducers/cartReducer";
const Deposit = () => {
  const { user } = useSelector((state) => state.authReducer);
  const [params] = useSearchParams();
  const id = params.get("session_id");
  const { data, isSuccess } = useVerifyPaymentQuery(id, {
    skip: id ? false : true,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem("cart");
      toast.success(data.msg);
      dispatch(emptyCart());
      navigate("/user");
    }
  }, [isSuccess]);
  return (
    <>
      <Nav />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="mt-[70px] bg-yellow-500 h-[630px]">
        {/* <Header>my account</Header> */}
        <div className="my-container mt-[40px] ">
          <div className="flex flex-wrap -mx-6">
            <div className="w-full md:w-[15%] p-6">
              <AccountList />
            </div>
            <div className="w-full md:w-[85%] p-6">


              <div className="   h-[400px] grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">


                <div className="bg-yellow-300 p-4 flex items-center flex-col justify-evenly rounded-lg">
                  <h1 className="text-2xl font-semibold  ">Silver</h1>
                  <h1 className="text-3xl font-bold">50 $
                  </h1>
                  <div>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-black">Daily Earning (1% to 3%) </h2>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-black">0.50 $ to 1.50 $  </h2>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-black">Referal Bonous 5% </h2>
                  </div>
                  <button className="bg-blue-500 text-white rounded px-4 py-3">Subscribe now</button>
                </div>
                <div className="bg-yellow-300 p-4 flex items-center flex-col justify-evenly rounded-lg">
                  <h1 className="text-2xl font-semibold  ">Silver</h1>
                  <h1 className="text-3xl font-bold">100 $
                  </h1>
                  <div>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-black">Daily Earning (1% to 3%) </h2>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-black">1 $ to 3 $  </h2>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-black">Referal Bonous 5% </h2>
                  </div>
                  <button className="bg-blue-500 text-white rounded px-4 py-3">Subscribe now</button>
                </div>
                <div className="bg-yellow-300 p-4 flex items-center flex-col justify-evenly rounded-lg">
                  <h1 className="text-2xl font-semibold  ">Silver</h1>
                  <h1 className="text-3xl font-bold">200 $
                  </h1>
                  <div>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-black">Daily Earning (1% to 3%) </h2>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-black">2 $ to 6 $  </h2>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-black">Referal Bonous 5% </h2>
                  </div>
                  <button className="bg-blue-500 text-white rounded px-4 py-3">Subscribe now</button>
                </div>
                <div className="bg-yellow-300 p-4 flex items-center flex-col justify-evenly rounded-lg">
                  <h1 className="text-2xl font-semibold  ">Silver</h1>
                  <h1 className="text-3xl font-bold">300 $
                  </h1>
                  <div>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-black">Daily Earning (1% to 3%) </h2>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-black">3 $ to 9 $  </h2>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-black">Referal Bonous 5% </h2>
                  </div>
                  <button className="bg-blue-500 text-white rounded px-4 py-3">Subscribe now</button>
                </div>

              </div>
              {/* <div className="bg-green-500 w-[100%] gap-8 h-[100px] flex lg:flex-nowrap  flex-wrap justify-between">
                <div className="bg-blue-600 lg:w-[25%] md:w-[33.33%] sm:w-[50%]  w-[100%]  h-[100px]"></div>
                <div className="bg-blue-600 lg:w-[25%] md:w-[33.33%] sm:w-[50%]  w-[100%]   h-[100px]"></div>
                <div className="bg-blue-600 lg:w-[25%] md:w-[33.33%] sm:w-[50%]  w-[100%]   h-[100px]"></div>
                <div className="bg-blue-600 lg:w-[25%] md:w-[33.33%] sm:w-[50%]  w-[100%]   h-[100px]"></div>
              </div> */}




              {/* <h1 className="heading">name</h1>
              <span className="block mt-3 capitalize font-medium text-sm">
                {user?.name}
              </span>


              <span className="block mt-3 capitalize font-medium text-sm">
                {user?.name}
              </span> */}



            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deposit;
