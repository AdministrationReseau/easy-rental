"use client"
import Link from "next/link"

export default function Layout({children }: { children: React.ReactNode }) {
    return (
        <>
            <main>
                Helloooooooo<br/> <br/>
                {children}

                <div className="justify-center text-center">
                    <p className="center align-center text-center">
                    Vous avez besoin d’aide ? Contactez le <span className="text-primary-blue">service client EasyRent</span> Lisez nos <span className="text-primary-blue">conditions d’utilisation</span>  et notre <span className="text-primary-blue">déclaration de confidentialité</span>.
                    </p>
                    <hr />
                </div>
                <div className="flex flex-row justify-space">
                    <p>©2022 MORENT. All rights reserved</p>
                    <div className="flex-1 justify-space">
                        <p>Privacy & Policy</p>
                        <p>Terms & Condition</p>
                    </div>

                </div>
                <footer className="absolute bottom-4 text-center w-full text-xs text-gray-600">
        <p>
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