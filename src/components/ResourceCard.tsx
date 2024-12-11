import Image from "next/image";
import Link from "next/link";
import { Driver, Vehicle } from "@/utils/types/resources";
import {
    Delete,
    Edit,
    RemoveRedEye
} from '@mui/icons-material';

interface ResourceCardProps {
    resource: Driver | Vehicle,
    openEditForm: (resourceId: number) => void,
    profilActive: boolean,
}

export const ResourceCard = ({resource, openEditForm, profilActive = false}: ResourceCardProps) => {
    const isVehicle: boolean = 'brand' in resource;
    const vehicleResource = resource as Vehicle;
    const driverResource = resource as Driver;

    const imgPath = isVehicle
        ? vehicleResource.images[0]
        : driverResource.profile_picture; 
  
    const title = isVehicle
    ? `${vehicleResource.license_plate} | ${vehicleResource.brand} ${vehicleResource.model} (${vehicleResource.year})`
    : `${driverResource.first_name} ${driverResource.last_name.toUpperCase()} | License No: ${driverResource.license_number}`;

    const content = isVehicle
        ? `${vehicleResource.passenger} passengers - capacity: ${vehicleResource.engine.capacity} L`
        : `${driverResource.age} years old - ${driverResource.email}`;

    const asideContents = isVehicle
        ? [
            `${vehicleResource.pricePerDay} FCFA (per day)`,
            `${vehicleResource.fuel_efficiency.city} L/100Km (city)`,
            `${vehicleResource.fuel_efficiency.highway} L/100Km (highway)`,
        ]
        : [
            `${driverResource.rating} / 5 (rating)`,
            `${driverResource.insurance_provider} (Insurance)`,
        ];

    return (
        <div className='bg-white rounded-md p-1 px-2 flex flex-row items-center gap-2 w-11/12 h-32 m-2 mx-auto border border-primary-blue/15 hover:border-primary-blue/15 hover:shadow-sm'>
            <div className='relative w-64 h-4/5 border border-black/5 rounded-md'>
                <Image 
                    src={imgPath}
                    alt={isVehicle ? 'Car Profile' : 'Driver Profile'}
                    fill 
                    style={{ objectFit: 'contain' }} 
                />
            </div>
            
            <div className='w-1 h-3/5 mx-1 bg-primary-blue/20'></div>
            
            <div className='grid grid-cols-[2fr_1fr] gap-2 w-full items-center'>
                <div className='flex flex-col pl-4'>
                    <h2 className='font-bold text-xl'>{title}</h2>
                    <p className='text-xm'>{content}</p>
                </div>
                <div className='flex flex-col gap-0 mx-2'>
                    {
                        asideContents.map((asideContent, index) => (
                            <div key={index} className='text-nowrap text-base text-gray-700'>{asideContent}</div>
                        ))
                    }
                </div>
            </div>
            
            <div className='w-1 h-3/5 mx-1 bg-primary-blue/20'></div>

            <div className={`flex ${profilActive ? 'flex-row' : 'flex-col'} gap-1 pr-1`}>
                {!profilActive &&
                    <Link href={`/${isVehicle ? 'cars' : 'drivers'}/${resource.id}`}>
                        <RemoveRedEye style={{ color: 'blue' }} onClick={() => {}} />
                    </Link>
                }
                <Edit style={{ color: 'blue' }} onClick={ () => openEditForm(resource.id) } />
                <Delete style={{ color: 'blue' }} />
            </div>

        </div>
    );
}
