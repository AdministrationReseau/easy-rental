'use client'
import Navbar from "@/components/organisation/NavBar";
import Footer from "@/components/Footer";
import Image from 'next/image';
import Link from 'next/link';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import { BsSearch, BsFillCalendarCheckFill } from 'react-icons/bs';
import { FaCar } from 'react-icons/fa';
import ServiceCard from "@/components/ServiceCard"

export default function Home() {
  return (
    <main className="bg-whitish-background">
      <Navbar />
      <Hero />
      <HowItWorks/>

      <Services />
      <DriverCTA />
      <Testimonials />
      <PodcastSection />
      <Stats />
      <Footer />
    </main>
  )
}


  const Hero = () => {

  return (
    <div
      className="md:pt-[120px] h-[100vh] flex flex-col lg:flex-row items-center justify-between bg-cover bg-center bg-[url('/assets/Ads3.png')] "
    >
      <div className="w-full lg:w-1/2 space-y-6 lg:pl-10">
        <h1 className="text-5xl lg:text-6xl mb-5 font-bold text-whitish-background leading-tight">
          Fast & Easy Rental <br/>
          <span className="animate-text-glow text-primary-blue">Made Easy</span>
        </h1>
        <p className="text-xl lg:text-lg text-whitish-background mb-8 sm:w-[80%]">
          Experience premium vehicles with our hassle-free rental service. From sports cars to luxury sedans, we have the perfect ride for your journey.
        </p>

        <button className="flex items-center text-white mx-0 pb-3 sm:pb-12 rounded-full">
          <div className= " bg-primary-blue p-2 rounded-full mr-2">
            <PlayCircle />
          </div>
          <span className= "font-md text-lg">Easy steps for renting a car</span>
        </button>

        <div className="flex flex-col sm:flex-row gap-8 lg:gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mx-auto w-fit sm:mx-0 px-8 py-4 text-lg bg-toggle-blue text-white font-semibold rounded-full shadow-md transition-all duration-300">
            Rent Now
          </motion.button>
          <div className="flex mx-auto md:mx-0 items-center gap-4">
            <div className="flex space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="##"
                      className="text-lg flex items-center gap-2 px-4 py-3 bg-whitish-background text-text-primary-blue rounded-full">
                  <FaApple className="text-xl"/> App Store
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="#1"
                      className="text-lg flex items-center gap-2 px-4 py-3 bg-whitish-background text-text-primary-blue rounded-full">
                  <FaGooglePlay className="text-xl"/> Google Play
                </Link>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full">
          <Image
            src="/assets/voiture.png"
            alt="Luxury Car Rental"
            fill
            style={{objectFit: "contain"}}
            priority
          />
        </div>
      </div>
    </div>
  );
};

  const HowItWorks = () => {

    // Définir les étapes avec leurs icônes
    const steps = [
      {
        icon: <BsSearch className="text-4xl text-primary-blue" />,
        title: "Search & Select",
        description: "Browse our extensive fleet and choose your perfect vehicle"
      },
      {
        icon: <BsFillCalendarCheckFill className="text-4xl text-primary-blue" />,
        title: "Book & Pay",
        description: "Select your dates and complete secure payment in seconds"
      },
      {
        icon: <FaCar className="text-4xl text-primary-blue" />,
        title: "Enjoy your Ride",
        description: "Pick up your car and hit the road with style and comfort"
      },
    ];

    return (
      <div className="my-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-text-primary dark:text-text-dark mb-4">
            How It Works
          </h2>
          <p className="text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">
            Easy steps to rent your dream car in minutes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl shadow-lg text-center"
            >
              <div className="flex justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary-text mb-3">{step.title}</h3>
              <p className="text-text-secondary dark:text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };


  const Services = () => {

    // Définir les fonctionnalités directement plutôt que de les récupérer via les traductions
    const clientFeatures = [
      "Browse verified vehicles",
      "Chauffeur Services",
      "Secure payment options",
      "Flexible booking system",
      "24/7 customer support"
    ];

    const agencyFeatures = [
      "Complete fleet management",
      "Advanced analytics dashboard",
      "Automated booking system",
      "Dedicated account manager"
    ];

    return (
      <div className="bg-background-light dark:bg-background-dark items-center">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-text-light dark:text-text-dark"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.h2>
          <motion.p
            className="text-xl text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Solutions adapted to each type of user
          </motion.p>
        </div>

        <ServiceCard
          title="For Clients"
          description="Rent vehicles easily and enjoy your trip"
          features={clientFeatures}
          cta="Start Renting"
          image="/assets/clientservice.png"
          isReversed={false}
        />

        <hr className="mx-auto mb-24 border-t w-[40%] border-text-primary dark:border-text-dark-secondary" />

        <ServiceCard
          title="For Agencies"
          description="Grow your business with our platform"
          features={agencyFeatures}
          cta="Join as Agency"
          image="/assets/orgservice.png"
          isReversed={false}
        />
      </div>
    );
  };

  // components/DriverCTA.tsx
   function DriverCTA() {
    return (
      <section className="relative m-8 ">
        <div
          className="absolute inset-0 rounded-md bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/Ads 2.png')" }}
        >
        </div>


        <div className="container flex flex-col md:flex-row md:justify-center items-center mx-auto px-4 my-auto relative z-10">
          <div className="h-[430px]">
            <Image
                src="/customer.png"
                alt="become locator"
                width={400}
                height={400}
                objectFit="contain"
                className="h-full w-auto"/>
          </div>

          <div className="md:w-1/2 ml-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Do You Want To Earn With Us? So Don&apos;t Be Late.
            </h2>
            <Link href="/drivers">
              <button className="bg-secondary-blue text-white px-8 py-4 m-4 rounded-full shadow-lg text-lg hover:bg-opacity-90 transition">
                Become A Driver
              </button>
            </Link>
            <Link href="/agencies">
              <button className="bg-secondary-blue text-white px-8 py-4  m-4 rounded-full shadow-lg text-lg hover:bg-opacity-90 transition">
                Become An Agency
              </button>
            </Link>
            <Link href="/customer"></Link>
          </div>
        </div>
      </section>
    );
  }

  // components/Testimonials.tsx
  import { FormatQuote } from '@mui/icons-material';

  function Testimonials() {
    const testimonials = [
      {
        image: "/personne2.png",
        text: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
        name: "Roger Scott",
        position: "Marketing Manager",
        date: "15/08/2024",
        rate: 4
      },
      {
        image: "/personne2.png",
        text: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
        name: "Roger Scott",
        position: "Marketing Manager",
        date: "15/08/2024",
        rate: 4
      },
      {
        image: "/personne2.png",
        text: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
        name: "Roger Scott",
        position: "Marketing Manager",
        date: "15/08/2024",
        rate: 4
      }

      // Add more testimonials...
    ];

    return (
      <section className="py-16 mx-8 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-secondary-text text-sm uppercase tracking-wider">Testimonial</span>
            <h2 className="text-primary-text text-3xl font-bold mt-2">Happy Clients</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg  shadow-lg text-center">
                <div className="flex justify-between w-full">
                    <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mx-auto mb-4">
                    <Image
                        src={testimonial.image ?? '/voiture.png'}
                        alt={testimonial.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                    />
                    </div>
                    <div className="flex flex-col h-full items-center">
                        <Stars value={testimonial.rate?? 0} precision={1} />
                        <p>{testimonial.date}</p>
                    </div>

                </div>


                <FormatQuote className="text-primary text-4xl mb-4" />
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <h4 className="font-bold">{testimonial.name}</h4>
                <p className="text-gray-500">{testimonial.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  import React, {useRef, useMemo} from "react";
  import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
  import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
  import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
  import TrendingUpIcon from "@mui/icons-material/TrendingUp";
function Stats() {
  // Mémoriser l'objet `stats` pour éviter qu'il change à chaque rendu
  const stats = useMemo(
    () => [
      {
        icon: <CalendarMonthIcon className="text-4xl text-white" />,
        number: 60,
        label: "Year Experienced",
      },
      {
        icon: <DirectionsCarIcon className="text-4xl text-white" />,
        number: 1090,
        label: "Total Cars",
      },
      {
        icon: <PeopleAltIcon className="text-4xl text-white" />,
        number: 2590,
        label: "Happy Customers",
      },
      {
        icon: <TrendingUpIcon className="text-4xl text-white" />,
        number: 67,
        label: "Total Branches",
      },
    ],
    []
  );

  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);
  const [counts, setCounts] = useState(stats.map(() => 0)); // Initialiser tous les compteurs à 0

  // Observer pour détecter l'apparition
  useEffect(() => {
    const currentRef = containerRef.current; // Stocker la référence dans une variable locale
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.5 } // 50% du composant visible déclenche l'animation
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Fonction pour animer le compteur
  useEffect(() => {
    if (!visible) return;

    const durations = 4000; // Durée totale de l'animation
    const interval = 50; // Intervalle pour incrémenter les valeurs

    stats.forEach((stat, index) => {
      const steps = Math.ceil(durations / interval);
      const increment = stat.number / steps;
      let currentValue = 0;

      const timer = setInterval(() => {
        currentValue += increment;
        setCounts((prevCounts) => {
          const newCounts = [...prevCounts];
          newCounts[index] = Math.min(Math.round(currentValue), stat.number);
          return newCounts;
        });

        if (currentValue >= stat.number) {
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer); // Nettoyer les timers après l'animation
    });
  }, [visible, stats]);

  return (
    <section
      className="py-16 bg-secondary-blue m-8 rounded-lg"
      style={{ backgroundImage: "url('/Ads 1.png')" }}
      ref={containerRef}
    >
      <div className="mx-auto px-4">
        <h1 className="text-4xl text-center p-4 text-white font-bold">
          Facts In Numbers
        </h1>
        <p className="text-sm text-white p-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam unde
          sapiente officiis, ab alias rerum nulla sunt eligendi ducimus quam
          facilis hic assumenda nostrum dolorem tempora consequatur adipisci
          temporibus corrupti.
        </p>
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-row justify-around bg-white rounded-lg m-4 p-4"
            >
              <span className="w-[50%] rounded-lg bg-primary-blue relative h-[80px] w-[80px] flex justify-center items-center">
                {stat.icon}
              </span>
              <div className="w-[50%]">
                <div className="text-3xl font-bold text-primary-text mb-2">
                  {counts[index]}+
                </div>
                <p className="text-primary-text">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Stars from "@/components/Stars";
import { useEffect, useState } from "react";


function PodcastSection() {
  const podcasts = [
    {
      image: "/fleet.png",
      date: "Jan. 10, 2025",
      host: "John Doe",
      duration: "45 min",
      title: "The Future of AI in Everyday Life",
      description: "Discover how AI is shaping our daily routines and what the future holds.",
      url: "/podcasts/future-of-ai"
    },
    {
      image: "/fleet.png",
      date: "Dec. 15, 2024",
      host: "Jane Smith",
      duration: "30 min",
      title: "How to Stay Productive Working from Home",
      description: "Tips and tricks to maximize your productivity while working remotely.",
      url: "/podcasts/productivity-tips"
    },
    // Ajoutez d'autres podcasts ici...
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* En-tête de la section */}
        <div className="text-center mb-12">
          <span className="text-primary text-sm uppercase tracking-wider">Podcasts</span>
          <h2 className="text-3xl font-bold mt-2">Recent Podcasts</h2>
        </div>

        {/* Grille des podcasts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {podcasts.map((podcast, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
              {/* Image du podcast */}
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${podcast.image})` }}
              />

              {/* Contenu du podcast */}
              <div className="p-4">
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <span>{podcast.date}</span>
                  <span className="mx-2">•</span>
                  <span>{podcast.host}</span>
                  <span className="mx-2">•</span>
                  <span>{podcast.duration}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  <Link href={podcast.url} className="hover:text-primary">
                    {podcast.title}
                  </Link>
                </h3>
                <p className="text-gray-700 mb-4">
                  {podcast.description}
                </p>
                <Link
                  href={podcast.url}
                  className="text-primary hover:text-primary-dark font-semibold"
                >
                  Listen Now <PlayCircle className="mr-2" />

                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

