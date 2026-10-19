import React, { useState } from 'react';
import { Download, Eye, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ResumeSectionProps {
  onOpenResumeModal: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenResumeModal }) => {
  const { resume } = usePortfolio();
  const [downloadNotice, setDownloadNotice] = useState(false);

  const handleDownload = () => {
    setDownloadNotice(true);
    const link = document.createElement('a');
    link.href = resume?.fileUrl || '/resume/Varun_Kumar_Resume.pdf';
    link.download = resume?.fileName || 'Varun_Kumar_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloadNotice(false), 5000);
  };

  return (
    <section
      id="resume"
      className="py-18 bg-[#12161F] border-b border-[#232B38] relative"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12">
          <div className="text-xs font-mono text-[#D4A03D] uppercase tracking-wider mb-2">
            08 // CURRICULUM VITAE
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#ECEFF4] tracking-tight">
            Resume & Verification Documents
          </h2>
          <p className="text-sm sm:text-base text-[#9AA7B8] mt-2 max-w-2xl leading-relaxed">
            Download the official single-page technical PDF or inspect the interactive web curriculum vitae.
          </p>
        </div>

        {/* 2 Action Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Card 1: Direct PDF Download */}
          <div className="p-6 sm:p-7 rounded border border-[#232B38] bg-[#0B0E14] hover:border-[#D4A03D]/60 transition-colors flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#D4A03D] font-bold uppercase tracking-wider">
                  TECHNICAL RESUME (PDF)
                </span>
                <span className="text-[11px] font-mono text-[#657386]">~498 KB • SINGLE PAGE</span>
              </div>

              <h3 className="text-lg font-bold text-[#ECEFF4] tracking-tight">
                Official Curriculum Vitae
              </h3>

              <p className="text-xs text-[#9AA7B8] leading-relaxed font-sans">
                Complete engineering summary with contact details, technical skill categories, professional internships (MindGrow, TVS, MH Cockpit), verified STM32 bare-metal driver projects, and Vels University academic degree.
              </p>

              <div className="text-[11px] font-mono text-[#657386]">
                FILE: <span className="text-[#ECEFF4]">{resume?.fileName || 'Varun_Kumar_Resume.pdf'}</span>
              </div>
            </div>

            <button
              onClick={handleDownload}
              id="resume-download-btn"
              className="w-full py-2.5 px-4 rounded bg-[#D4A03D] hover:bg-[#E5B252] text-[#0B0E14] font-mono font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </button>
          </div>

          {/* Card 2: Interactive Web Resume */}
          <div className="p-6 sm:p-7 rounded border border-[#232B38] bg-[#0B0E14] hover:border-[#D4A03D]/60 transition-colors flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#D4A03D] font-bold uppercase tracking-wider">
                  INTERACTIVE BROWSER VIEW
                </span>
                <span className="text-[11px] font-mono text-[#657386]">PRINT-READY FORMAT</span>
              </div>

              <h3 className="text-lg font-bold text-[#ECEFF4] tracking-tight">
                Web Curriculum Vitae
              </h3>

              <p className="text-xs text-[#9AA7B8] leading-relaxed font-sans">
                Clean in-browser CV viewer formatted for quick reading or direct printing with browser print stylesheets. Includes all verified experience points and driver specifications.
              </p>

              <div className="text-[11px] font-mono text-[#657386]">
                FORMAT: <span className="text-[#ECEFF4]">RESPONSIVE WEB CV • PRINT STYLES</span>
              </div>
            </div>

            <button
              onClick={onOpenResumeModal}
              id="resume-view-btn"
              className="w-full py-2.5 px-4 rounded bg-[#181E29] hover:bg-[#232B38] border border-[#232B38] hover:border-[#D4A03D]/60 text-[#ECEFF4] font-mono font-medium text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-[#D4A03D]" />
              <span>VIEW WEB RESUME</span>
            </button>
          </div>
        </div>

        {downloadNotice && (
          <div className="max-w-4xl mx-auto mt-4 p-3 rounded bg-[#181E29] border border-[#D4A03D]/40 text-xs font-mono text-[#ECEFF4] flex items-center gap-2 animate-fade-in-up">
            <CheckCircle2 className="w-4 h-4 text-[#2EA043] shrink-0" />
            <span>Official resume download initiated ({resume?.fileName || 'Varun_Kumar_Resume.pdf'}).</span>
          </div>
        )}
      </div>
    </section>
  );
};
