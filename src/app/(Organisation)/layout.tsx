'use client';

import React from "react";
import OrgSidebar from "@/components/OrgSidebar";
import OrganizationNavbar from "@/components/navbar/OrganizationNavbar"; // Changed import

export default function OrganisationLayout({children }: { children: React.ReactNode }) { // Renamed component
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen"> {/* Ensure full height and bg */}
            <OrganizationNavbar /> {/* New Navbar at the top */}

            {/* Content area below the fixed navbar */}
            <div className="flex pt-16 h-[calc(100vh-4rem)]"> {/* Adjust pt-16 (4rem) if navbar height is different */}
                <div>
                    <OrgSidebar/>
                </div>

                {/* Main content area */}
                {/* No need for NavOrg here anymore */}
                <div className="flex flex-col flex-grow overflow-hidden">
                    <div className="flex-grow overflow-y-auto bg-gray-50 dark:bg-gray-800 p-4 md:p-6"> {/* Adjusted background and padding */}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
