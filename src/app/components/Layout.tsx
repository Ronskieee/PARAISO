import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { Menu, X, Sun, Moon, Type, MessageCircle, LogOut } from 'lucide-react';
import { LiveChat } from './LiveChat';
import { ThemeContext } from './ThemeContext';

// ─── Scroll to Top on every page change ──────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [darkMode, setDarkMode] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  useEffect(() => {
    const storedName = localStorage.getItem('paraiso_user');
    if (storedName) {
      setIsLoggedIn(true);
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    const confirmed = window.confirm('Do you wish to logout?');
    if (confirmed) {
      localStorage.removeItem('paraiso_user');
      localStorage.removeItem('paraiso_user_id');
      localStorage.removeItem('paraiso_event_date');
      localStorage.removeItem('paraiso_event_type');
      localStorage.removeItem('paraiso_venue');
      setIsLoggedIn(false);
      setUserName('');
      window.location.href = '/';
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/speakers', label: 'BOD' },
    { to: '/venue', label: 'Venue' },
    { to: '/schedule', label: 'Schedule' },
    { to: isLoggedIn ? '/registration' : '/login?from=/registration', label: 'Book' },
    { to: '/sponsors', label: 'Partners' },
    { to: '/faq', label: 'FAQ' },
  ];

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <ScrollToTop />
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'
        }`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <header
          className={`sticky top-0 z-50 transition-colors duration-300 ${
            darkMode
              ? 'bg-black/95 backdrop-blur-sm border-b border-white/5'
              : 'bg-white/95 backdrop-blur-sm border-b border-gray-200'
          }`}
          style={{ boxShadow: darkMode ? '0 1px 24px rgba(0,0,0,0.5)' : '0 1px 12px rgba(0,0,0,0.08)' }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">

              {/* Brand */}
              <Link to="/" className="flex items-center group">
                <span
                  className="text-2xl font-bold tracking-widest transition-opacity group-hover:opacity-80"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    background: 'linear-gradient(135deg, #E8C84A 0%, #D4AF37 50%, #B8941E 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '0.15em',
                  }}
                >
                  PARAISO
                </span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center space-x-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`relative px-3 py-2 text-sm font-medium tracking-wide rounded-md transition-all duration-200 ${
                        isActive
                          ? 'text-[#D4AF37]'
                          : darkMode
                          ? 'text-white/75 hover:text-white hover:bg-white/5'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                      style={{ letterSpacing: '0.04em' }}
                    >
                      {link.label}
                      {/* Active underline dot */}
                      {isActive && (
                        <span
                          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                          style={{ background: '#D4AF37' }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Desktop Right Side */}
              <div className="hidden lg:flex items-center gap-1">
                {/* Font size controls */}
                <button
                  onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                  className={`p-2 rounded-md transition-colors ${
                    darkMode ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title="Decrease font size"
                >
                  <Type className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                  className={`p-2 rounded-md transition-colors ${
                    darkMode ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title="Increase font size"
                >
                  <Type className="w-5 h-5" />
                </button>

                {/* Dark mode toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-md transition-colors ${
                    darkMode ? 'text-yellow-400 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Toggle dark/light mode"
                >
                  {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
                </button>

                <div className={`w-px h-5 mx-1 ${darkMode ? 'bg-white/10' : 'bg-gray-200'}`} />

                {/* Auth */}
                {isLoggedIn ? (
                  <div className="flex items-center gap-3">
                    <span
                      className="text-sm font-medium"
                      style={{ color: '#D4AF37', fontFamily: 'var(--font-body)' }}
                    >
                      Hi, {userName}!
                    </span>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold text-white rounded-full transition-all duration-200 hover:opacity-90 active:scale-95"
                      style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 hover:opacity-90 active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, #E8C84A, #D4AF37, #B8941E)',
                      color: '#1a1200',
                    }}
                  >
                    Login
                  </Link>
                )}
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-md transition-colors ${
                  darkMode ? 'text-white hover:bg-white/5' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* ── Mobile Menu ─────────────────────────────────────────────────── */}
            {mobileMenuOpen && (
              <nav
                className={`lg:hidden py-3 border-t ${
                  darkMode ? 'border-white/5' : 'border-gray-100'
                }`}
              >
                <div className="flex flex-col gap-0.5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`py-2.5 px-4 rounded-lg text-sm font-medium tracking-wide transition-colors ${
                        location.pathname === link.to
                          ? 'text-[#D4AF37] bg-amber-900/20'
                          : darkMode
                          ? 'text-white/75 hover:text-white hover:bg-white/5'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                      style={{ letterSpacing: '0.04em' }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="flex items-center gap-3 px-4 pt-3 mt-2 border-t border-white/5">
                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1.5 px-4 py-2 text-white text-sm font-semibold rounded-full transition-all hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Logout</span>
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className={`text-sm font-medium transition-colors py-2 ${
                        darkMode ? 'text-white/75 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      Login
                    </Link>
                  )}
                  <Link
                    to="/registration"
                    className="px-4 py-2 text-sm font-semibold rounded-full transition-all hover:opacity-90"
                    style={{
                      background: 'linear-gradient(135deg, #E8C84A, #D4AF37, #B8941E)',
                      color: '#1a1200',
                    }}
                  >
                    Register
                  </Link>
                </div>

                <div className={`flex items-center gap-2 px-4 pt-3 mt-2 border-t ${darkMode ? 'border-white/5' : 'border-gray-200'}`}>
                  <button
                    onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                    className={`p-2 rounded-md ${darkMode ? 'text-white/60 hover:bg-white/5' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    <Type className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                    className={`p-2 rounded-md ${darkMode ? 'text-white/60 hover:bg-white/5' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    <Type className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-2 rounded-md ${darkMode ? 'text-yellow-400 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>
                </div>
              </nav>
            )}
          </div>
        </header>

        {/* ── Main Content ─────────────────────────────────────────────────────── */}
        <main><Outlet /></main>

        {/* ── Footer ──────────────────────────────────────────────────────────── */}
        <footer
          className={`pt-16 pb-8 mt-20 transition-colors duration-300 ${
            darkMode
              ? 'bg-black border-t border-white/5'
              : 'bg-gray-50 border-t border-gray-200'
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-10">

              {/* Brand col */}
              <div>
                <div
                  className="text-2xl font-bold tracking-widest mb-3"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    background: 'linear-gradient(135deg, #E8C84A, #D4AF37, #B8941E)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '0.15em',
                  }}
                >
                  PARAISO
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontStyle: 'italic', color: darkMode ? 'rgba(255,255,255,0.45)' : '#6b7280' }}
                >
                  "Where every celebration feels like paradise."
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4
                  className="text-sm font-semibold mb-4 tracking-wider uppercase"
                  style={{ color: '#D4AF37', letterSpacing: '0.1em' }}
                >
                  Quick Links
                </h4>
                <ul className="space-y-2.5">
                  {[
                    ['/about', 'About Event'],
                    ['/schedule', 'Schedule'],
                    ['/speakers', 'Speakers'],
                    ['/registration', 'Register'],
                  ].map(([path, label]) => (
                    <li key={path}>
                      <Link
                        to={path}
                        className="text-sm transition-colors hover:text-[#D4AF37]"
                        style={{ color: darkMode ? 'rgba(255,255,255,0.5)' : '#6b7280' }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4
                  className="text-sm font-semibold mb-4 tracking-wider uppercase"
                  style={{ color: '#D4AF37', letterSpacing: '0.1em' }}
                >
                  Contact
                </h4>
                <ul className="space-y-2.5 text-sm" style={{ color: darkMode ? 'rgba(255,255,255,0.5)' : '#6b7280' }}>
                  <li>paraisoeventmanagement@gmail.com</li>
                  <li>+63 927 587 1239</li>
                  <li>FB: Paraiso - Event Management</li>
                  <li>IG: Paraiso</li>
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h4
                  className="text-sm font-semibold mb-4 tracking-wider uppercase"
                  style={{ color: '#D4AF37', letterSpacing: '0.1em' }}
                >
                  Newsletter
                </h4>
                <p className="text-sm mb-4" style={{ color: darkMode ? 'rgba(255,255,255,0.5)' : '#6b7280' }}>
                  Stay updated with event news
                </p>
                <div className="flex flex-col gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className={`px-4 py-2.5 text-sm rounded-lg border focus:outline-none transition-colors ${
                      darkMode
                        ? 'bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50'
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#D4AF37]'
                    }`}
                  />
                  <button
                    className="px-4 py-2.5 text-sm font-semibold rounded-lg transition-all hover:opacity-90 active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, #E8C84A, #D4AF37, #B8941E)',
                      color: '#1a1200',
                    }}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div
              className="mt-12 pt-6 border-t text-center text-xs"
              style={{
                borderColor: darkMode ? 'rgba(255,255,255,0.06)' : '#e5e7eb',
                color: darkMode ? 'rgba(255,255,255,0.25)' : '#9ca3af',
                letterSpacing: '0.05em',
              }}
            >
              © 2026 PARAISO. All rights reserved.
            </div>
          </div>
        </footer>

        {/* ── Live Chat FAB ────────────────────────────────────────────────────── */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="fixed bottom-6 right-6 p-4 rounded-full shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 z-50"
          style={{
            background: 'linear-gradient(135deg, #E8C84A, #D4AF37, #B8941E)',
            boxShadow: '0 4px 20px rgba(212, 175, 55, 0.35)',
          }}
          title="Open live chat"
        >
          <MessageCircle className="w-5 h-5" style={{ color: '#1a1200' }} />
        </button>

        {chatOpen && <LiveChat onClose={() => setChatOpen(false)} />}
      </div>
    </ThemeContext.Provider>
  );
}