import CarCarousel from "@/components/CarCarousel";
import Navbar from "@/components/organisation/NavBar";
import Footer from "@/components/Footer";

// app/page.tsx
// import Navbar from '@/components/Navbar'
// import Hero from '@/components/Hero'
// import BookingForm from '@/components/BookingForm'
// import FeaturedVehicles from '@/components/FeaturedVehicles'
// import AboutSection from '@/components/AboutSection'
// import Services from '@/components/Services'
// import DriverCTA from '@/components/DriverCTA'
// import Testimonials from '@/components/Testimonials'
// import BlogSection from '@/components/BlogSection'
// import Stats from '@/components/Stats'
// import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-whitish-background">
      <Navbar />
      <Hero />
    <div className="rounded-r p-8 flex justify-between gap-4">
    <h3 className="text-2xl text-primary-text font-semibold mb-6">Better Way to Rent Your Perfect Cars</h3>
    <RentalSteps />
    </div>
      <LocationFilterContainer/>
      <FeaturedVehicles />
      <AboutSection />
      <Services />
      <DriverCTA />
      <Testimonials />
      <PodcastSection />
      <Stats />
      <Footer />
    </main>
  )
}

import Link from 'next/link';

import { PlayCircle } from '@mui/icons-material';

 function Hero() {
  return (
    <div
  className="relative h-screen bg-cover bg-center"
  style={{ backgroundImage: "url('/Ads 1.png')" }}
>
  <div className="absolute inset-0"></div>
  <div className="container mx-auto px-4 h-full">
    <div className="flex items-center justify-between h-full flex-col md:flex-row">
      {/* Texte */}
      <div className="text-center text-white relative z-10 md:text-left md:w-1/2">
        <h1 className="text-5xl font-bold m-4">
          Fast & Easy Way To Rent A Car
        </h1>
        <p className="text-xl mb-8">
          A small river named Duden flows by their place and supplies it with
          the necessary regelialia.
        </p>
        <button className="flex items-center mx-auto md:mx-0 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark">
          <PlayCircle className="mr-2" />
          <span>Easy steps for renting a car</span>
        </button>
      </div>

      {/* Image */}
      <div className="relative md:w-1/2 h-64 md:h-auto flex justify-center items-center">
        <Image
          src="/voiture.png"
          alt="Lamborghini"
          width={500}
          height={400}
          objectFit="contain"
        />
      </div>
    </div>
  </div>
</div>

  );
}

// components/FeaturedVehicles.tsx
 function FeaturedVehicles() {


  return (
    <section className="py-16 w-full  flex flex-col justify-center items-center">
      <div className="container mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-secondary-text">What we offer</span>
          <h2 className="text-3xl font-bold text-primary-text">Featured Vehicles</h2>
        </div>
      </div>
      <CarCarousel/>
    </section>
  );
}

