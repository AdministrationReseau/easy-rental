// components/CarCarousel.tsx
'use client'

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar, A11y ,Autoplay} from 'swiper/modules';
import {CarCard} from '@/components/CarCard';


const CarCarousel: React.FC = () => {

    const [vehicles, setVehicles] = useState<any[]>([]);
  

    useEffect(() => {
      fetch('/data/cars.json')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data && Array.isArray(data.vehicles)) {
            setVehicles(data.vehicles);
          } else {
            console.error('Unexpected data format:', data);
          }
        })
        .catch((error) => {
          console.error('Error loading vehicles:', error);
        });
    }, []);
  
    

  return (
    <div className=" container mx-auto py-8 ">
      {/* <div className='content text-blue-500 text-center pt-6'>
          <h4>Ours vehicles</h4>
      </div> */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]}
        spaceBetween={25}
        slidesPerView={4}
        // navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{delay:3000 ,disableOnInteraction:false}}
        breakpoints={{
          1044: { slidesPerView: 4 },
          1024: { slidesPerView: 4 },
          800: { slidesPerView: 2 },
          480: { slidesPerView: 2 },
        }}
      >
        {vehicles.map((carData) => (
          <SwiperSlide key={carData.id}>
                <CarCard 
                    id={carData.id}
                    images={carData.images}
                    brand={carData.brand}
                    model={carData.model}
                    transmission={carData.transmission}
                    engine={carData.engine}
                    passenger={carData.passenger}
                    pricePerDay={carData.pricePerDay} onLike={function (id: string): void {
                        throw new Error('Function not implemented.');
                    } } onDislike={function (id: string): void {
                        throw new Error('Function not implemented.');
                    } }                            
                />
          </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
  );
};

export default CarCarousel;