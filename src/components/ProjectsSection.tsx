import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Github, ExternalLink, ChevronRight, FileCode2, Cpu, Activity, Star, GitFork, ArrowUpRight } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { projects: contextProjects } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // Identify the primary showcase project (STM32 drivers) and remaining projects
  const primaryProject = contextProjects.find((p) => p.id === 'stm32f030-drivers') || contextProjects[0];
  const secondaryProjects = contextProjects.filter((p) => p.id !== primaryProject?.id);

  return (
    <section
      id="projects"
      className="py-18 bg-[#0B0E14] border-b border-[#232B38] relative"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12">
          <div className="text-xs font-mono text-[#D4A03D] uppercase tracking-wider mb-2">
            03 // FEATURED WORK
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#ECEFF4] tracking-tight">
            Projects & Hardware Implementations
          </h2>
          <p className="text-sm sm:text-base text-[#9AA7B8] mt-2 max-w-3xl leading-relaxed">
            Bare-metal device drivers, FreeRTOS real-time prototypes, embedded developer tooling, and compiler backend contributions.
          </p>
        </div>

        {/* PRIMARY FEATURED SHOWCASE: STM32F030 Peripheral Driver Library */}
        {primaryProject && (
          <div className="mb-14 rounded border border-[#232B38] bg-[#12161F] overflow-hidden shadow-xl">
            {/* Top Bar with Microcontroller Specs */}
            <div className="p-4 sm:p-5 bg-[#181E29] border-b border-[#232B38] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#D4A03D]/10 border border-[#D4A03D]/30 text-[#D4A03D] font-bold text-[11px]">
                  PRIMARY SHOWCASE
                </span>
                <span className="text-[#ECEFF4] font-semibold">{primaryProject.category}</span>
              </div>
              <div className="text-[#9AA7B8] text-[11px] flex items-center gap-3">
                <span>STM32F030x4 (ARM Cortex-M0)</span>
                <span>•</span>
                <span>16 KB Flash / 4 KB SRAM</span>
                <span>•</span>
                <span className="text-[#D4A03D]">17+ Git Commits</span>
              </div>
            </div>

            {/* Editorial Showcase Content (2 Columns) */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Context, Problem, Implementation (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#ECEFF4] tracking-tight">
                    {primaryProject.title}
                  </h3>
                  <div className="text-xs font-mono text-[#D4A03D] mt-1">
                    {primaryProject.subtitle}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#9AA7B8] leading-relaxed">
                  {primaryProject.description}
                </p>

                {/* Problem & Approach Cards */}
                <div className="space-y-3 pt-2">
                  <div className="p-3.5 rounded bg-[#0B0E14] border border-[#232B38] text-xs">
                    <span className="text-[#D4A03D] font-mono font-bold block mb-1 uppercase tracking-wide">
                      Problem Statement
                    </span>
                    <p className="text-[#9AA7B8] leading-relaxed font-sans">
                      {primaryProject.problem}
                    </p>
                  </div>

                  <div className="p-3.5 rounded bg-[#0B0E14] border border-[#232B38] text-xs">
                    <span className="text-[#D4A03D] font-mono font-bold block mb-1 uppercase tracking-wide">
                      Engineering Approach
                    </span>
                    <p className="text-[#9AA7B8] leading-relaxed font-sans">
                      {primaryProject.approach}
                    </p>
                  </div>
                </div>

                {/* Implemented Core Drivers */}
                <div>
                  <div className="text-xs font-mono text-[#657386] uppercase tracking-wider mb-2">
                    8 CORE DRIVERS BUILT FROM REFERENCE MANUAL (RM0360)
                  </div>
                  <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                    {['GPIO', 'RCC', 'NVIC', 'EXTI', 'SYSCFG', 'ADC', 'SPI', 'I2C'].map((drv) => (
                      <span key={drv} className="px-2.5 py-1 rounded bg-[#181E29] border border-[#232B38] text-[#ECEFF4]">
                        stm32_{drv.toLowerCase()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  {primaryProject.repositoryUrl && (
                    <a
                      href={primaryProject.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded bg-[#D4A03D] hover:bg-[#E5B252] text-[#0B0E14] font-mono text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-2"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>VIEW ON GITHUB</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedProject(primaryProject)}
                    className="px-4 py-2 rounded bg-[#181E29] hover:bg-[#232B38] border border-[#232B38] hover:border-[#D4A03D]/60 text-[#ECEFF4] font-mono text-xs font-medium tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>SPECIFICATION & LOGS</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Code Excerpt & Verification Evidence (5 cols) */}
              <div className="lg:col-span-5 space-y-4 font-mono text-xs">
                <div className="rounded border border-[#232B38] bg-[#0B0E14] overflow-hidden">
                  <div className="p-2.5 bg-[#181E29] border-b border-[#232B38] flex items-center justify-between text-[11px] text-[#9AA7B8]">
                    <div className="flex items-center gap-1.5">
                      <FileCode2 className="w-3.5 h-3.5 text-[#D4A03D]" />
                      <span className="font-semibold text-[#ECEFF4]">stm32f030_gpio.c</span>
                    </div>
                    <span className="text-[#657386]">ATOMIC BIT SET/RESET</span>
                  </div>

                  <pre className="p-3 text-[#ECEFF4] overflow-x-auto text-[11px] leading-relaxed">
                    <code>{`/* Atomic pin write using BSRR register */
/* Bit [15:0] = Set, Bit [31:16] = Reset */
void GPIO_WriteToOutputPin(GPIO_TypeDef *pGPIOx,
                           uint8_t PinNumber,
                           uint8_t Value) {
    if (Value == GPIO_PIN_SET) {
        pGPIOx->BSRR = (1 << PinNumber);
    } else {
        pGPIOx->BSRR = (1 << (PinNumber + 16));
    }
}`}</code>
                  </pre>
                </div>

                {/* Validation Evidence Box */}
                <div className="p-3.5 rounded bg-[#0B0E14] border border-[#232B38] space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#D4A03D] font-bold uppercase text-[11px]">
                    <Activity className="w-3.5 h-3.5" />
                    <span>VERIFICATION & MEASUREMENTS</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-[#9AA7B8] leading-relaxed list-disc list-inside font-sans">
                    <li>Clock tree initialized to 48 MHz via RCC registers without CubeMX HAL.</li>
                    <li>SPI transmission framing and SCK phase (Mode 0) verified with logic analyzer.</li>
                    <li>I2C Start/Stop timing register computed for 100 kHz standard mode compliance.</li>
                    <li>OpenOCD SWD breakpoints used to step through vector table initialization.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECONDARY PROJECTS: Diverse Editorial Cards */}
        <div className="space-y-4 mb-6">
          <div className="text-xs font-mono text-[#657386] uppercase tracking-wider">
            ADDITIONAL VERIFIED PROJECTS & CONTRIBUTIONS
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryProjects.map((project: any) => (
            <div
              key={project.id}
              className="p-6 rounded border border-[#232B38] bg-[#12161F] hover:border-[#D4A03D]/60 transition-colors flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#D4A03D]">
                  <span className="truncate">{project.category}</span>
                  <span className="text-[#657386] text-[10px] shrink-0">
                    {project.githubMetadata?.language || 'C/C++'}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-bold text-[#ECEFF4] group-hover:text-[#D4A03D] transition-colors">
                  {project.title}
                </h4>

                <p className="text-xs text-[#9AA7B8] leading-relaxed line-clamp-3 font-sans">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(project.technologies || []).slice(0, 4).map((tech: string, tIdx: number) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-[#181E29] border border-[#232B38] text-[10px] font-mono text-[#9AA7B8]"
                    >
                      {tech}
                    </span>
                  ))}
                  {(project.technologies || []).length > 4 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono text-[#657386]">
                      +{(project.technologies || []).length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-5 mt-4 border-t border-[#232B38] flex items-center justify-between text-xs font-mono">
                {project.repositoryUrl ? (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9AA7B8] hover:text-[#ECEFF4] flex items-center gap-1 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>REPO</span>
                  </a>
                ) : (
                  <span className="text-[#657386]">PROJECT</span>
                )}

                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-[#D4A03D] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                >
                  <span>DETAILS</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Deep-Dive Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
