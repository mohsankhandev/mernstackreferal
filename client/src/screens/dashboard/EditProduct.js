import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TwitterPicker } from "react-color";
import { v4 as uuidv4 } from "uuid";
import ReactQuill from "react-quill";
import toast, { Toaster } from "react-hot-toast";
import h2p from "html2plaintext";
import "react-quill/dist/quill.snow.css";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { useAllCategoriesQuery } from "../../store/services/categoryService";
import {
  useUpdateProductMutation,
  useGetProductQuery,
} from "../../store/services/productService";
import Spinner from "../../components/Spinner";
import Colors from "../../components/Colors";
import SizesList from "../../components/SizesList";
import { setSuccess } from "../../store/reducers/globalReducer";
const EditProduct = () => {
  const { id } = useParams();





  const { data: product, isFetching: fetching } = useGetProductQuery(id);


  console.log("data: ", product);
  
  
  
  
  
  // const [value, setValue] = useState("");


  const [state, setState] = useState({
    name: "",
    // totaldeposit: 0,
    // discount: 0,
    // stock: 0,
    // category: "",
    // colors: [],
  });
  

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
 
  const [updateProduct, response] = useUpdateProductMutation();
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





  const dispatch = useDispatch();
  const navigate = useNavigate();



  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setSuccess(response?.data?.msg));
      navigate("/dashboard/products");
    }
  }, [response?.isSuccess]);








  // useEffect(() => {
  //   setState({ ...state, description: value });
  // }, [value]);




  useEffect(() => {
    if (!fetching) {
      setState(product);
    }
  }, [product]);



  console.log("your state: ", state);
  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/products" className="btn-dark">
          <i className="bi bi-arrow-left-short"></i> proudcts list
        </Link>
      </ScreenHeader>
      
      <Toaster position="top-right" reverseOrder={true} />
      {!fetching ? (
        <div className="flex flex-wrap -mx-3">
          <form className="w-full xl:w-8/12 p-3" onSubmit={createPro}>
            <h3 className="pl-3 capitalize text-lg font-medium text-gray-400">
              edit product
            </h3>
            <div className="flex flex-wrap">
              
              
              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="title" className="label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder="name..."
                  onChange={handleInput}
                  value={state.name}
                />
              </div>
              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="title" className="label">
                  email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  placeholder="email..."
                  onChange={handleInput}
                  value={state.email}
                />
              </div>


              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="price" className="label">
Phone              
  </label>
                <input
                  type="string"
                  name="phonenm"
                  className="form-control"
                  id="phonenm"
                  placeholder="phonenm..."
                  onChange={handleInput}
                  value={state.phonenm}
                />
              </div>



              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="price" className="label">
                Total deposit
                </label>
                <input
                  type="number"
                  name="totaldeposit"
                  className="form-control"
                  id="totaldeposit"
                  placeholder="totaldeposit..."
                  onChange={handleInput}
                  value={state.totaldeposit}
                />
              </div>

              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="discount" className="label">
                  Active Deposit
                </label>
                <input
                  type="number"
                  name="activedeposit"
                  className="form-control"
                  id="activedeposit"
                  placeholder="activedeposit..."
                  onChange={handleInput}
                  value={state.activedeposit}
                />
              </div>

              <div className="w-full md:w-6/12 p-3">
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
                  value={state.dailyroi}
                />
              </div>

{/* 
              <div className="w-full md:w-6/12 p-3">
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
                  value={state.dailyroi}
                />
              </div> */}

              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="discount" className="label">
                 Withdraw
                </label>
                <input
                  type="number"
                  name="withdraw"
                  className="form-control"
                  id="withdraw"
                  placeholder="withdraw..."
                  onChange={handleInput}
                  value={state.withdraw}
                />
              </div>

              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="discount" className="label">
                 Total Withdraw
                </label>
                <input
                  type="number"
                  name="totalwithdraw"
                  className="form-control"
                  id="totalwithdraw"
                  placeholder="totalwithdraw..."
                  onChange={handleInput}
                  value={state.totalwithdraw}
                />
              </div>

              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="discount" className="label">
                 Pending Withdraw
                </label>
                <input
                  type="number"
                  name="pendingwithdraw"
                  className="form-control"
                  id="pendingwithdraw"
                  placeholder="pendingwithdraw..."
                  onChange={handleInput}
                  value={state.pendingwithdraw}
                />
              </div>
          


              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="discount" className="label">
                Referall Commision
                </label>
                <input
                  type="number"
                  name="referalcommison"
                  className="form-control"
                  id="referalcommison"
                  placeholder="referalcommison..."
                  onChange={handleInput}
                  value={state.referalcommison}
                />
              </div>
          

              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="discount" className="label">
                Totall Referall
                </label>
                <input
                  type="number"
                  name="totalreferal"
                  className="form-control"
                  id="totalreferal"
                  placeholder="referalcommison..."
                  onChange={handleInput}
                  value={state.totalreferal}
                />
              </div>
     

              <div className="w-full p-3">
                <input
                  type="submit"
                  value={response.isLoading ? "loading..." : "save product"}
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
    </Wrapper>
  );
};
export default EditProduct;
