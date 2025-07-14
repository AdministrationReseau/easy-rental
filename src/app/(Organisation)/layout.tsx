'use client';

import React from "react";
import NavOrg from "@/components/organisation/NavOrg";
import OrganizationSidebar from "@/components/sidebar/OrganizationSidebar";

export default function Layout({children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex  h-screen">
                <div >
                    <OrganizationSidebar/>
                </div>

                <div className="flex flex-col flex-grow ml-64">
                    <NavOrg/>

                    <div className="flex-grow overflow-y-auto bg-gray-90 p-6 ">
                        {children}
                    </div>

                </div>
            </div>

        </>
    )
}
