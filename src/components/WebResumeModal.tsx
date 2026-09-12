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
      <div className="relative w-full max-w-4xl bg-[#1A1F28] border border-[#2D3748] rounded-[4px] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#F0F4F8]">
        {/* Top Control Bar (Non-printable) */}
        <div className="p-4 sm:p-5 bg-[#0D1117] border-b border-[#2D3748] flex items-center justify-between font-mono text-xs print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
            <span className="font-bold text-[#F0F4F8]" id="web-resume-title">
              CURRICULUM VITAE // {PROFILE.name}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded bg-[#1A1F28] border border-[#2D3748] hover:border-[#1E90FF] text-[#A8B8C8] hover:text-[#F0F4F8] flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PRINT / SAVE AS PDF</span>
              <span className="sm:hidden">PRINT</span>
            </button>
            <a
              href="/resume/Varun_Kumar_Resume.pdf"
              download
              className="px-3 py-1.5 rounded bg-[#D4AF37] text-[#0D1117] font-bold flex items-center gap-1.5 hover:bg-[#e0bc46] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded bg-[#1A1F28] border border-[#2D3748] text-[#A8B8C8] hover:text-[#1E90FF] hover:border-[#1E90FF] transition-colors"
              aria-label="Close Resume"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 font-sans text-xs sm:text-sm leading-relaxed bg-[#0D1117] print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-[#2D3748] print:border-black/30 pb-6">
            <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[#F0F4F8] print:text-black">
              {PROFILE.name}
            </h1>
            <div className="text-sm font-mono text-[#D4AF37] print:text-black font-semibold mt-1">
              {PROFILE.title}
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-xs font-mono text-[#A8B8C8] print:text-gray-700">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] print:hidden" />
                {PROFILE.location}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#1E90FF] print:hidden" />
                {PROFILE.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#00D9FF] print:hidden" />
                {PROFILE.phone}
              </span>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline text-[#1E90FF] print:text-black">
                <Github className="w-3.5 h-3.5 print:hidden" />
                {PROFILE.github.replace('https://', '')}
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline text-[#1E90FF] print:text-black">
                <Linkedin className="w-3.5 h-3.5 print:hidden" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Core Profile Statement */}
          <div className="space-y-1">
            <div className="text-xs font-mono text-[#D4AF37] print:text-black font-bold uppercase tracking-wider">
              CORE STATEMENT
            </div>
            <p className="text-sm text-[#A8B8C8] print:text-gray-800 leading-relaxed">
              {PROFILE.coreStatement}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-2 border-t border-[#2D3748] print:border-black/20 pt-4">
            <div className="text-xs font-mono text-[#D4AF37] print:text-black font-bold uppercase tracking-wider">
              EDUCATION
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <span className="font-bold text-[#F0F4F8] print:text-black">{PROFILE.degree}</span>
                <span className="text-[#A8B8C8] print:text-gray-700"> — {PROFILE.university}</span>
              </div>
              <div className="text-xs font-mono text-[#00D9FF] print:text-black">
                CGPA: {PROFILE.cgpa}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4 border-t border-[#2D3748] print:border-black/20 pt-4">
            <div className="text-xs font-mono text-[#D4AF37] print:text-black font-bold uppercase tracking-wider">
              ENGINEERING WORK EXPERIENCE
            </div>
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <span className="font-bold text-[#F0F4F8] print:text-black">{exp.role}</span>
                    <span className="text-[#D4AF37] print:text-gray-800 font-medium"> @ {exp.company}</span>
                  </div>
                  <div className="text-xs font-mono text-[#A8B8C8] print:text-gray-700">
                    {exp.period} | {exp.location}
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-[#A8B8C8] print:text-gray-800">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Key Projects */}
          <div className="space-y-4 border-t border-[#2D3748] print:border-black/20 pt-4">
            <div className="text-xs font-mono text-[#D4AF37] print:text-black font-bold uppercase tracking-wider">
              TECHNICAL PROJECTS
            </div>
            {PROJECTS.map((proj) => (
              <div key={proj.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#F0F4F8] print:text-black">{proj.title}</span>
                  <span className="text-xs font-mono text-[#00D9FF] print:text-gray-700">{proj.category}</span>
                </div>
                <p className="text-xs text-[#A8B8C8] print:text-gray-800">
                  {proj.description}
                </p>
                <div className="text-[11px] font-mono text-[#6B7280] print:text-gray-600">
                  Stack: {proj.technologies.join(' • ')}
                </div>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div className="space-y-2 border-t border-[#2D3748] print:border-black/20 pt-4">
            <div className="text-xs font-mono text-[#D4AF37] print:text-black font-bold uppercase tracking-wider">
              SKILLS & TOOLCHAINS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {SKILL_CATEGORIES.slice(0, 4).map((cat) => (
                <div key={cat.id}>
                  <span className="font-semibold text-[#F0F4F8] print:text-black">{cat.title}: </span>
                  <span className="text-[#A8B8C8] print:text-gray-700">{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
