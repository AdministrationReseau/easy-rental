'use client';

import * as React from 'react';
import Image from 'next/image';
import { useState } from 'react';

interface ProfilImgProps {
  imagesPaths: string[]; // Tableau des chemins des images dans le dossier 'public'
  width: number;
  height: number;
}

export default function ProfilImg({
  imagesPaths,
  width = 300,
  height = 500,
}: ProfilImgProps) {
  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);

  const PROFIL_HEIGHT = (3 * height) / 5;
  const MARGIN_BETWEEN_IMAGES = 2;
  const MINIATURE = width / 3 - MARGIN_BETWEEN_IMAGES;

  const handleMiniatureClick = (index: number) => {
    setActiveImgIndex(index);
  };

  return (
    <div style={{ width: `${width}px`, margin: '8px auto' }}>
      {/* Image principale */}
      <div
        className="relative rounded-md shadow-sm border-2 border-primary-blue mb-4"
        style={{
          width: `${width}px`,
          height: `${PROFIL_HEIGHT}px`,
          overflow: 'hidden',
        }}
      >
        <Image
          src={imagesPaths[activeImgIndex]}
          alt="Main"
          layout="fill"
          className="object-contain"
          priority // Optimise le chargement de l'image principale
        />
      </div>

      {/* Images en miniatures */}
      <div
        className="flex flex-row gap-2 w-full overflow-x-auto"
        style={{ scrollBehavior: 'smooth' }}
      >
        {imagesPaths.map((imagePath, index) => (
          <div
            key={index}
            className={`relative cursor-pointer rounded-md shadow-sm ${
              index === activeImgIndex ? 'border-2 border-primary-blue' : ''
            }`}
            style={{
              width: `${MINIATURE}px`,
              height: `${MINIATURE}px`,
              overflow: 'hidden',
            }}
            onClick={() => handleMiniatureClick(index)}
          >
            <Image
              src={imagePath}
              alt={`Miniature ${index + 1}`}
              layout="fill"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
