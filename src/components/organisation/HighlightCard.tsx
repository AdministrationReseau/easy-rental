import Image from 'next/image';

interface HightlightCardProps {
    title: string
    topResources: { name: string, nbRequests: number, imgPath: string}[],
}

export default function HighlightCard({title, topResources}: HightlightCardProps) {
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