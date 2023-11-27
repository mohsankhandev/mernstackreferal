import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Nav from "../../components/home/Nav";
import Header from "../../components/home/Header";
import AccountList from "../../components/home/AccountList";
import { useVerifyPaymentQuery } from "../../store/services/paymentService";
import { emptyCart } from "../../store/reducers/cartReducer";
import UserWrapper from "./UserWrapper";
// Link
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
    <UserWrapper>

<>
      <Nav />
      <Toaster position="top-right" reverseOrder={false} />
      <div className=" bg-gray-500  h-screen">
        {/* <Header>my account</Header> */}
        <div className="my-container  ">
          <div className="flex flex-wrap -mx-6">
          
            <div className="w-full p-6">


              <div className="   h-[400px] grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">


                <div className="bg-black p-4 flex items-center flex-col justify-evenly rounded-lg">
                  <h1 className="text-2xl font-semibold  ">Silver</h1>
                  <h1 className="text-3xl font-bold">100 $
                  </h1>
                  <div>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-white">Daily Earning ( 3%) </h2>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-white"> 3 $  </h2>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-white">Referal Bonous 10% </h2>
                  </div>
                  <button className="bg-blue-500 text-white rounded px-4 py-3">Subscribe now</button>
                </div>
                <div className="bg-black  p-4 flex items-center flex-col justify-evenly rounded-lg">
                  <h1 className="text-2xl font-semibold  ">Silver</h1>
                  <h1 className="text-3xl font-bold">200 $
                  </h1>
                  <div>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-white">Daily Earning (3%) </h2>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-white">6 $  </h2>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-white">Referal Bonous 10% </h2>
                  </div>
                  <button className="bg-blue-500 text-white rounded px-4 py-3">Subscribe now</button>
                </div>
                <div className="bg-black  p-4 flex items-center flex-col justify-evenly rounded-lg">
                  <h1 className="text-2xl font-semibold  ">Silver</h1>
                  <h1 className="text-3xl font-bold">300 $
                  </h1>
                  <div>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-white">Daily Earning (3%) </h2>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-white"> 9 $  </h2>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-white">Referal Bonous 10% </h2>
                  </div>
                  <button className="bg-blue-500 text-white rounded px-4 py-3">Subscribe now</button>
                </div>
                <div className="bg-black  p-4 flex items-center flex-col justify-evenly rounded-lg">
                  <h1 className="text-2xl font-semibold  ">Silver</h1>
                  <h1 className="text-3xl font-bold">500 $
                  </h1>
                  <div>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-white">Daily Earning (3%) </h2>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-white">15 $  </h2>
                    <h2 className="text-md py-[2px] font-semibold border-b-[1px] border-b-white">Referal Bonous 10% </h2>
                  </div>
                  <button className="bg-blue-500 text-white rounded px-4 py-3"><Link to="/depositg">Subscribe now</Link></button>
                </div>

              </div>
          



            </div>
          </div>
        </div>
      </div>
    </>
    </UserWrapper>
   
  );
};

export default Deposit;
