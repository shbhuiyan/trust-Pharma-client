import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import "./Banner.css"
import { useEffect, useState } from 'react';

const Banner = () => {
    const [banners , setBanners] = useState([])
    useEffect(() => {
        fetch("/banner.json")
        .then(res => res.json())
        .then(data => setBanners(data))
    },[])


    return (
        <div>
             <Carousel showArrows={true}  autoPlay={true} infiniteLoop={true}>
                {
                    banners.map((banner , i) => <div className="" key={i}>
                        <img src={banner?.image} alt="Banner Image" />
                    </div> )
                }
            </Carousel>

        </div>
    );
};

export default Banner;