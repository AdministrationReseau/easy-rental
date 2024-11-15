import StateBox from "@/components/StateBox";
import { ProcessState } from "./utils/enum";
import Filter from "@/components/Filter";
import CarProfilImg from "@/components/CarProfilImg";
import CarProfilDescription from "@/components/CarProfilDescription";

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

      </main>
      <footer className="">
      </footer>
    </div>
  );
}