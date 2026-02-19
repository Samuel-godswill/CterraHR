import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './sidebar.css'

interface NavItem {
  name: string
  href: string
  icon: React.ReactNode
  children?: { name: string; href: string }[]
}

const Sidebar = () => {
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([])
  const location = useLocation()
  
  const username = "John Doe"
  const email = "example@cterra.com"
  const firstLetter = username.charAt(0)

  const employeeNavigation: NavItem[] = [
    {
      name: "My Dashboard",
      href: "/employee/dashboard",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 21C13.4477 21 13 20.5523 13 20V12C13 11.4477 13.4477 11 14 11H20C20.5523 11 21 11.4477 21 12V20C21 20.5523 20.5523 21 20 21H14ZM4 13C3.44772 13 3 12.5523 3 12V4C3 3.44772 3.44772 3 4 3H10C10.5523 3 11 3.44772 11 4V12C11 12.5523 10.5523 13 10 13H4ZM9 11V5H5V11H9ZM4 21C3.44772 21 3 20.5523 3 20V16C3 15.4477 3.44772 15 4 15H10C10.5523 15 11 15.4477 11 16V20C11 20.5523 10.5523 21 10 21H4ZM5 19H9V17H5V19ZM15 19H19V13H15V19ZM13 4C13 3.44772 13.4477 3 14 3H20C20.5523 3 21 3.44772 21 4V8C21 8.55228 20.5523 9 20 9H14C13.4477 9 13 8.55228 13 8V4ZM15 5V7H19V5H15Z"/>
        </svg>
      ),
    },
    {
      name: "Leave",
      href: "/employee/leave",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      children: [
        { name: "My Leaves", href: "/employee/leave" },
        { name: "Leave Policy", href: "/employee/leave/policy" },
      ],
    },
    {
      name: "My Timesheet",
      href: "/employee/timetracking",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: "Reports",
      href: "/employee/reports",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      name: "Analytics",
      href: "/employee/analytics",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      name: "Audit Trails",
      href: "/employee/audit",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ]

  useEffect(() => {
    employeeNavigation.forEach((item) => {
      if (item.children) {
        const isOnChildPage = item.children.some((child) => location.pathname === child.href)
        if (isOnChildPage && !openDropdowns.includes(item.name)) {
          setOpenDropdowns((prev) => [...prev, item.name])
        }
      }
    })
  }, [location.pathname])

  const toggleDropdown = (itemName: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    )
  }

  const isItemActive = (item: NavItem) => {
    if (item.children) {
      return item.children.some((child) => location.pathname === child.href) || location.pathname === item.href
    }
    return location.pathname === item.href
  }

  return (
    <aside className="sidebar">
      <div className="sidebarLogo">
        <p>Cterra</p>
      </div>

      <nav className="sidebarNav">
        {employeeNavigation.map((item) => {
          const hasChildren = item.children && item.children.length > 0
          const isDropdownOpen = openDropdowns.includes(item.name)
          const isActive = isItemActive(item)

          return (
            <div key={item.name} className="navItemWrapper">
              {hasChildren ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`navItem ${isActive ? 'active' : ''}`}
                  >
                    <div className="navItemContent">
                      <span className="navIcon">{item.icon}</span>
                      <span className="navLabel">{item.name}</span>
                    </div>
                    <svg
                      className={`dropdownArrowIcon ${isDropdownOpen ? 'open' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div className="dropdownChildren">
                      <div className="progressBar"></div>
                      {item.children?.map((child) => (
                        <NavLink
                          key={child.href}
                          to={child.href}
                          className="childNavItem"
                        >
                          <div className="childDot"></div>
                          <span>{child.name}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink to={item.href} className="navItem">
                  <div className="navItemContent">
                    <span className="navIcon">{item.icon}</span>
                    <span className="navLabel">{item.name}</span>
                  </div>
                </NavLink>
              )}
            </div>
          )
        })}
      </nav>

      <div className="sidebarProfile">
        <span className="profileAvatar">{firstLetter}</span>
        <div className="profileInfo">
          <h3 className="profileUsername">{username}</h3>
          <p className="profileEmail">{email}</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar