import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {motion} from "framer-motion"
import Nav from "../../components/home/Nav";
import { useRestPasswordMutation } from '../../store/services/authService';
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState(
//     {
//         email:""
//     }
//   );
const { token } = useParams();
const navigate = useNavigate();

  
const [state, setState] = useState({
 
  token:token,
  newPassword:""
  });

const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const [forgotPassword, response] = useRestPasswordMutation()
  console.log("this responce for forget pass backed coming",response)
  console.log("this responce for forget pass backed coming",response?.error?.data?.message)

  const onSubmit = e => {
    e.preventDefault();
    console.log(state)
    forgotPassword(state);
}


useEffect(() => {

  if(response?.isSuccess){
    const delay = 3000; // 2 seconds

    const timeoutId = setTimeout(() => {
      navigate("/login"); // Replace '/dashboard' with your actual dashboard route
    }, delay);
  
    return () => clearTimeout(timeoutId); // Clear the timeout if component unmounts
  }
  // const delay = 2000; // 2 seconds

  // const timeoutId = setTimeout(() => {
  //   navigate("/login"); // Replace '/dashboard' with your actual dashboard route
  // }, delay);

  // return () => clearTimeout(timeoutId); // Clear the timeout if component unmounts

}, [response?.isSuccess]);


// useEffect(() => {
//   if (response?.isSuccess) {
//     // dispatch(setSuccess(response?.data?.msg));
//     navigate("/login");
//   }
// }, [response?.isSuccess]);

  return (
    // <div>
    //   <input
    //     type="email"
    //     placeholder="Enter your email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <button onClick={handleForgotPassword}>Reset Password</button>
    //   {message && <p>{message}</p>}
    // </div>

    <>
    <Nav />
    <div className="mt-[70px] pb-[80px]">
     {/* <Header>
        sign in
     </Header> */}
     <div className="flex flex-wrap justify-center">
        <motion.div
        initial={{opacity: 0, x: "-100vw"}}
        animate={{opacity: 1, x: 0}}
        className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 p-6">
            <form onSubmit={onSubmit} className="bg-white rounded-lg  border border-gray-200 p-10">
            {response?.error?.data?.message && <p className='bg-red-500 p-4 text-white'>{response?.error?.data?.message} </p>}
             {response?.isSuccess && <p className='bg-red-500 p-4 text-white'>{response?.data?.message} with this {response?.newPassword}  </p>}
                <h1 className="heading mb-5">Reset Password</h1>
                <div className="mb-4">
                    <label htmlFor="email" className="form-label">Token</label>
                      <input
                  type="text"
                  name="token"
                  className="form-control text-white"
                  id="token"
                  placeholder="token..."
                  onChange={handleInput}
                  value={state?.token ? state?.token : "put your token"}
                />
                    
                 
                </div>  
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">newPassword</label>
                      <input
                  type="text"
                  name="newPassword"
                  className="form-control text-white"
                  id="newPassword"
                  placeholder="newPassword ..."
                  onChange={handleInput}
                  // value={state?.newPassword  ? state?.newPassword  : "put your newPassword "}
                  value={state?.newPassword}
                />
                    
                 
                </div>
                
                <div className="mb-4">
                    <input type="submit" value="Forget password" className="btn btn-indigo w-full "  />
                </div>
                <div>
                    <p>Don't have an account ? <span className="capitalize font-medium text-base text-black"><Link to="/register">register</Link></span></p>
                </div>
            </form>
        </motion.div>
     </div>
    </div>
    </>
  );
};

export default ResetPassword;
