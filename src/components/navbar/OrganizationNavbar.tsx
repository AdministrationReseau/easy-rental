'use client'

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaCar,
  FaBell,
  FaUser,
  FaUserCircle,
  FaCog,
  FaMoneyBillWave
} from 'react-icons/fa';

import Navbar from './Navbar';
import {NavAction} from "@/types/models/navbar"; // Adjusted import path

const OrganizationNavbar: React.FC = () => {
  const { t } = useTranslation('common'); // Changed namespace to 'common' as per context

  const actions: NavAction[] = [
    {
      type: 'icon',
      icon: <FaBell />,
      badge: 2, // Example badge count
      href: '/organization/notifications', // Adjusted path
      label: t('components.navbar.organization_navbar.notifications')
    },
    {
      type: 'dropdown',
      label: t('components.navbar.organization_navbar.profile'),
      icon: <FaUser />,
      items: [
        {
          label: t('components.navbar.organization_navbar.account'),
          href: '/organization/profile', // Adjusted path, assuming profile is under /organization
          icon: <FaUserCircle />
        },
        {
          label: t('components.navbar.organization_navbar.configurations'),
          href: '/organization/configuration', // Adjusted path
          icon: <FaCog />
        },
        {
          label: t('components.navbar.organization_navbar.subscription'),
          href: '/organization/subscription', // Adjusted path
          icon: <FaMoneyBillWave />
        }
        // Consider adding a logout link here if applicable
        // {
        //   label: t('components.navbar.client_navbar.logout'), // Reusing client logout translation for now
        //   href: '/logout', // Or specific organization logout path
        //   icon: <FaSignOutAlt />
        // }
      ]
    }
  ];

  return (
    <Navbar
      logo={{
        href: '/organization', // Main dashboard for organization
        label: 'EASY-RENT',
        icon: <FaCar className="text-primary mr-2 text-2xl" />
      }}
      // OrganizationNavbar typically doesn't have top-level links like Client/Guest, mostly actions/dropdowns
      links={[]}
      actions={actions}
      showLanguageSwitcher={true}
      showThemeSwitcher={true}
    />
  );
};

export default OrganizationNavbar;
