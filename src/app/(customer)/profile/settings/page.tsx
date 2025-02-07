"use client";
import Field from '@/components/base-component/fields';
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
            <h1 className="text-2xl text-secondary-text mb-4 px-8">Edit Profile</h1>
            <div className=" p-6">
                <form className="flex flex-wrap gap-2 xl:gap-6 ">
                    <div className="flex-1">
                        <label className="text-secondary-text py-2">Personal</label>
                        <div className="flex flex-wrap gap-6">
                        <Field
                            label="First name"
                            placeholder="Enter your first name"
                            size="w-full xl:w-2/5"
                            />                                            
                            <Field
                            label="Surname"
                            placeholder="Enter your last name"
                            size="w-full xl:w-2/5"
                            />
                        </div>
                        <Field
                        label="statut"
                        type="text"
                        placeholder="Customer"
                        />
                        <Field
                        label="Age"
                        type="number"
                        placeholder="25"
                        />
                         <button
                        type="submit"
                        className="w-1/2 mt-32 mb-12 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        >
                        Save
                        </button>
                    </div>
                    <div className="flex-1">
                    <label className="text-secondary-text py-6">Contact</label>
                        <Field
                        label="Email"
                        type="email"
                        placeholder="test@gmail.com"
                        size="w-full"
                        />  

                        <label>Phone number</label>
                        <div className="flex flex-wrap gap-2">
                            <Field
                            label=""
                            type='text'
                            placeholder="+237"
                            size="w-1/4"
                            />
                            <Field
                            label=" "
                            type="text"
                            placeholder="620203233"
                            size="w-2/3"
                            /> 
                        </div>                                          
                        
                        <Field
                        label="Country"
                        type="text"
                        placeholder="Cameroon"
                        />
                        <Field
                        label="City"
                        type="text"
                        placeholder="Yaounde"
                        />
                       
                    </div>
                    

                    
                </form>
                <form className="flex flex-col ">
                    <Field
                    label="Current Password"
                    type="password"
                    placeholder="********"
                    size="xl:w-1/2"
                    />
                    <Field
                    label="New Password"
                    type="password"
                    placeholder="********"
                    size="xl:w-1/2"
                    />
                    <Field
                    label="Confirm Password"
                    type="password"
                    placeholder="********"
                    size="xl:w-1/2"
                    />

                    </form>


            </div>
        </div>
    );
};

export default Setting;