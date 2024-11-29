'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
  


const  About = () => {

    return (
        
        <div className="relative flex  items-center rounded-lg shadow-lg">
            <div className="flex bg-white p-8 rounded-l-lg  ">   
                <div className=" inset-y-0 left-1/4 z-10 translate-x-1/2 translate-y-2">
                <Image
                                src="/hospital2.jpg"
                                alt="Welcome"
                                width={350} 
                                height={350}
                                className=" w-[95%] rounded-lg object-cover shadow-md"
                            />
                </div>
            </div>
    
            {/* Section droite (bleu) */}
            <div className="flex-[3]  flex justify-start bg-blue-500 p-8  text-white rounded-lg">
                <div className="flex-[3] ">
                
                </div>
                <div className="md:w-2/3 w-full mt-6  md:text-base rounded-lg">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                    Welcome to Easy Rent
                    </h2>
                    <p className=" mb-4">
                    A small river named Duden flows by their place and supplies it with
                    the necessary regelialia. It is a paradisematic country, in which
                    roasted parts of sentences fly into your mouth.
                    </p>
                    <p className=" mb-4">
                    On her way she met a copy. The copy warned the Little Blind Text, that
                    where it came from it would have been rewritten a thousand times and
                    everything that was left from its origin would be the word "and" and
                    the Little Blind Text should turn around and return to its own, safe
                    country.
                    </p>
                    <a
                    href="/search-vehicle"
                    className=" font-semibold hover:underline"
                    >
                    Search Vehicle
                    </a>
                </div>
            </div>
        </div>
        
    );
}

export default About;
