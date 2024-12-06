'use client'

export default function Home() {

    return (
        <div>
            <main>
                <div className="flex items-center justify-center pb-6" >
                    <span className="text-2xl text-primary-blue font-bold text-center">
                        EASY RENT
                    </span>
                </div>

                <div
                className="mx-32 mb-6 rounded-lg flex items-center justify-center h-screen bg-cover bg-center"
                style={{ backgroundImage: "url('/background.jpg')" }}
                >
                
                
                </div>
            </main>
        </div>
    );
}
