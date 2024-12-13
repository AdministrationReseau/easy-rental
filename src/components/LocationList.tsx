import React from "react";
import Image from "next/image";

interface Location {
    id: string;
    name: string;
    type: string;
    date: string;
    price: string;
    image: string;
}

interface LocationListProps {
    locations: Location[];
}

const LocationList: React.FC<LocationListProps> = ({ locations }) => {
    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold mb-4 text-primary-text">Recent Locations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {locations.map((location) => (
                    <div
                        key={location.id}
                        className="flex items-center justify-between bg-whitish-background p-4 rounded-lg shadow-sm"
                    >
                        {/* Image et informations */}
                        <div className="flex items-center space-x-4">
                            <Image
                                src={location.image}
                                alt={location.name}
                                className="w-[100px] h-auto rounded-lg object-cover"
                                width={100}
                                height={100}
                            />
                            <div>
                                <h3 className="text-sm font-medium text-primary-text">{location.name}</h3>
                                <p className="text-xs text-secondary-text">{location.type}</p>
                            </div>
                        </div>

                        {/* Prix et date */}
                        <div className="flex flex-col items-end space-y-1">
                            <p className="text-sm font-semibold text-primary-text">{location.price}</p>
                            <p className="text-sm text-secondary-text">{location.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default LocationList;
