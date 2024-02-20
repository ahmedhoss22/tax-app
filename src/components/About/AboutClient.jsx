import Fine from "../../assets/OIP.png"
import Arabi from "../../assets/OIP (1).png"
import Red from "../../assets/download (1).png"
import Green from "../../assets/OIP (2).png"
import AData from "../../assets/download.png"
import { useTranslation } from "react-i18next"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const AboutClient = () => {
    const [t, i18n] = useTranslation()
    const data = [
        Arabi,
        Fine,
        Arabi,
        Arabi,
        Arabi,
        Red,
        Green,
        AData
    ]
    return (
        <div>
            <h2 className='clientTitle '>{t('clients')}</h2>
            <div className='d-flex overflow-scroll justify-content-between align-items-center'>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={3}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                    }}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                    }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {data.map((ele, index) => (
                        <SwiperSlide key={index}>
                            <img src={ele} alt="" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default AboutClient
