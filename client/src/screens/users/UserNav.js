import {useDispatch} from "react-redux"
import { logout } from "../../store/reducers/authReducer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const UserNav = ({openSidebar}) => {
    const { userToken, user } = useSelector((state) => state.authReducer);


    const dispatch = useDispatch();
    const adminLogout = () => {
        dispatch(logout('userToken'));
    }
    return(
     <nav className="fixed left-0 sm:left-64 top-4 right-0 mx-4">
      <div className="bg-gray-700 w-full flex justify-between sm:justify-end items-center p-4">
      <i className="bi bi-filter-left text-white text-2xl cursor-pointer sm:hidden block" onClick={openSidebar}></i>
      {userToken ? (
                <div className="nav-li">
                  <Link to="/user" className="nav-link py-2 px-4  text-white m-2 rounded-md bg-indigo-500">
                    {user?.name}
                  </Link>
                </div>
              ) : (
                <div className="nav-li text-white">
                  <Link to="/login" className="nav-link">
                    sign in
                  </Link>
                </div>
              )}
       <button className="py-2 px-4 bg-indigo-600 text-white rounded-md capitalize" onClick={adminLogout}>logout</button>
      </div>
     </nav>
    )
}
export default UserNav;