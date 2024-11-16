'use client'

import * as React from 'react';
import Image from 'next/image';
import { useState } from 'react';

interface CarProfilImgProps {
    imagesPaths: string[], /* array of image paths names in the 'public' folder without the '/' start */
    width: number,
    height: number,
}

export default function     CarProfilImg({ imagesPaths, width = 300, height = 500 }: CarProfilImgProps) {
    const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
    const [profilPath, setProfilPath] = useState<string>(imagesPaths[0]);

    const PROFIL_HEIGHT = 3 * height / 5;
    const MARGIN_BETWEEN_IMAGES = 2;
    const MINIATURE = width / 3 - MARGIN_BETWEEN_IMAGES;

    const handleMiniatureClick = (index: number) => {
        setActiveImgIndex(index);
        setProfilPath(imagesPaths[index]);
    }

    return (
        <div className={`w-[${width}px] m-2`}>
            {/* Main image */}
            <div className="relative rounded-md rounded-br-none rounded-bl-none shadow-sm shadow-primary-blue/15 pb-4 border-2 border-b-primary-blue" style={{ width: `${width}px`, height: `${PROFIL_HEIGHT}px`, overflow: "hidden", }}>
                <Image src={`/${profilPath}`} alt="Car" layout="fill" className="object-contain" />
            </div>

            {/* Car Images in minature */}
            <div className='my-1 scrollable flex flex-row gap-[${MARGIN_BETWEEN_IMAGES}] w-full overflow-x-auto scroll-co'>
                {imagesPaths.map((imagePath, index) => (
                    <Image key={index} src={`/${imagePath}`} alt="Car" width={MINIATURE} height={MINIATURE} className={`rounded-md rounded-tr-none rounded-tl-none shadow-sm shadow-primary-blue/15 ${index === activeImgIndex ? 'border-2 border-primary-blue' : ''}`} onClick={() => handleMiniatureClick(index)}/>
                ))}
            </div>
        </div>
    );
}