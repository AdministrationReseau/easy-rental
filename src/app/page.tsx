'use client'
import { useEffect, useState, useRef, ReactElement } from 'react';
import Navbar from "@/components/organisation/NavBar";
import Footer from "@/components/Footer";
import Image from 'next/image';
import Link from 'next/link';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import { BsSearch, BsFillCalendarCheckFill } from 'react-icons/bs';
import { FaCar, FaCheck } from 'react-icons/fa';
import ServiceCard from "@/components/ServiceCard"
import { FormatQuote } from '@mui/icons-material';
import React, { useMemo} from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Stars from "@/components/Stars";
import { useInView, UseInViewOptions } from "framer-motion";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaShieldAlt, FaHeadset, FaMobileAlt } from 'react-icons/fa';


export default function Home() {
  return (
    <main className="bg-whitish-background">
      <Navbar />
      <Hero />
      <HowItWorks/>
      <Services />
      <Features />
      <Testimonials />
      <Organization/>
      <Partners/>
      <Team />
      <Stats />
      <Footer />
    </main>
  )
}


  const Hero = () => {

  return (
    <div
      className="md:pt-[120px] pt-[50px] h-[100vh] flex flex-col lg:flex-row items-center justify-between bg-cover bg-center bg-[url('/assets/Ads3.png')] "
    >
      <div className="px-4 w-full lg:w-1/2 space-y-6 lg:pl-10">
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
      <div className="-ml-16 bg-background-light dark:bg-background-dark items-center">
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


const TeamMember = ({ name, role, bio, image, linkedin, twitter }: { name: string, role: string, bio: string, image: string, linkedin?: string, twitter?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 } as UseInViewOptions);

  return (
    <motion.div
      ref={ref}
      className="bg-card-light dark:bg-card-dark rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-64 relative overflow-hidden">
        <Image
          src={image}
          fill
          className="object-cover"
          alt={name}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1 text-text-light dark:text-text-dark">{name}</h3>
        <p className="text-primary-600 dark:text-primary-400 mb-3">{role}</p>
        <p className="text-text-light-secondary dark:text-text-dark-secondary mb-4">{bio}</p>
        <div className="flex space-x-4">
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary dark:hover:text-primary-300 transition-colors">
              <FaLinkedin size={20} />
            </a>
          )}
          {twitter && (
            <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary dark:hover:text-primary-300 transition-colors">
              <FaTwitter size={20} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Team = () => {
  return (
    <div className="bg-background-whitish dark:bg-background-darkish">
      <div className="text-center mb-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 text-text-light dark:text-text-dark"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Team
        </motion.h2>
        <motion.p
          className="text-xl text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Meet the passionate individuals who make Easy Rental a reality
        </motion.p>
      </div>
      <div className="md:w-[70%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <TeamMember
          name="Prof. John Doe"
          role="Supervising Professor"
          bio="Information systems specialist with over 15 years of experience in teaching and research."
          image="/assets/member.jpg"
          linkedin="https://linkedin.com/in/jeandupont"
          twitter="https://twitter.com/jeandupont"
        />
        <TeamMember
          name="Marie Laurent"
          role="Lead Engineer"
          bio="Experienced engineer with expertise in web development and software architecture."
          image="/assets/member.jpg"
          linkedin="https://linkedin.com/in/marielaurent"
          twitter="https://twitter.com/marielaurent"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <TeamMember
          key="member1"
          name="Lucas Martin"
          role="Frontend Developer"
          bio="Passionate about UX/UI and modern web technologies."
          image="/assets/member.jpg"
          linkedin="https://linkedin.com/in/lucasmartin"
          twitter="https://twitter.com/lucasmartin"
        />
        <TeamMember
          key="member2"
          name="Sophie Bernard"
          role="Backend Developer"
          bio="Expert in databases and performance optimization."
          image="/assets/member.jpg"
          linkedin="https://linkedin.com/in/sophiebernard"
          twitter="https://twitter.com/sophiebernard"
        />
        <TeamMember
          key="member3"
          name="Thomas Petit"
          role="DevOps Engineer"
          bio="Specialist in continuous integration and deployment."
          image="/assets/member.jpg"
          linkedin="https://linkedin.com/in/thomaspetit"
          twitter="https://twitter.com/thomaspetit"
        />
        <TeamMember
          key="member4"
          name="Emma Leroy"
          role="UI/UX Designer"
          bio="Creative and passionate about user experience and accessibility."
          image="/assets/member.jpg"
          linkedin="https://linkedin.com/in/emmaleroy"
          twitter="https://twitter.com/emmaleroy"
        />
        <TeamMember
          key="member5"
          name="Pierre Dubois"
          role="QA Tester"
          bio="Methodical and thorough, dedicated to software quality."
          image="/assets/member.jpg"
          linkedin="https://linkedin.com/in/pierredubois"
          twitter="https://twitter.com/pierredubois"
        />
      </div>
    </div>
  );
};


const FeatureCard = ({ icon, title, description }:{ icon: ReactElement, title: string, description: string}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 }  as UseInViewOptions);

  return (
    <motion.div
      ref={ref}
      className="bg-white dark:bg-surface-dark rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border-light dark:border-border-dark"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-primary-100  rounded-full w-16 h-16 flex items-center justify-center mb-6">
        {React.cloneElement(icon, { className: "text-primary-blue dark:text-primary-900 text-3xl" })}
      </div>
      <h3 className="text-xl font-bold mb-3 text-primary-text dark:text-text-dark">{title}</h3>
      <p className="text-secondary-text ">{description}</p>
    </motion.div>
  );
};




const Features = () => {
  return (
    <div className="bg-background-whitish dark:text-text-dark dark:bg-background-darkish p-6 my-12">
      <div className="text-center mb-16">
        <motion.h2
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Our Features
        </motion.h2>
        <motion.p
          className="text-xl text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Discover what makes our rental service simple and efficient
        </motion.p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard
          icon={<FaCar />}
          title="Wide Range of Vehicles"
          description="Access a diverse fleet of vehicles for all your travel needs, from compact cars to spacious SUVs."
        />
        <FeatureCard
          icon={<FaShieldAlt />}
          title="Guaranteed Safety"
          description="All our vehicles are regularly inspected and maintained to ensure your safety on the road."
        />
        <FeatureCard
          icon={<FaHeadset />}
          title="24/7 Support"
          description="Our team is available at any time to assist you and answer your questions or concerns."
        />
        <FeatureCard
          icon={<FaMobileAlt />}
          title="Mobile Application"
          description="Manage your bookings, track your rentals, and access our services from your smartphone."
        />
      </div>
    </div>

  );
};



const Organization = () => {
  // Définir les fonctionnalités comme tableau statique
  const features = [
    "Élargissez votre clientèle",
    "Structure de commission flexible",
    "Gestion des réservations en temps réel",
    "Équipe de support dédiée"
  ];

  return (
    <div className="rounded-2xl bg-gradient-to-r from-primary-text to-secondary-text text-white m-6 px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 p-4">
        <div className="w-full md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-3xl font-bold mb-4 text-tahiti-600">Become a Partner Organization</h2>
          <p className="text-gray-200 mb-6">
            List your fleet on our platform and reach thousands of potential customers every day. Our streamlined system makes managing rentals simple and profitable.
          </p>
          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 ">
                <FaCheck className="text-blue-text" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Link href="/subscription">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-primary-text font-semibold rounded-full shadow-md transition-all duration-300"
            >
              Sign Up as an Organization
            </motion.button>
          </Link>

        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full h-[400px] md:h-[500px]">
            <Image
              src="/assets/fleet.png"
              alt="Organization Fleet"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-3xl shadow-2xl"
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute -bottom-5 -right-5 md:bottom-10 md:-right-10 bg-white dark:bg-background-darkish p-6 rounded-3xl shadow-2xl max-w-xs"
            >
              <h3 className="text-xl font-semibold text-text-primary dark:text-white mb-2">
                Join Over 500 Organizations
              </h3>
              <p className="text-secondary-text dark:text-gray text-sm">
                &ldquo;Our partnership with Easy-Rent increased our bookings by 60% in the first quarter!&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div>
                  <p className="text-secondary-text dark:text-white font-medium text-sm">
                    John Doe
                  </p>
                  <p className="text-secondary-text dark:text-gray-400 text-xs">
                    CEO, Premium Rides
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>

  );
};


interface Partner {
  name: string;
  logo: string;
}
const Partners = () => {
  // Liste des partenaires statiques
  const partnersList: Partner[] = [
    {
      name: "Alicya Auto",
      logo: "/assets/rental2.png"
    },
    {
      name: "VIP Cars",
      logo: "/assets/rental3.png"
    },
    {
      name: "Polycom Sarl",
      logo: "/assets/rental4.png"
    }
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-text-primary dark:text-text-dark mb-4">
          Our Partners
        </h2>
        <p className="text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">
          Trusted by leading vehicle rental agencies
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16">
        {partnersList.map((partner) => (
          <motion.div
            key={partner.name}
            whileHover={{ scale: 1.1 }}
            className="rounded-lg w-80 flex flex-col items-center justify-center dark:bg-white"
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={120}
              height={120}
              className="object-contain"
            />
            <span className="text-gray-500 dark:text-gray-400 font-semibold mt-2">{partner.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};





