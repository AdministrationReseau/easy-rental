import DefaultProfile from "@/components/DefaultProfile";
import ImageProfile from "@/components/ImageProfile";
import Evaluation from "@/components/Evaluation";
import Stars from "@/components/Stars";
import Sidebar from "@/components/Sidebar";


export default function Home() {
  return (
    <div>
      <main>
          <DefaultProfile name='John Doe'/>
          <ImageProfile imageUrl="car.png" width={45} height={45}/>
          <Evaluation/>
          <Stars value={2.5} precision={0.5}/>
          <Sidebar/>
      </main>
      <footer>
      </footer>
    </div>
  );
}
