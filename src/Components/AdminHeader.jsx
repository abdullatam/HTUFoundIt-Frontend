import { useAuth0 } from "@auth0/auth0-react"
import HTUFounditLogo from "../assets/HTUFoundItLogo.png"

function AdminHeader() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0()

  return (
    <>
      <style>{`
        .admin-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          background: rgba(255, 255, 255, 0.95);
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 1001;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 0 20px;
        }

        .admin-header-red-squares {
          position: absolute;
          top: 0;
          width: 100%;
          height: 80px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          pointer-events: none;
          margin-left: -20px; /* Adjust to match padding */
        }

        .square {
          width: 80px;
          height: 80px;
          background-color: #e8343f;
        }

        .square-left {
          position: absolute;
          left: 0;
          top: 0;
        }

        .square-right {
          position: absolute;
          right: 0;
          top: 0;
        }

        .admin-header-content {
          position: relative;
          z-index: 1002;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .admin-header-logo-container {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .admin-header-logo {
          height: 145px;
          object-fit: contain;
          margin-left: 25px;
        }

        .htu-logo {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .htu-text {
          font-size: 28px;
          font-weight: bold;
          color: #e8343f;
          letter-spacing: -1px;
          font-family: Arial, sans-serif;
        }

        .foundit-text {
          font-size: 20px;
          font-weight: normal;
          color: #e8343f;
          font-family: Arial, sans-serif;
        }

        .auth-section {
          display: flex;
          align-items: center;
          gap: 15px;
          position: relative;
          z-index: 1002;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #333;
          font-size: 14px;
        }

        .user-avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #e8343f;
        }

        .user-name {
          font-weight: 500;
          color: #333;
        }

        .auth-button {
          background: #e8343f;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .auth-button:hover {
          background: #d32f2f;
          transform: translateY(-1px);
        }

        .auth-button.logout {
          background: #666;
        }

        .auth-button.logout:hover {
          background: #555;
        }

        .loading-text {
          color: #666;
          font-size: 14px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .admin-header {
            height: 70px;
            padding: 0 15px;
          }

          .admin-header-red-squares {
            height: 70px;
          }

          .square {
            width: 70px;
            height: 70px;
          }

          .admin-header-logo {
            height: 40px;
          }

          .htu-text {
            font-size: 24px;
          }

          .foundit-text {
            font-size: 18px;
          }

          .auth-section {
            gap: 10px;
          }

          .user-info {
            font-size: 12px;
          }

          .user-avatar {
            width: 30px;
            height: 30px;
          }

          .auth-button {
            padding: 6px 12px;
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .admin-header {
            height: 60px;
            padding: 0 10px;
          }

          .admin-header-red-squares {
            height: 60px;
          }

          .square {
            width: 60px;
            height: 60px;
          }

          .admin-header-logo {
            height: 35px;
          }

          .htu-text {
            font-size: 20px;
          }

          .foundit-text {
            font-size: 16px;
          }

          .admin-header-content {
            flex-direction: row;
            justify-content: space-between;
          }

          .admin-header-logo-container {
            gap: 8px;
          }

          .user-name {
            display: none;
          }

          .auth-button {
            padding: 5px 10px;
            font-size: 11px;
          }
        }
      `}</style>

      <header className="admin-header">
        <div className="admin-header-red-squares">
          <div className="square square-left" />
          <div className="square square-right" />
        </div>

        <div className="admin-header-content">
          <div className="admin-header-logo-container">
            <img src={HTUFounditLogo || "/placeholder.svg"} alt="HTU FoundIt" className="admin-header-logo" />
            <div className="htu-logo">
            </div>
          </div>

          <div className="auth-section">
            {isLoading ? (
              <span className="loading-text">Loading...</span>
            ) : isAuthenticated ? (
              <>
                <div className="user-info">
                  {user?.picture && (
                    <img
                      src={user.picture || "/placeholder.svg"}
                      alt={user.name || user.email}
                      className="user-avatar"
                    />
                  )}
                  <span className="user-name">{user?.name || user?.email || "User"}</span>
                </div>
                <button
                  className="auth-button logout"
                  onClick={() =>
                    logout({
                      logoutParams: {
                        returnTo: window.location.origin,
                      },
                    })
                  }
                >
                  Logout
                </button>
              </>
            ) : (
              <button className="auth-button" onClick={() => loginWithRedirect()}>
                Login
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

export default AdminHeader
