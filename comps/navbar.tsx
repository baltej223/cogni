import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
export default function Navbar(){
    return(
        <>
        <div className="nav-cointainer w-full h-20">
            <div className="flex flex-column h-full items-center">
                <nav className="pl-10 flex items-center h-full gap-x-5 w-11/12">
                    <div className="text-xl font-bold">Congni</div>
                    <Separator orientation="vertical" className="h-1/2 hidden sm:block" />
                    <Link href="./" className=" hidden sm:block">Home</Link>
                    <Separator orientation="vertical" className="h-1/2 hidden sm:block "/>
                    <Link href="./remember-the-number" className=" hidden sm:block">Remeber The Number</Link>
                    <Separator orientation="vertical" className="h-1/2 hidden sm:block "/>
                    <Link href="./remember-the-pattern" className=" hidden sm:block">Remeber The Pattern</Link>
                    <Separator orientation="vertical" className="h-1/2 hidden sm:block "/>
                    <Link href="#" className=" hidden sm:block">Link</Link>
                </nav>
            <Button className="lg:block md:hidden">Get Started</Button>
            </div>
            <Separator/>
        </div>
        </>
    )
}