'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaAngleDown, FaAngleUp, FaEllipsisH } from 'react-icons/fa'
import { SidebarProps, SidebarItem } from '@/utils/types/models/sidebar'

const Sidebar: React.FC<SidebarProps> = ({
  items = [],
  bottomItems = [],
  logo,
}) => {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const [showMobileMenu, setShowMobileMenu] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSubMenu = (label: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [label]: !prev[label]
    }))
  }

  const toggleMobileMenu = (label: string) => {
    setShowMobileMenu(prev => prev === label ? null : label)
  }

  const isItemOrChildActive = (item: SidebarItem): boolean => {
    if (pathname === item.href) return true
    if (item.children) {
      return item.children.some(child => pathname === child.href)
    }
    return false
  }

  useEffect(() => {
    const newExpandedItems: Record<string, boolean> = {}

    const checkItems = (items: SidebarItem[]) => {
      items.forEach(item => {
        if (item.children && item.children.some(child => pathname === child.href)) {
          newExpandedItems[item.label] = true
        }
      })
    }

    checkItems(items)
    checkItems(bottomItems)
    setExpandedItems(newExpandedItems)
  }, [pathname, items, bottomItems])

  const renderDesktopItem = (item: SidebarItem, index: number, isBottomItem = false) => {
    const isActive = isItemOrChildActive(item)
    const isExpanded = expandedItems[item.label] || false
    const hasChildren = item.children && item.children.length > 0
    const isLogout = isBottomItem && index === bottomItems.length - 1

    return (
      <div key={`desktop-${index}`} className="mb-2">
        {hasChildren ? (
          <>
            <button
              onClick={() => toggleSubMenu(item.label)}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-primary-50 text-primary-600 dark:bg-gray-700 dark:text-white' : 
                isLogout ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20' : 
                'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {item.icon && (
                <span className={`mr-3 text-lg ${
                  isLogout ? 'text-red-600' : 
                  isActive ? 'text-primary-600 dark:text-white' : 
                  'text-gray-500 dark:text-gray-400'
                }`}>
                  {item.icon}
                </span>
              )}
              <span className="flex-grow text-left">{item.label}</span>
              {hasChildren && (
                <span className="ml-2">
                  {isExpanded ? <FaAngleUp size={14} /> : <FaAngleDown size={14} />}
                </span>
              )}
            </button>

            {isExpanded && (
              <div className="ml-8 mt-1 space-y-1">
                {item.children?.map((child, childIndex) => (
                  <Link
                    key={`child-${childIndex}`}
                    href={child.href || '#'}
                    className={`flex items-center px-3 py-2 text-sm rounded-lg ${
                      pathname === child.href ? 
                      'bg-primary-100 text-primary-600 dark:bg-gray-600 dark:text-white' : 
                      'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    {child.icon && <span className="mr-3">{child.icon}</span>}
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <Link
            href={item.href || '#'}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
              isActive ? 'bg-primary-50 text-primary-600 dark:bg-gray-700 dark:text-white' : 
              isLogout ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20' : 
              'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {item.icon && (
              <span className={`mr-3 text-lg ${
                isLogout ? 'text-red-600' : 
                isActive ? 'text-primary-600 dark:text-white' : 
                'text-gray-500 dark:text-gray-400'
              }`}>
                {item.icon}
              </span>
            )}
            <span>{item.label}</span>
          </Link>
        )}
      </div>
    )
  }

  const renderMobileItem = (item: SidebarItem, index: number, isBottomItem = false) => {
    const isActive = isItemOrChildActive(item)
    const hasChildren = item.children && item.children.length > 0
    const isMenuOpen = showMobileMenu === item.label
    const isLogout = isBottomItem && index === bottomItems.length - 1

    if (hasChildren) {
      return (
        <div key={`mobile-${index}`} className="relative">
          <button
            onClick={() => toggleMobileMenu(item.label)}
            className={`flex flex-col items-center p-2 ${
              isActive ? 'text-primary-600 dark:text-white' : 
              isLogout ? 'text-red-600' : 
              'text-gray-600 dark:text-gray-300'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs mt-1">{item.label}</span>
          </button>

          {isMenuOpen && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
              {item.children?.map((child, childIndex) => (
                <Link
                  key={`mobile-child-${childIndex}`}
                  href={child.href || '#'}
                  className={`flex items-center px-4 py-3 ${
                    pathname === child.href ? 
                    'bg-primary-50 text-primary-600 dark:bg-gray-700 dark:text-white' : 
                    'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setShowMobileMenu(null)}
                >
                  {child.icon && <span className="mr-3">{child.icon}</span>}
                  <span>{child.label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )
    }

    return (
      <Link
        key={`mobile-${index}`}
        href={item.href || '#'}
        className={`flex flex-col items-center p-2 ${
          isActive ? 'text-primary-600 dark:text-white' : 
          isLogout ? 'text-red-600' : 
          'text-gray-600 dark:text-gray-300'
        }`}
      >
        <span className="text-xl">{item.icon}</span>
        <span className="text-xs mt-1">{item.label}</span>
      </Link>
    )
  }

  // Main render
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40">
        {logo && (
          <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
            {logo.icon && <div className="mr-2">{logo.icon}</div>}
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{logo.label}</h1>
          </div>
        )}

        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {items.map((item, index) => renderDesktopItem(item, index))}
          </nav>
        </div>

        {bottomItems.length > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="space-y-1">
              {bottomItems.map((item, index) => 
                renderDesktopItem(item, index, true)
              )}
            </nav>
          </div>
        )}
      </aside>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center py-2 z-50">
          {items.slice(0, 4).map((item, index) => renderMobileItem(item, index))}

          {(items.length > 4 || bottomItems.length > 0) && (
            <div className="relative">
              <button
                onClick={() => toggleMobileMenu('more')}
                className={`flex flex-col items-center p-2 ${
                  showMobileMenu === 'more' ? 
                  'text-primary-600 dark:text-white' : 
                  'text-gray-600 dark:text-gray-300'
                }`}
              >
                <FaEllipsisH className="text-xl" />
                <span className="text-xs mt-1">More</span>
              </button>

              {showMobileMenu === 'more' && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                  {items.slice(4).map((item, index) => (
                    <Link
                      key={`mobile-more-${index}`}
                      href={item.href || '#'}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => setShowMobileMenu(null)}
                    >
                      {item.icon && <span className="mr-3">{item.icon}</span>}
                      <span>{item.label}</span>
                    </Link>
                  ))}

                  {bottomItems.length > 0 && (
                    <>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      {bottomItems.map((item, index) => (
                        <Link
                          key={`mobile-bottom-${index}`}
                          href={item.href || '#'}
                          className={`flex items-center px-4 py-3 ${
                            index === bottomItems.length - 1 ? 
                            'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20' : 
                            'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => setShowMobileMenu(null)}
                        >
                          {item.icon && <span className="mr-3">{item.icon}</span>}
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </nav>
      )}

      {/* Content Padding */}
      <div className={`${isMobile ? 'pb-16' : 'md:pl-64'}`}>
        {/* Your content goes here */}
      </div>
    </>
  )
}

export default Sidebar