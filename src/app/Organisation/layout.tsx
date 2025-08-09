'use client';

import React from "react";
import OrgSidebar from "@/components/OrgSidebar";
import NavOrg from "@/components/organisation/NavOrg";

export default function Layout({children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex h-screen">
                <div>
                    <OrgSidebar/>
                </div>

                <div className="flex flex-col flex-grow">
                    <NavOrg/>

                    <div className="flex-grow overflow-y-auto bg-gray-90 p-1 ">
                        {children}
                    </div>

                </div>
            </div>

        </>
    )
}
