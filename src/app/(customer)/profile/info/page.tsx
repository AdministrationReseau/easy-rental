"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSkipBack } from "react-icons/fi";
import Link from "next/link";

const Profile = () => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const goBack = () => {
        router.back();
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
      <div>
          <main className="flex-grow mb-4 min-h-screen">
              <div className="bg-white m-6 p-6 rounded-lg shadow-md relative w-6/8">
                  <div className="absolute top-4 left-4">
                      <button onClick={goBack} className="text-blue-500 hover:text-blue-700">
                          <FiSkipBack className="text-[25px]" />
                      </button>
                  </div>
                  <div className="absolute top-4 right-4">
                      <Link href="/profile" className="text-[30px] text-gray-500 hover:text-gray-700">
                          &times;
                      </Link>
                  </div>
                  <div className="mt-8">
                      <h1 className="text-2xl font-bold text-secondary-text mb-4">
                          {isEditing ? "Edit Profile" : "Profile"}
                      </h1>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mx-16">
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
                                            defaultValue="Mobina"
                                            disabled={!isEditing}
                                            className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                          />
                                      </div>
                                      <div className="w-[49%]">
                                          <label className="block text-sm font-medium text-secondary-text">
                                              Surname
                                          </label>
                                          <input
                                            type="text"
                                            defaultValue="Mobina Surname"
                                            disabled={!isEditing}
                                            className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                          />
                                      </div>
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium text-secondary-text">
                                          Status
                                      </label>
                                      <input
                                        type="text"
                                        defaultValue="Customer"
                                        disabled
                                        className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                      />
                                  </div>
                                  {isEditing && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-secondary-text">
                                                Current Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                  type={isCurrentPasswordVisible ? "text" : "password"}
                                                  defaultValue="12345678"
                                                  className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                                />
                                                <button
                                                  type="button"
                                                  onClick={() => setIsCurrentPasswordVisible(prev => !prev)}
                                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-text"
                                                >
                                                    {isCurrentPasswordVisible ? "Hide" : "Show"}
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-secondary-text">
                                                New Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                  type={isNewPasswordVisible ? "text" : "password"}
                                                  className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                                />
                                                <button
                                                  type="button"
                                                  onClick={() => setIsNewPasswordVisible(prev => !prev)}
                                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-text"
                                                >
                                                    {isNewPasswordVisible ? "Hide" : "Show"}
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-secondary-text">
                                                Confirm Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                  type={isConfirmPasswordVisible ? "text" : "password"}
                                                  className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                                />
                                                <button
                                                  type="button"
                                                  onClick={() => setIsConfirmPasswordVisible(prev => !prev)}
                                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-text"
                                                >
                                                    {isConfirmPasswordVisible ? "Hide" : "Show"}
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                  )}
                                  <div>
                                      <label className="block text-sm font-medium text-secondary-text">
                                          Age
                                      </label>
                                      <input
                                        type="number"
                                        defaultValue={25}
                                        disabled={!isEditing}
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
                                        disabled={!isEditing}
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
                                            disabled={!isEditing}
                                            className="w-16 h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                          />
                                          <input
                                            type="text"
                                            defaultValue="620203233"
                                            disabled={!isEditing}
                                            className="flex-1 h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text w-[80%]"
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
                                        disabled={!isEditing}
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
                                        disabled={!isEditing}
                                        className="w-full h-[44px] border rounded-lg px-4 py-2 text-sm text-primary-text"
                                      />
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="flex justify-center mt-8">
                          <button
                            onClick={toggleEdit}
                            className="text-white font-bold py-[7px] px-[40px] rounded bg-primary-blue"
                          >
                              {isEditing ? "Save" : "Edit"}
                          </button>
                      </div>
                  </div>
              </div>
          </main>
      </div>
    );
};

export default Profile;
