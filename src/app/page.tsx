import StateBox from "@/components/StateBox";
import Filter from "@/components/Filter";
import CarProfilImg from "@/components/CarProfilImg";
import CarProfilDescription from "@/components/CarProfilDescription";
import {ProcessColor, ProcessState} from "@/utils/enum";
import Button from "@/components/Buttons";
import Stars from "@/components/Stars";
import DefaultProfile from "@/components/DefaultProfile";
import ImageProfile from "@/components/ImageProfile";
import Evaluation from "@/components/Evaluation";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <CarProfilImg />
        <CarProfilDescription />

        <StateBox state={ProcessState.CONFIRMED} />
        <StateBox state={ProcessState.PENDING} />
        <StateBox state={ProcessState.CANCELED} />
        <Filter />
          <Button label="Primary" color={ProcessColor.PRIMARY} />
          <Button label="Secondary" color={ProcessColor.SECONDARY} />
          <Button label="Success" color={ProcessColor.SUCCESS} />
          <Button label="Danger" color={ProcessColor.DANGER}/>
          <Button label="Outlined" color={ProcessColor.OUTPRIMARY}/>
          <Stars value={2.5} precision={0.5}/>
          <Evaluation value={3} precision={0.5}/>
          <DefaultProfile name="John Doe" />
          <ImageProfile imageUrl="car.png" width={45} height={25}/>

      </main>
      <footer className="">
      </footer>
    </div>
  );
}
