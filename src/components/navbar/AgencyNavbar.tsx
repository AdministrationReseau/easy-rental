'use client'

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaCar,
  FaBell,
  FaUser,
  FaSignOutAlt
  // Add other icons if needed for agency-specific actions
} from 'react-icons/fa';

import Navbar from './Navbar';
import {NavAction} from "@/types/models/navbar"; // Adjusted import path

const AgencyNavbar: React.FC = () => {
  const { t } = useTranslation('common'); // Changed namespace to 'common'

  // Define actions for the Agency Navbar.
  // This might include notifications and a user/profile dropdown.
  const actions: NavAction[] = [
    {
      type: 'icon',
      icon: <FaBell />,
      badge: 1, // Example badge count
      href: '/agency/notifications', // Path to agency notifications
      label: t('components.navbar.agency_navbar.notifications', {defaultValue: "Notifications"}) // Added defaultValue
    },
    {
      type: 'dropdown',
      label: "Agency User", // Placeholder, replace with actual user name or generic label
      icon: <FaUser />,
      items: [
        // Example items, adjust as needed for agency context
        {
          label: "Profile", // Placeholder
          href: '/agency/profile', // Path to agency user profile
          icon: <FaUser />
        },
        {
          label: t('components.navbar.client_navbar.logout'), // Re-using client logout label
          href: '/logout', // General logout or agency-specific logout
          icon: <FaSignOutAlt />
        }
      ]
    }
  ];

  return (
    <Navbar
      logo={{
        href: '/agency', // Main dashboard or landing page for an agency
        label: 'EASY-RENT', // Or Agency Name if available dynamically
        icon: <FaCar className="text-primary mr-2 text-2xl" />
      }}
      // AgencyNavbar might also have minimal top-level links or rely on a sidebar for main navigation
      links={[]}
      actions={actions}
      showLanguageSwitcher={true}
      showThemeSwitcher={true}
    />
  );
};

export default AgencyNavbar;
