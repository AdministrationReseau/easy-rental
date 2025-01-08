
"use client";
import React from 'react';
import Image from "next/image";

const Profile = () => {

    return (
        <div>
            <main className="flex-grow overflow-y-auto bg-gray-100 p-6">
                <h1 className="text-2xl font-bold mb-4">Welcome Back!!!</h1>

                {/* Profile Header */}
                <div className=" relative">
                    {/* Background image */}
                    <div className="w-full h-32 bg-[url('/bannerSettings.svg')] bg-repeat rounded-t-lg"></div>

                    <div className="flex flex-col md:flex-row items-center p-6 rounded-lg -mt-16 md:ml-14 relative">
                        {/* Profile Image */}
                        <div className="relative">
                            <div
                                className="relative w-[170px] h-[170px] rounded-full overflow-hidden border-8 border-blue-400 shadow-lg">
                                <Image
                                    src="/personne2.png"
                                    alt="Profile"
                                    width={150}
                                    height={150}
                                    className="w-full h-full object-cover bg-gray-100"
                                />
                            </div>
                            <div
                                className="absolute bottom-4 right-2 bg-primary-blue w-8 h-8 z-10 rounded-full flex items-stretch justify-center">
                                <button>
                                    <Image
                                        src="/CameraIcon.svg"
                                        alt="share button"
                                        height={24}
                                        width={24}
                                    />
                                </button>
                            </div>
                        </div>


                        <div className="mt-4 ml-10">
                            <div>
                                {/* Name and Information */}
                                <h2 className="text-lg font-semibold text-primary-text mt-4">
                                    Mobina Mirbagheri
                                </h2>
                                <p className="text-sm font-semibold text-primary-text mt-1">
                                    Your account is ready, you can now apply for advice.
                                </p>
                                <span className="text-sm text-secondary-text flex justify-center">mirbagheri</span>
                            </div>
                            <div className="absolute right-[10%] top-[50%]">
                                {/*    Share button*/}
                                <button>
                                    <Image
                                        src="/shareIcon.svg"
                                        alt="share button"
                                        height={30}
                                        width={30}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {/* Personal Section */}
                    <div>
                        <h3 className="text-lg font-medium text-primary-text mb-4">Personal</h3>
                        <div className="space-y-4">
                            <div className="flex flex-row justify-between">
                                <div className="w-[49%]">
                                    <label className="block text-sm font-medium text-secondary-text">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="mobina"
                                        disabled
                                        className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                    />
                                </div>
                                <div className="w-[49%]">
                                    <label className="block text-sm font-medium text-secondary-text">
                                        Surname
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="mobina surname"
                                        disabled
                                        className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-text">
                                    Statut
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Customer"
                                    disabled
                                    className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-text">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    defaultValue="12345678"
                                    disabled
                                    className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-text">
                                    Age
                                </label>
                                <input
                                    type="number"
                                    defaultValue={25}
                                    disabled
                                    className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-lg font-medium text-primary-text mb-4">Contact</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-secondary-text">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    defaultValue="test@gmail.com"
                                    disabled
                                    className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-text">
                                    Phone Number
                                </label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        defaultValue="+237"
                                        disabled
                                        className="w-16 h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                    />
                                    <input
                                        type="text"
                                        defaultValue="620203233"
                                        disabled
                                        className="flex-1 h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-text">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Cameroon"
                                    disabled
                                    className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-text">
                                    City
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Yaounde"
                                    disabled
                                    className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;