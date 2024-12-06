'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import DriverCard from './DriverCard';

interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
}

interface Driver {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  license_number: string;
  license_type: string;
  address: string;
  phone: string;
  email: string;
  vehicle_assigned: Vehicle;
  rating: number;
  insurance_provider: string;
  insurance_policy: string;
  profile_picture: string;
}

const DriverCarousel: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('/data/drivers.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data && Array.isArray(data.drivers)) {
          setDrivers(data.drivers);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error loading drivers:', error);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <div className="container mx-auto py-8">

      {/* Carrousel des conducteurs */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={5}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          1024: { slidesPerView: 3 },
          800: { slidesPerView: 2 },
          480: { slidesPerView: 1 },
        }}
      >
        {drivers.map((driver) => (
          <SwiperSlide key={driver.id}>
            <DriverCard
              name={`${driver.first_name} ${driver.last_name}`}
              email={driver.email}
              location={driver.address}
              age={driver.age}
              avatar={driver.profile_picture}
              stars={driver.rating}
              phone={driver.phone}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DriverCarousel;
