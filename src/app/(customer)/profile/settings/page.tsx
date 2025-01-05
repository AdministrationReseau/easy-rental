"use client";
import Field from '@/components/base-component/fields';
import React from 'react';

const Setting = () => {

    return (
        <div>
            <main className="flex-grow overflow-y-auto bg-gray-100 p-6">
                <h1 className="text-2xl font-bold mb-4">Settings</h1>    
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
