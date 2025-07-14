'use client'

import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
import {
  FaChartBar,
  FaCar,
  FaUsers,
  FaUserTie,
  FaCarSide,
  FaExchangeAlt,
  FaQuestionCircle,
  FaSignOutAlt,
} from 'react-icons/fa';

import Sidebar from '@/components/sidebar/Sidebar';
import { SidebarItem } from '@/utils/types/models/sidebar';

const AgencySidebar: React.FC = () => {
  // const { t } = useTranslation('common');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarItems: SidebarItem[] = [
    {
      label: "Dashboard",
      href: '/agency',
      icon: <FaChartBar />
    },
    {
      label: "Entities",
      icon: <FaCar />,
      children: [
        {
          label: "Staff",
          href: '/agency/staff',
          icon: <FaUsers />
        },
        {
          label: "Vehicles",
          href: '/agency/vehicles',
          icon: <FaCarSide />
        },
        {
          label: "Drivers",
          href: '/agency/drivers',
          icon: <FaUserTie />
        }
      ]
    },
    {
      label: "Rentals",
      href: '/agency/rentals',
      icon: <FaCarSide />
    },
    {
      label: "Transactions",
      href: '/agency/transactions',
      icon: <FaExchangeAlt />
    }
  ];

  const bottomItems: SidebarItem[] = [
    {
      label: "Help Center",
      href: '/agency/help',
      icon: <FaQuestionCircle />
    },
    {
      label: "Logout",
      href: '/auth/logout',
      icon: <FaSignOutAlt />
    }
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Sidebar
      items={sidebarItems}
      bottomItems={bottomItems}
      isCollapsed={isCollapsed}
      onToggle={toggleSidebar}
    />
  );
};

export default AgencySidebar;
