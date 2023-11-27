import React, { useState } from 'react';
import axios from 'axios';
import {motion} from "framer-motion"
import Nav from "../../components/home/Nav";
import {Link, useNavigate} from "react-router-dom"
import { useForgetPasswordMutation } from '../../store/services/authService';


const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState(
//     {
//         email:""
//     }
//   );

  
const [state, setState] = useState({
 
  email:""
  });

const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const [forgotPassword, response] = useForgetPasswordMutation()
  console.log("this responce for forget pass backed coming",response)
  console.log("this responce for forget pass backed coming",response?.error?.data?.message)

  const onSubmit = e => {
    e.preventDefault();
    console.log(state)
    forgotPassword(state);
}

//   const handleForgotPassword = async () => {
//     try {

//       await axios.post('http://localhost:5000/api//forgot-password', { email });
//       setMessage('Reset token sent to your email');
//     } catch (error) {
//       setMessage(error.response.data.message);
//     console.log("error forget password")
//     }
//   };

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
            {response?.error?.data?.message && <p className='bg-red-500 p-4 text-white'>{response?.error?.data?.message} with this {response?.originalArgs?.email}  </p>}
            
            {response?.data?.message && <p className='bg-blue-500 p-4 text-white'>{response?.data?.message} please check your email addres  </p>}


            {/* {response?.error?.data?.message && <p className='bg-red-500 p-4 text-white'>{response?.error?.data?.message} with this {response?.originalArgs}  </p>} */}

                <h1 className="heading mb-5">Forget Password</h1>
                <div className="mb-4">
                    <label htmlFor="email" className="form-label">email</label>
                      <input
                  type="email"
                  name="email"
                  className="form-control text-white"
                  id="email"
                  placeholder="email..."
                  onChange={handleInput}
                  value={state?.email}
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

export default ForgotPassword;
