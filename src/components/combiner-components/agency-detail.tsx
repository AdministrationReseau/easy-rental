// components/AgencyDetail.tsx
import React from 'react';
import Image from 'next/image';

const AgencyDetail: React.FC = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-xl max-w-4xl mx-auto mt-12 shadow-lg space-y-6">
      {/* Titre de l'agence */}
      <h1 className="text-4xl font-bold text-blue-600">Agency One</h1>
      
      {/* Galerie d'images */}
      <div className="flex gap-4">
        {/* Image principale */}
        <div className="bg-white rounded-lg w-full flex justify-center items-center shadow-md">
          <div className="bg-blue-100 p-10 rounded-full w-16 h-16">
            
          </div>
          <Image
        src="/hopital.jpg"
        alt="Hôpital"
        layout="responsive"
        width={16} // Ratio de la largeur
        height={9} // Ratio de la hauteur
      />
        </div>

        {/* Images secondaires */}
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg w-24 h-24 flex justify-center items-center shadow-md">
              <div className="bg-blue-100 p-4 rounded-full w-8 h-8">
                
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">

      
      {/* Description et Évaluation */}
      <div className="space-y-2">
         {/* Étoiles d'évaluation */}
         <div className="flex justify-between">
          
       
        <h2 className="text-2xl font-semibold text-blue-600">Description</h2>
         {/* Étoiles d'évaluation */}
         <div className="flex items-center">
          <div className="flex text-yellow-500 text-lg">
            {[...Array(5)].map((_, index) => (
              <span key={index}>&#9733;</span>
            ))}
          </div>
          <span className="text-gray-500 ml-2">(16 avis)</span>
        </div>
        </div>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae enim in eros elementum tristique.
        </p>
       
      </div>

      {/* Informations de l'agence */}
      <div className="flex flex-row md:flex-row justify-between space-y-4 md:space-y-0 text-blue-600">
        <div className="flex items-center">
          <span className="material-icons text-xl">place</span>
          <span className="ml-2">Adresse : 123 Rue de l&lsquo;Agence, Douala</span>
        </div>
        <div className="flex items-center">
          <span className="material-icons text-xl">schedule</span>
          <span className="ml-2">Horaires : 8H00 - 18H30</span>
        </div>
      </div>
      </div>

      {/* Affiche les vehicules de l'agence */}
      <div className="flex justify-between items-center">
        
       
      </div>
    </div>
  );
};

export default AgencyDetail;
