import { useSelector, useDispatch } from "react-redux";
import { useEffect ,useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Nav from "../../components/home/Nav";
import Header from "../../components/home/Header";
import AccountList from "../../components/home/AccountList";
import { useVerifyPaymentQuery } from "../../store/services/paymentService";
import { emptyCart } from "../../store/reducers/cartReducer";
import { useGetProductQuery, useUpdateProductdpMutation,useGetProductsforrefQuery, useUpdateProductMutation } from "../../store/services/productService";
import { setSuccess } from "../../store/reducers/globalReducer";
import Spinner from "../../components/Spinner";
// import { updateProductdp } from "../../../../backend/controllers/Product";


// Spinner
// useUpdateProductMutation
// useGetProductQuery

// useGetProductsforrefQuery




const Depositg = () => {
  const { user  } = useSelector((state) => state.authReducer);
  const [params] = useSearchParams();
  // const id = params.get("session_id");
  const [items, setItems] = useState([]);
  
  const [state, setState] = useState({
    // name: "",
    // totaldeposit: 0,
    // discount: 0,
    // stock: 0,
    // category: "",
    // colors: [],
  });// let ids= ooo

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('useritems'));
    
    console.log("dfdfsd",items._id)
    if (items) {
     setItems(items);
    }
  }, []);

  // const id=items?._id 
  // let id =items?._id  || "not  A TOLL"

  // console.log("asdasdj",id)


  
  // const { data: product, isFetching: fetching } = useGetProductQuery(id);
  // console.log(fetching)
  // console.log("cureent user data",product)
  
  // useEffect(() => {
  //   if (!fetching) {
  //     setState(product);
  //   }
  // }, [product]);

  let refcode =items.referralCode || "not  A TOLL"
  const {data :product = [], isFetching :fetching} = useGetProductsforrefQuery(refcode);
  console.log("referall data of user",product?.responseu)
  // console.log("first referal",data.responseu)
  // console.log("first count",data?.responserefc)

    useEffect(() => {
    if (!fetching) {
      setState(product.responseu);
      console.log("oue state",state)
      // console.log("wallet addres",JSON.stringify(state?.udtwalletadres))
    }
  }, [product]);




// store user data to local storage 
// const [items, setItems] = useState([]);

// const [state, setState] = useState({
//   name: "",
//   // totaldeposit: 0,
//   // discount: 0,
//   // stock: 0,
//   // category: "",
//   // colors: [],
// });// let ids= ooo

const handleInput = (e) => {
  setState({ ...state, [e.target.name]: e.target.value });
};


const [updateProduct, response] = useUpdateProductdpMutation();
console.log("Your response", response);


const createPro = (e) => {
  e.preventDefault();
  updateProduct(state);
};


useEffect(() => {
  if (!response.isSuccess) {
    response?.error?.data?.errors.map((err) => {
      toast.error(err.msg);
    });
  }
}, [response?.error?.data?.errors]);


useEffect(() => {
  if (response?.isSuccess) {
    dispatch(setSuccess(response?.data?.msg));
    navigate("/user");
  }
}, [response?.isSuccess]);



// useEffect(() => {
//   if (!fetching) {
//     setState(product);
//   }
// }, [product]);





// const id=items?._id 
// console.log(id)

// const { data: product, isFetching: fetching } = useGetProductQuery(id);
// console.log("cureent user data",product)


// useEffect(() => {
//   const items = JSON.parse(localStorage.getItem('useritems'));
  
//   console.log("dfdfsd",items._id)
//   if (items) {
//    setItems(items);
//   }
// }, []);

