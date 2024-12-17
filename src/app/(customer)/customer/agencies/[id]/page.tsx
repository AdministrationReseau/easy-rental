'use client'

import React from 'react';
import { useParams } from 'next/navigation';

interface AgencyDetailsProps {
}

const AgencyDetails: React.FC<AgencyDetailsProps> = () => {
  const { id } = useParams();

  const [agency, setAgency] = React.useState<any>(null);

  React.useEffect(() => {
    // Simulez un appel API ou récupérez les détails de l'agence selon `id`.
    fetch(`/data/agencies.json`)
      .then((res) => res.json())
      .then((data) => {
        const foundAgency = data.agency.find((agency: any) => agency.id.toString() === id);
        setAgency(foundAgency);
      })
      .catch((err) => console.error('Error fetching agency details:', err));
  }, [id]);

  if (!agency) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{agency.name}</h1>
      <p className="text-gray-600">{agency.description}</p>
      <div>
        <strong>City:</strong> {agency.city}
      </div>
      <div>
        <strong>Stars:</strong> {agency.stars}
      </div>
      <div>
        <strong>Followers:</strong> {agency.followers}
      </div>
      <div>
        <strong>Quater:</strong> {agency.quater}
      </div>
      <div className="mt-4">
        <h2 className="font-semibold">Images:</h2>
        <div className="grid grid-cols-3 gap-4">
          {agency.images.map((img: string, idx: number) => (
            <img key={idx} src={img} alt={`Agency Image ${idx + 1}`} className="w-full h-auto" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgencyDetails;
