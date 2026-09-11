import React from 'react';
import { PROFILE, EXPERIENCES, PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';
import { X, Printer, Download, Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react';

interface WebResumeModalProps {
  onClose: () => void;
}

export const WebResumeModal: React.FC<WebResumeModalProps> = ({ onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="web-resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-[#111417] border border-[#25292D] rounded shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#E8EAED]">
        {/* Top Control Bar (Non-printable) */}
        <div className="p-4 bg-[#161A1F] border-b border-[#25292D] flex items-center justify-between font-mono text-xs print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8FF00]"></span>
            <span className="font-bold text-[#E8EAED]" id="web-resume-title">
              CURRICULUM VITAE // {PROFILE.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded bg-[#0B0D0F] border border-[#25292D] hover:border-[#C8FF00] text-[#E8EAED] hover:text-[#C8FF00] flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / SAVE AS PDF</span>
            </button>
            <a
              href="/resume/Varun_Kumar_Resume.pdf"
              download
              className="px-3 py-1.5 rounded bg-[#C8FF00] text-[#0B0D0F] font-bold flex items-center gap-1.5 hover:bg-[#d5ff33] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF LINK</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded bg-[#0B0D0F] border border-[#25292D] text-[#9AA0A6] hover:text-[#E8EAED]"
              aria-label="Close Resume"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 font-sans text-xs sm:text-sm leading-relaxed bg-[#0B0D0F] print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-[#25292D] print:border-black/30 pb-6">
            <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[#E8EAED] print:text-black">
              {PROFILE.name}
            </h1>
            <div className="text-sm font-mono text-[#C8FF00] print:text-black font-semibold mt-1">
              {PROFILE.title}
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-xs font-mono text-[#9AA0A6] print:text-gray-700">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {PROFILE.location}
              </span>
              <a href={`tel:${PROFILE.phone}`} className="flex items-center gap-1 hover:text-[#C8FF00]">
                <Phone className="w-3.5 h-3.5" />
                {PROFILE.phone}
              </a>
              <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-1 hover:text-[#C8FF00]">
                <Mail className="w-3.5 h-3.5" />
                {PROFILE.email}
              </a>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#C8FF00]">
                <Github className="w-3.5 h-3.5" />
                github.com/varunkumarjob898
              </a>
            </div>
          </div>

          {/* Core Profile */}
          <div className="space-y-1">
            <h2 className="text-xs font-mono font-bold text-[#C8FF00] print:text-black uppercase tracking-wider">
              CORE SUMMARY
            </h2>
            <p className="text-xs text-[#9AA0A6] print:text-gray-800 leading-relaxed">
              Embedded Systems Engineer focusing on bare-metal firmware, FreeRTOS, register-level device drivers, and hardware bring-up on ARM Cortex-M and RISC-V architectures. Hands-on experience debugging physical buses with digital oscilloscopes and logic analyzers, with end-to-end knowledge from reference manuals to silicon validation.
            </p>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-[#C8FF00] print:text-black uppercase tracking-wider">
              EDUCATION
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
              <div>
                <span className="font-bold text-[#E8EAED] print:text-black">{PROFILE.degree}</span>
                <span className="text-[#9AA0A6] print:text-gray-700"> — {PROFILE.university}</span>
              </div>
              <div className="font-mono text-[#9AA0A6] print:text-gray-700">
                Graduation: {PROFILE.expectedGraduation} | CGPA: {PROFILE.cgpa}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold text-[#C8FF00] print:text-black uppercase tracking-wider">
              ENGINEERING EXPERIENCE
            </h2>

            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono">
                  <div className="font-bold text-[#E8EAED] print:text-black">
                    {exp.role} <span className="font-normal text-[#9AA0A6] print:text-gray-700">@ {exp.company}</span>
                  </div>
                  <div className="text-[#9AA0A6] print:text-gray-700 text-[11px]">
                    {exp.period} ({exp.duration})
                  </div>
                </div>

                <ul className="space-y-1 text-xs text-[#9AA0A6] print:text-gray-800 list-disc list-inside">
                  {exp.responsibilities.slice(0, 4).map((r, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Key Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold text-[#C8FF00] print:text-black uppercase tracking-wider">
              SELECTED PROJECTS & OPEN SOURCE
            </h2>

            {PROJECTS.map((proj) => (
              <div key={proj.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#E8EAED] print:text-black">
                  <span>{proj.title}</span>
                  <span className="text-[11px] text-[#C8FF00] print:text-black font-normal">
                    {proj.technologies.slice(0, 4).join(', ')}
                  </span>
                </div>
                <p className="text-xs text-[#9AA0A6] print:text-gray-800">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>

          {/* Technical Skills Overview */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-[#C8FF00] print:text-black uppercase tracking-wider">
              TECHNICAL COMPETENCIES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[#9AA0A6] print:text-gray-800">
              <div>
                <span className="text-[#E8EAED] print:text-black font-semibold">Languages & RTOS: </span>
                Embedded C, C++, Assembly, FreeRTOS, Bare-metal
              </div>
              <div>
                <span className="text-[#E8EAED] print:text-black font-semibold">Architectures: </span>
                ARM Cortex-M0/M3/M4, STM32, RISC-V
              </div>
              <div>
                <span className="text-[#E8EAED] print:text-black font-semibold">Protocols: </span>
                UART, SPI, I2C, CAN, Modbus RTU/TCP, DMA, PWM
              </div>
              <div>
                <span className="text-[#E8EAED] print:text-black font-semibold">Instrumentation: </span>
                Oscilloscope, Logic Analyzer, GDB, OpenOCD, JTAG
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
