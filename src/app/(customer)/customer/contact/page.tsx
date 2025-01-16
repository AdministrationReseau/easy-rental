"use client";

import React from 'react';
import SchoolMap from "@/components/combiner-components/SchoolMap";
import ContactForm from "@/components/ContactForm";

export default function Page() {
    return (
        <div>
            <ContactForm/>
            <SchoolMap/>
        </div>
    );
}
