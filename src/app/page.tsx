import StateBox from "@/components/StateBox";
import { ProcessState } from "./utils/enum";
import Filter from "@/components/Filter";

export default function Home() {
  return (
    <div className="">
      <main className="">
        {/* <StateBox state={ProcessState.CONFIRMED} /> */}
        <Filter />

      </main>
      <footer className="">
      </footer>
    </div>
  );
}
