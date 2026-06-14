import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Services", "Portfolio", "Contact"];

const SERVICES = [
  { icon: "⚡", title: "Lightning Speed", desc: "Blazing-fast performance optimized for every device and network condition." },
  { icon: "🎯", title: "Pixel Perfect", desc: "Meticulous attention to detail in every UI element and interaction." },
  { icon: "🔒", title: "Fort Knox Security", desc: "Enterprise-grade security protocols keeping your data safe at all times." },
  { icon: "📊", title: "Data Analytics", desc: "Real-time insights and dashboards to make smarter business decisions." },
  { icon: "🌍", title: "Global Scale", desc: "Infrastructure that grows with you, from startup to global enterprise." },
  { icon: "🤝", title: "24/7 Support", desc: "Round-the-clock expert support whenever you need it, no waiting." },
];

const STATS = [
  { value: "98%", label: "Client Satisfaction" },
  { value: "500+", label: "Projects Delivered" },
  { value: "12+", label: "Years Experience" },
  { value: "50+", label: "Team Members" },
];

const PORTFOLIO = [
  { title: "FinTech Dashboard", tag: "Web App", color: "#1a1a2e", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" },
  { title: "E-Commerce Platform", tag: "Full Stack", color: "#16213e", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" },
  { title: "Health & Wellness App", tag: "Mobile", color: "#0f3460", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80" },
  { title: "AI Content Studio", tag: "SaaS", color: "#533483", img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80" },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 60);
      setScrollProgress(docH > 0 ? (scrollY / docH) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
            setActiveSection(entry.target.id.charAt(0).toUpperCase() + entry.target.id.slice(1));
          }
        });
      },
      { threshold: 0.3 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const isVisible = (id) => visibleSections.has(id);

  return (
    <div style={{ fontFamily: "'Syne', sans-serif", background: "#050510", color: "#e8e6f0", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: #7c3aed44; }
        html { scroll-behavior: smooth; }
        .fade-up { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .fade-up.delay-1 { transition-delay: 0.1s; }
        .fade-up.delay-2 { transition-delay: 0.2s; }
        .fade-up.delay-3 { transition-delay: 0.3s; }
        .fade-up.delay-4 { transition-delay: 0.4s; }
        .fade-up.delay-5 { transition-delay: 0.5s; }
        .service-card:hover { transform: translateY(-8px); border-color: #7c3aed88 !important; }
        .service-card { transition: transform 0.3s ease, border-color 0.3s ease; }
        .portfolio-card:hover .overlay { opacity: 1 !important; }
        .portfolio-card:hover { transform: scale(1.03); }
        .portfolio-card { transition: transform 0.4s ease; }
        .cta-btn:hover { background: #9d5cf0 !important; transform: translateY(-2px); box-shadow: 0 12px 40px #7c3aed55 !important; }
        .cta-btn { transition: all 0.25s ease; }
        .outline-btn:hover { background: #7c3aed22 !important; border-color: #9d5cf0 !important; color: #c4a3f7 !important; }
        .outline-btn { transition: all 0.25s ease; }
        .stat-card:hover { border-color: #7c3aed66 !important; background: #1a0a2e !important; }
        .stat-card { transition: all 0.3s ease; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050510; }
        ::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 2px; }
      `}</style>

      {/* Scroll Progress Bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: "2px", width: `${scrollProgress}%`, background: "linear-gradient(90deg, #7c3aed, #06b6d4)", zIndex: 1000, transition: "width 0.1s linear" }} />

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: "2px", left: 0, right: 0, zIndex: 999,
        padding: scrolled ? "10px 5%" : "20px 5%",
        background: scrolled ? "rgba(5,5,16,0.95)" : "rgba(5,5,16,0.4)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid " + (scrolled ? "#ffffff18" : "#ffffff08"),
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.4s ease",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => scrollTo("home")}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #7c3aed, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✦</div>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", color: "#fff" }}>Nexus<span style={{ color: "#7c3aed" }}>.</span></span>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="desktop-nav">
          {NAV_LINKS.map((link) => (
            <button key={link} onClick={() => scrollTo(link.toLowerCase())}
              onMouseEnter={() => setHoveredNav(link)} onMouseLeave={() => setHoveredNav(null)}
              style={{
                background: activeSection === link ? "#7c3aed22" : hoveredNav === link ? "#ffffff0d" : "transparent",
                border: "none", color: activeSection === link ? "#c4a3f7" : hoveredNav === link ? "#e8e6f0" : "#9ca3af",
                fontSize: 14, fontWeight: 500, fontFamily: "inherit", padding: "8px 16px",
                borderRadius: 8, cursor: "pointer",
                transition: "all 0.2s ease",
                position: "relative",
              }}>
              {link}
              {activeSection === link && (
                <span style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: "#7c3aed", display: "block" }} />
              )}
            </button>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="cta-btn" onClick={() => scrollTo("contact")} style={{
            background: "#7c3aed", color: "#fff", border: "none",
            padding: "10px 22px", borderRadius: 8, fontSize: 14, fontWeight: 600,
            fontFamily: "inherit", cursor: "pointer", letterSpacing: "0.3px",
          }}>Get Started</button>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "transparent", border: "1px solid #ffffff22", color: "#e8e6f0",
            width: 40, height: 40, borderRadius: 8, cursor: "pointer", fontSize: 18,
            display: "none",
          }} className="hamburger" aria-label="Toggle menu">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 998,
          background: "rgba(5,5,16,0.97)", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          {NAV_LINKS.map((link) => (
            <button key={link} onClick={() => scrollTo(link.toLowerCase())} style={{
              background: "transparent", border: "none", color: activeSection === link ? "#c4a3f7" : "#9ca3af",
              fontSize: 28, fontWeight: 700, fontFamily: "inherit", padding: "12px 40px",
              cursor: "pointer", letterSpacing: "-0.5px",
            }}>{link}</button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; align-items: center; justify-content: center; }
        }
      `}</style>

      {/* HERO */}
      <section id="home" ref={(el) => (sectionRefs.current["home"] = el)}
        style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "120px 5% 80px", textAlign: "center", overflow: "hidden" }}>
        {/* Background Orbs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "20%", left: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #7c3aed22 0%, transparent 70%)", filter: "blur(40px)" }} />
          <div style={{ position: "absolute", bottom: "20%", right: "10%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, #06b6d422 0%, transparent 70%)", filter: "blur(40px)" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, #7c3aed08 0%, transparent 60%)", filter: "blur(60px)" }} />
          {/* Grid */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#7c3aed" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div style={{ maxWidth: 800, position: "relative" }}>
          <div className={`fade-up ${isVisible("home") ? "visible" : ""}`} style={{
            display: "inline-flex", alignItems: "center", gap: 8, background: "#7c3aed18",
            border: "1px solid #7c3aed44", borderRadius: 100, padding: "8px 20px", marginBottom: 32,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#06b6d4", display: "inline-block" }} />
            <span style={{ fontSize: 13, color: "#9d86c8", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.5px" }}>NOW AVAILABLE FOR NEW PROJECTS</span>
          </div>

          <h1 className={`fade-up delay-1 ${isVisible("home") ? "visible" : ""}`} style={{
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 800, lineHeight: 1.05,
            letterSpacing: "-2px", marginBottom: 24, color: "#fff",
          }}>
            We Build Digital<br />
            <span style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Experiences</span> That<br />
            Actually Work.
          </h1>

          <p className={`fade-up delay-2 ${isVisible("home") ? "visible" : ""}`} style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "#9ca3af", lineHeight: 1.7,
            marginBottom: 48, maxWidth: 560, margin: "0 auto 48px", fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
          }}>
            From concept to launch, we craft modern web solutions with obsessive attention to performance, design, and user experience.
          </p>

          <div className={`fade-up delay-3 ${isVisible("home") ? "visible" : ""}`} style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="cta-btn" onClick={() => scrollTo("portfolio")} style={{
              background: "#7c3aed", color: "#fff", border: "none",
              padding: "16px 36px", borderRadius: 10, fontSize: 16, fontWeight: 700,
              fontFamily: "inherit", cursor: "pointer", letterSpacing: "0.3px",
              boxShadow: "0 8px 30px #7c3aed44",
            }}>View Our Work →</button>
            <button className="outline-btn" onClick={() => scrollTo("contact")} style={{
              background: "transparent", color: "#9ca3af", border: "1px solid #ffffff22",
              padding: "16px 36px", borderRadius: 10, fontSize: 16, fontWeight: 600,
              fontFamily: "inherit", cursor: "pointer",
            }}>Let's Talk</button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 5, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: "#4b5563", letterSpacing: "2px", fontFamily: "'DM Sans', sans-serif" }}>SCROLL</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #7c3aed, transparent)" }} />
        </div>
      </section>

      {/* STATS */}
      <section id="about" ref={(el) => (sectionRefs.current["about"] = el)} style={{ padding: "80px 5%", background: "#0a0a1a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className={`fade-up ${isVisible("about") ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 16, color: "#fff" }}>
              Numbers That <span style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Speak</span>
            </h2>
            <p style={{ color: "#6b7280", fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem" }}>Results driven by craft, not chance.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {STATS.map((s, i) => (
              <div key={i} className={`stat-card fade-up delay-${i + 1} ${isVisible("about") ? "visible" : ""}`} style={{
                textAlign: "center", padding: "40px 24px", borderRadius: 16,
                background: "#0f0f1f", border: "1px solid #ffffff0d", cursor: "default",
              }}>
                <div style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)", fontWeight: 800, background: "linear-gradient(135deg, #c4a3f7, #67e8f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-1px" }}>{s.value}</div>
                <div style={{ fontSize: 14, color: "#6b7280", marginTop: 8, fontFamily: "'DM Sans', sans-serif" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" ref={(el) => (sectionRefs.current["services"] = el)} style={{ padding: "100px 5%", background: "#050510" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className={`fade-up ${isVisible("services") ? "visible" : ""}`} style={{ marginBottom: 64 }}>
            <div style={{ display: "inline-block", fontSize: 12, letterSpacing: "3px", color: "#7c3aed", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>WHAT WE DO</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)",textAlign: "center", fontWeight: 800, letterSpacing: "-1px", color: "#fff" }}>
              Services Built for <span style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Impact</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {SERVICES.map((s, i) => (
              <div key={i} className={`service-card fade-up delay-${(i % 3) + 1} ${isVisible("services") ? "visible" : ""}`} style={{
                padding: "32px", borderRadius: 16, background: "#0a0a1a",
                border: "1px solid #ffffff0d", cursor: "default",
              }}>
                <div style={{ fontSize: 32, marginBottom: 20 }}>{s.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12, letterSpacing: "-0.3px" }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" ref={(el) => (sectionRefs.current["portfolio"] = el)} style={{ padding: "100px 5%", background: "#0a0a1a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className={`fade-up ${isVisible("portfolio") ? "visible" : ""}`} style={{ marginBottom: 64, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ display: "inline-block", fontSize: 12, letterSpacing: "3px", color: "#06b6d4", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>OUR WORK</div>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-1px", color: "#fff" }}>
                Selected <span style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Projects</span>
              </h2>
            </div>
            <button className="outline-btn" onClick={() => scrollTo("contact")} style={{
              background: "transparent", color: "#9ca3af", border: "1px solid #ffffff22",
              padding: "12px 28px", borderRadius: 8, fontSize: 14, fontWeight: 600,
              fontFamily: "inherit", cursor: "pointer",
            }}>All Projects →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {PORTFOLIO.map((p, i) => (
              <div key={i} className={`portfolio-card fade-up delay-${i + 1} ${isVisible("portfolio") ? "visible" : ""}`} style={{
                borderRadius: 16, overflow: "hidden", cursor: "pointer", position: "relative",
                height: 280, border: "1px solid #ffffff0d",
              }}>
                {/* Background image */}
                <img src={p.img} alt={p.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                {/* Dark gradient always visible at bottom */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
                {/* Text */}
                <div style={{ position: "absolute", inset: 0, padding: 28, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <div style={{ fontSize: 11, letterSpacing: "2px", color: "#a78bfa", marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>{p.tag}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>{p.title}</h3>
                </div>
                {/* Hover overlay */}
                <div className="overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #7c3aed99, #06b6d466)", opacity: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.3s ease" }}>
                  <span style={{ background: "#fff", color: "#050510", padding: "10px 24px", borderRadius: 8, fontWeight: 700, fontSize: 14 }}>View Case →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={(el) => (sectionRefs.current["contact"] = el)} style={{ padding: "100px 5% 120px", background: "#050510" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div className={`fade-up ${isVisible("contact") ? "visible" : ""}`}>
            <div style={{ display: "inline-block", fontSize: 12, letterSpacing: "3px", color: "#7c3aed", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>GET IN TOUCH</div>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-1.5px", color: "#fff", marginBottom: 20 }}>
              Ready to Build<br />
              <span style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Something Great?</span>
            </h2>
            <p style={{ color: "#6b7280", fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", marginBottom: 48, lineHeight: 1.7 }}>
              Whether you have a fully scoped project or just an idea scribbled on a napkin — we'd love to talk.
            </p>
          </div>

          <div className={`fade-up delay-2 ${isVisible("contact") ? "visible" : ""}`} style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
            {[
              { placeholder: "Your full name", type: "text" },
              { placeholder: "Email address", type: "email" },
              { placeholder: "Tell us about your project...", type: "textarea" },
            ].map((field, i) => (
              field.type === "textarea" ? (
                <textarea key={i} placeholder={field.placeholder} rows={5} style={{
                  background: "#0a0a1a", border: "1px solid #ffffff12", borderRadius: 12,
                  padding: "18px 20px", color: "#e8e6f0", fontSize: 15, fontFamily: "'DM Sans', sans-serif",
                  resize: "vertical", outline: "none", width: "100%",
                }} onFocus={(e) => (e.target.style.borderColor = "#7c3aed44")}
                  onBlur={(e) => (e.target.style.borderColor = "#ffffff12")} />
              ) : (
                <input key={i} type={field.type} placeholder={field.placeholder} style={{
                  background: "#0a0a1a", border: "1px solid #ffffff12", borderRadius: 12,
                  padding: "18px 20px", color: "#e8e6f0", fontSize: 15, fontFamily: "'DM Sans', sans-serif",
                  outline: "none", width: "100%",
                }} onFocus={(e) => (e.target.style.borderColor = "#7c3aed44")}
                  onBlur={(e) => (e.target.style.borderColor = "#ffffff12")} />
              )
            ))}
            <button className="cta-btn" style={{
              background: "#7c3aed", color: "#fff", border: "none",
              padding: "18px", borderRadius: 12, fontSize: 16, fontWeight: 700,
              fontFamily: "inherit", cursor: "pointer", width: "100%",
              boxShadow: "0 8px 30px #7c3aed44",
            }}>Send Message ✦</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #ffffff08", padding: "32px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, background: "#050510" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg, #7c3aed, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✦</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>Nexus<span style={{ color: "#7c3aed" }}>.</span></span>
        </div>
        <p style={{ fontSize: 13, color: "#4b5563", fontFamily: "'DM Sans', sans-serif" }}>© 2025 Nexus. Crafted with obsession.</p>
        <div style={{ display: "flex", gap: 20 }}>
          {["Twitter", "GitHub", "LinkedIn"].map((s) => (
            <span key={s} style={{ fontSize: 13, color: "#4b5563", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.target.style.color = "#9ca3af")}
              onMouseLeave={(e) => (e.target.style.color = "#4b5563")}>{s}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}
