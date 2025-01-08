import Image from 'next/image';

interface EntityCardProps {
    title: string,
    value: number,
    imgPath: string
}

export default function EntityCard({title, value, imgPath}: EntityCardProps) {
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