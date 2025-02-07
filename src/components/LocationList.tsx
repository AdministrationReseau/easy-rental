import React from "react";
import Image from "next/image";
import Link from "next/link";

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
            {/* <h2 className="text-xl font-semibold mb-4 text-primary-text">Recent Locations</h2> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {locations.map((location, index) => (
                    <Link href={`/rentals/${location.id}`} key={index}>
                    <div
                        key={index}
                        className=" w-full flex flex-col md:flex-row items-center justify-between bg-whitish-background p-4 rounded-lg shadow-sm"
                    >
                        {/* Image et informations */}
                        <div className="w-full h-full flex items-center justify-between space-x-2">
                            <Image
                                src={location.image}
                                alt={location.name}
                                className="w-[100px] h-auto rounded-lg object-cover"
                                width={100}
                                height={100}
                            />
                            <div className="flex flex-col justify-around h-full w-[50%]">
                                <h3 className="text-md font-medium text-primary-text">{location.name}</h3>
                                <p className="text-xs text-secondary-text">{location.type}</p>
                            </div>
                        </div>

                        {/* Prix et date */}
                        <div className="flex justify-between w-full mt-2 md:mt-0 md:flex-col flex-row items-end space-y-1">
                            <p className="text-sm font-semibold text-primary-text">{location.price}</p>
                            <p className="text-sm text-secondary-text">{location.date}</p>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );

};

export default LocationList;
