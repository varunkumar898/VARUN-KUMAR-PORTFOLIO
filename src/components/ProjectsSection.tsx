import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Github, ExternalLink, Cpu, ChevronRight, Layers, Terminal, Activity, GitPullRequest } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="py-20 bg-[#0B0D0F] border-b border-[#25292D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#25292D] pb-5 gap-4">
          <div>
            <div className="text-xs font-mono text-[#C8FF00] tracking-widest uppercase mb-1">
              // SECTION 03
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-[#E8EAED] tracking-tight uppercase">
              SELECTED PROJECTS
            </h2>
            <div className="text-sm font-mono text-[#9AA0A6] mt-1">
              "Real hardware. Real problems. Real engineering."
            </div>
          </div>
          <div className="text-xs font-mono text-[#9AA0A6] bg-[#111417] px-3 py-1.5 rounded border border-[#25292D] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00]"></span>
            <span>MEASURED ON REAL SILICON</span>
          </div>
        </div>

        {/* Projects Layout */}
        <div className="space-y-10">
          {PROJECTS.map((project, idx) => {
            const isStm32 = project.id === 'stm32f030-drivers';

            return (
              <div
                key={project.id}
                id={`project-${project.slug}`}
                className={`rounded bg-[#111417] border ${
                  isStm32 ? 'border-[#C8FF00]/40' : 'border-[#25292D]'
                } p-6 lg:p-8 space-y-6 hover:border-[#C8FF00]/70 transition-all duration-200`}
              >
                {/* Top Project Tagline */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[#25292D] pb-4 font-mono">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#C8FF00] mb-1">
                      <span>PROJECT 0{idx + 1}</span>
                      <span className="text-[#363C43]">/</span>
                      <span className="text-[#9AA0A6]">{project.category}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#E8EAED] tracking-tight">
                      {project.title}
                    </h3>
                    <div className="text-xs sm:text-sm text-[#9AA0A6] mt-0.5">
                      {project.subtitle}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {project.metadata?.commits && (
                      <span className="px-2.5 py-1 rounded bg-[#0B0D0F] border border-[#25292D] text-[#E8EAED]">
                        {project.metadata.commits}
                      </span>
                    )}
                    {project.metadata?.status && (
                      <span className="px-2.5 py-1 rounded bg-[#0B0D0F] border border-[#C8FF00]/30 text-[#C8FF00]">
                        {project.metadata.status}
                      </span>
                    )}
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Description & Specifics */}
                  <div className="lg:col-span-7 space-y-5">
                    <p className="text-sm sm:text-base text-[#9AA0A6] leading-relaxed">
                      {project.description}
                    </p>

                    {/* Drivers pill grid if STM32 */}
                    {project.drivers && (
                      <div>
                        <div className="text-xs font-mono text-[#E8EAED] font-semibold mb-2">
                          8 CORE PERIPHERAL DRIVERS IMPLEMENTED:
                        </div>
                        <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                          {project.drivers.map((drv, dIdx) => (
                            <div
                              key={dIdx}
                              className="p-2 rounded bg-[#0B0D0F] border border-[#25292D] text-center text-[#C8FF00] font-medium"
                            >
                              {drv}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Contributions if Gravel */}
                    {project.contributions && (
                      <div>
                        <div className="text-xs font-mono text-[#E8EAED] font-semibold mb-2">
                          KEY CONTRIBUTIONS TO COMPILER BACKEND:
                        </div>
                        <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                          {project.contributions.map((contr, cIdx) => (
                            <div key={cIdx} className="p-2 rounded bg-[#0B0D0F] border border-[#25292D] text-[#9AA0A6] flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00]"></span>
                              <span>{contr}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* FreeRTOS automotive specifics */}
                    {project.id === 'smart-number-plating' && (
                      <div className="p-3.5 rounded bg-[#0B0D0F] border border-[#25292D] space-y-2 font-mono text-xs">
                        <div className="text-[#C8FF00] font-semibold">REAL-TIME DETERMINISM HIGHLIGHTS:</div>
                        <ul className="space-y-1 text-[#9AA0A6]">
                          <li>• Thread-safe message queues transferring telemetry between ISR and worker tasks</li>
                          <li>• Priority-based task preemption for ignition cut-off under confirmed theft</li>
                          <li>• DMA circular buffer handling continuous NMEA GPS byte streaming at 9600 baud</li>
                        </ul>
                      </div>
                    )}

                    {/* Tech Badges */}
                    <div>
                      <div className="text-[10px] font-mono text-[#9AA0A6] uppercase tracking-wider mb-2">
                        TECHNOLOGY STACK
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded bg-[#0B0D0F] border border-[#25292D] font-mono text-xs text-[#E8EAED]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visual Architecture Flow */}
                  <div className="lg:col-span-5 p-4 rounded bg-[#0B0D0F] border border-[#25292D] flex flex-col justify-between font-mono text-xs">
                    <div>
                      <div className="flex items-center justify-between border-b border-[#25292D] pb-2 mb-3">
                        <span className="text-[#C8FF00] font-semibold">// ARCHITECTURE FLOW</span>
                        <span className="text-[10px] text-[#9AA0A6]">SYSTEM TOPOLOGY</span>
                      </div>

                      <div className="space-y-1.5">
                        {project.details.architecture.diagramSteps.map((step, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2">
                            <span className="text-[10px] text-[#C8FF00] font-bold w-4">
                              0{sIdx + 1}
                            </span>
                            <div className="flex-1 px-2.5 py-1 rounded bg-[#161A1F] border border-[#25292D] text-[11px] text-[#E8EAED] truncate">
                              {step}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#25292D] flex items-center justify-between text-[11px] text-[#9AA0A6]">
                      <span>Target: {project.metadata?.targetHardware || 'Silicon Target'}</span>
                      <span className="text-[#C8FF00]">VALIDATED</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Actions: Deep Dive & Repo Link */}
                <div className="pt-4 border-t border-[#25292D] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                  <button
                    onClick={() => setSelectedProject(project)}
                    id={`open-detail-${project.id}`}
                    className="px-4 py-2 rounded bg-[#C8FF00] text-[#0B0D0F] font-bold tracking-wider uppercase hover:bg-[#d5ff33] transition-colors flex items-center gap-2 focus:outline-none focus:ring-1 focus:ring-[#C8FF00]"
                  >
                    <span>EXPLORE ARCHITECTURE & CODE</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-3">
                    {project.repositoryUrl ? (
                      <a
                        href={project.repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded bg-[#0B0D0F] border border-[#25292D] hover:border-[#C8FF00] text-[#E8EAED] hover:text-[#C8FF00] transition-colors flex items-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        <span>VIEW ON GITHUB</span>
                      </a>
                    ) : (
                      <span className="text-xs text-[#9AA0A6] font-mono">
                        Hardware Prototype Repository
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
