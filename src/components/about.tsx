'use client'

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FitScreen } from "@mui/icons-material";



const  AboutUS = () => {

    return (

        <div className="relative flex  items-center rounded-lg  md:h-[500px] p-8 flex-col md:flex-row">
            <div className="flex md:bg-white rounded-l-lg h-full items-center">
                <div className="h-full md:h-[70%] inset-y-0 md:left-1/8 md:z-10 md:translate-x-1/4 translate-y-2 bg-gray-200 rounded-lg shadow-md overflow-hidden">
                    <img
                        src="/about_rental.png"
                        alt="Welcome"
                        className="h-full w-auto "
                    />
                </div>
            </div>

            {/* Section droite (bleu) */}
            <div className="flex-[3]  flex justify-start bg-blue-500 p-8  text-white rounded-lg h-full">
                <div className="flex-1 ">

                </div>
                <div className=" flex-[3] md:w-2/3 w-full mt-6  md:text-base rounded-lg flex flex-col justify-center text-left">
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
                        everything that was left from its origin would be the word and and
                        the Little Blind Text should turn around and return to its own, safe
                        country.
                    </p>
                    <Link
                        href="/"
                        className=" font-semibold hover:underline"
                    >
                        Search Vehicle
                    </Link>
                </div>
            </div>
        </div>

    );
}

export default AboutUS;