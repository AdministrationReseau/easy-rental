'use client'

import React, { useEffect, useState } from "react";
import {CarCard} from '@/components/CarCard';
import About from "@/components/about";
import Records from "@/components/Records";
import EarnWithUs from "@/components/earnWithUs";

  


const  Landing = () => {
    
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
        <div>
            <main className='bg-var(--background)'>
                <div className="my-16 p-8">
                    <div className="flex flex-col items-center justify-center text-xl ">
                        <div className="text-xl text-primary-blue">
                            What We offer
                        </div>
                        <div className="mt-4 text-secondary-text">
                            Featured Vehicles
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6 ">

                            {vehicles.map((carData) => (
                                <CarCard 
                                key={carData.id}
                                id={carData.id}
                                images={carData.images}
                                brand={carData.brand}
                                model={carData.model}
                                transmission={carData.transmission}
                                engine = {carData.engine}
                                passenger={carData.passenger}
                                pricePerDay={carData.pricePerDay}     
                            />
                            ))}
                    </div>       
                </div>

                <About/>
                <EarnWithUs/>

                <div className="m-16 p-8">
                    <div className="flex flex-col items-center justify-center text-xl ">
                        <div className="text-xl text-primary-blue">
                            Nos services
                        </div>
                        <div className="mt-4 text-secondary-text">
                            Happy Clients
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6">    
                        {vehicles.map((carData) => (
                                <CarCard 
                                key={carData.id}
                                id={carData.id}
                                images={carData.images}
                                brand={carData.brand}
                                model={carData.model}
                                transmission={carData.transmission}
                                engine = {carData.engine}
                                passenger={carData.passenger}
                                pricePerDay={carData.pricePerDay}     
                            />
                            ))}
                    </div>
                </div>
                
                <Records/>
            </main>
        </div>
    );
}

export default Landing;
