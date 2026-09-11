import React from 'react';
import { ArrowDown, Github, FileText, ChevronRight, HardDrive, Terminal, ShieldAlert } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { HeroTechnicalVisual } from './HeroTechnicalVisual';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-[#25292D] bg-[#0B0D0F] overflow-hidden">
      {/* Background technical grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Engineering header tag */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#111417] border border-[#25292D] text-xs font-mono text-[#C8FF00]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00]"></span>
            <span>SYSTEM_INITIALIZATION: OK</span>
          </div>
          <div className="text-xs font-mono text-[#9AA0A6] hidden sm:inline-block">
            HARDWARE ↔ FIRMWARE INTERFACE
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Technical Identity & Statement */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#E8EAED] uppercase font-mono">
                {PROFILE.name}
              </h1>
              <div className="mt-2 text-sm sm:text-base font-mono font-semibold tracking-wider text-[#C8FF00] uppercase">
                EMBEDDED SYSTEMS ENGINEER <span className="text-[#363C43]">|</span> FIRMWARE DEVELOPER
              </div>
            </div>

            {/* Main Statement */}
            <div className="p-4 rounded-sm bg-[#111417] border-l-2 border-[#C8FF00] border-y border-r border-[#25292D]">
              <p className="text-xl sm:text-2xl font-mono text-[#E8EAED] font-semibold leading-snug">
                "{PROFILE.coreStatement}"
              </p>
              <p className="mt-2 text-xs sm:text-sm font-mono text-[#9AA0A6] tracking-wide">
                {PROFILE.supportingLine}
              </p>
            </div>

            {/* Quick Technical Coordinates */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-2.5 rounded bg-[#111417] border border-[#25292D]">
                <div className="text-[10px] text-[#9AA0A6]">TARGET ARCHITECTURES</div>
                <div className="text-[#E8EAED] font-medium mt-0.5">ARM & RISC-V</div>
              </div>
              <div className="p-2.5 rounded bg-[#111417] border border-[#25292D]">
                <div className="text-[10px] text-[#9AA0A6]">SILICON PLATFORM</div>
                <div className="text-[#E8EAED] font-medium mt-0.5">STM32 / Bare-Metal</div>
              </div>
              <div className="p-2.5 rounded bg-[#111417] border border-[#25292D] col-span-2 sm:col-span-1">
                <div className="text-[10px] text-[#9AA0A6]">TIMING & TRACE</div>
                <div className="text-[#C8FF00] font-medium mt-0.5">DSO / Logic Analyzer</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                id="hero-cta-projects"
                className="px-5 py-2.5 rounded bg-[#C8FF00] text-[#0B0D0F] font-mono text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-[#d5ff33] transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#C8FF00]"
              >
                <span>VIEW PROJECTS</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-github"
                className="px-4 py-2.5 rounded bg-[#111417] text-[#E8EAED] hover:text-[#C8FF00] border border-[#25292D] hover:border-[#C8FF00] font-mono text-xs sm:text-sm tracking-wider uppercase transition-colors flex items-center gap-2 focus:outline-none focus:ring-1 focus:ring-[#C8FF00]"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB</span>
              </a>

              <button
                onClick={onOpenResumeModal}
                id="hero-cta-resume"
                className="px-4 py-2.5 rounded bg-[#111417] text-[#E8EAED] hover:text-[#C8FF00] border border-[#25292D] hover:border-[#C8FF00] font-mono text-xs sm:text-sm tracking-wider uppercase transition-colors flex items-center gap-2 focus:outline-none focus:ring-1 focus:ring-[#C8FF00]"
              >
                <FileText className="w-4 h-4" />
                <span>DOWNLOAD RESUME</span>
              </button>
            </div>

            {/* Secondary note */}
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#9AA0A6]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00]"></span>
              <span>Chennai, Tamil Nadu, India • B.Tech ECE (Graduating June 2026)</span>
            </div>
          </div>

          {/* Right Column: Hero Technical Visual */}
          <div className="lg:col-span-6">
            <HeroTechnicalVisual />
          </div>
        </div>
      </div>
    </section>
  );
};
