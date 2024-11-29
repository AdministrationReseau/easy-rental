import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {agencies, Agency} from "../../../public/data/agencies.json";

const AgencyDetails: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const agency: Agency | undefined = agencies.find(
        (agency) => agency.id === Number(id)
    );

    if (!agency) {
        return <p>Agence introuvable</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold">{agency.name}</h1>
            <div className="flex space-x-6 mt-4">
                <Image
                    src={agency.image}
                    alt={agency.name}
                    width={200}
                    height={200}
                    className="rounded-md"
                />
                <div>
                    <p className="text-lg">{agency.description}</p>
                    <p className="text-sm text-gray-600">Ville: {agency.city}</p>
                    <p className="text-sm text-gray-600">
                        Horaires: {agency.openingTime} - {agency.closingTime}
                    </p>
                    <p className="text-sm text-gray-600">Type: {agency.type}</p>
                    <p className="text-sm text-gray-600">Étoiles: {agency.stars}</p>
                </div>
            </div>
        </div>
    );
};

export default AgencyDetails;
