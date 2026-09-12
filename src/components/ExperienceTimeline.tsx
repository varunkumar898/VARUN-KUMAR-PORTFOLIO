import React from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { Calendar, MapPin } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section
      id="experience"
      className="py-20 bg-[#0D1117] border-b border-[#2D3748] relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[32px] leading-[40px] font-bold text-[#F0F4F8] tracking-tight">
            EXPERIENCE
          </h2>
          <div className="w-10 h-[1px] bg-[#2D3748] mx-auto my-3" />
          <p className="text-base text-[#A8B8C8]">
            Engineering work logs, RTOS development, and hardware bring-up records.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative max-w-4xl mx-auto pl-6 sm:pl-10">
          {/* Timeline Spine (2px line, #2D3748) */}
          <div className="absolute left-[11px] sm:left-[19px] top-4 bottom-4 w-[2px] bg-[#2D3748]" />

          <div className="space-y-10">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="relative group">
                {/* Timeline Dot (12px circle, color changes on hover to #1E90FF) */}
                <div className="absolute -left-[29px] sm:-left-[37px] top-7 w-[12px] h-[12px] rounded-full bg-[#2D3748] border-2 border-[#0D1117] group-hover:bg-[#1E90FF] group-hover:scale-125 transition-all duration-150 z-10" />

                {/* Experience Card */}
                <div className="p-6 sm:p-8 rounded bg-[#1A1F28] border border-[#2D3748] group-hover:border-[#1E90FF] group-hover:shadow-xl group-hover:shadow-[#1E90FF]/5 transition-all duration-200">
                  {/* Role Title, Company, Location, Dates */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#2D3748] pb-5 mb-5">
                    <div>
                      <h3 className="text-xl font-bold text-[#F0F4F8] tracking-tight">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-medium text-[#D4AF37] mt-1">
                        {exp.company}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#A8B8C8] mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#6B7280]" />
                          {exp.location}
                        </span>
                        <span>•</span>
                        <span className="font-mono text-[#00D9FF]">
                          {exp.duration}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-[#A8B8C8] bg-[#0D1117] px-3 py-1.5 rounded border border-[#2D3748] shrink-0 self-start">
                      <Calendar className="w-3.5 h-3.5 text-[#1E90FF]" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Tech Tags: Inline small pills, 11px text #A8B8C8, padding 4px 8px, gap 8px */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded bg-[#2D3748]/30 border border-[#2D3748] text-[11px] font-mono text-[#A8B8C8] hover:border-[#1E90FF] hover:text-[#1E90FF] transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Responsibilities: Specific actions + outcomes */}
                  <ul className="space-y-2.5">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li
                        key={rIdx}
                        className="flex items-start gap-3 text-sm text-[#A8B8C8] leading-relaxed"
                      >
                        <span className="text-[#D4AF37] font-bold text-base leading-none select-none mt-0.5">
                          •
                        </span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
