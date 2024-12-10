'use client'

import Link from "next/link";

export default function Home() {

    return (
        <div>
            <main>
            <div className="flex items-center justify-center pb-6" >
                <span className="text-2xl text-primary-blue font-bold text-center">
                    MORENT
                </span>
            </div>

            <div
      className="mx-32 mb-6 py-8 rounded-lg flex items-center justify-center  bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="bg-blue-100 bg-opacity-90 rounded-lg p-8 w-[400px] shadow-lg">
        <h1 className="text-center text-2xl font-bold mb-6">Connexion</h1>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="email">
              Numéro de Téléphone ou Adresse E-mail
            </label>
            <input
              type="text"
              id="email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2" htmlFor="password">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Continuer
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm">
            Vous êtes nouveau?{' '}
            <Link href="/register">
              <button className="text-blue-600 px-6 py-4 bg-white rounded-lg font-semibold hover:underline">
                Créer un Compte
              </button>
            </Link>
            
          </p>
        </div>
      </div>
      
    </div>
            </main>
        </div>
    );
}


