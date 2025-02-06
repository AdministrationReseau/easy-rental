'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import DriverCard from './DriverCard';
import { DriverProps } from '@/utils/types/DriverProps';

interface DriverListProps {
    vehicleId: number; // ID du véhicule pour filtrer les chauffeurs
    onSelectedDriversChange: (selectedDriver: DriverProps | null) => void; // Fonction pour le chauffeur sélectionné
  }
const DriverCarousel: React.FC<DriverListProps> = ({onSelectedDriversChange }) => {
    const [drivers, setDrivers] = useState<DriverProps[]>([]);
     const [selectedDriver, setSelectedDriver] = useState<DriverProps | null>(null);

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


     const handleDriverSelection = (driver: DriverProps | null) => {
        setSelectedDriver(driver);
        onSelectedDriversChange(driver);
      };

    const handleDriverSelect = (driver: DriverProps | null) => {
        // Handle driver selection logic here
        setSelectedDriver(driver);
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
                {drivers.map((driver, index) => (
                    <SwiperSlide key={driver.id}>
                        {/* <DriverCard
                            {...driver} // Spread the driver props directly here
                            onSelect={handleDriverSelect}
                        /> */}
                        <DriverCard
                        key={index}
                        {...driver}
                        onSelect={() => handleDriverSelection(selectedDriver?.id === driver.id ? null : driver)}
                        isSelected={false}
                    />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default DriverCarousel;
