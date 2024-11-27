import React from 'react';
import Stars from "@/components/Stars";
import DefaultProfile from "@/components/DefaultProfile";

const Reviews = ({name, starsValue, message}: {name: string, starsValue: number, message: string}) => {
    return (
        <div>
            <div
                className="flex w-full p-4 max-w-lg flex-col rounded-lg bg-white shadow-sm border border-slate-200 my-6">
                <div className="flex items-center gap-4 text-slate-800">
                    <DefaultProfile name={name} />
                    <div className="flex w-full flex-col">
                        <div className="flex items-center justify-between">
                            <h5 className="text-xl font-semibold text-slate-800">
                                {name}
                            </h5>
                            <Stars  value={starsValue} precision={0.5} />
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <p className="text-base text-slate-600 font-light leading-normal">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Reviews;
