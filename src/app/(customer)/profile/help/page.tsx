'use client';
import React, { useState } from "react";
import {FiSkipBack} from "react-icons/fi";
import Link from "next/link";
import {useRouter} from "next/navigation";

type FAQItem = {
    question: string;
    answer: string;
};

const HelpPage: React.FC = () => {
    const router = useRouter();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAnswer = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const goBack = () => {
        router.back(); // This will navigate back to the previous page in the history stack
    };

    const faqs: FAQItem[] = [
        {
            question: "What are the requirements to rent a car?",
            answer: "To rent a car, you need a valid driver's license, a credit card for the security deposit, and proof of insurance. Additional requirements may vary based on the rental company's policies."
        },
        {
            question: "Can I rent a car without a driver?",
            answer: "Yes, you can rent a car without a driver. You will need to provide a valid driver's license and meet the rental company's age and insurance requirements."
        },
        {
            question: "What is the minimum age requirement to rent a car?",
            answer: "The minimum age requirement to rent a car is typically 21 years old. However, drivers under the age of 25 may be subject to a young driver fee."
        },
        {
            question: "Can I rent a car with a driver?",
            answer: "Yes, many rental companies offer the option to rent a car with a driver. This service may be subject to additional fees and availability."
        },
        {
            question: "What types of cars are available for rent?",
            answer: "A wide range of vehicles are available for rent, including economy cars, sedans, SUVs, luxury cars, and vans. The availability of specific models may vary based on location and demand."
        },
        {
            question: "How do I book a rental car?",
            answer: "You can book a rental car online through our website or by contacting our customer service. You will need to provide your personal details, driver's license information, and payment method."
        },
        {
            question: "What is your cancellation policy?",
            answer: "Our cancellation policy allows you to cancel your booking free of charge up to 24 hours before the scheduled pickup time. Cancellations made within 24 hours of the pickup time may incur a fee."
        },
        {
            question: "Is insurance included in the rental price?",
            answer: "Basic insurance is typically included in the rental price. However, additional coverage options are available for purchase, such as collision damage waivers and personal accident insurance."
        }
    ];

    return (
    <div className="min-h-screen w-full py-12 px-4 md:px-6">
        <div className="mx-6 mb-7 p-6 rounded-lg shadow-md relative w-6/8">
          <div className="absolute m-3 top-0 left-0">
              <button onClick={goBack} className="p-3 rounded-[100%] bg-white text-blue-500 hover:text-blue-700">
                  <FiSkipBack className="text-[15px] font-bold"/>
              </button>
          </div>
          <div className="absolute m-3 top-0 right-0">
              <Link href="/profile" className="h-[15px] w-[15px] font-bold px-3 py-1 rounded-[100%] bg-white hover:bg-red-200 text-[20px] text-gray-500 hover:text-gray-700">
                  &times;
              </Link>
          </div>

            <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-1">
              Frequently Asked Questions
          </h1>
          <p className="text-center text-gray-600 mb-6">
              We would like to chat with you.
          </p>

          <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4">
                        <div
                          className="flex justify-between items-center cursor-pointer"
                          onClick={() => toggleAnswer(index)}
                        >
                            <div className="flex items-start">
                                <div className="bg-blue-100 rounded-full p-2 mr-3">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6 text-blue-600"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.795-.251-.795-.593 0-.342.253-.694.795-.593C16.517 9.828 18 8.3 18 6.09c0-2.21-1.79-4-4-4S10 3.89 10 6.09c0 2.21 1.483 3.728 3.284 4.43zM8 11v4h8v-4H8z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {faq.question}
                                </h3>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-5 w-5 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        {openIndex === index && (
                          <div className="mt-2">
                              <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        )}
                    </div>
                  ))}
              </div>
          </div>
        </div>
        </div>
    </div>
    );
};

export default HelpPage;
