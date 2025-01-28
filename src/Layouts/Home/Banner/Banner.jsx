import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import "./Banner.css"
import useBannerSlider from '../../../Components/Hooks/BannerSlider/useBannerSlider';

const Banner = () => {
    const {bannerSliders} = useBannerSlider()
    const banners = bannerSliders.filter(bannerSlide => bannerSlide.status === "active")


    return (
        <div>
             <Carousel showArrows={true}  autoPlay={true} infiniteLoop={true}>
                {
                    banners.map((banner , i) => <div className="max-h-[750px]" key={i}>
                        <img src={banner?.medicineImage} alt="Banner Image" />
                    </div> )
                }
            </Carousel>

        </div>
    );
};

export default Banner;