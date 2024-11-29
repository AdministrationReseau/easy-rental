import NavOrg from "@/components/organisation/NavOrg";
import OrgSidebar from "@/components/OrgSidebar";
import DefaultProfile from "@/components/DefaultProfile";
import ImageProfile from "@/components/ImageProfile";
import Evaluation from "@/components/Evaluation";
import Stars from "@/components/Stars";
import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/base-component/Toggles";


export default function Home() {
  return (
    <>
      <main>
        <NavOrg />
        <OrgSidebar/>
        <ThemeToggle />
        <DefaultProfile name='John Doe'/>
        <ImageProfile imageUrl="car.png" width={45} height={45}/>
        <Evaluation/>
        <Stars value={2.5} precision={0.5}/>
        <Sidebar/>
      </main>
      <footer>
      </footer>
    </>
  );
}
