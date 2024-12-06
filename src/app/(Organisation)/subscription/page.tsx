import React from "react";
import Abonnement from "@/components/Abonnement";

const subscriptions = [
  {
    "title": "Monthly",
    "price": 10000,
    "frequency": "month",
    "options": [
      { "label": "Unlimited access to all vehicles", "available": true },
      { "label": "24/7 customer support", "available": true },
      { "label": "Advanced customization (color choices, accessories)", "available": true },
      { "label": "Unlimited mileage", "available": true },
      { "label": "Basic insurance coverage", "available": true },
      { "label": "Access to exclusive promotions", "available": true },
      { "label": "Maintenance included", "available": true },
      { "label": "24/7 roadside assistance", "available": true }
    ]
  },
  {
    "title": "Annual",
    "price": 100000,
    "frequency": "year",
    "options": [
      { "label": "Unlimited access to all vehicles", "available": true },
      { "label": "24/7 customer support", "available": true },
      { "label": "Advanced customization (color choices, accessories)", "available": true },
      { "label": "Unlimited mileage", "available": true },
      { "label": "Premium insurance coverage", "available": true },
      { "label": "Access to exclusive promotions", "available": true },
      { "label": "Maintenance included", "available": true },
      { "label": "24/7 roadside assistance", "available": true }
    ]
  }
];

const SubscriptionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Choose Your Subscription Plan
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Select a plan that fits your needs. You can switch to a different plan at any time.
        </p>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
          {subscriptions.map((subscription, index) => (
            <Abonnement
              key={index}
              title={subscription.title}
              price={subscription.price}
              frequency={subscription.frequency}
              options={subscription.options}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
