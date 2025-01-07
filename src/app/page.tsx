import SportCarCard from "@/components/base-component/sportCarCard";
import CarCarousel from "@/components/CarCarousel";
import EarnWithUs from "@/components/earnWithUs";
import Navbar from "@/components/organisation/NavBar";
import Records from "@/components/Records";
import DriverCarousel from "@/components/driverCarousel";
import AboutUS from "@/components/about";


export default function Home() {
    return (
        <>
            <main className="bg-var(--background)">
                <Navbar />
                <SportCarCard/>
                <div className="flex flex-col items-center justify-center text-xl my-12 w-full">
                    <div className="text-xl text-primary-blue">
                        What We offer
                    </div>
                    <div className="mt-4 text-secondary-text">
                        Featured Vehicles
                    </div>

                    <CarCarousel/>
                </div>

                <AboutUS/>
                <EarnWithUs/>
                <div className="flex flex-col items-center justify-center text-xl my-12">
                    <div className="text-xl text-primary-blue">
                        What We offer
                    </div>
                    <div className="mt-4 text-secondary-text">
                        Meet ours Drivers
                    </div>

                    <DriverCarousel/>
                </div>
                <Records/>

            </main>
        </>
    );
}