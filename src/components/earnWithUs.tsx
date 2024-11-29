import React from "react";
import Image from "next/image";

const EarnWithUs = () => {
  return (
    <section className="bg-blue-500 text-white py-12 px-6 md:py-16 md:px-20 rounded-lg relative flex flex-col md:flex-row items-center gap-8 my-32">
      {/* Texte principal */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Do You Want To Earn With Us? <br /> So Don’t Be Late.
        </h2>
        <p className="text-sm md:text-base">
          Join us today and start earning extra income with ease. Discover
          opportunities to grow and succeed with our trusted platform.
        </p>
      </div>

      {/* Bouton */}
      <div className="flex-shrink-0">
        <a
          href="#"
          className="bg-white text-blue-500 font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          Become a Partner
        </a>
      </div>

      {/* Image */}
      <div className="absolute right-0 bottom-0 hidden md:block w-1/2">
        <Image
          src="/hospital2.jpg"
          alt="Earn with us"
          width={500} 
          height={300} 
          className="rounded-lg object-cover"
        />
      </div>
    </section>
  );
};

export default EarnWithUs;