// components/AboutSection.tsx
 function AboutSection() {
    return (
        <div className="relative flex  items-center rounded-lg  md:h-[500px] p-8 flex-col md:flex-row">
        <div className="flex  md:w-1/3  md:bg-white rounded-l-lg h-full items-center">
            <div className="h-full md:h-[70%] inset-y-0 md:left-1/8 md:z-10 md:translate-x-1/4 translate-y-2 bg-gray-200 rounded-lg shadow-lg overflow-hidden">
                <Image
                    src="/about_rental.png"
                    alt="Welcome"
                    width={300}
                    height={400}  
                    className="h-full w-auto "
                />
            </div>
        </div>

        {/* Section droite (bleu) */}
        <div className="flex-[3]  flex justify-start bg-blue-500 p-8  text-white rounded-r-lg h-full">
            <div className="flex-1 ">

            </div>
            <div className=" flex-[4] md:w-2/3 w-full mt-6  md:text-base rounded-lg flex flex-col justify-around text-left">
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
                    href="/customer/cars"
                    className=" font-semibold hover:underline"
                >
                    Search Vehicle
                </Link>
            </div>
        </div>
    </div>
    );
  }
  
  // components/Services.tsx
  import { DirectionsCar, LocationCity, FlightTakeoff, Public } from '@mui/icons-material';
  
  function Services() {
    const services = [
      {
        icon: <DirectionsCar className="text-5xl text-secondary-text" />,
        title: "Wedding Ceremony",
        description: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
      },
      {
        icon: <LocationCity className="text-5xl text-secondary-text" />,
        title: "City Transfer",
        description: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
      },
      {
        icon: <FlightTakeoff className="text-5xl text-secondary-text" />,
        title: "Airport Transfer",
        description: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
      },
      {
        icon: <Public className="text-5xl text-secondary-text" />,
        title: "Whole City Tour",
        description: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
      }
    ];
  
    return (
      <section className="py-16 rounded-md">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-secondary-text text-sm uppercase tracking-wider">Services</span>
            <h2 className="text-primary-text text-3xl font-bold mt-2">Our Latest Services</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className=" flex flex-col justify-center items-center text-center">
                <div className="bg-blue-100 h-[150px] w-[150px] rounded-full flex justify-center mb-4 flex justify-center items-center">
                  {service.icon}
                </div>
                <h3 className="text-primary-text text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-secondary-text ">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
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
              Do You Want To Earn With Us? So Don  `&apos;` t Be Late.
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
import LocationFilterContainer from "@/components/LocationFilter";
  
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
                        src={testimonial.image} 
                        alt={testimonial.name}
                        width={0}
                        height={0}   
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
  

  // components/Stats.tsx
   function Stats() {
    const stats = [
      {
        number: 60,
        label: "Year Experienced"
      },
      {
        number: 1090,
        label: "Total Cars"
      },
      {
        number: 2590,
        label: "Happy Customers"
      },
      {
        number: 67,
        label: "Total Branches"
      }
    ];
  
    return (
      <section className="py-16 bg-secondary-blue m-8 rounded-lg ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <p className="text-primary-text">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  import { LocationOn, Handshake, } from '@mui/icons-material';
import Stars from "@/components/Stars";
import Image from "next/image";

const RentalSteps = () => {
  const steps = [
    {
      icon: <LocationOn className="text-primary w-8 h-8" />,
      title: "Choose Your Pickup Location",
    },
    {
      icon: <Handshake className="text-primary w-8 h-8" />,
      title: "Select the Best Deal",
    },
    {
      icon: <DirectionsCar className="text-primary w-8 h-8" />,
      title: "Reserve Your Car Rental",
    }
  ];

  return (
    <div className="w-full relative shadow-lg bg-white rounded-md p-6 top-[-100px]" >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center py-4">
            <div className="flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
              {step.icon}
            </div>
            <h3 className="text-lg font-medium text-gray-800">
              {step.title}
            </h3>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Link href="/customer/cars">
        <button className="bg-primary-blue text-white text-xl px-8 py-3 rounded hover:bg-primary/90 transition-colors duration-300">
          Reserve Your Perfect Car Rental Now
        </button>
        </Link>
      </div>
    </div>
  );
};

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
    <section className="py-16 bg-gray-50">
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
              <div className="p-6">
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



// export default function Home() {
//     return (
//         <>
//             <main className="bg-var(--background)">
//                 <Navbar />
//                 <SportCarCard/>
//                 <div className="flex flex-col items-center justify-center text-xl my-12 w-full">
//                     <div className="text-xl text-primary-blue">
//                         What We offer
//                     </div>
//                     <div className="mt-4 text-secondary-text">
//                         Featured Vehicles
//                     </div>

//                     <CarCarousel/>
//                 </div>

//                 <AboutUS/>
//                 <EarnWithUs/>
//                 <div className="flex flex-col items-center justify-center text-xl my-12">
//                     <div className="text-xl text-primary-blue">
//                         What We offer
//                     </div>
//                     <div className="mt-4 text-secondary-text">
//                         Meet ours Drivers
//                     </div>

//                     <DriverCarousel/>
//                 </div>
//                 <Records/>

//                 <Footer />
//             </main>
//         </>
//     );
// }