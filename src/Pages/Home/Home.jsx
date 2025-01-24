import Banner from "../../Layouts/Home/Banner/Banner";
import Categories from "../../Layouts/Home/Categories/Categories";
import Discounts from "../../Layouts/Home/Discounts/Discounts";


const Home = () => {


  return (
    <div className="space-y-20">
      <Banner />
      <Categories />
      <Discounts />
    </div>
  );
};

export default Home;
