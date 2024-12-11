"use client"
import Link from "next/link"

export default function Layout({children }: { children: React.ReactNode }) {
    return (
        <>
            <main className="mt-6">
                
                {children}

                
               
                <footer className=" overflow-hidden bottom-4 text-center w-full text-xs text-gray-600">
        
                  <div className="justify-center text-center mb-2">
                      <p className="center align-center text-center">
                      Vous avez besoin d’aide ? Contactez le <span className="text-primary-blue">service client EasyRent</span> Lisez nos <span className="text-primary-blue">conditions d’utilisation</span>  et notre <span className="text-primary-blue">déclaration de confidentialité</span>.
                      </p>
                  </div>
                  <hr />
                  <p className="p-2">
                    ©2022 MORENT. All rights reserved |
                    <Link
                      href="/"
                      className="text-blue-600 hover:underline"
                    >
                      service client EasyRent
                    </Link>
                    |
                    <Link
                      href="/"
                      className="text-blue-600 hover:underline"
                    >
                      conditions d utilisation
                    </Link>
                    |
                    <Link
                      href="/"
                      className="text-blue-600 hover:underline"
                    >
                      déclaration de confidentialité
                    </Link>
                  </p>
                </footer>
            </main>
        </>
    )
}