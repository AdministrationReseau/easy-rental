"use client";
import dynamic from 'next/dynamic';
const SchoolMap = dynamic(() => import('@/components/combiner-components/SchoolMap'), { ssr: false });
import ContactForm from "@/components/ContactForm";

export default function Page() {
    return (
        <div>
            <h1 className="text-5xl font-bold text-center text-blue-800 mb-8 ">Contact Us</h1>
            <ContactForm/>
            {/* <SchoolMap/> */}
        </div>
    );
}
