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
    // If admin uploaded a base64 or URL file, use it; else fallback
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
      className="py-20 bg-[#0D1117] border-b border-[#2D3748] relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[32px] leading-[40px] font-bold text-[#F0F4F8] tracking-tight">
            RESUME
          </h2>
          <div className="w-10 h-[1px] bg-[#2D3748] mx-auto my-3" />
          <p className="text-base text-[#A8B8C8]">
            "Available for full-time embedded systems roles."
          </p>
        </div>

        {/* Two Action Cards (Side by side) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: DOWNLOAD PDF (Primary Action) */}
          <div className="p-8 rounded-[4px] bg-[#1A1F28] border border-[#2D3748] hover:border-[#D4AF37] hover:shadow-[0_8px_32px_rgba(212,175,55,0.08)] transition-all duration-200 flex flex-col justify-between group">
            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#F0F4F8] tracking-wide">
                  DOWNLOAD PDF
                </h3>
                <div className="p-2 rounded bg-[#0D1117] border border-[#2D3748] text-[#D4AF37]">
                  <Download className="w-4 h-4" />
                </div>
              </div>

              <p className="text-sm text-[#A8B8C8] leading-relaxed">
                Standard single-page technical curriculum vitae formatted for engineering review and ATS parsing.
              </p>

              <div className="text-xs font-mono text-[#D4AF37]">
                VERSION: v{resume?.version || 1} • {resume?.fileName || 'PDF FORMAT'}
              </div>
            </div>

            <button
              onClick={handleDownload}
              id="resume-download-btn"
              className="w-full py-3 px-6 rounded bg-[#D4AF37] hover:bg-[#e0bc46] text-[#0D1117] font-bold text-xs uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD RESUME (v{resume?.version || 1})</span>
            </button>
          </div>

          {/* Card 2: VIEW IN BROWSER (Secondary Action) */}
          <div className="p-8 rounded-[4px] bg-[#1A1F28] border border-[#2D3748] hover:border-[#1E90FF] hover:shadow-[0_8px_32px_rgba(30,144,255,0.08)] transition-all duration-200 flex flex-col justify-between group">
            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#F0F4F8] tracking-wide">
                  VIEW IN BROWSER
                </h3>
                <div className="p-2 rounded bg-[#0D1117] border border-[#2D3748] text-[#1E90FF]">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              <p className="text-sm text-[#A8B8C8] leading-relaxed">
                Interactive embedded view with direct printable formatting, complete work logs, and driver specifications.
              </p>

              <div className="text-xs font-mono text-[#6B7280]">
                FORMAT: INTERACTIVE WEB CV • PRINT-READY
              </div>
            </div>

            <button
              onClick={onOpenResumeModal}
              id="resume-view-btn"
              className="w-full py-3 px-6 rounded bg-transparent border border-[#2D3748] hover:border-[#1E90FF] text-[#F0F4F8] hover:text-[#1E90FF] font-semibold text-xs uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            >
              <Eye className="w-4 h-4" />
              <span>VIEW WEB RESUME</span>
            </button>
          </div>
        </div>

        {downloadNotice && (
          <div className="max-w-4xl mx-auto mt-6 p-4 rounded bg-[#1A1F28] border border-[#D4AF37]/50 text-xs font-mono text-[#A8B8C8] flex items-center gap-2.5 animate-fade-in-up">
            <AlertCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>
              Resume PDF triggered. You can also view and print the interactive browser version instantly using the "VIEW IN BROWSER" button.
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
