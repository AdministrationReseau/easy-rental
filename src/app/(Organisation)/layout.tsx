'use client';

import React from "react";
import OrgSidebar from "@/components/OrgSidebar";
import NavOrg from "@/components/organisation/NavOrg";

export default function Layout({children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex h-screen">
                <OrgSidebar/>

                <div className="flex flex-col flex-grow">
                    <NavOrg/>

                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
