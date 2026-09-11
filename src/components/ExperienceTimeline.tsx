import React from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, Tag, Terminal, ShieldCheck } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-[#0B0D0F] border-b border-[#25292D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#25292D] pb-5 gap-4">
          <div>
            <div className="text-xs font-mono text-[#C8FF00] tracking-widest uppercase mb-1">
              // SECTION 02
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-[#E8EAED] tracking-tight uppercase">
              EXPERIENCE
            </h2>
            <div className="text-sm font-mono text-[#9AA0A6] mt-1">
              Engineering work logs & hardware bring-up records.
            </div>
          </div>
          <div className="text-xs font-mono text-[#9AA0A6] bg-[#111417] px-3 py-1.5 rounded border border-[#25292D] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00]"></span>
            <span>CHRONOLOGICAL WORK LOG</span>
          </div>
        </div>

        {/* Engineering Log Timeline */}
        <div className="space-y-8">
          {EXPERIENCES.map((exp, index) => (
            <div
              key={exp.id}
              className="rounded bg-[#111417] border border-[#25292D] hover:border-[#C8FF00]/40 transition-colors overflow-hidden"
            >
              {/* Log Entry Header */}
              <div className="p-4 sm:p-5 bg-[#161A1F] border-b border-[#25292D] flex flex-col md:flex-row md:items-center justify-between gap-3 font-mono">
                <div>
                  <div className="flex items-center gap-2.5 text-xs text-[#C8FF00] mb-1">
                    <span>{exp.logReference}</span>
                    <span className="text-[#363C43]">/</span>
                    <span className="text-[#9AA0A6]">ENTRY_0{index + 1}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#E8EAED] tracking-tight">
                    {exp.role}
                  </h3>
                  <div className="text-xs sm:text-sm text-[#9AA0A6] mt-0.5">
                    {exp.company}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-[#9AA0A6]">
                  <div className="flex items-center gap-1.5 bg-[#0B0D0F] px-2.5 py-1 rounded border border-[#25292D]">
                    <Calendar className="w-3.5 h-3.5 text-[#C8FF00]" />
                    <span>{exp.period} ({exp.duration})</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#0B0D0F] px-2.5 py-1 rounded border border-[#25292D]">
                    <MapPin className="w-3.5 h-3.5 text-[#9AA0A6]" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Log Content Body */}
              <div className="p-5 sm:p-6 space-y-5">
                {/* Technology Tags */}
                <div>
                  <div className="text-[10px] font-mono text-[#9AA0A6] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Tag className="w-3 h-3 text-[#C8FF00]" />
                    <span>STACK & TOOLCHAIN</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-[#0B0D0F] border border-[#25292D] text-[11px] font-mono text-[#E8EAED] hover:border-[#C8FF00]/50 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Responsibilities */}
                <div>
                  <div className="text-[10px] font-mono text-[#9AA0A6] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-[#C8FF00]" />
                    <span>ENGINEERING CONTRIBUTIONS & HARDWARE VERIFICATION</span>
                  </div>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#9AA0A6] leading-relaxed">
                        <span className="text-[#C8FF00] font-mono font-bold select-none text-xs mt-0.5">
                          ›
                        </span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
