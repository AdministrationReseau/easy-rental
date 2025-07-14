// import React from "react";
// import Abonnement from "@/components/Abonnement";

// const subscriptions = [
//   {
//     "title": "Monthly",
//     "price": 10000,
//     "frequency": "month",
//     "options": [
//       { "label": "Unlimited access to all vehicles", "available": true },
//       { "label": "24/7 customer support", "available": true },
//       { "label": "Advanced customization (color choices, accessories)", "available": true },
//       { "label": "Unlimited mileage", "available": true },
//       { "label": "Basic insurance coverage", "available": true },
//       { "label": "Access to exclusive promotions", "available": true },
//       { "label": "Maintenance included", "available": true },
//       { "label": "24/7 roadside assistance", "available": true }
//     ]
//   },
//   {
//     "title": "Annual",
//     "price": 100000,
//     "frequency": "year",
//     "options": [
//       { "label": "Unlimited access to all vehicles", "available": true },
//       { "label": "24/7 customer support", "available": true },
//       { "label": "Advanced customization (color choices, accessories)", "available": true },
//       { "label": "Unlimited mileage", "available": true },
//       { "label": "Premium insurance coverage", "available": true },
//       { "label": "Access to exclusive promotions", "available": true },
//       { "label": "Maintenance included", "available": true },
//       { "label": "24/7 roadside assistance", "available": true }
//     ]
//   }
// ];

// const SubscriptionPage: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-4xl mx-auto py-12 px-6">
//         <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//           Choose Your Subscription Plan
//         </h1>
//         <p className="text-center text-gray-600 mb-12">
//           Select a plan that fits your needs. You can switch to a different plan at any time.
//         </p>

//         <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
//           {subscriptions.map((subscription, index) => (
//             <Abonnement
//               key={index}
//               title={subscription.title}
//               price={subscription.price}
//               frequency={subscription.frequency}
//               options={subscription.options}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionPage;
"use client";
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

type Plan = {
  id: string;
  name: string;
  price: number;
  features: string[];
  billingCycle: 'monthly' | 'yearly';
  isPopular?: boolean;
};

const plans: Plan[] = [
  {
    id: 'basic-monthly',
    name: 'Basique',
    price: 49000,
    features: [
      'Accès à 5 véhicules',
      'Support par email',
      'Tableau de bord basique',
      'Gestion des réservations'
    ],
    billingCycle: 'monthly',
  },
  {
    id: 'pro-monthly',
    name: 'Professionnel',
    price: 99000,
    features: [
      'Accès à 20 véhicules',
      'Support prioritaire',
      'Tableau de bord avancé',
      'Gestion complète des flottes',
      'Accès API',
      'Rapports détaillés'
    ],
    billingCycle: 'monthly',
    isPopular: true,
  },
  {
    id: 'enterprise-monthly',
    name: 'Entreprise',
    price: 199000,
    features: [
      'Véhicules illimités',
      'Support dédié 24/7',
      'Toutes les fonctionnalités',
      'Personnalisation avancée',
      'Intégration personnalisée',
      'Formation dédiée'
    ],
    billingCycle: 'monthly',
  },
];

