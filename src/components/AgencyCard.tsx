'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Favorite, FavoriteBorder, People, Star, AccessTime } from '@mui/icons-material';
import Image from "next/image";
import { AgencyProps } from '@/utils/types/AgencyProps';

interface LikeProps {
    isLiked: boolean;
    onClick: () => void;
}

const LikeButton: React.FC<LikeProps> = ({ isLiked, onClick }) => {
    return (
      <button onClick={onClick} className="text-xl">
          {isLiked ? (
            <Favorite className="text-red-500" />
          ) : (
            <FavoriteBorder className="text-gray-500" />
          )}
      </button>
    );
};

const AgencyCard: React.FC<AgencyProps> = ({
                                               id,
                                               city,
                                               quater,
                                               followers,
                                               rating,
                                               slogan,
                                               type,
                                               name,
                                               images,
                                               description,
                                               openingTime,
                                               closingTime,
                                               createdAt,
                                               updatedAt,
                                               reviews,
                                               onLike,
                                               onDislike,
                                           }) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const isAgencyOpen = (agency: AgencyProps) => {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const [openingHour, openingMinute] = agency.openingTime.split(':').map(Number);
        const [closingHour, closingMinute] = agency.closingTime.split(':').map(Number);
        const openingTime = openingHour * 60 + openingMinute;
        const closingTime = closingHour * 60 + closingMinute;
        return currentTime >= openingTime && currentTime <= closingTime;
    };

    const toggleLike = () => {
        if (onLike && onDislike) {
            setIsLiked(!isLiked);
            if (!isLiked) {
                onLike(id);
            } else {
                onDislike(id);
            }
        } else {
            console.log("Not likable", id);
        }
    };

    const agency = {
        id: id,
        city: city,
        quater: quater,
        name: name,
        followers: followers,
        rating: rating,
        slogan: slogan,
        images: images,
        description: description,
        openingTime: openingTime,
        closingTime: closingTime,
        type: type,
        createdAt: createdAt,
        updatedAt: updatedAt,
        reviews: reviews,
        onLike: onLike,
        onDislike: onDislike
    };

    const isOpen = isAgencyOpen(agency);

    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-[280px] transition-transform transform hover:scale-105">
          <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">{name}</h2>
                  <LikeButton isLiked={isLiked} onClick={toggleLike} />
              </div>
              <p className="text-sm text-gray-500 italic mb-2">{type}</p>
              <p className="text-gray-600 text-base mb-4">{slogan}</p>
              <div className="relative w-full h-48 mb-4">
                  <Image
                    src={images[0]}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
              </div>
              <div className="flex justify-between mb-4">
                  <div className="flex items-center space-x-1">
                      <Star className="text-yellow-500" />
                      <span>{rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                      <People className="text-blue-500" />
                      <span>{followers}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                      <AccessTime className={isOpen ? "text-green-500" : "text-red-500"} />
                      <span>{isOpen ? 'Open' : 'Closed'}</span>
                  </div>
              </div>
              <div className="flex justify-between items-center">
                  <div>
                      <p className="text-lg font-semibold text-gray-800">{city}</p>
                      <p className="text-sm text-gray-500">{quater}</p>
                  </div>
                  <Link href={`/customer/agencies/${id}`}>
                      <button className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          View More
                      </button>
                  </Link>
              </div>
          </div>
      </div>
    );
};

export { AgencyCard };
