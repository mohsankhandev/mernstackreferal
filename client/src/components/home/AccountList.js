import { NavLink } from "react-router-dom"
import {BsPersonCircle} from "react-icons/bs"
import {AiOutlineShoppingCart, AiOutlineLogout} from "react-icons/ai"
import {useDispatch} from "react-redux"
import { logout } from "../../store/reducers/authReducer"

const AccountList = () => {
    const dispatch = useDispatch();
  return (
    <>
    <NavLink to="/user" className="account-list hover:bg-blue-400">
    <BsPersonCircle size={22} className=" "/>
    <span className="account-list-title ml-2 inline-block text-lg">my account</span>
    </NavLink>

    <NavLink to="/deposit" className="account-list hover:bg-blue-400">
    <BsPersonCircle size={22} />
    <span className="account-list-title">Packages</span>
    </NavLink>



    <NavLink to="/depositg" className="account-list hover:bg-blue-400">
    <AiOutlineShoppingCart size={22} />
    <span className="account-list-title">Deposit</span>
    </NavLink>

    <NavLink to="/orders" className="account-list hover:bg-blue-400">
    <AiOutlineShoppingCart size={22} />
    <span className="account-list-title">Deposit</span>
    </NavLink>


    <NavLink to="/withdraw" className="account-list hover:bg-blue-400">
    <AiOutlineShoppingCart size={22} />
    <span className="account-list-title">Withdraw</span>
    </NavLink>


    <span className="account-list cursor-pointer  hover:bg-blue-400" onClick={() => dispatch(logout('userToken'))}>
    <AiOutlineLogout size={22} />
    <span className="account-list-title">logout</span>
    </span>
    </>
  )
}

export default AccountList