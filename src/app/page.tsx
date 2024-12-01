import About from "@/components/about";
import SportCarCard from "@/components/base-component/sportCarCard";
import CarCarousel from "@/components/CarCarousel";
import EarnWithUs from "@/components/earnWithUs";
import Navbar from "@/components/organisation/NavBar";
import Records from "@/components/Records";


export default function Home() {
  return (
    <>
      <main className="bg-var(--background)">
        <Navbar />
        {/* <OrgSidebar/> */}
        {/* <ThemeToggle /> */}
        {/* <DefaultProfile name='John Doe'/> */}
        {/* <ImageProfile imageUrl="car.png" width={45} height={45}/> */}
        {/* <Evaluation/> */}
        {/* <Stars value={2.5} precision={0.5}/> */}
        {/* <Sidebar/> */}
        <SportCarCard/>
        <div className="flex flex-col items-center justify-center text-xl my-12">
            <div className="text-xl text-primary-blue">
              What We offer
            </div>
            <div className="mt-4 text-secondary-text">
              Featured Vehicles
            </div>

            <CarCarousel/>
        </div>
        
        <About/>
        <EarnWithUs/>
        <div className="flex flex-col items-center justify-center text-xl my-12">
            <div className="text-xl text-primary-blue">
              What We offer
            </div>
            <div className="mt-4 text-secondary-text">
              Featured Vehicles
            </div>

            <CarCarousel/>
        </div>
        <Records/>
      </main>
      <footer>
      </footer>
    </>
  );
}
