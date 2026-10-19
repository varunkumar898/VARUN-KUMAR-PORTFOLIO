import React from 'react';
import { Github, FileText, ArrowDown, MapPin, CheckCircle2 } from 'lucide-react';
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
      className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-[#232B38] bg-[#0B0E14] overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (Editorial Identity & Context): 7 cols */}
          <div className="lg:col-span-7 space-y-6">
            {/* Engineering Discipline Eyebrow */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#181E29] border border-[#232B38] text-xs font-mono text-[#D4A03D]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A03D]"></span>
              <span>EMBEDDED SYSTEMS & FIRMWARE DEVELOPER</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] lg:leading-[52px] font-bold tracking-tight text-[#ECEFF4]">
                Writing bare-metal drivers, FreeRTOS firmware, and low-level C for ARM microcontrollers.
              </h1>
            </div>

            {/* Direct, Natural Narrative Copy */}
            <p className="text-base sm:text-lg text-[#9AA7B8] leading-relaxed max-w-2xl font-normal">
              I am <span className="text-[#ECEFF4] font-medium">Varun Kumar</span>, an embedded engineer based in Chennai, India. 
              I build software that communicates directly with physical silicon: reading reference manuals, 
              writing register-level drivers without vendor HAL bloat, scheduling deterministic RTOS tasks, and 
              verifying bus timing with logic analyzers, OpenOCD, and GDB.
            </p>

            {/* Core Technical Capabilities Row */}
            <div className="flex flex-wrap gap-2 text-xs font-mono text-[#9AA7B8]">
              <span className="px-2.5 py-1 rounded bg-[#12161F] border border-[#232B38] text-[#ECEFF4]">
                ARM Cortex-M (STM32, ESP32)
              </span>
              <span className="px-2.5 py-1 rounded bg-[#12161F] border border-[#232B38] text-[#ECEFF4]">
                Bare-Metal C & C++
              </span>
              <span className="px-2.5 py-1 rounded bg-[#12161F] border border-[#232B38] text-[#ECEFF4]">
                FreeRTOS Subsystems
              </span>
              <span className="px-2.5 py-1 rounded bg-[#12161F] border border-[#232B38] text-[#ECEFF4]">
                OpenOCD & GDB
              </span>
              <span className="px-2.5 py-1 rounded bg-[#12161F] border border-[#232B38] text-[#ECEFF4]">
                Logic Analyzers & DSO
              </span>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                id="hero-cta-projects"
                className="px-5 py-2.5 rounded bg-[#D4A03D] hover:bg-[#E5B252] text-[#0B0E14] font-mono text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>EXPLORE PROJECTS</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onOpenResumeModal}
                id="hero-cta-resume"
                className="px-4 py-2.5 rounded bg-[#181E29] hover:bg-[#232B38] text-[#ECEFF4] border border-[#232B38] hover:border-[#D4A03D]/60 font-mono text-xs tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#D4A03D]" />
                <span>RESUME (PDF)</span>
              </button>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-github"
                className="px-4 py-2.5 rounded bg-[#181E29] hover:bg-[#232B38] text-[#ECEFF4] border border-[#232B38] hover:border-[#D4A03D]/60 font-mono text-xs tracking-wider transition-colors flex items-center gap-2"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB</span>
              </a>
            </div>

            {/* Status & Academic Verification */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#657386]">
              <div className="flex items-center gap-1.5 text-[#9AA7B8]">
                <MapPin className="w-3.5 h-3.5 text-[#D4A03D]" />
                <span>{profile.location}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 text-[#9AA7B8]">
                <span>B.Tech in Electronics & Computer Engineering (2026)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Peripheral Architecture Breakdown (5 cols) */}
          <div className="lg:col-span-5">
            <HeroTechnicalVisual />
          </div>
        </div>
      </div>
    </section>
  );
};
