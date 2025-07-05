'use client'

import ClientNavbar from "@/components/navbar/ClientNavbar";

export default function AuthLayout({children }: { children: React.ReactNode }) {
    return (
        <>
          <ClientNavbar/>
          {/* The new Navbar is fixed (top-0), so content needs padding to not be obscured.
              h-16 is a common height for navbars (4rem). Adjust if your navbar height is different. */}
          <main className="pt-16">
                {children}
            </main>
        </>
    )
}
