import React from 'react';
import Stars from "@/components/Stars";
import DefaultProfile from "@/components/DefaultProfile";
import { Card, CardContent } from '@/components/ui/card';

interface ReviewProps {
  name: string;
  starsValue: number;
  message: string;
  date?: Date;
  verified?: boolean;
  helpful?: number;
}

const Reviews = ({
  name,
  starsValue,
  message,
  date = new Date(),
  verified = false,
  helpful = 0
}: ReviewProps) => {

  return (
    <Card className="w-full transition-all duration-200 hover:shadow-md">
      <CardContent className="p-6">
        {/* En-tête avec profil et étoiles */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <DefaultProfile name={name} />
              {verified && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-grow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h5 className="text-lg font-semibold text-slate-900">
                    {name}
                  </h5>
                  <p className="text-sm text-slate-500">{date.toLocaleString()}</p>
                </div>
                <Stars value={starsValue} precision={0.5} />
              </div>
            </div>
          </div>
        </div>

        {/* Corps du message */}
        <div className="mt-4">
          <p className="text-base text-slate-700 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Footer avec actions */}
        <div className="mt-6 flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-2">
            {verified && (
              <span className="text-sm text-green-600 flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                Achat vérifié
              </span>
            )}
          </div>
          <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905c0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            {helpful > 0 ? `${helpful} personnes ont trouvé cet avis utile` : "Utile ?"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Reviews;
