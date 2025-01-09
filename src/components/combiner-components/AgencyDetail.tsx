// components/AgencyDetail.tsx
import React, { useState, useEffect } from "react";
import { AgencyProps } from '@/utils/types/AgencyProps';
import Stars from "../Stars";
import Link from "next/link";
import Reviews from "../Reviews";
import { CarProps } from "@/utils/types/CarProps";
import { CarCard } from "../CarCard";


const AgencyImage: React.FC<{ agency: AgencyProps }> = ({ agency }) => {
  const [currentImage, setCurrentImage] = useState(agency.images[0]);
  if (!agency) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* Galerie d'images */}
      <div className="px-2 w-full">
        {/* Main Image Section */}
        <div
          className="relative bg-cover bg-center min-h-[300px] min-w-[500px] rounded-lg shadow-lg w-full"
          style={{ backgroundImage: `url(${currentImage})` }}
        ></div>

        {/* Thumbnail Images Section */}
        <div className="flex justify-left mt-6 w-full  gap-6">
          {agency.images.slice(0, 3).map((image, index) => (
            <div
              key={index}
              className="relative bg-cover bg-center w-36 h-40 rounded-lg cursor-pointer"
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setCurrentImage(image)}
            ></div>
          ))}

        </div>
      </div>
    </>
  )
}

const AgencyInfo: React.FC<{ agency: AgencyProps }> = ({ agency }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full space-y-4 ">
    {/* Favorite Icon Placeholder */}
    <div className="absolute top-10 right-10 text-gray-400 hover:text-red-500 cursor-pointer">
      ♥
    </div>
      <div>
        <h3 className="text-xl font-bold text-primary-text">
          {agency.name} {agency.type}
        </h3>
        <span className='flex flex-row py-4 gap-2'>
          <Stars value={agency.rating} precision={1} />
          {agency.reviews.length} + Reviewer
        </span>
      </div>

      {/* Description */}
      <p className="text-secondary-text"><i>{agency.slogan}</i></p>
      <p className="text-sm text-gray-500 py-2">{agency.description}</p>


      {/* Description et Évaluation */}
      <div className="space-y-2">
        {/* Étoiles d'évaluation */}
        <div className="flex justify-between">

        </div>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae enim in eros elementum tristique.
        </p>

      </div>

      {/* Specifications */}
      <div className="grid grid-cols-3 gap-4 text-sm text-gray-500 py-4">
        <div>
          <span className="block py-2">localisation</span>
          <span className="block font-bold text-gray-800">{agency.city + ', ' + agency.quater}</span>
        </div>
        <div>
          <span className="block py-2">Heure Ouverture</span>
          <span className="block font-bold text-gray-800">{agency.openingTime} </span>
        </div>

        <div>
          <span className="block py-2">Heure Fermeture</span>
          <span className="block font-bold text-gray-800">{agency.closingTime}</span>
        </div>

      </div>
    </div>
  )
}

const AgencyVehicles: React.FC<{ agency: AgencyProps }> = ({ agency }) => {
  const [vehicles, setVehicles] = useState<CarProps[]>([]);
  // On doir rechercher les véhicules qui possedent en clé étrangere l'id de l'agency
  const id_agency = agency.id;
  console.log(id_agency);
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
    <div className=" mx-auto p-5 w-full flex justify-center items-center">
      <div className="gap-4 w-full flex flex-wrap ml-12 ">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <CarCard
            key={vehicle.id}
            id={vehicle.id}
            images={vehicle.images}
            brand={vehicle.brand}
            rating={vehicle.rating}
            reviews={vehicle.reviews}
            model={vehicle.model}
            transmission={vehicle.transmission}
            engine={vehicle.engine}
            passenger={vehicle.passenger || 4}
            pricePerDay={vehicle.pricePerDay}
            type={vehicle.type}
            year={vehicle.year}
            description ={vehicle.description}
            vin={vehicle.vin}
            fonctionnalities={vehicle.fonctionnalities}
            color={vehicle.color}
            fuel_efficiency={vehicle.fuel_efficiency}
            license_plate={vehicle.license_plate}
            registration={vehicle.registration}
            owner={vehicle.owner}
            service_history={vehicle.service_history}
            insurance={vehicle.insurance}
            favorite={false}
            onLike={function (id: number): void {console.log(id)}}
            onDislike={function (id: number): void {console.log(id)} }
            />))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No vehicles available matching your filters.
          </p>
        )}
      </div>
    </div>
  )
}


const AgencyDetail: React.FC<{ agency: AgencyProps }> = ({ agency }) => {

  return (
    <div className="space-y-8 bg-red w-full">
      <Link href="/customer/agencies">
        <h1 className="p-4 m-4">&gt; Back to Agencies</h1>
      </Link>
      {/* Titre de l'agencies */}
      <div className="flex flex-col md:flex-row gap-6 w-full rounded-lg ">
        <div className="w-[60%]  px-4">
          <AgencyImage agency={agency} />
        </div>
        <div className="w-[40%] px-4 ">
          <AgencyInfo agency={agency} />
        </div>
      </div>
      {/* Reviews Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h4 className="font-bold text-lg">Reviews</h4>

        {agency.reviews.map((review: {reviewer:string, comment: string;rating: number;}, index: number) => (
          <Reviews
            key={index}
            name={review.reviewer}
            starsValue={review.rating}
            message={review.comment}
          />
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="font-bold text-lg">Our Cars</h4>
      </div>
      <AgencyVehicles agency={agency}/>

      {/* Recommendations Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="font-bold text-lg">You would also like</h4>

      </div>
    </div>
  );
};

export default AgencyDetail;
