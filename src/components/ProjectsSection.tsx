import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Github, ExternalLink, ChevronRight, Star, GitFork } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { projects: contextProjects } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  return (
    <section
      id="projects"
      className="py-20 bg-[#0D1117] border-b border-[#2D3748] relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[32px] leading-[40px] font-bold text-[#F0F4F8] tracking-tight">
            SELECTED PROJECTS
          </h2>
          <div className="w-10 h-[1px] bg-[#2D3748] mx-auto my-3" />
          <p className="text-lg text-[#A8B8C8] italic">
            "Real hardware. Real problems. Real engineering."
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {contextProjects.map((project: any) => {
            const commitCount = project.githubMetadata?.commits || project.metadata?.commits || '15+ Commits';
            const starsCount = project.githubMetadata?.stars ?? project.metadata?.stars;
            const forksCount = project.githubMetadata?.forks ?? project.metadata?.forks;

            const problemText = project.problem || (typeof project.details?.overview === 'string' ? project.details.overview : project.description);
            const approachText = project.approach || project.details?.architecture?.description || 'Register-level peripheral design';
            const implementationText = project.implementation || project.details?.implementation?.points?.[0] || 'Hardware driver implementation';
            const debuggingText = project.debugging || project.details?.debugging?.challenges?.[0] || 'Hardware logic analyzer and SWD trace';
            const validationText = project.validation || project.details?.validation?.metrics?.[0] || 'Validated on target MCU silicon';

            return (
              <div
                key={project.id}
                id={`project-${project.id || project.slug}`}
                className="p-8 rounded-[4px] bg-[#1A1F28] border border-[#2D3748] hover:border-[#D4AF37] hover:shadow-[0_8px_32px_rgba(212,175,55,0.1)] hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  {/* Title & Subtitle */}
                  <div className="border-b border-[#2D3748] pb-4">
                    <div className="flex items-center justify-between text-xs font-mono text-[#D4AF37] mb-1.5">
                      <span>{project.category}</span>
                      <div className="flex items-center gap-3 text-[#A8B8C8]">
                        {starsCount !== undefined && (
                          <span className="flex items-center gap-1 text-[#D4AF37]">
                            <Star className="w-3 h-3" /> {starsCount}
                          </span>
                        )}
                        {forksCount !== undefined && (
                          <span className="flex items-center gap-1 text-[#1E90FF]">
                            <GitFork className="w-3 h-3" /> {forksCount}
                          </span>
                        )}
                        <span>{typeof commitCount === 'number' ? `${commitCount} Commits` : commitCount}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-[#F0F4F8] tracking-tight group-hover:text-[#D4AF37] transition-colors">
                      {project.title}
                    </h3>
                    <div className="text-sm text-[#A8B8C8] mt-1">
                      {project.subtitle}
                    </div>
                  </div>

                  {/* Description Paragraph */}
                  <p className="text-[15px] leading-[26px] text-[#A8B8C8]">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {(project.technologies || []).map((tech: string, tIdx: number) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded bg-[#2D3748]/30 border border-[#2D3748] text-xs font-mono text-[#A8B8C8]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Structured Engineering Breakdown */}
                  <div className="pt-3 border-t border-[#2D3748] space-y-3 text-sm">
                    <div>
                      <span className="text-xs font-bold font-mono text-[#D4AF37] uppercase tracking-wider block">
                        Problem:
                      </span>
                      <span className="text-sm text-[#A8B8C8] leading-relaxed mt-0.5 block">
                        {problemText}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-bold font-mono text-[#D4AF37] uppercase tracking-wider block">
                        Approach:
                      </span>
                      <span className="text-sm text-[#A8B8C8] leading-relaxed mt-0.5 block">
                        {approachText}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-bold font-mono text-[#D4AF37] uppercase tracking-wider block">
                        Implementation:
                      </span>
                      <span className="text-sm text-[#A8B8C8] leading-relaxed mt-0.5 block">
                        {implementationText}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-bold font-mono text-[#D4AF37] uppercase tracking-wider block">
                        Debugging:
                      </span>
                      <span className="text-sm text-[#A8B8C8] leading-relaxed mt-0.5 block">
                        {debuggingText}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-bold font-mono text-[#D4AF37] uppercase tracking-wider block">
                        Validation:
                      </span>
                      <span className="text-sm text-[#A8B8C8] leading-relaxed mt-0.5 block">
                        {validationText}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 mt-6 border-t border-[#2D3748] flex items-center justify-between gap-3">
                  {project.repositoryUrl ? (
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded bg-[#D4AF37] text-[#0D1117] text-xs font-bold tracking-wider uppercase hover:bg-[#e0bc46] transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>VIEW ON GITHUB</span>
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-[#6B7280]">
                      PROPRIETARY / RESEARCH
                    </span>
                  )}

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="px-4 py-2 rounded bg-[#0D1117] border border-[#2D3748] hover:border-[#1E90FF] text-[#F0F4F8] hover:text-[#1E90FF] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#1E90FF] cursor-pointer"
                  >
                    <span>DETAILS</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
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
