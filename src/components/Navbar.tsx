import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, Terminal, FileText, ChevronRight } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'experience', 'projects', 'engineering-lab', 'skills', 'education', 'github', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 120;

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Engineering', href: '#engineering-lab', id: 'engineering-lab' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'GitHub', href: '#github', id: 'github' },
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
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled
          ? 'bg-[#0B0D0F]/95 backdrop-blur-md border-b border-[#25292D] shadow-lg'
          : 'bg-[#0B0D0F]/70 backdrop-blur-sm border-b border-[#25292D]/50'
      }`}
    >
      {/* Top Engineering Telemetry Strip */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 bg-[#111417] border-b border-[#25292D] text-[11px] font-mono text-[#9AA0A6]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[#E8EAED]">
            <Cpu className="w-3.5 h-3.5 text-[#C8FF00]" />
            <span>SYS_CORE: ARM CORTEX-M0 / RISC-V</span>
          </span>
          <span className="text-[#363C43]">|</span>
          <span>CLK: 48.0 MHz</span>
          <span className="text-[#363C43]">|</span>
          <span>VDD: 3.30V</span>
          <span className="text-[#363C43]">|</span>
          <span>LOC: CHENNAI, IN</span>
        </div>

        {/* Engineering Status Indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8FF00] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8FF00]"></span>
          </span>
          <span className="text-[#C8FF00] font-medium tracking-wide">
            {PROFILE.availability}
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Identifier */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            id="brand-logo"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-1 focus:ring-[#C8FF00]"
          >
            <div className="w-8 h-8 rounded border border-[#25292D] bg-[#111417] flex items-center justify-center text-[#C8FF00] font-mono font-bold text-sm group-hover:border-[#C8FF00] transition-colors">
              VK
            </div>
            <div>
              <div className="font-mono font-bold text-[#E8EAED] tracking-wider text-sm flex items-center gap-1.5">
                {PROFILE.name}
                <span className="text-[10px] text-[#C8FF00] font-mono px-1 py-0.2 bg-[#C8FF00]/10 border border-[#C8FF00]/30 rounded">
                  FW
                </span>
              </div>
              <div className="text-[11px] text-[#9AA0A6] font-mono leading-none">
                Embedded & Firmware
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  id={`nav-link-${link.id}`}
                  className={`px-3 py-1.5 rounded text-xs tracking-wide uppercase transition-colors font-mono ${
                    isActive
                      ? 'text-[#0B0D0F] bg-[#C8FF00] font-semibold'
                      : 'text-[#9AA0A6] hover:text-[#E8EAED] hover:bg-[#161A1F]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            {/* Resume button */}
            <button
              onClick={onOpenResumeModal}
              id="nav-resume-btn"
              className="ml-2 px-3 py-1.5 rounded border border-[#C8FF00]/50 text-[#C8FF00] hover:bg-[#C8FF00] hover:text-[#0B0D0F] text-xs font-mono uppercase tracking-wider transition-all duration-150 flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </nav>

          {/* Mobile Status & Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <span className="relative flex h-2 w-2" title={PROFILE.availability}>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8FF00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8FF00]"></span>
            </span>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="p-2 rounded border border-[#25292D] bg-[#111417] text-[#E8EAED] hover:text-[#C8FF00] focus:outline-none focus:ring-1 focus:ring-[#C8FF00]"
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
        <div id="mobile-menu-drawer" className="md:hidden bg-[#111417] border-b border-[#25292D] px-4 py-4 space-y-2">
          {/* Mobile status notice */}
          <div className="p-2.5 rounded bg-[#161A1F] border border-[#25292D] text-xs font-mono text-[#C8FF00] flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-[#C8FF00]"></span>
            <span>{PROFILE.availability}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-2 rounded text-xs font-mono tracking-wider transition-colors flex items-center justify-between ${
                  activeSection === link.id
                    ? 'bg-[#C8FF00] text-[#0B0D0F] font-bold'
                    : 'bg-[#161A1F] text-[#9AA0A6] hover:text-[#E8EAED]'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-3 h-3 opacity-60" />
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-[#25292D] flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="flex-1 py-2 rounded bg-[#C8FF00] text-[#0B0D0F] font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>VIEW RESUME</span>
            </button>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded border border-[#25292D] bg-[#161A1F] text-[#E8EAED] hover:text-[#C8FF00] font-mono text-xs flex items-center justify-center"
            >
              GITHUB
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
