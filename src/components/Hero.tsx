import React from 'react';
import { Github, FileText, ChevronRight, Cpu } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { HeroTechnicalVisual } from './HeroTechnicalVisual';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  const { profile } = usePortfolio();

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-28 pb-20 lg:pt-36 lg:pb-24 border-b border-[#2D3748] bg-[#0D1117] overflow-hidden"
    >
      {/* Background technical subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Subtle engineering status badge */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1A1F28] border border-[#2D3748] text-xs font-mono text-[#F0F4F8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
            <span className="text-[#A8B8C8]">SYSTEM_STATE:</span>
            <span className="text-[#10B981] font-medium uppercase">{profile.status || 'READY'}</span>
          </div>
          <div className="text-xs font-mono text-[#6B7280] hidden sm:inline-block">
            HARDWARE ↔ FIRMWARE INTERFACE
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column (Text): 48px name, 32px title, 24px tagline, 16px supporting */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-[48px] lg:leading-[56px] font-extrabold tracking-tight text-[#F0F4F8]">
                {profile.firstName?.toUpperCase() || 'VARUN'}{' '}
                <span className="text-[#D4AF37]">{profile.lastName?.toUpperCase() || 'KUMAR'}</span>
              </h1>
              <div className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-[#D4AF37] uppercase">
                {profile.title || 'EMBEDDED SYSTEMS ENGINEER / FIRMWARE DEVELOPER'}
              </div>
            </div>

            {/* Tagline */}
            <div>
              <p className="text-xl sm:text-2xl text-[#A8B8C8] leading-relaxed font-normal">
                "{profile.bio || 'I work at the boundary between firmware and hardware.'}"
              </p>
              <p className="mt-3 text-sm sm:text-base text-[#6B7280] font-normal">
                STM32 • ARM Cortex-M • RISC-V • FreeRTOS • Hardware Debugging
              </p>
            </div>

            {/* Coordinates / Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 rounded bg-[#1A1F28] border border-[#2D3748]">
                <div className="text-[10px] text-[#6B7280] uppercase tracking-wider">ARCHITECTURES</div>
                <div className="text-[#F0F4F8] font-medium mt-1">ARM & RISC-V</div>
              </div>
              <div className="p-3 rounded bg-[#1A1F28] border border-[#2D3748]">
                <div className="text-[10px] text-[#6B7280] uppercase tracking-wider">FIRMWARE LAYER</div>
                <div className="text-[#F0F4F8] font-medium mt-1">Bare-Metal / RTOS</div>
              </div>
              <div className="p-3 rounded bg-[#1A1F28] border border-[#2D3748] col-span-2 sm:col-span-1">
                <div className="text-[10px] text-[#6B7280] uppercase tracking-wider">INSTRUMENTATION</div>
                <div className="text-[#00D9FF] font-medium mt-1">DSO / Logic Scope</div>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 font-medium">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                id="hero-cta-projects"
                className="px-6 py-3 rounded bg-[#D4AF37] text-[#0D1117] text-sm font-bold tracking-wide uppercase transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#D4AF37]/20 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] cursor-pointer"
              >
                <span>VIEW PROJECTS</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResumeModal}
                id="hero-cta-resume"
                className="px-5 py-3 rounded bg-transparent text-[#F0F4F8] border border-[#2D3748] hover:border-[#1E90FF] hover:text-[#1E90FF] text-sm tracking-wide transition-all duration-150 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#1E90FF] cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>DOWNLOAD RESUME</span>
              </button>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-github"
                className="px-5 py-3 rounded bg-transparent text-[#F0F4F8] border border-[#2D3748] hover:border-[#1E90FF] hover:text-[#1E90FF] text-sm tracking-wide transition-all duration-150 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB</span>
              </a>
            </div>

            {/* Location & Academic Meta */}
            <div className="flex items-center gap-2 text-xs text-[#A8B8C8] pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
              <span>{profile.location} • {profile.degree}</span>
            </div>
          </div>

          {/* Right Column: MCU System Architecture Diagram */}
          <div className="lg:col-span-6">
            <HeroTechnicalVisual />
          </div>
        </div>
      </div>
    </section>
  );
};
