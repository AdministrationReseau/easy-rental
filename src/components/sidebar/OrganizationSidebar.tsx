'use client'

import React, {ReactNode, useState} from 'react';
import {
  FaChartBar,
  FaCar,
  FaUsers,
  FaUserTie,
  FaCarSide,
  FaExchangeAlt,
  FaQuestionCircle,
  FaSignOutAlt,
  FaBuilding,
} from 'react-icons/fa';

import Sidebar from './Sidebar';
export interface SidebarItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  onClick?: () => void;
  children?: SidebarItem[];
}

const OrganizationSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);


  const sidebarItems: SidebarItem[] = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: <FaChartBar />
    },
    {
      label: 'Entities',
      icon: <FaCar />,
      children: [
        {
          label: 'Agencies',
          href: '/agencies',
          icon: <FaBuilding />
        },
        {
          label: 'Vehicles',
          href: '/cars',
          icon: <FaCarSide />
        },
        {
          label: 'Staff',
          href: '/staff',
          icon: <FaUsers />
        },
        {
          label: 'Drivers',
          href: '/drivers',
          icon: <FaUserTie />
        }
      ]
    },
    {
      label: 'Rentals',
      href: '/rentals',
      icon: <FaCarSide />
    },
    {
      label: 'Transactions',
      href: '/transactions',
      icon: <FaExchangeAlt />
    }
  ];

  const bottomItems: SidebarItem[] = [
    {
      label: 'Help Center',
      href: 'help',
      icon: <FaQuestionCircle />
    },
    {
      label: 'Logout',
      href: '/logout',
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

export default OrganizationSidebar;
