import SectionTitle from "../../../Components/Shared/SectionTitle";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import "./Discounts.css"
import DiscountsCard from "./DiscountsCard";
import useAllMedicines from "../../../Components/Hooks/GetAllMedicines/useAllMedicines";

const Discounts = () => {
    const {medicines} = useAllMedicines()
    const discountItems = medicines?.filter(medicine => medicine?.discount > 0);


    return (
        <div className="px-4">
            <SectionTitle heading="Find your favorite items at unbeatable discount prices." subHeading="Grab the Best Deals Now" />
        <Swiper 
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 10,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper px-4 max-w-6xl"
        >
        {
            discountItems.map(item => <SwiperSlide className="w-96" key={item._id}>
                <DiscountsCard medicine={item} />
            </SwiperSlide> )
        }
        </Swiper>
        </div>
    );
};

export default Discounts;