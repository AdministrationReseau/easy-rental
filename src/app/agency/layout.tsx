'use client'

import AgencyNavbar from "@/components/navbar/AgencyNavbar";
import AgencySidebar from "@/components/sidebar/AgencySidebar"; // Assuming this will be created or already exists from context
import React from "react";

export default function AgencyLayout({children }: { children: React.ReactNode }) { // Renamed for clarity
    return (
        <div className="bg-background-light dark:bg-background-dark">
          <AgencyNavbar/>
          {/* The AgencySidebar from context seems to be a main sidebar, not nested under navbar */}
          {/* It's possible the main content area needs to be aware of both navbar and sidebar */}
          {/* The context's AgencySidebar was fixed, and main had md:ml-64 */}
          <AgencySidebar />
          <main className="md:ml-64 pt-[60px] pb-[70px] md:pb-0"> {/* pt-[60px] might need adjustment based on navbar height */}
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
    )
}
