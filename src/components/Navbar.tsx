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

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      const sections = ['hero', 'about', 'projects', 'engineering-practice', 'experience', 'skills', 'education', 'resume', 'contact'];
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
    { label: 'Overview', href: '#hero', id: 'hero' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Engineering Practice', href: '#engineering-practice', id: 'engineering-practice' },
    { label: 'Experience', href: '#experience', id: 'experience' },
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
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#D4A03D] z-[70] transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page reading progress"
      />

      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#0B0E14]/92 backdrop-blur-md border-b border-[#232B38] shadow-sm'
            : 'bg-[#0B0E14]/80 backdrop-blur-sm border-b border-[#232B38]/60'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Left: Brand Identity */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              id="brand-logo"
              className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-[#D4A03D] rounded py-1"
            >
              <div className="w-8 h-8 rounded bg-[#181E29] border border-[#232B38] flex items-center justify-center text-[#D4A03D] font-mono font-semibold text-xs group-hover:border-[#D4A03D] transition-colors">
                VK
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[#ECEFF4] text-sm tracking-tight group-hover:text-[#D4A03D] transition-colors">
                  VARUN KUMAR
                </span>
                <span className="text-[11px] text-[#657386] font-mono leading-none mt-0.5">
                  Firmware & Embedded Systems
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
                    className={`relative px-3 py-1.5 text-xs font-medium tracking-wide transition-colors duration-150 ${
                      isActive
                        ? 'text-[#ECEFF4] font-semibold'
                        : 'text-[#9AA7B8] hover:text-[#ECEFF4]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#D4A03D] rounded-full" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right: Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={onOpenResumeModal}
                id="nav-resume-btn"
                className="px-3 py-1.5 rounded bg-[#181E29] hover:bg-[#232B38] border border-[#232B38] hover:border-[#D4A03D]/60 text-[#ECEFF4] text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#D4A03D]" />
                <span>Resume (PDF)</span>
              </button>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                id="nav-github-link"
                className="p-1.5 rounded bg-[#181E29] border border-[#232B38] text-[#9AA7B8] hover:text-[#ECEFF4] hover:border-[#D4A03D]/60 transition-colors"
                aria-label="GitHub profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <button
                onClick={openAdmin}
                id="nav-admin-btn"
                className="p-1.5 rounded bg-[#181E29] border border-[#232B38] text-[#657386] hover:text-[#D4A03D] hover:border-[#D4A03D]/50 transition-colors cursor-pointer"
                title="CMS Management"
                aria-label="Admin Portal"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                id="mobile-menu-toggle"
                className="p-2 rounded bg-[#181E29] border border-[#232B38] text-[#ECEFF4] hover:text-[#D4A03D] focus:outline-none"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu-drawer"
            className="lg:hidden bg-[#12161F] border-b border-[#232B38] px-4 py-4 space-y-2 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2 rounded text-xs font-medium tracking-wide transition-colors flex items-center justify-between ${
                    activeSection === link.id
                      ? 'bg-[#D4A03D] text-[#0B0E14] font-bold'
                      : 'bg-[#181E29] text-[#9AA7B8] hover:text-[#ECEFF4]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-[#232B38] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResumeModal();
                }}
                className="w-full py-2.5 rounded bg-[#D4A03D] text-[#0B0E14] font-semibold text-xs tracking-wider flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>VIEW / DOWNLOAD RESUME</span>
              </button>

              <div className="flex gap-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded bg-[#181E29] border border-[#232B38] text-[#ECEFF4] text-xs flex items-center justify-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>github.com/varunkumar898</span>
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAdmin();
                  }}
                  className="p-2 rounded bg-[#181E29] border border-[#232B38] text-[#9AA7B8] text-xs flex items-center justify-center"
                  title="Admin console"
                >
                  <Lock className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
