'use client'

import Field from "@/components/base-component/fields"
import MyComboBox from "@/components/base-component/myComboBox";
import Link from "next/link";



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
                className="m-2 mb-6 rounded-lg flex border-primary-blue h-[600px] w-full bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/background.jpg')" }}
                >

            <div className="bg-white rounded-lg p-8 w-[60%] shadow-lg">
                 <h1 className="text-center text-2xl font-bold mb-6">Register</h1>
                <form className="flex flex-wrap ">

                <Field
                label="First name"
                placeholder="Enter your first name"
                size="w-full xl:w-1/2"
                />                                            
                <Field
                label="Last name"
                placeholder="Enter your last name"
                size="w-full xl:w-1/2"
                />
                <Field
                label="Email"
                type="email"
                placeholder="Enter your email address"
                required
                />
                <Field
                label="Password"
                type="password"
                placeholder="Enter your email address"
                required
                />
                 <MyComboBox
                label="Register as "
                required
                />
           
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                Continuer
            </button>
            </form>
            <div className="text-center mt-6">
            <p className="text-sm">
                Have an account?{' '}
                <Link href="/login">
                <button className="text-blue-600 font-semibold hover:underline">
                    Just login
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
