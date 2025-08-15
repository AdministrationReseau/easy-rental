"use client";
import React from 'react';
import Link from "next/link";

// Define types for the card items and props
type CardItem = {
  icon: string;
  text: string;
};

type CardProps = {
  title: string;
  link: string;
  items: CardItem[];
};

const Card: React.FC<CardProps> = ({ title, items, link}) => {
  return (
    <div className="bg-white px-6 pt-6 pb-14 rounded-lg shadow-md">
      <Link href={link}>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index} className="mb-2 flex items-center">
              <span className="mr-2">{item.icon}</span>
              <span className="ml-2 mr-2">{item.text}</span>
            </li>
          ))}
        </ul>
      </Link>

    </div>
  );
};

const Profile: React.FC = () => {
  // Define items for each card
  const personalInformationItems: CardItem[] = [
    { icon: '👤', text: 'Profile Details' },
    { icon: '🔒', text: 'Edit Profile Settings' },
  ];

  const transactionsItems: CardItem[] = [
    { icon: '💳', text: 'Payment History' },
    { icon: '💵', text: 'Invoices' },
  ];

  const rentalsItems: CardItem[] = [
    { icon: '🏠', text: 'Current Rentals' },
    { icon: '📅', text: 'Rental History' },
  ];

  const helpCenterItems: CardItem[] = [
    { icon: '📞', text: 'Contact Support' },
    { icon: '🛠️', text: 'FAQ' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <main className="flex-grow w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10  ">
          <Card title="Personal Information" link="/profile/info" items={personalInformationItems} />
          <Card title="Transactions" link="/profile/transactions" items={transactionsItems} />
          <Card title="Rentals" link="/profile/locations" items={rentalsItems} />
          <Card title="Help Center" link="/profile/help" items={helpCenterItems} />
        </div>
      </main>
    </div>
  );
};

export default Profile;
