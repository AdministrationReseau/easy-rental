import * as React from 'react';
import Image from 'next/image';

export default function CarProfilImg() {
    const profil_path = 'car.png';
    const images_paths = ['car.png', 'car.png', 'car.png', 'car.png', 'car.png', 'car.png'];
    const PROFIL_SIDE_SIZE = 300;
    const MARGIN_BETWEEN_IMAGES = 2;
    const MINIATURE = PROFIL_SIDE_SIZE / 3 - MARGIN_BETWEEN_IMAGES;

    return (
        <div className={`w-[${PROFIL_SIDE_SIZE}px] m-2`}>
            {/* Main image */}
            <div className='w-full'>
                <Image src={`/${profil_path}`} alt="Car" width={PROFIL_SIDE_SIZE} height={PROFIL_SIDE_SIZE} className='rounded-md shadow-sm shadow-primary-blue/15'/>
            </div>

            {/* Car Images in minature */}
            <div className='scrollable flex flex-row gap-[${MARGIN_BETWEEN_IMAGES}] w-full overflow-x-auto scroll-co'>
                {images_paths.map((image_path, index) => (
                    <Image key={index} src={`/${image_path}`} alt="Car" width={MINIATURE} height={MINIATURE} className='rounded-md shadow-sm shadow-primary-blue/15' />
                ))}
            </div>
        </div>
    );
}