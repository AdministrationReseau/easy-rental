import React from "react";

const HelpPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Help & Support for Rental Agencies
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Find answers to common questions and guidance to effectively use the platform to showcase your services.
        </p>

        <div className="space-y-12">
          {/* Section 1: Getting Started */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Getting Started</h2>
            <p className="text-gray-600 mb-4">
              Learn how to set up your account, add your rental services, and manage your listings.
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Create an account and complete your profile.</li>
              <li>Upload high-quality images of your vehicles.</li>
              <li>Provide accurate details like pricing, features, and availability.</li>
              <li>Set up payment and cancellation policies.</li>
            </ul>
          </div>

          {/* Section 2: Managing Listings */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Managing Your Listings</h2>
            <p className="text-gray-600 mb-4">
              Keep your listings updated to attract more customers and maximize visibility.
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Edit vehicle details like pricing, features, and promotions.</li>
              <li>Monitor customer inquiries and respond promptly.</li>
              <li>Manage bookings and availability in real-time.</li>
              <li>Utilize performance analytics to optimize your listings.</li>
            </ul>
          </div>

          {/* Section 3: Customer Support */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Support</h2>
            <p className="text-gray-600 mb-4">
              Offer top-notch support to your customers and enhance their experience.
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Set up a 24/7 customer support line.</li>
              <li>Provide clear policies on refunds and cancellations.</li>
              <li>Address customer feedback to improve your services.</li>
              <li>Offer loyalty discounts to returning customers.</li>
            </ul>
          </div>

          {/* Section 4: FAQ */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 mb-4">
              Here are some quick answers to common questions:
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>
                <strong>How do I update my pricing?</strong> Go to your dashboard and select the Edit Listing option.
              </li>
              <li>
                <strong>Can I pause my listings?</strong> Yes, use the Pause option to temporarily hide your vehicles.
              </li>
              <li>
                <strong>What if I face technical issues?</strong> Contact our support team via the Help Center in your dashboard.
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HelpPage;
