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
                    <Separator orientation="vertical" className="h-1/2"/>
                    <Link href="./">Home</Link>
                    <Separator orientation="vertical" className="h-1/2"/>
                    <Link href="./remember-the-number">Remeber The Number</Link>
                    <Separator orientation="vertical" className="h-1/2"/>
                    <Link href="./remember-the-pattern">Remeber The Pattern</Link>
                    <Separator orientation="vertical" className="h-1/2"/>
                    <Link href="#">Link</Link>
                </nav>
            <Button>Get Started</Button>
            </div>
            <Separator/>
        </div>
        </>
    )
}