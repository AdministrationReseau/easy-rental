"use client";
import React, {useState} from 'react';

const Setting = () => {
    // State to handle password visibility for each field
    const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState<boolean>(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState<boolean>(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);

    return (
        <div>
            <main className="flex-grow overflow-y-auto bg-gray-100 py-6">
                <h1 className="text-2xl font-bold text-secondary-text mb-4">Edit profile</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {/* Personal Section */}
                    <div>
                        <h3 className="text-lg font-bold text-secondary-text mb-4">Personal</h3>
                        <div className="space-y-4">
                            <div className="flex flex-row justify-between">
                                <div className="w-[49%]">
                                    <label className="block text-sm font-bold text-primary-text">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="mobina"
                                        className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                    />
                                </div>
                                <div className="w-[49%]">
                                    <label className="block text-sm font-bold text-primary-text">
                                        Surname
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="mobina surname"
                                        className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-primary-text">
                                    Statut
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Customer"
                                    disabled
                                    className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text "
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-primary-text">
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
                                <label className="block text-sm font-bold text-primary-text">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    defaultValue="test@gmail.com"
                                    className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-primary-text">
                                    Phone Number
                                </label>
                                <div className="flex items-center space-x-2 w-[80%] ">
                                    <input
                                        type="text"
                                        defaultValue="+237"
                                        className="w-16 h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                    />
                                    <input
                                        type="text"
                                        defaultValue="620203233"
                                        className="flex-1 h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text w-[80%] "
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-primary-text">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Cameroon"
                                    className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-primary-text">
                                    City
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Yaounde"
                                    className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                />
                            </div>
                        </div>
                    </div>

                    {/*password section*/}
                    <div>
                        <h3 className="text-lg font-bold text-secondary-text mb-4">Password</h3>

                        {/* Current Password */}
                        <div>
                            <label className="block text-sm font-bold text-primary-text">
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    type={isCurrentPasswordVisible ? "text" : "password"}
                                    defaultValue="12345678"
                                    className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text mb-5"
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsCurrentPasswordVisible((prev) => !prev)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-text"
                                    aria-label={
                                        isCurrentPasswordVisible ? "Hide current password" : "Show current password"
                                    }
                                >
                                    {isCurrentPasswordVisible ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block text-sm font-bold text-primary-text">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={isNewPasswordVisible ? "text" : "password"}
                                    defaultValue="12345678"
                                    className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text mb-5"
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsNewPasswordVisible((prev) => !prev)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-text"
                                    aria-label={
                                        isNewPasswordVisible ? "Hide new password" : "Show new password"
                                    }
                                >
                                    {isNewPasswordVisible ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-bold text-primary-text">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={isConfirmPasswordVisible ? "text" : "password"}
                                    defaultValue="12345678"
                                    className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text mb-5"
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-text"
                                    aria-label={
                                        isConfirmPasswordVisible ? "Hide confirm password" : "Show confirm password"
                                    }
                                >
                                    {isConfirmPasswordVisible ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="flex justify-center">
                    <button
                        className="text-white font-bold w-[120px] h-[40px] py-[10px] px-[20px] rounded bg-primary-blue">
                        Save
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Setting;