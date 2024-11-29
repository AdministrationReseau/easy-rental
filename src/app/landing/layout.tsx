'use client'
import NavBar from "@/components/organisation/NavBar"

export default function Layout({children }: { children: React.ReactNode }) {
    return (
        <>
            <main>
                <NavBar/>
                Helloooooooo<br/> <br/>
                {children}
            </main>
        </>
    )
}