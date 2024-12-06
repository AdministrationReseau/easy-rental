import VisitorsChart from '@/components/organisation/VisitorsChart';
import RevenueChart from '@/components/organisation/RevenueChart';
import Image from 'next/image';
import React from 'react'

interface EntityCardProps {
    title: string,
    value: number,
    imgPath: string
}

const EntityCard = ({title, value, imgPath}: EntityCardProps) => {
    return (
        <div className='bg-white rounded-md p-1 font-bold flex flex-row items-center gap-2 w-72 h-24 m-2 border border-primary-blue/20 hover:border-primary-blue/25 hover:shadow-sm'>
            <div className='relative w-full h-full'>
                {/* Fill parent div */}
                <Image src={imgPath} alt="Car" fill style={{ 'objectFit': 'contain'}} />
            </div>
            <div className='w-1 h-3/5 bg-primary-blue/20'></div>
            <div className='flex flex-col w-full pl-4'>
                <h2 className='my-2'>{title}</h2>
                <p className='text-2xl'>{value}</p>
            </div>
        </div>
    );
}

interface HightlightCardProps {
    title: string
    topResources: { name: string, nbRequests: number, imgPath: string}[],
}

const HighlightCard = ({title, topResources}: HightlightCardProps) => {
    return (
        <div className='w-5/12 bg-white border-gray-200 shadow-md p-2 rounded-md'>
            <div className='border-b-2 border-primary-blue/20 p-2 text-primary-blue text-bold text-xl'>
                {title}
            </div>
            
            {topResources.map((resource, index) => (
                <div key={index} className='flex flex-row items-center gap-6 pl-6 mt-4'>
                    <div className='flex items-center justify-center rounded-full border border-primary-blue/50 text-center w-10 h-10 '>{index + 1}</div>
                    <div className='flex flex-row gap-2'>
                        <div className='flex flex-row items-center gap-2'>
                            <Image src={resource.imgPath} alt="Car" width={48} height={48} />
                        </div>
                        <div>
                            <h2 className='font-bold'>{resource.name}</h2>
                            <p className='text-gray-600'>{resource.nbRequests} Sollicitations</p>
                        </div>
                    </div> 
                </div>
            ))}
        </div>
    );
}

export default function DashboardPage() {
    const cardContents = [
        { title: 'Vehicles', value: 100, imgPath: '/assets/organisation/cars/car.png'},
        { title: 'Drivers', value: 7, imgPath: '/assets/organisation/drivers/1.jpeg'},
        { title: 'Reservations', value: 10, imgPath: '/assets/organisation/cars/car2.png'}
    ]

    const topDrivers = [
        { name: 'Jean', nbRequests: 7, imgPath: '/assets/organisation/drivers/1.jpeg'},
        { name: 'Pierre', nbRequests: 5, imgPath: '/assets/organisation/drivers/2.jpeg'},
        { name: 'Paul', nbRequests: 3, imgPath: '/assets/organisation/drivers/3.jpeg'},
        { name: 'Marie', nbRequests: 2, imgPath: '/assets/organisation/drivers/4.jpeg'},
        { name: 'Jacques', nbRequests: 1, imgPath: '/assets/organisation/drivers/5.jpeg'},
    ]

    const topVehicles = [
        { name: 'Mercedes', nbRequests: 7, imgPath: '/assets/organisation/cars/car.png'},
        { name: 'BMW', nbRequests: 5, imgPath: '/assets/organisation/cars/car2.png'},
        { name: 'Toyota', nbRequests: 3, imgPath: '/assets/organisation/cars/car.png'},
        { name: 'Audi', nbRequests: 2, imgPath: '/assets/organisation/cars/car2.png'},
        { name: 'Fiat', nbRequests: 1, imgPath: '/assets/organisation/cars/car.png'},
    ]

    const revenues = [1100, 2250, 750, 1250, 1500, 1750, 2000, 2050];
    const totalRevenue = 3_500_000;
    const creationDate = new Date('2023-01-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className='p-4 flex flex-col gap-2 bg-primary-blue/5 rounded-md'>
            <div className='w-full xh-12 p-4 flex flex-row items-center justify-between'>
                <div>
                    <h2 className='font-bold text-xl'>Overview of your organization</h2>
                    <div className='text-gray-600 text-sm'>
                        You have generated <span className='font-black'>{totalRevenue} FCFA</span> in revenue since <span className='font-black'>{creationDate}</span>
                    </div>
                </div>
                
                <div>
                    <label htmlFor='filter-start-date' className='text-gray-500 mr-2'>Show data from :</label>
                    <input id='filter-start-date' type='date' className='border border-primary-blue/15 p-1 rounded-sm' />
                </div>
            </div>
            <div className='mt-4 h-full flex flex-row gap-2'>
                <div className='flex flex-col gap-2'>
                    {cardContents.map((cardContent, index) => (
                        <EntityCard key={index} title={cardContent.title} value={cardContent.value} imgPath={cardContent.imgPath} />
                    ))}
                    <div className='mt-3'>
                        <VisitorsChart nbVisitors={12} nbLocationVisitors={5} />
                    </div>
                </div>
                <div className='w-full h-full'>
                    <div className=''>
                        <RevenueChart revenues = {revenues} totalRevenue={1500000}/>
                    </div>
                    <div className='w-full flex flex-row justify-center gap-8'>
                        <HighlightCard title='Top Drivers' topResources={topDrivers} />
                        <HighlightCard title='Top Vehicles' topResources={topVehicles} />
                    </div>
                </div>
            </div>
        </div>
    )
}

