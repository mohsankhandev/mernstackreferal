import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/reducers/authReducer";


const UserSidebar = ({ side, closeSidebar }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={`fixed top-0 ${side} sm:left-0 w-64 h-screen bg-gray-800 z-10 transition-all`}
    >
      <i
        className="bi bi-x-lg absolute top-4 right-4 sm:hidden block cursor-pointer text-lg"
        onClick={closeSidebar}
      ></i>
      <div className="bg-white p-4">
        <img src="/logo.svg" alt="logo" />
      </div>
      <ul className="mt-4">
        <li className="px-4 cursor-pointer transition-all py-3 text-white flex items-center hover:bg-gray-600">
          <i className="bi bi-card-list mr-2 inline-block text-lg"></i>{" "}
          {/* <i className="bi bi-house-check"></i>{" "} */}

          {/* <BsPersonCircle size={22} /> */}

          <Link to="/user" className="text-base capitalize">
          My Account
          </Link>
        </li>

        <li className="px-4 cursor-pointer transition-all py-3 text-white flex items-center hover:bg-gray-600">
          <i className="bi bi-card-list mr-2 inline-block text-lg"></i>{" "}
          <Link to="/deposit" className="text-base capitalize">
          Packages
          </Link>
        </li>
        
        <li className="px-4 cursor-pointer transition-all py-3 text-white flex items-center hover:bg-gray-600">
          <i className="bi bi-card-list mr-2 inline-block text-lg"></i>{" "}
          <Link to="/depositg" className="text-base capitalize">
          Deposit
          </Link>
        </li>

        <li className="px-4 cursor-pointer transition-all py-3 text-white flex items-center hover:bg-gray-600">
          <i className="bi bi-card-list mr-2 inline-block text-lg"></i>{" "}
          <Link to="/withdraw" className="text-base capitalize">
          Withdraw       
             </Link>
        </li>

        <li className="px-4 cursor-pointer transition-all py-3 text-white flex items-center hover:bg-gray-600">
          <i className="bi bi-card-list mr-2 inline-block text-lg"></i>{" "}
          <span className=" " onClick={() => dispatch(logout('userToken'))}>Logout</span>

        
        </li>

      
     
      </ul>
    </div>
  );
};
export default UserSidebar;
