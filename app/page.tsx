import Navbar from "@/comps/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar/>
      <div className="pt-10 pl-20">
        <span className="text-2xl font-bold">Cogni</span>
        <div className="pt-5">
          You can improve you congnitive skills by using cogni
          <div className="pt-3 pl-10">
            For improving long term memory: <Link href="./remember-the-number">./Remember the Number</Link>
            </div> 
        </div>
      </div>
    </>  
  );
}
