import { NavLink } from "react-router-dom";
import Categories from "../../components/home/Categories";
import HomeProduct from "../../components/home/HomeProduct";
import Nav from "../../components/home/Nav";
import Slider from "../../components/home/Slider";
import { useRandomCategoriesQuery } from "../../store/services/categoryService";


const Home = () => {
  const { data, isFetching } = useRandomCategoriesQuery();
  return (
    <>
      <Nav />








      <div className="mt-[70px] bg-red-500">


    



      </div>
      <div className="  bg-green-500">
       ewrweasdhasj
      </div>
    </>
  );
};
export default Home;
