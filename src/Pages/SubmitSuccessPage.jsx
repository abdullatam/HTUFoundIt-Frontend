import HeaderSection from "../Components/HeaderSection"
import FooterSection from "../Components/FooterSection"
import BgNight from "../assets/htu-buildings.jpeg"

export default function SubmitSuccessPage() {
  const reportId = `#${Math.random().toString(36).substr(2, 8).toUpperCase()}`
  const currentDate = new Date().toLocaleDateString()

  return (
    <>
      <style>{`
        /* ===== BASE ===== */
        .post-page { 
          font-family: Poppins, sans-serif; 
          color: #1e1e1e; 
          margin: 0; 
        }

        /* ----- HERO BACKDROP ----- */
        .lost-hero {
          position: relative;
          min-height: 100vh;
          background-size: cover;
          background-position: center;
        }
        .lost-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          backdrop-filter: brightness(.75);
        }
        .lost-overlay {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 9rem 1rem;
        }

        /* ----- ENHANCED CARD ----- */
        .lost-card {
          width: 100%;
          max-width: 820px;
          background: rgba(255,255,255,.98);
          border: 6px solid #fff;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,.2);
          padding: 5rem .5rem;
          text-align: center;
          backdrop-filter: blur(10px);
          animation: slideUp 0.8s ease-out;
        }

        /* SUCCESS HEADER */
        .success-header {
          margin-bottom: 2rem;
        }

        .lost-title {
          font-size: 2.4rem;
          margin: 0 0 1rem;
          font-weight: 700;
          color: #1f2937;
          line-height: 1.2;
        }

        .success-subtitle {
          font-size: 1.1rem;
          color: #6b7280;
          margin: 0 0 2rem;
          line-height: 1.5;
        }

        /* REPORT DETAILS SECTION */
        .report-details {
          background: #ffffff;
          border-radius: 12px;
          padding: 1.5rem;
          margin: 2rem 0 3rem;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .report-details-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .report-details-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #4b5563;
          margin: 0;
        }

        .report-details-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .detail-card {
          background: #ffffff;
          padding: 1.5rem 1rem;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .detail-label {
          font-size: 0.85rem;
          color: #6b7280;
          margin: 0 0 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 500;
        }

        .detail-value {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .report-id-pill {
          background: #d1fae5;
          color: #065f46;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-family: 'Courier New', monospace;
          font-weight: 600;
        }

        /* BUTTONS CONTAINER - FIXED ALIGNMENT */
        .button-container {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin: 0 auto;
          max-width: 700px;
          flex-direction: row;
          align-items: center;
        }

        /* ENHANCED BUTTONS */
        .lost-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #e8343f;
          color: #fff;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-size: 1.15rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(232, 52, 63, 0.3);
          text-decoration: none;
          height: 50px;
          width: 280px;
          margin: 0;
        }

        .lost-submit:hover {
          background: #d62839;
          transform: translateY(-2px);
        }

        .plus-icon {
          color: white;
          font-size: 1.7rem;
          font-weight: bold;
          margin-right: 0.25rem;
          line-height: 0;
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #ffffff;
          color: #374151;
          padding: 0.75rem 1.5rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 1.15rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          height: 50px;
          width: 280px;
          margin: 0;
        }

        .btn-secondary:hover {
          border-color: #9ca3af;
          background: #f9fafb;
          transform: translateY(-2px);
        }

        /* DIVIDER */
        .divider {
          height: 1px;
          background: #e5e7eb;
          margin: 2rem 0;
        }

        /* TIP SECTION */
        .tip-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #6b7280;
          font-size: 0.95rem;
        }

        /* ANIMATIONS */
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* keep header above blur */
        .header-section {
          position: relative;
          z-index: 10;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .lost-card {
            padding: 2rem 1.5rem;
          }
          
          .lost-title {
            font-size: 2rem;
          }
          
          .report-details-grid {
            grid-template-columns: 1fr;
          }
          
          .button-container {
            flex-direction: column;
            align-items: center;
          }
          
          .lost-submit, .btn-secondary {
            width: 100%;
            margin-bottom: 1rem;
          }
        }
      `}</style>

      <div className="post-page">
        <HeaderSection />

        <section className="lost-hero" style={{ backgroundImage: `url(${BgNight})` }}>
          <div className="lost-overlay">
            <div className="lost-card">
              <div className="success-header">
                <h1 className="lost-title">Your lost-item has been submitted successfully!</h1>
                <p className="success-subtitle">Thank you for using HTU FoundIt—your report is now in our system.</p>
              </div>

              <div className="report-details">
                <div className="report-details-header">
                  <span role="img" aria-label="document">
                    📋
                  </span>
                  <p className="report-details-title">Report Details</p>
                </div>

                <div className="report-details-grid">
                  <div className="detail-card">
                    <p className="detail-label">STATUS</p>
                    <p className="detail-value">
                      <span role="img" aria-label="checkmark" style={{ color: "#10b981" }}>
                        ✅
                      </span>
                      Active & Searchable
                    </p>
                  </div>

                  <div className="detail-card">
                    <p className="detail-label">SUBMITTED</p>
                    <p className="detail-value">{currentDate}</p>
                  </div>

                  <div className="detail-card">
                    <p className="detail-label">REPORT ID</p>
                    <p className="detail-value">
                      <span className="report-id-pill">{reportId}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "0 auto" }}>
                <button className="lost-submit" onClick={() => (window.location.href = "/post")} style={{ margin: 0 }}>
                  <span className="plus-icon">+</span>
                  Submit Another Item
                </button>

                <button className="btn-secondary" onClick={() => (window.location.href = "/")} style={{ margin: 0 }}>
                  <span role="img" aria-label="house">
                    🏠
                  </span>
                  Back to Home
                </button>
              </div>

              <div className="divider"></div>

              <div className="tip-section">
                <span role="img" aria-label="lightbulb">
                  💡
                </span>
                <span>
                  <strong>Tip:</strong> Keep your report ID safe. You can use it to track your item's status or contact
                  support if needed.
                </span>
              </div>
            </div>
          </div>
        </section>

        <FooterSection />
      </div>
    </>
  )
}
