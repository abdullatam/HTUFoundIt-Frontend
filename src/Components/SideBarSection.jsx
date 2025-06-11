import { NavLink, useLocation } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { LayoutDashboard, Clock, Package, CheckCircle, Truck, Archive, Settings } from "lucide-react"

const Sidebar = () => {
  const location = useLocation()
  const { user, isAuthenticated, isLoading } = useAuth0()

  // Use the exact namespace you configured in Auth0 to store roles
  const namespace = "https://foundit.example.com/roles"

  if (isLoading) return null // don't render while Auth0 is still initializing

  // Grab the roles array from the user's JWT (or empty array if none)
  const roles = user && Array.isArray(user[namespace]) ? user[namespace] : []

  // Define each menu item with its route, icons, and allowed roles
  const menuItems = [
    {
      name: "Dashboard",
      to: "/admin/dashboard",
      icon: LayoutDashboard,
      rolesAllowed: ["admin"],
    },
    {
      name: "Recent Requests",
      to: "/admin/recent-requests",
      icon: Clock,
      rolesAllowed: ["admin"],
    },
    {
      name: "Found Items",
      to: "/admin/found-items",
      icon: Package,
      rolesAllowed: ["admin"],
    },
    {
      name: "Matched Items",
      to: "/admin/matched-items",
      icon: CheckCircle,
      rolesAllowed: ["admin"],
    },
    {
      name: "Delivered Items",
      to: "/admin/delivered-items",
      icon: Truck,
      rolesAllowed: ["admin"],
    },
    {
      name: "Archived Items",
      to: "/admin/archived-items",
      icon: Archive,
      rolesAllowed: ["admin"],
    },
    {
      name: "Settings",
      to: "/admin/settings",
      icon: Settings,
      rolesAllowed: ["admin"],
    },
  ]

  return (
    <>
      <style>{`
        .sidebar {
          background-color: #ffffff;
          color: #e8343f;
          width: 290px;
          padding: 20px 15px;
          display: flex;
          flex-direction: column;
          height: calc(100vh - 80px);
          position: fixed;
          top: 80px;
          left: 0;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
          z-index: 1000;
          border-right: 1px solid #f0f0f0;
          font-family: 'Poppins', Arial, sans-serif;
        }

        .sidebar-list {
          list-style: none;
          padding: 0;
          margin: 0;
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .sidebar-item {
          width: 100%;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 8px;
          font-size: 14px;
          color: #e8343f;
          text-decoration: none;
          width: 100%;
          box-sizing: border-box;
          background-color: transparent;
          border: none;
          font-weight: 500;
        }

        .sidebar-link:hover {
          background-color: #f8f9fa;
          color: #e8343f;
          transform: translateX(0.3px);
        }

        .sidebar-link:hover .sidebar-icon {
          color: #e8343f;
            box-shadow: 0 1px 4px rgba(232, 52, 63, 0.15);

        }

        .sidebar-link.active {
          background-color: #e8343f;
          color: #ffffff;
          box-shadow: 0 1px 4px rgba(232, 52, 63, 0.15);
        }

        .sidebar-link.active .sidebar-icon {
          color: #ffffff;
        }

        .sidebar-icon-text {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
        }

        .sidebar-icon {
          width: 25px;
          height: 25px;
          color: #e8343f;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .sidebar-text {
          font-weight: 500;
          flex: 1;
          font-size: 18px;
          white-space: nowrap;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .sidebar {
            width: 170px;
            padding: 15px 12px;
            top: 70px;
            height: calc(100vh - 70px);
          }
          
          .sidebar-link {
            padding: 10px 14px;
            font-size: 13px;
          }
          
          .sidebar-icon {
            width: 14px;
            height: 14px;
          }

          .sidebar-text {
            font-size: 13px;
          }
            
        }

        @media (max-width: 480px) {
          .sidebar {
            width: 150px;
            padding: 12px 10px;
            top: 60px;
            height: calc(100vh - 60px);
          }
          
          .sidebar-link {
            padding: 8px 12px;
            font-size: 12px;
          }
          
          .sidebar-icon {
            width: 12px;
            height: 12px;
          }
          
          .sidebar-icon-text {
            gap: 8px;
          }

          .sidebar-text {
            font-size: 12px;
          }
        }

        /* Focus states for accessibility */
        .sidebar-link:focus {
          outline: 1px solid #e8343f;
          outline-offset: 1px;
        }

        .sidebar-link:focus:not(:focus-visible) {
          outline: none;
        }
      `}</style>

      <aside className="sidebar">
        <ul className="sidebar-list">
          {menuItems.map((item) => {
            if (!isAuthenticated || !item.rolesAllowed.some((r) => roles.includes(r))) {
              return null
            }

            const isActive = location.pathname === item.to
            const IconComponent = item.icon

            return (
              <li key={item.name} className="sidebar-item">
                <NavLink
                  to={item.to}
                  className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <div className="sidebar-icon-text">
                    <IconComponent className="sidebar-icon" size={16} strokeWidth={2} />
                    <span className="sidebar-text">{item.name}</span>
                  </div>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </aside>
    </>
  )
}

export default Sidebar
