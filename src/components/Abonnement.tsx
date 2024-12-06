import React from "react";
import {PoppinsBold} from "@/fonts";

interface AbonnementProps{
    title: string;
    price: number;
    frequency: string;
    options: { label: string; available: boolean }[];
}

const Abonnement: React.FC<AbonnementProps> = ({ title, price, frequency, options }) => {
    return (
        <div>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow">
                <h5 className="mb-4 text-xl font-medium text-gray-500">{title}</h5>

                <div className="flex items-baseline text-gray-900">
                    <span className={`text-5xl ${PoppinsBold.className} tracking-tight`}>{price}</span>
                    <span className={`text-3xl ${PoppinsBold.className}`}>FCFA</span>
                    <span className="ms-1 text-xl text-gray-500">/{frequency}</span>
                </div>

                <ul role="list" className="space-y-5 my-7">
                {options.map((option, index) => (
                        <li
                            key={index}
                            className={`flex items-center ${
                                option.available ? "" : "line-through decoration-gray-500"
                            }`}
                        >
                            <svg
                                className={`flex-shrink-0 w-4 h-4 ${
                                    option.available ? "text-blue-700" : "text-gray-400"
                                }`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>
                            <span className="text-base leading-tight text-gray-500 ms-3">
                {option.label}
              </span>
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    className="text-white bg-secondary-blue hover:bg-primary-blue focus:ring-4 focus:outline-none focus:ring-blue-200 rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                >
                    Choose plan
                </button>
            </div>
        </div>
    );
};

export default Abonnement;
