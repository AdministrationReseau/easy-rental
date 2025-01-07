'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { CarCard } from '@/components/CarCard';
import { CarProps } from '@/utils/types/CarProps'; // Import CarProps from your CarCard file

const CarCarousel: React.FC = () => {
    // Use Partial<CarProps> here
    const [vehicles, setVehicles] = useState<Partial<CarProps>[]>([]);

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
                    setVehicles(data.vehicles); // Assuming vehicles match Partial<CarProps> structure
                } else {
                    console.error('Unexpected data format:', data);
                }
            })
            .catch((error) => {
                console.error('Error loading vehicles:', error);
            });
    }, []);

    return (
        <div className="container mx-auto py-8">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={25}
                slidesPerView={4}
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    1044: { slidesPerView: 4 },
                    1024: { slidesPerView: 3 },
                    800: { slidesPerView: 2 },
                    480: { slidesPerView: 1 },
                }}
            >
                {vehicles.map((carData, index) => (
                    <SwiperSlide key={carData.id || index}>
                        <CarCard
                            id={carData.id || 0} // Provide a fallback value
                            images={carData.images || []} // Handle undefined images
                            brand={carData.brand || 'Unknown Brand'}
                            model={carData.model || 'Unknown Model'}
                            transmission={carData.transmission || 'Unknown Transmission'}
                            engine={
                                carData.engine || {
                                    type: 'Unknown',
                                    horsepower: 0,
                                    capacity: 0,
                                }
                            } // Provide a fallback object for engine
                            passenger={carData.passenger || 0} // Fallback to 0 passengers
                            pricePerDay={carData.pricePerDay || 0} // Fallback to 0 price
                            description={carData.description || ['No description available']} // Fallback for description
                            fonctionnalities={
                                carData.fonctionnalities || {
                                    air_condition: false,
                                    usb_input: false,
                                    seat_belt: false,
                                    audio_input: false,
                                    child_seat: false,
                                    bluetooth: false,
                                    sleeping_bed: false,
                                    onboard_computer: false,
                                    gps: false,
                                    luggage: false,
                                    water: false,
                                    additional_covers: false,
                                }
                            } // Fallback for fonctionnalities
                            service_history={
                                carData.service_history || [
                                    {
                                        date: new Date(),
                                        service_type: 'No service history',
                                        mileage: 0,
                                        provider: 'Unknown',
                                    },
                                ]
                            } // Fallback for service history
                            reviews={carData.reviews || []} // Fallback to an empty array for reviews
                            onLike={() => console.log('Liked')}
                            onDislike={() => console.log('Disliked')}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CarCarousel;
