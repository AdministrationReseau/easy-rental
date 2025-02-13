import Image from 'next/image';
import Stars from '../Stars';
import { CarProps } from '@/utils/types/CarProps';
import { rentalInfoProps } from '@/utils/types/RentalInfoProps';


const RentalSummary: React.FC<CarProps & { rentalInfo?: rentalInfoProps }> = ({
    brand,
    model,
    rating,
    reviews,
    pricePerDay,
    images,
    rentalInfo
}) => {
    return (
        <div className="bg-white text-gray-700 rounded-lg p-4 max-w-full shadow-md overflow-hidden">
            {/* Header - Brand, Model, Like Button */}
            <div className="flex flex-col py-2">
                <h2 className="text-lg font-semibold text-gray-800">
                    <b>Rental Summary</b>
                </h2>
                <p className='text-secondary-text text-sm'>Prices may change depending on the length of the rental and the price of your rental car</p>
            </div>
            <div className='flex py-6 flex-row justify-between items-center'>
                {/* Image Section */}
                <div className="flex items-center justify-center bg-gray-100">
                    {images?.[0] && (
                        <Image
                            src={images[0]}
                            alt={`${brand} ${model}`}
                            width={200}
                            height={200}
                            className="object-contain rounded-lg"
                        />
                    )}
                </div>
                <div>
                    <span>
                        <h1 className='text-xl text-primary-text'><b>{brand} {model}</b></h1>
                    </span>
                    <span className='flex flex-row w-full py-4'>
                        <Stars value={rating  ?? 0} precision={1} />
                       <span className='px-4'>{reviews.length} + Reviewer</span> 
                    </span>
                </div>
            </div>
            <div className='flex justify-center'>
                <hr className='w-[80%] h-4'/>
            </div>
            <div className='flex flex-col gap-2'>
                <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Name:</p> 
                    <p className='text-primary-text text-xl'>{rentalInfo?.user.name || ''}</p>
                </span>
                <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Phone:</p> 
                    <p className='text-primary-text text-xl'>{rentalInfo?.user.phone || ''}</p>
                </span><span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>City:</p>
                    <p className='text-primary-text text-xl'>{rentalInfo?.user.city || ''}</p>
                </span>
                <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Billing Address:</p>
                    <p className='text-primary-text text-xl'>{rentalInfo?.user.address || ''}</p>
                </span>
                <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Pick-Up Place:</p> 
                    <p className='text-primary-text text-xl'>{rentalInfo?.pick_up.place || ''}</p>
                </span>
                <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Return Place:</p> 
                    <p className='text-primary-text text-xl'>{rentalInfo?.drop_off.place || ''}</p>
                </span>
                <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Payment Method:</p>  {/* Added Payment Method field */}
                    <p className='text-primary-text text-xl'>{rentalInfo?.payment_method || ''}</p>
                </span>
                
                 <span className='flex flex-row justify-between'>
                     <p className='text-secondary-text'>Driver Name:</p> 
                     <p className='text-primary-text text-xl'>{rentalInfo?.driver.name || ''}</p>
                 </span>
                
            </div>

            <div className='flex flex-row justify-between py-2'>
                <h1 className='text-secondary-text'> Subtotal</h1>
                <p><b>{pricePerDay} Francs cfa</b></p>
            </div>
            <div className='flex flex-row justify-between py-2'>
                <h1 className='text-secondary-text'> Tax</h1>
                <p><b>0 Francs cfa</b></p>
            </div>
            <div>
                <button className="py-2 px-4 w-full bg-secondary-blue text-white text-sm rounded-md transition duration-200 transform hover:scale-105 hover:bg-primary-blue">
                    Apply Promo Code
                </button>
            </div>
            <div className='flex flex-row justify-between py-2'>
                <span className='flex flex-col py-2 '>
                    <h1><b>Total Rental price</b></h1>
                    <p className='text-secondary-text text-sm'>Overall price and includes rental discount</p>
                </span>
                <span className='flex items-center text-xl'>
                    <b>{pricePerDay} FCFA</b>
                </span>
            </div>
        </div>
    );
};

export { RentalSummary };
