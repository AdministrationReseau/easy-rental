'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import DriverCard from './DriverCard';
import { DriverProps } from '@/utils/types/DriverProps';

const DriverCarousel: React.FC = () => {
    const [drivers, setDrivers] = useState<DriverProps[]>([]);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await fetch('/data/drivers.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setDrivers(data);
                } else {
                    console.error('Unexpected data format:', data);
                }
            } catch (error) {
                console.error('Error loading drivers:', error);
            }
        };

        fetchDrivers();
    }, []);

    const handleDriverSelect = (driver: DriverProps) => {
        // Handle driver selection logic here
        console.log('Driver selected:', driver);
    };

    return (
        <div className="container mx-auto py-8">
            {/* Carousel for drivers */}
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
                            {...driver} // Spread the driver props directly here
                            onSelect={handleDriverSelect}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default DriverCarousel;
