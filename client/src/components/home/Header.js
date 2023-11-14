import {motion} from "framer-motion"
const Header = ({children}) => {
    return(
        <motion.header
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        className="header">
        <div className="header-cover">
            <div className="my-container flex-y h-[300px]">
                <h1 className="header-heading">{children}</h1>
              <div>
               <div className="bg-green-300 p-3 opacity-3 ml rounded-sm  w-2 h-2" > <h1 className="text-lg">Total Deposit <span> :: $100.0</span>  </h1> </div>
                <h1>Total Balance</h1>
                <h1>Total Withdraw</h1>
                <h1>Today Profit</h1>
                </div>
            </div>
        </div>
        </motion.header>
    )
}
export default Header;