import React from 'react';
import { GraduationCap, Award, CheckCircle2, BookOpen } from 'lucide-react';
import { KEY_STRENGTHS } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  const coursework = [
    'Microprocessors & Microcontrollers',
    'Embedded System Design',
    'Digital Signal Processing',
    'VLSI Design',
    'Computer Architecture',
    'Communication Systems',
    'Linear Integrated Circuits',
    'Control Systems',
  ];

  return (
    <section
      id="education"
      className="py-20 bg-[#1A1F28] border-b border-[#2D3748] relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[32px] leading-[40px] font-bold text-[#F0F4F8] tracking-tight">
            EDUCATION
          </h2>
          <div className="w-10 h-[1px] bg-[#2D3748] mx-auto my-3" />
          <p className="text-base text-[#A8B8C8]">
            Academic credentials, core engineering curriculum, and foundational competencies.
          </p>
        </div>

        {/* Degree Card: 32px padding, #1A1F28 bg on #0D1117 container, 1px #2D3748 border, hover #1E90FF */}
        <div className="max-w-4xl mx-auto mb-16 p-8 rounded-[4px] bg-[#0D1117] border border-[#2D3748] hover:border-[#1E90FF] transition-colors duration-150 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-[#2D3748] pb-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37]">
                <GraduationCap className="w-4 h-4" />
                <span>UNDERGRADUATE DEGREE</span>
              </div>
              <h3 className="text-xl sm:text-[20px] font-bold text-[#F0F4F8] tracking-tight">
                B.Tech in Electronics and Communication Engineering
              </h3>
              <div className="text-base text-[#A8B8C8]">
                SRM Institute of Science and Technology
              </div>
              <div className="text-sm text-[#6B7280]">
                Chennai, Tamil Nadu, India
              </div>
            </div>

            <div className="flex md:flex-col items-start md:items-end gap-2 text-right">
              <div className="px-3.5 py-1.5 rounded bg-[#1A1F28] border border-[#2D3748] text-sm font-mono text-[#D4AF37] font-semibold">
                Degree Candidate
              </div>
              <div className="text-xs font-mono text-[#A8B8C8]">
                CGPA: 8.5 / 10.0
              </div>
            </div>
          </div>

          {/* Relevant Coursework (Grid of tags/pills) */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>RELEVANT COURSEWORK</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {coursework.map((course, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-[#1A1F28] border border-[#2D3748] text-xs font-medium text-[#A8B8C8] hover:border-[#1E90FF] hover:text-[#F0F4F8] transition-colors"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 6 Key Engineering Strengths */}
        <div className="max-w-4xl mx-auto">
          <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-4 text-center">
            CORE APPLIED COMPETENCIES
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {KEY_STRENGTHS.map((str) => (
              <div
                key={str.id}
                className="p-5 rounded-[4px] bg-[#0D1117] border border-[#2D3748] hover:border-[#1E90FF] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#2D3748] pb-2 mb-3 font-mono">
                    <span className="text-xs text-[#D4AF37] font-bold">
                      STRENGTH 0{str.id}
                    </span>
                    {str.metricLabel && (
                      <span className="text-[10px] text-[#A8B8C8] px-2 py-0.5 bg-[#1A1F28] rounded border border-[#2D3748]">
                        {str.metricLabel}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-[#F0F4F8]">
                    {str.title}
                  </h4>
                  <p className="text-xs text-[#A8B8C8] mt-2 leading-relaxed">
                    "{str.description}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#2D3748] flex items-center justify-between text-[11px] font-mono text-[#6B7280]">
                  <span>APPLIED DISCIPLINE</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
