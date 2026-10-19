import React from 'react';
import { GraduationCap, BookOpen, Award, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const EducationSection: React.FC = () => {
  const { profile } = usePortfolio();

  const coursework = [
    'Microprocessors & Microcontrollers (ARM Cortex-M)',
    'Embedded System Design',
    'Computer Architecture & Assembly',
    'Real-Time Operating Systems',
    'Digital Electronics & Logic Design',
    'Communication Protocols (UART, SPI, I2C, CAN)',
    'Linear Integrated Circuits & Sensor Interfacing',
    'Control Systems & Actuator Feedback'
  ];

  return (
    <section
      id="education"
      className="py-18 bg-[#12161F] border-b border-[#232B38] relative"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12">
          <div className="text-xs font-mono text-[#D4A03D] uppercase tracking-wider mb-2">
            06 // ACADEMICS
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#ECEFF4] tracking-tight">
            Education & Core Foundations
          </h2>
          <p className="text-sm sm:text-base text-[#9AA7B8] mt-2 max-w-2xl leading-relaxed">
            Degree credentials, foundational coursework, and verified academic record.
          </p>
        </div>

        {/* Degree Specification Card */}
        <div className="max-w-4xl mx-auto rounded border border-[#232B38] bg-[#0B0E14] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#232B38] pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D4A03D]">
                <GraduationCap className="w-4 h-4" />
                <span>UNDERGRADUATE DEGREE PROGRAM</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#ECEFF4] tracking-tight">
                {profile.degree || 'B.Tech, Electronics and Computer Engineering'}
              </h3>
              <div className="text-sm font-medium text-[#D4A03D]">
                {profile.university || 'Vels University, Chennai, Tamil Nadu, India'}
              </div>
              <div className="text-xs text-[#657386] font-mono mt-0.5">
                Chennai, Tamil Nadu, India • Class of 2026
              </div>
            </div>

            <div className="flex sm:flex-col items-start sm:items-end gap-1 font-mono text-xs shrink-0">
              <div className="px-3 py-1 rounded bg-[#181E29] border border-[#232B38] text-[#ECEFF4] font-semibold">
                CGPA: {profile.cgpa || '7.5 / 10'}
              </div>
              <div className="text-[11px] text-[#657386]">Graduation: 2026</div>
            </div>
          </div>

          {/* Relevant Coursework */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4A03D] uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>RELEVANT UNDERGRADUATE COURSEWORK</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {coursework.map((course, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded bg-[#181E29] border border-[#232B38] text-xs text-[#9AA7B8] font-sans"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