export default function SubscriptionPage() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handlePlanSelect = (plan: Plan) => {
    router.push(`/subscription/register?plan=${plan.id}`);
  };

  return (
    <div className="min-h-screen bg-whitish-background dark:bg-[var(--background)]">
      <Head>
        <title>Subscription | Easy Rental</title>
      </Head>

      <div className="relative overflow-hidden bg-gradient-to-r from-primary-blue to-secondary-blue py-16">
        <div className="absolute inset-0">
          <svg
            className="absolute left-0 top-0 h-full w-full text-white/10 transform -translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Choose a subscription Plan
          </motion.h1>
          <motion.p className="text-xl text-white/90 max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            Select the plan that best suits your needs and start enjoying our services today!
          </motion.p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-toggle-blue-background p-2 rounded-full shadow-md inline-flex items-center">
            <button className={`px-4 py-2 rounded-full text-sm font-medium ${billingCycle === 'monthly' ? 'bg-primary-blue text-white' : 'text-primary-text dark:text-secondary-text hover:bg-whitish-background dark:hover:bg-toggle-blue'}`} onClick={() => setBillingCycle('monthly')}>
              Monthly
            </button>
            <button className={`px-4 py-2 rounded-full text-sm font-medium ${billingCycle === 'yearly' ? 'bg-primary-blue text-white' : 'text-primary-text dark:text-secondary-text hover:bg-whitish-background dark:hover:bg-toggle-blue'}`} onClick={() => setBillingCycle('yearly')}>
              Yearly
              <span className="ml-1 bg-green-background text-green-text text-xs px-2 py-0.5 rounded-full">
                -20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {plans.map((plan) => (
            <motion.div key={plan.id} className={`relative overflow-hidden rounded-2xl shadow-lg ${plan.isPopular ? 'border-2 border-primary-blue ring-4 ring-primary-blue/20 bg-white dark:bg-[var(--background)] transform scale-105 md:scale-110 z-10' : 'border border-secondary-text bg-white dark:bg-[var(--background)]'}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: plan.isPopular ? 0.1 : 0.2 }}>
              {plan.isPopular && (
                <div className="absolute top-0 right-0 -mr-2 -mt-2 bg-primary-blue text-white text-xs font-bold py-1 px-3 rounded-bl-lg transform rotate-45 origin-top-right shadow-md">
                  Most Popular
                </div>
              )}
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-primary-text dark:text-white mb-2">{plan.name}</h3>
                <div className="mt-4 flex items-baseline text-primary-text dark:text-white">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    {new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(billingCycle === 'yearly' ? plan.price * 0.8 * 12 : plan.price)}
                  </span>
                  <span className="ml-1 text-2xl font-medium text-secondary-text">XAF</span>
                  <span className="ml-2 text-sm font-medium text-secondary-text">
                    /{billingCycle === 'yearly' ? 'per year' : 'per month'}
                  </span>
                </div>
                <p className="mt-2 text-secondary-text dark:text-gray-400 min-h-[40px]">
                  {plan.isPopular ? "Unlock all features with our Pro plan — ideal for professionals who want the best experience." : plan.id === 'basic-monthly' ? "A simple and affordable plan for individuals getting started with essential tools." : "Custom solutions and premium support for large teams and enterprises."}
                </p>
                <button onClick={() => handlePlanSelect(plan)} className={`mt-6 w-full py-3 px-4 rounded-lg text-center font-medium transition-all ${plan.isPopular ? 'bg-primary-blue hover:bg-secondary-blue text-white shadow-md hover:shadow-lg' : 'bg-white hover:bg-whitish-background text-primary-blue border border-primary-blue dark:bg-toggle-blue-background dark:hover:bg-toggle-blue dark:border-secondary-blue dark:text-secondary-blue'}`}>
                  {plan.isPopular ? 'Get started' : 'Select plan'}
                </button>
                <div className="mt-8">
                  <h4 className="text-base font-medium text-primary-text dark:text-white mb-4">Features included</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className={`flex-shrink-0 ${plan.isPopular ? 'text-primary-blue' : 'text-secondary-text dark:text-gray-400'}`}>
                          <Check className="h-5 w-5" />
                        </div>
                        <p className="ml-3 text-sm text-primary-text dark:text-gray-300">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-text dark:text-white mb-4">Why choose it?</h2>
            <p className="text-lg text-secondary-text dark:text-gray-400 max-w-2xl mx-auto">
              Description of the benefits and features of the subscription plans.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: "🛡️",
                title: "Security",
                description: "Your data and transactions are protected with industry-standard encryption and regular security audits."
              },
              {
                icon: "⚡",
                title: "High Performance",
                description: "Enjoy fast loading times and a seamless experience across all your devices."
              },
              {
                icon: "🔧",
                title: "24/7 Support",
                description: "Our support team is always available to help you with any issues or questions you may have."
              }
            ].map((item, index) => (
              <motion.div key={index} className="bg-white dark:bg-[var(--background)] p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 * index }}>
                <div className="w-14 h-14 bg-primary-blue/10 rounded-full flex items-center justify-center mb-5 text-4xl">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-primary-text dark:text-white mb-3">{item.title}</h3>
                <p className="text-secondary-text dark:text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-bold text-primary-text dark:text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "What is included in the subscription?",
                  answer: "You get access to all premium features, including unlimited usage, priority support, and exclusive updates."
                },
                {
                  question: "Can I cancel at any time?",
                  answer: "Yes, you can cancel your subscription at any time from your account settings. There are no cancellation fees."
                },
                {
                  question: "Do you offer a free trial?",
                  answer: "Absolutely! We offer a 7-day free trial so you can explore all the premium features before committing."
                },
                {
                  question: "Is my payment information secure?",
                  answer: "Yes, we use industry-standard encryption and secure payment gateways to protect your payment details."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white dark:bg-[var(--background)] rounded-xl shadow-md overflow-hidden">
                  <details className="group">
                    <summary className="cursor-pointer flex items-center justify-between p-6 text-primary-text dark:text-white font-medium">
                      {item.question}
                      <span className="ml-6 flex-shrink-0 text-secondary-text group-open:rotate-180 transition-transform duration-200">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-secondary-text dark:text-gray-300">{item.answer}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 bg-primary-blue rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-12 sm:px-12 lg:px-16 lg:py-16 text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">Ready to get started?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
              Start your free trial today and experience the full power of our platform with no risk and no credit card required.
            </p>
            <div className="inline-flex items-center rounded-full shadow-lg bg-white text-primary-blue px-2 py-2 font-medium">
              <button onClick={() => handlePlanSelect(plans.find(p => p.isPopular) || plans[1])} className="px-6 py-2 bg-primary-blue text-white rounded-full">
                Start Free Trial
              </button>
              <span className="px-4">or</span>
              <button onClick={() => document.querySelector('#plans')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-2">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
