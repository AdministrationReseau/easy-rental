import React from 'react';
import Image from 'next/image';
import {
    DirectionsCar,
    CalendarMonth,
    CreditCard,
    Headset
} from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import Button from '@/components/Buttons';
import { ProcessColor } from "@/utils/enum";

interface Feature {
    title: string;
    description: string;
    icon: typeof SvgIcon;
}

interface TeamMember {
    name: string;
    role: string;
    image: string;
}

const features: Feature[] = [
    {
        title: 'Diverse Fleet Options',
        description: 'Choose from cars, trucks, and vans for every need',
        icon: DirectionsCar
    },
    {
        title: 'Flexible Rentals',
        description: 'Short-term or long-term - EasyRent adapts to your schedule',
        icon: CalendarMonth
    },
    {
        title: 'Transparent Payments',
        description: 'No hidden fees, just simple and secure transactions',
        icon: CreditCard
    },
    {
        title: 'Customer Satisfaction',
        description: "Our clients' feedback speaks volumes",
        icon: Headset
    }
];

const teamMembers: TeamMember[] = [
    {
        name: 'Nguepssi Brayanne',
        role: 'Project Manager',
        image: '/personne2.png'
    },
    {
        name: 'Hassana Zouheiriyya',
        role: 'Member',
        image: '/personne2.png'
    },
    {
        name: 'Ntye Nina',
        role: 'Member',
        image: '/personne2.png'
    },
    {
        name: 'Vuide Jordan',
        role: 'Member',
        image: '/personne2.png'
    },
    {
        name: 'Ngom Christine',
        role: 'Member',
        image: '/personne2.png'
    },
    {
        name: 'Kamga Davy',
        role: 'Member',
        image: '/personne2.png'
    }
];

const Home: React.FC = () => {
    return (
        <main className="min-h-screen">
            <section className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">100% Trusted Vehicle Rental Service</h1>
                        <p className="text-gray-600 mb-6">
                            Looking for a reliable way to rent vehicles for your travel or business needs? EasyRent is
                            here to provide you with a seamless rental experience.
                        </p>
                    </div>
                    <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
                        <Image
                            src="/fleet.png"
                            alt="Fleet of rental cars"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">100% Trusted Vehicle Rental Service</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-6">
                                <feature.icon className="w-10 h-10 text-blue-600 mb-4"/>
                                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">We Deliver, You Enjoy Your Journey.</h2>
                        <p className="text-gray-600 mb-8">
                            Your time matters to us. EasyRent provides door-to-door delivery of your rental vehicle so
                            you can focus on your plans.
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Choose the perfect vehicle for your needs
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Schedule delivery and pick-up at your convenience
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Drive with peace of mind, knowing we&lsquo;re here to support you
                            </li>
                        </ul>
                        <Button
                            label="Rent Now"
                            color={ProcessColor.PRIMARY}
                        />
                    </div>
                    <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                        <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                            <Image
                                src="/customer.png"
                                alt="Happy customer"
                                width={600}
                                height={900}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Team section remains the same ... */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4">Our Awesome Team</h2>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                        At EasyRent, we&lsquo;re powered by a passionate team dedicated to making your rental experience
                        smooth and enjoyable.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="font-semibold text-xl mb-1">{member.name}</h3>
                                <p className="text-gray-600">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;