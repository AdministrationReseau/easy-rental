import VisitorsChart from '@/components/organisation/VisitorsChart';
import RevenueChart from '@/components/organisation/RevenueChart';
import React from 'react'
import HighlightCard from '@/components/organisation/HighlightCard';
import EntityCard from '@/components/organisation/EntityCard';

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
                        <RevenueChart revenues = {revenues} />
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

