// components/Layout.tsx
'use client';
import React from 'react';
// import ProfileSidebar from "@/components/ProfileSidebar";
import NavBar from "@/components/organisation/NavBar";
import ProfileHeader from "@/components/ProfileHeader";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <NavBar />
      <div className="flex">
        <div className="flex flex-col bg-gray-100 flex-grow mt-14 overflow-y-auto">
          <ProfileHeader />
          {children}
        </div>
      </div>
    </>
  );
}
