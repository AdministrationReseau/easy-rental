'use client'
import React, { useState } from "react";

const ConfigurationPage: React.FC = () => {
    const [rentalService, setRentalService] = useState({
        withDriver: false,
        withoutDriver: false,
    });
    const [paymentService, setPaymentService] = useState({
        organizationName: "",
        paymentEmail: "",
        paymentNumber: "",
        isRegistered: false,
    });

    const handleRentalServiceChange = (type: "withDriver" | "withoutDriver") => {
        setRentalService((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    const handlePaymentServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentService((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePaymentServiceRegistration = () => {
        if (paymentService.organizationName && paymentService.paymentEmail && paymentService.paymentNumber) {
            setPaymentService((prev) => ({
                ...prev,
                isRegistered: true,
            }));
            alert("Votre organisation est maintenant enregistrée pour le service de paiement.");
        } else {
            alert("Veuillez remplir tous les champs pour vous enregistrer.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
                    Configuration des Services
                </h1>
                <p className="text-center text-gray-600 mb-12">
                    Configurez vos services de location et enregistrez votre organisation pour le service de paiement.
                </p>

                {/* Section: Configuration des Services de Location */}
                <div className="bg-white shadow-lg rounded-lg p-6 mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Services de Location</h2>
                    <p className="text-gray-600 mb-4">
                        Sélectionnez les options de location que votre organisation souhaite offrir :
                    </p>
                    <div className="space-y-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-3"
                                checked={rentalService.withDriver}
                                onChange={() => handleRentalServiceChange("withDriver")}
                            />
                            Location avec chauffeur
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-3"
                                checked={rentalService.withoutDriver}
                                onChange={() => handleRentalServiceChange("withoutDriver")}
                            />
                            Location sans chauffeur
                        </label>
                    </div>
                </div>

                {/* Section: Enregistrement au Service de Paiement */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Service de Paiement</h2>
                    <p className="text-gray-600 mb-4">
                        Enregistrez votre organisation pour utiliser notre service de paiement :
                    </p>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-600 mb-2">Nom de l&rsquo;organisation</label>
                            <input
                                type="text"
                                name="organizationName"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                placeholder="Entrez le nom de votre organisation"
                                value={paymentService.organizationName}
                                onChange={handlePaymentServiceChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-2">Email pour les paiements</label>
                            <input
                                type="email"
                                name="paymentEmail"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                placeholder="Entrez l'email pour recevoir les paiements"
                                value={paymentService.paymentEmail}
                                onChange={handlePaymentServiceChange}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-2">Numero pour les paiements</label>
                            <input
                                type="email"
                                name="paymentNumber"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                placeholder="Entrez le numero pour recevoir les paiements"
                                value={paymentService.paymentNumber}
                                onChange={handlePaymentServiceChange}
                            />
                        </div>
                        <button
                            className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
                            onClick={handlePaymentServiceRegistration}
                        >
                            S&rsquo;enregistrer pour le Service de Paiement
                        </button>
                    </div>
                    {paymentService.isRegistered && (
                        <p className="text-green-600 mt-4">
                            Votre organisation est enregistrée pour le service de paiement !
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConfigurationPage;