// let refcode =items.referralCode || "not  A TOLL"
// const {data = [], isFetching} = useGetProductsforrefQuery(refcode);
// setState(data?.responseu)
// console.log("state first",data?.responseu)
// console.log("referall data",data)





  // const { data, isSuccess } = useVerifyPaymentQuery(id, {
  //   skip: id ? false : true,
  // });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isSuccess) {
  //     localStorage.removeItem("cart");
  //     toast.success(data.msg);
  //     dispatch(emptyCart());
  //     navigate("/user");
  //   }
  // }, [isSuccess]);
  return (
    <>
      <Nav />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="mt-[70px] bg-yellow-500">
        {/* <Header>my account</Header> */}
        <div className="my-container mt-[40px] ">
          <div className="flex flex-wrap -mx-6">
            <div className="w-full md:w-[15%] p-6">
              <AccountList />
            </div>
            <div className="w-full md:w-[85%] p-6">






              <div className=" w-full h-[100%] ">


          
                <div className="bg-yellow-300 w-full p-4 flex items-start gap-3 flex-col justify-evenly rounded-lg">
                  <h1 className="text-2xl font-semibold  ">Deposit Crypto</h1>
                  <div className="w-full flex flex-row   ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">1 : Select Package</h1>
<select className="w-[40%] rounded-lg">
    <option>Basic : 50$</option>
    <option>Standard : 100$</option>
    <option>Premium : 200$</option>
    <option>Gold : 300$</option>
    <option></option>
</select>
                  </div>
                  
                  <div className="w-full flex flex-row   ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">2 : Select Coin</h1>
<select className="w-[40%] rounded-lg">
    <option>Usdt</option>
    
</select>
                  </div>


                  <div className="w-full flex flex-row   ">
                    <h1 className="w-[20%] text-md py-[2px] font-semibold   ">3 : Select Network</h1>
<select className="w-[40%] rounded-lg">
    <option>TRX Tron (TRC20)</option>
    
</select>
                  </div>



                  <div className="w-full flex flex-row   ">
                    <h1 className="w-[20%] text-md py-[2px] font-bold   ">4 : Deposit Address</h1>
                    <h3>TDhTqDZuXvQDQdoNJcqwkVxsa5wWgotcBC</h3>

                  </div>



                  
                  <h1 className="text-3xl font-bold">Send Payment 
                  </h1>

                 
                 
                 
                 
                 
                                 </div>




                                 <Toaster position="top-right" reverseOrder={true} />
      {!fetching ? (
        <div className="flex flex-wrap -mx-3">
          <form className="w-full xl:w-8/12 p-3" onSubmit={createPro}>
            <h3 className="pl-3 capitalize text-lg font-medium text-black">
After  Send Money Fill this Forum
            </h3>
            <div className="flex flex-wrap">
              
              
              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="title" className="label text-black">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control text-white"
                  id="name"
                  placeholder="name..."
                  onChange={handleInput}
                  value={state?.name ? state?.name : "put your name"}
                />
              </div>
              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="title" className="label text-black">
                  email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control text-white"
                  id="email"
                  placeholder="email..."
                  onChange={handleInput}
                  value={state?.email ? state?.email : "put your name"}
                />
              </div>


              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="price" className="label text-black">
Phone              
  </label>
                <input
                  type="string"
                  name="phonenm"
                  className="form-control text-white"
                  id="phonenm"
                  placeholder="phonenm..."
                  onChange={handleInput}
                  value={state?.phonenm ? state?.phonenm : "put your phonenm"}
                />
              </div>



              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="price" className="label text-black">
              Wallet Address 
                </label>
                <input
                  type="string"
                  name="udtwalletadres"
                  className="form-control text-white"
                  id="udtwalletadres"
                  placeholder="udtwalletadres..."
                  onChange={handleInput}
                  value={state?.udtwalletadres ? state?.udtwalletadres : "put your udtwalletadres"}
                  
                />
              </div>

              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="discount" className="label text-black">
Deposit Amount                </label>
                <input
                  type="number"
                  name="pendingdp"
                  className="form-control text-white"
                  id="pendingdp"
                  placeholder="deposit amount..."
                  onChange={handleInput}
                  value={state?.pendingdp ? state?.pendingdp : "put your udtwalletadres"}                  
                />
              </div>
              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="discount" className="label text-black">
Hash                </label>
                <input
                  type="string "
                  name="hash"
                  className="form-control text-white"
                  id="hash"
                  placeholder="hash..."
                  onChange={handleInput}
                  // value={state.activedeposit}
                />
              </div>

             


              {/* <div className="w-full md:w-6/12 p-3">
                <label htmlFor="discount" className="label">
                  Daily Roi
                </label>
                <input
                  type="number"
                  name="dailyroi"
                  className="form-control"
                  id="dailyroi"
                  placeholder="dailyroi..."
                  onChange={handleInput}
                  value={state?.pendingdp ? state?.pendingdp : "put your udtwalletadres"}              
                     />
              </div> */}

     

              <div className="w-full p-3">
                <input
                  type="submit"
                  value={response.isLoading ? "loading..." : "Send To Admin"}
                  disabled={response.isLoading ? true : false}
                  className="btn btn-indigo"
                />
              </div>
            </div>
          </form>

        </div>
      ) : (
        <Spinner />
      )}






{/* 
  <div className="bg-yellow-300 mt-4 w-full p-4 flex items-start gap-3 flex-col justify-evenly rounded-lg">

  <div className='flex flex-col bg-yellow-300 p-2 m-2'>
        <form className='flex flex-col bg-green-950 p-4 m-auto rounded-2xl ' >
        <div className='text-black font-bold text-[15px]'><p><span className='text-[#09df03] text-lg font-extrabold'>---- </span> Get In Touch</p></div>
        <div className='text-[#09df03] font-bold text-[25px] mt-2 '><span className='text-black font-bold text-[25px]'>After Payment Fill This form and send it to admin</span></div>
        <div className='text-black text-[14px] mt-2 mb-2'><p>If you still have any questions to ask please <br/> write your question below we will respond ASAP!</p></div>
    
              <span className='text-black'>Full mohsan</span>

              
     
              <input type="text" name="user_name" className="user mb-2   md:w-[20rem] md:h-[2rem] p-[0.3rem] rounded-lg text-[16px] outline-none border-[2px] border-solid border-black"  placeholder="Name"/>
              
              <span className='text-black'>Email</span>
    
              <input type="email" name="user_email" className="user mb-2  md:w-[20rem] h-[2rem] p-[0.3rem] rounded-lg text-[16px] outline-none border-[2px] border-solid border-black" placeholder="Email"/>
              
              <span className='text-black'>Phone</span>
              <input type="number" name="user_email" className="user mb-2  md:w-[20rem] h-[2rem] p-[0.3rem] rounded-lg text-[16px] outline-none border-[2px] border-solid border-black" placeholder="Phone"/>
    
              <span className='text-black'>Service Your Want to Question About</span>
              <input type="text" name="user_email" className="user mb-2  md:w-[20rem] h-[2rem] p-[0.3rem] rounded-lg text-[16px] outline-none border-[2px] border-solid border-black" placeholder="Service You Want To Question About"/>
    
    
              <span className='text-black'>Upload Screen Shot</span>
              <input type="file" name="user_file" className="user mb-2  md:w-[20rem] h-[2rem] p-[0.3rem] rounded-lg text-[16px] outline-none border-[2px] border-solid border-black" placeholder="upload payment screen shot"/>
    
              <span className='text-black'> Message Us *</span>
    
              <textarea name="message" className="user mb-2  md:w-[20rem] h-[4rem] p-[0.3rem] rounded-lg text-[16px] outline-none border-[2px] border-solid border-black" placeholder="Write Your Question"/>
              
              <div><button className='bg-[#09df03] button border-[2px]  py-[8px] px-[33px] text-white rounded-[20px] border-solid border-black"'>Send</button></div>
               
            </form>
            </div>  
                                 
                                 
                                 
                                 
                                 
                                 </div> */}

              </div>
            
            
            
         


            </div>
            {/* write up dive */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Depositg;
