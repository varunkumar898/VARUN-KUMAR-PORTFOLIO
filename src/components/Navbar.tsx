import React, { useState, useEffect } from 'react';
import { Menu, X, Github, FileText, ChevronRight, Lock } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal }) => {
  const { profile, openAdmin } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll Progress Indicator calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      const sections = ['hero', 'about', 'experience', 'projects', 'engineering-lab', 'skills', 'education', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Engineering', href: '#engineering-lab', id: 'engineering-lab' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Resume', href: '#resume', id: 'resume' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll Progress Indicator (2px Gold Bar) */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#D4AF37] z-[60] transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />

      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#0D1117]/90 backdrop-blur-md border-b border-[#2D3748] shadow-lg shadow-black/30'
            : 'bg-[#0D1117]/70 backdrop-blur-sm border-b border-[#2D3748]/60'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-18">
            {/* Left: VARUN KUMAR (logo/name) - clickable, goes to home */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              id="brand-logo"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#1E90FF] rounded py-1 px-1.5"
            >
              <div className="w-8 h-8 rounded bg-[#1A1F28] border border-[#2D3748] flex items-center justify-center text-[#D4AF37] font-semibold text-xs group-hover:border-[#1E90FF] group-hover:text-[#1E90FF] transition-colors">
                VK
              </div>
              <div>
                <span className="font-bold text-[#F0F4F8] text-base tracking-tight group-hover:text-[#1E90FF] transition-colors">
                  VARUN <span className="text-[#D4AF37]">KUMAR</span>
                </span>
                <span className="block text-[11px] text-[#A8B8C8] font-mono leading-none mt-0.5">
                  Embedded & Firmware
                </span>
              </div>
            </a>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    id={`nav-link-${link.id}`}
                    className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? 'text-[#F0F4F8]'
                        : 'text-[#A8B8C8] hover:text-[#1E90FF]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {/* Active section shows #D4AF37 underline (2px, bottom border) */}
                    {isActive && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#D4AF37] rounded-full transition-all duration-200" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right: Status Indicator + Admin CMS + GitHub Icon */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#1A1F28] border border-[#2D3748] text-xs font-mono text-[#F0F4F8]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                </span>
                <span className="text-[#10B981] text-[11px] font-medium tracking-wide uppercase">
                  {profile.status || 'AVAILABLE FOR OPPORTUNITIES'}
                </span>
              </div>

              {/* Admin Portal Trigger */}
              <button
                onClick={openAdmin}
                id="nav-admin-btn"
                className="px-2.5 py-1.5 rounded bg-[#1A1F28] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                title="Open CMS Admin Portal"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">ADMIN</span>
              </button>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                id="nav-github-link"
                className="p-2 rounded bg-[#1A1F28] border border-[#2D3748] text-[#A8B8C8] hover:text-[#1E90FF] hover:border-[#1E90FF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
                aria-label="Varun Kumar's GitHub profile"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-3">
              <div className="flex sm:hidden items-center">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                </span>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                id="mobile-menu-toggle"
                className="p-2 rounded bg-[#1A1F28] border border-[#2D3748] text-[#F0F4F8] hover:text-[#1E90FF] hover:border-[#1E90FF] focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu-drawer"
            className="lg:hidden bg-[#1A1F28] border-b border-[#2D3748] px-4 py-4 space-y-2 shadow-xl"
          >
            <div className="p-2.5 rounded bg-[#0D1117] border border-[#2D3748] text-xs font-mono text-[#10B981] flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-[#10B981]"></span>
              <span>AVAILABLE FOR OPPORTUNITIES</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2 rounded text-xs font-medium tracking-wide transition-colors flex items-center justify-between ${
                    activeSection === link.id
                      ? 'bg-[#D4AF37] text-[#0D1117] font-bold'
                      : 'bg-[#0D1117] text-[#A8B8C8] hover:text-[#1E90FF]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-[#2D3748] flex flex-col sm:flex-row gap-2">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResumeModal();
                  }}
                  className="flex-1 py-2.5 rounded bg-[#D4AF37] text-[#0D1117] font-semibold text-xs tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#e0bc46] transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>VIEW WEB RESUME</span>
                </button>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded bg-[#0D1117] border border-[#2D3748] text-[#F0F4F8] hover:text-[#1E90FF] hover:border-[#1E90FF] text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GITHUB</span>
                </a>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAdmin();
                }}
                className="w-full py-2 rounded bg-[#1A1F28] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs font-mono flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>ADMIN CONSOLE</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
