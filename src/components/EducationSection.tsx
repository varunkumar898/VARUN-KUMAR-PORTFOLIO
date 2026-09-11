import React from 'react';
import { PROFILE, TECHNICAL_FOUNDATIONS, KEY_STRENGTHS } from '../data/portfolioData';
import { GraduationCap, Award, CheckCircle2, ShieldCheck, Layers, Terminal } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-[#111417] border-b border-[#25292D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#25292D] pb-5 gap-4">
          <div>
            <div className="text-xs font-mono text-[#C8FF00] tracking-widest uppercase mb-1">
              // SECTION 06
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-[#E8EAED] tracking-tight uppercase">
              EDUCATION & KEY CAPABILITIES
            </h2>
            <div className="text-sm font-mono text-[#9AA0A6] mt-1">
              Academic credentials, core engineering competencies, and training foundations.
            </div>
          </div>
          <div className="text-xs font-mono text-[#9AA0A6] bg-[#0B0D0F] px-3 py-1.5 rounded border border-[#25292D] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00]"></span>
            <span>VELS UNIVERSITY, CHENNAI</span>
          </div>
        </div>

        {/* Education Primary Card */}
        <div className="mb-14 rounded bg-[#0B0D0F] border border-[#25292D] p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C8FF00]">
              <GraduationCap className="w-4 h-4" />
              <span>ACADEMIC DEGREE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-mono font-bold text-[#E8EAED]">
              {PROFILE.degree}
            </h3>
            <div className="text-sm font-mono text-[#9AA0A6]">
              {PROFILE.university}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
            <div className="p-3 rounded bg-[#161A1F] border border-[#25292D]">
              <div className="text-[10px] text-[#9AA0A6] uppercase">EXPECTED GRADUATION</div>
              <div className="text-[#C8FF00] font-bold text-sm mt-0.5">{PROFILE.expectedGraduation}</div>
            </div>

            <div className="p-3 rounded bg-[#161A1F] border border-[#25292D]">
              <div className="text-[10px] text-[#9AA0A6] uppercase">CUMULATIVE GRADE POINT</div>
              <div className="text-[#E8EAED] font-bold text-sm mt-0.5">{PROFILE.cgpa}</div>
            </div>
          </div>
        </div>

        {/* 6 Engineering Strengths */}
        <div className="mb-14">
          <div className="text-xs font-mono text-[#C8FF00] uppercase tracking-wider mb-4">
            // KEY ENGINEERING STRENGTHS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {KEY_STRENGTHS.map((str) => (
              <div
                key={str.id}
                className="p-5 rounded bg-[#0B0D0F] border border-[#25292D] hover:border-[#C8FF00]/50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#25292D] pb-2 mb-3 font-mono">
                    <span className="text-[11px] text-[#C8FF00] font-bold">STRENGTH 0{str.id}</span>
                    {str.metricLabel && (
                      <span className="text-[10px] text-[#9AA0A6] px-1.5 py-0.5 bg-[#161A1F] rounded border border-[#25292D]">
                        {str.metricLabel}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-mono font-bold text-[#E8EAED] tracking-tight">
                    {str.title}
                  </h4>
                  <p className="text-xs text-[#9AA0A6] mt-2 leading-relaxed">
                    "{str.description}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#25292D] flex items-center justify-between text-[10px] font-mono text-[#9AA0A6]">
                  <span>DISCIPLINE VERIFIED</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C8FF00]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Foundation Matrices */}
        <div>
          <div className="text-xs font-mono text-[#C8FF00] uppercase tracking-wider mb-4">
            // TECHNICAL FOUNDATIONS & TOOLCHAINS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            {TECHNICAL_FOUNDATIONS.map((cat, idx) => (
              <div key={idx} className="p-4 rounded bg-[#0B0D0F] border border-[#25292D]">
                <div className="text-[#C8FF00] font-bold mb-2 pb-1 border-b border-[#25292D]">
                  {cat.category}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item, iIdx) => (
                    <span
                      key={iIdx}
                      className="px-2 py-0.5 rounded bg-[#161A1F] border border-[#25292D] text-[#E8EAED] text-[11px]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
