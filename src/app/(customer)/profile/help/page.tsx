import React from "react";

const HelpPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
                    Vehicle Location Service Help
                </h1>
                <p className="text-center text-gray-600 mb-12">
                    Step-by-step guides and answers to common questions to help you effectively use the vehicle location service.
                </p>

                <div className="space-y-12">
                    {/* Section 1: Getting Started */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Getting Started</h2>
                        <p className="text-gray-600 mb-4">
                            Follow these steps to set up and start using the vehicle location service:
                        </p>
                        <ol className="list-decimal pl-5 text-gray-600 space-y-2">
                            <li>Access the web portal and create an account.</li>
                            <li>Install the tracking device in your vehicle, following the manufacturer&rsquo;s instructions.</li>
                            <li>Log in and link the device to your account by entering the unique device ID provided with the tracker.</li>
                            <li>Confirm your tracker is active by checking the real-time map in the app or web portal.</li>
                        </ol>
                    </div>

                    {/* Section 2: Using the Service */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Using the Service</h2>
                        <p className="text-gray-600 mb-4">
                            Discover the key features of the service and how to use them effectively:
                        </p>
                        <ol className="list-decimal pl-5 text-gray-600 space-y-2">
                            <li>
                                <strong>Real-time tracking:</strong> Open the app or portal to view the current location of your vehicle on the map.
                            </li>
                            <li>
                                <strong>Geofencing:</strong> Set up virtual boundaries and receive notifications if the vehicle enters or exits these areas.
                            </li>
                            <li>
                                <strong>Location history:</strong> Access past routes and stop details through the history section of your dashboard.
                            </li>
                            <li>
                                <strong>Alerts:</strong> Enable notifications for movement, idle time, or specific events to stay updated.
                            </li>
                        </ol>
                    </div>

                    {/* Section 3: Troubleshooting */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Troubleshooting</h2>
                        <p className="text-gray-600 mb-4">
                            Having issues? Here are some common problems and their solutions:
                        </p>
                        <ol className="list-decimal pl-5 text-gray-600 space-y-2">
                            <li>
                                <strong>No location updates:</strong> Ensure your tracking device has power and a stable GPS signal. Restart the app or refresh the portal.
                            </li>
                            <li>
                                <strong>Device offline:</strong> Check the device’s power source, and ensure cellular connectivity is active.
                            </li>
                            <li>
                                <strong>Incorrect location data:</strong> Reposition the device to improve signal reception and recalibrate if necessary.
                            </li>
                            <li>
                                <strong>Persistent issues:</strong> Contact our support team through the Help section in the app or call us directly.
                            </li>
                        </ol>
                    </div>

                    {/* Section 4: FAQ */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-600 mb-4">
                            Quick answers to commonly asked questions:
                        </p>
                        <ul className="list-disc pl-5 text-gray-600 space-y-2">
                            <li>
                                <strong>How do I add another vehicle?</strong> Navigate to the dashboard, select &rdquo;Add Vehicle,&rdquo; and enter the new device ID.
                            </li>
                            <li>
                                <strong>Can I monitor multiple vehicles?</strong> Yes, you can add and manage multiple vehicles under a single account.
                            </li>
                            <li>
                                <strong>What happens if my tracker is stolen?</strong> Contact support immediately to lock or deactivate the device remotely.
                            </li>
                            <li>
                                <strong>How do I update my account details?</strong> Go to the profile section in the app or portal to make changes.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;
