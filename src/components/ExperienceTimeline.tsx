import React from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section
      id="experience"
      className="py-18 bg-[#12161F] border-b border-[#232B38] relative"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12">
          <div className="text-xs font-mono text-[#D4A03D] uppercase tracking-wider mb-2">
            04 // PROFESSIONAL EXPERIENCE
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#ECEFF4] tracking-tight">
            Engineering Internships & Technical Roles
          </h2>
          <p className="text-sm sm:text-base text-[#9AA7B8] mt-2 max-w-3xl leading-relaxed">
            Hands-on firmware development, containerized CI/CD build environments, hardware bring-up, and industrial prototyping.
          </p>
        </div>

        {/* Clean Editorial Timeline */}
        <div className="max-w-4xl mx-auto space-y-8">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={exp.id}
              className="p-6 sm:p-7 rounded border border-[#232B38] bg-[#0B0E14] hover:border-[#D4A03D]/60 transition-colors space-y-4"
            >
              {/* Header: Role, Company, Period */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#232B38] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#D4A03D] font-bold">
                      0{idx + 1} //
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#ECEFF4] tracking-tight">
                      {exp.role}
                    </h3>
                  </div>
                  <div className="text-sm font-semibold text-[#D4A03D] mt-1">
                    {exp.company}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#9AA7B8] shrink-0">
                  <span className="flex items-center gap-1.5 bg-[#181E29] px-2.5 py-1 rounded border border-[#232B38]">
                    <Calendar className="w-3.5 h-3.5 text-[#D4A03D]" />
                    <span>{exp.period}</span>
                  </span>
                  <span className="flex items-center gap-1 text-[#657386]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {exp.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-0.5 rounded bg-[#181E29] border border-[#232B38] text-[11px] font-mono text-[#9AA7B8]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bulleted Accomplishments */}
              <ul className="space-y-2 text-sm text-[#9AA7B8] leading-relaxed font-sans pt-1">
                {exp.responsibilities.map((resp, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2.5">
                    <span className="text-[#D4A03D] font-bold select-none mt-1">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
