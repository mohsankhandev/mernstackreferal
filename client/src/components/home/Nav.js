import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { BsHandbag } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Search from "./Search";
import { toggleSearchBar } from "../../store/reducers/globalReducer";
const Nav = () => {
  const { userToken, user } = useSelector((state) => state.authReducer);
  const { searchBar } = useSelector((state) => state.globalReducer);
  const { items, total } = useSelector((state) => state.cartReducer);
  console.log(total);
  const dispatch = useDispatch();
  return (
    <>
      <nav className="nav bg-[#1f2937]">
        <div className="my-container">
          <div className="flex justify-between items-center">
            <Link to="/">
              <img src="/logo.svg" className="h-full object-cover" alt="logo" />
            </Link>
            <ul className="flex items-center">
              {/* <li className="nav-li cursor-pointer text-white">
                <FiSearch
                  size={22}
                  onClick={() => dispatch(toggleSearchBar())}
                />
              </li> */}
              {userToken ? (
                <li className="nav-li">
                  <Link to="/user" className="nav-link text-white">
                    {user?.name}
                  </Link>
                </li>
              ) : (
                <li className="nav-li text-white">
                  <Link to="/login" className="nav-link">
                    sign in
                  </Link>
                </li>
              )}

              {/* <li className="nav-li relative">
                <Link to="/cart">
                  <BsHandbag size={20} />
                  <span className="nav-circle">{items}</span>
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
      <Search />
    </>
  );
};
export default Nav;
