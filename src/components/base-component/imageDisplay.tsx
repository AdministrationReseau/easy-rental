// components/ImageDisplay.tsx
import React from 'react';

interface ImageDisplayProps {
  src: string;
  size: number;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ src, size }) => {
  return (
    <div
      className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden"
      style={{ width: size, height: size }}
    >
      <img 
        src={src} 
        alt="Image" 
        className="object-contain w-full h-full" 
      />
    </div>
  );
};

export default ImageDisplay;
