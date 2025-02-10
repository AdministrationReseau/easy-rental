import Image from "next/image";
import { Driver } from "@/utils/types/resources";
import {
    Delete,
    Edit,
} from '@mui/icons-material';
import { CarProps } from "@/utils/types/CarProps";
import { DriverProps } from "@/utils/types/DriverProps";

interface ResourceCardProps {
    resource: DriverProps | CarProps,
    profilActive: boolean,
    onDelete: () => void,
    onEdit: () => void
}

export const ResourceCard = ({resource, profilActive = false, onDelete,onEdit}: ResourceCardProps) => {
    const isVehicle: boolean = 'brand' in resource;
    const vehicleResource = resource as CarProps;
    const driverResource = resource as Driver;

    const imgPath = isVehicle
        ? vehicleResource.images[0]
        : driverResource.profile_picture; 
  
    const title = isVehicle
    ? `${vehicleResource.brand} ${vehicleResource.model}`
    : `${driverResource.first_name} ${driverResource.last_name.toUpperCase()} | License No: ${driverResource.license_number}`;

    const asideContents = isVehicle
        ? [
            `${vehicleResource.pricePerDay} FCFA (per day)`,
            `${vehicleResource.fuel_efficiency?.city} L/100Km (city)`,
            `${vehicleResource.fuel_efficiency?.highway} L/100Km (highway)`,
        ]
        : [
            `${driverResource.rating} / 5 (rating)`,
            `${driverResource.insurance_provider} (Insurance)`,
        ];

    return (
        <div className='bg-white rounded-md p-2 flex flex-row gap-2 w-full h-48 m-2 mx-auto border border-primary-blue/15 hover:border-primary-blue/15 hover:shadow-sm'>
            <div className='relative w-full h-full border border-black/5 rounded-md'>
                <Image 
                    src={imgPath}
                    alt={isVehicle ? 'Car Profile' : 'Driver Profile'}
                    fill 
                    style={{ objectFit: 'contain' }} 
                />
            </div>
            
            <div className='pl-4 pt-4 w-full h-full'>
                <div className='flex flex-col h-fit'>
                    <h2 className='font-semibold text-base'>{title}</h2>
                </div>
                <div className='flex flex-col pt-8 h-full'>
                    {
                        asideContents.map((asideContent, index) => (
                            <div key={index} className='text-nowrap text-base text-gray-700'>{asideContent}</div>
                        ))
                    }
                </div>
            </div>

            <div className={`flex ${profilActive ? 'flex-row' : 'flex-col'} gap-1 pr-1`}>
                <Edit style={{ color: 'blue' }} onClick={(event) => { event.stopPropagation(); onEdit();}}/>
                <Delete style={{ color: 'red' }} onClick={(event) => { event.stopPropagation(); onDelete();}} />
            </div>

        </div>
    );
}
