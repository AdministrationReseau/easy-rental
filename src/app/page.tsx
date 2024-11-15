import StateBox from "@/components/StateBox";
import Filter from "@/components/Filter";
import CarProfilImg from "@/components/CarProfilImg";
import CarProfilDescription from "@/components/CarProfilDescription";
import { ProcessState } from "@/utils/enum";

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