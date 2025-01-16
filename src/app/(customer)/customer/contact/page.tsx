"use client";
import dynamic from 'next/dynamic';
const SchoolMap = dynamic(() => import('@/components/combiner-components/SchoolMap'), { ssr: false });
import ContactForm from "@/components/ContactForm";

export default function Page() {
    return (
        <div>
            <ContactForm/>
            <SchoolMap/>
        </div>
    );
}
