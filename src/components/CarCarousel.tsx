// components/CarCarousel.tsx
'use client'

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar, A11y ,Autoplay} from 'swiper/modules';
import {CarCard} from '@/components/CarCard';


interface Engine {
  type: string;         // Type de carburant (e.g., "Gasoline", "Diesel")
  horsepower: number;   // Puissance en chevaux
  capacity: number;     // Capacité du moteur en litres
}

interface FuelEfficiency {
  city: number;         // Consommation en ville (miles/gallon ou autre unité)
  highway: number;      // Consommation sur autoroute
}

interface Registration {
  state: string;        // État de la plaque d'immatriculation
  expiry: string;       // Date d'expiration de l'enregistrement
}

interface Owner {
  name: string;         // Nom du propriétaire
  address: string;      // Adresse du propriétaire
  phone: string;        // Numéro de téléphone
  email: string;        // Adresse email
}

interface ServiceHistory {
  date: string;         // Date du service
  service_type: string; // Type de service effectué (e.g., "Oil Change")
  mileage: number;      // Kilométrage lors du service
  provider: string;     // Fournisseur ou centre de service
}

interface Insurance {
  provider: string;     // Compagnie d'assurance
  policy_number: string; // Numéro de la police d'assurance
  expiry: string;       // Date d'expiration de l'assurance
}

interface Vehicle {
  id: number;                  // Identifiant unique du véhicule
  type: string;                // Type de véhicule (e.g., "Car", "Motorcycle")
  brand: string;               // Marque du véhicule (e.g., "Toyota")
  model: string;               // Modèle du véhicule
  year: number;                // Année de fabrication
  passenger: number;           // Nombre maximum de passagers
  pricePerDay: number;         // Prix par jour de location
  vin: string;                 // Numéro de série du véhicule
  engine: Engine;              // Détails sur le moteur
  transmission: string;        // Type de transmission (e.g., "Automatic")
  color: string;               // Couleur du véhicule
  fuel_efficiency: FuelEfficiency; // Efficacité énergétique
  license_plate: string;       // Plaque d'immatriculation
  registration: Registration;  // Informations sur l'enregistrement
  owner: Owner;                // Informations sur le propriétaire
  service_history: ServiceHistory[]; // Historique des services
  insurance: Insurance;        // Informations sur l'assurance
  images: string[];            // Liste des images du véhicule
}

const CarCarousel: React.FC = () => {

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  

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
                    pricePerDay={carData.pricePerDay} onLike={function (): void {
                        throw new Error('Function not implemented.');
                    } } onDislike={function (): void {
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