import { useEffect, useState } from "react";
import { apiRequest } from "./api";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [scholarships, setScholarships] = useState([]);
  const [loadingScholarships, setLoadingScholarships] = useState(true);
  const [scholarshipError, setScholarshipError] = useState("");

  useEffect(() => {
    async function loadScholarships() {
      try {
        const data = await apiRequest("/scholarships");
        setScholarships(data.scholarships || []);
      } catch (error) {
        setScholarshipError(error.message);
      } finally {
        setLoadingScholarships(false);
      }
    }

    loadScholarships();
  }, []);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">S</div>
          <div>
            <h2>ScholarFlow</h2>
            <span>Scholarship Portal</span>
          </div>
        </div>

        <p className="nav-label">WORKSPACE</p>

        <nav>
          <button className={activePage === "dashboard" ? "nav-item active" : "nav-item"} onClick={() => setActivePage("dashboard")}><span>⌂</span> Dashboard</button>
          <button className={activePage === "scholarships" ? "nav-item active" : "nav-item"} onClick={() => setActivePage("scholarships")}><span>▤</span> Scholarships</button>
          <button className={activePage === "applications" ? "nav-item active" : "nav-item"} onClick={() => setActivePage("applications")}><span>▣</span> My Applications</button>
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <span className="help-icon">?</span>
            <strong>Need assistance?</strong>
            <p>Contact your scholarship administrator for support.</p>
          </div>
          <div className="profile">
            <div className="avatar">S</div>
            <div><strong>Student Portal</strong><span>Scholarship applicant</span></div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <span className="breadcrumb">Workspace / </span>
            <strong>{activePage === "dashboard" ? "Dashboard" : activePage === "scholarships" ? "Scholarships" : "My Applications"}</strong>
          </div>
          <div className="topbar-right">
            <span className="status-dot" />
            <span>Application portal</span>
            <div className="avatar">S</div>
          </div>
        </header>

        <section className="page-content">
          <div className="welcome-row">
            <div>
              <p className="eyebrow">ACADEMIC YEAR 2026–27</p>
              <h1>{activePage === "dashboard" ? "Your future starts here." : activePage === "scholarships" ? "Explore scholarships." : "Track your applications."}</h1>
              <p className="subtitle">{activePage === "dashboard" ? "Discover funding opportunities and manage your scholarship journey." : activePage === "scholarships" ? "Find opportunities that match your academic goals." : "Stay up to date with your submitted scholarship applications."}</p>
            </div>
            <div className="welcome-decoration">✦</div>
          </div>

          {activePage === "dashboard" && (
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-top"><span>Available scholarships</span><span className="stat-icon purple">▤</span></div>
                <h2>{String(scholarships.length).padStart(2, "0")}</h2>
                <p>Opportunities to explore</p>
              </div>
              <div className="stat-card">
                <div className="stat-top"><span>My applications</span><span className="stat-icon blue">▣</span></div>
                <h2>—</h2>
                <p>Connect your account to view</p>
              </div>
              <div className="stat-card">
                <div className="stat-top"><span>Approved</span><span className="stat-icon green">✓</span></div>
                <h2>—</h2>
                <p>Connect your account to view</p>
              </div>
            </div>
          )}

          <div className="section-heading">
            <div>
              <h2>{activePage === "applications" ? "Application overview" : "Featured scholarships"}</h2>
              <p>{activePage === "applications" ? "Your application status at a glance." : "Explore financial support for your education."}</p>
            </div>
            {activePage !== "applications" && <button className="text-button" onClick={() => setActivePage("scholarships")}>View all scholarships →</button>}
          </div>

          {activePage === "applications" ? (
            <div className="application-card">
              <div className="application-symbol">S</div>
              <div className="application-details">
                <h3>Sign in to view your applications</h3>
                <p>Your submitted applications will appear here after login is connected.</p>
              </div>
            </div>
          ) : loadingScholarships ? (
            <p>Loading scholarships...</p>
          ) : scholarshipError ? (
            <p role="alert">Could not load scholarships: {scholarshipError}</p>
          ) : scholarships.length === 0 ? (
            <p>No scholarships are currently available.</p>
          ) : (
            <div className="scholarship-grid">
              {scholarships.map((scholarship) => (
                <article className="scholarship-card" key={scholarship.id}>
                  <div className="card-top">
                    <div className="scholarship-symbol">✦</div>
                    <span className="badge open">Open</span>
                  </div>
                  <h3>{scholarship.title}</h3>
                  <p className="card-description">{scholarship.description || "No description provided."}</p>
                  <div className="card-meta">
                    <span>ELIGIBILITY</span>
                    <p>{scholarship.eligibility_criteria || "See scholarship details."}</p>
                  </div>
                  <div className="card-footer">
                    <div>
                      <span className="muted-label">DEADLINE</span>
                      <strong>{scholarship.deadline ? new Date(`${String(scholarship.deadline).slice(0, 10)}T12:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "No deadline"}</strong>
                    </div>
                    <button className="apply-button" onClick={() => setActivePage("applications")}>View details →</button>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="process-banner">
            <div className="process-icon">↗</div>
            <div>
              <h3>A simpler scholarship journey</h3>
              <p>Discover opportunities, submit applications, and follow their progress in one place.</p>
            </div>
            <div className="process-steps"><span>01 Discover</span><span>02 Apply</span><span>03 Track</span></div>
          </div>

          <footer>ScholarFlow · Automated Scholarship Application Workflow</footer>
        </section>
      </main>
    </div>
  );
}

export default App;