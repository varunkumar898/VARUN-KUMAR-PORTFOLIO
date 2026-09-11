import React, { useState } from 'react';
import { FileText, Download, Eye, CheckCircle2, AlertCircle } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface ResumeSectionProps {
  onOpenResumeModal: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenResumeModal }) => {
  const [downloadNotice, setDownloadNotice] = useState(false);

  const handleDownloadClick = () => {
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 4000);
  };

  return (
    <section id="resume" className="py-20 bg-[#0B0D0F] border-b border-[#25292D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#25292D] pb-5 gap-4">
          <div>
            <div className="text-xs font-mono text-[#C8FF00] tracking-widest uppercase mb-1">
              // SECTION 08
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-[#E8EAED] tracking-tight uppercase">
              RESUME
            </h2>
            <div className="text-sm font-mono text-[#9AA0A6] mt-1">
              "View my experience, projects, technical skills and education."
            </div>
          </div>
          <div className="text-xs font-mono text-[#9AA0A6] bg-[#111417] px-3 py-1.5 rounded border border-[#25292D] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00]"></span>
            <span>VERIFIED CV SPECIFICATION</span>
          </div>
        </div>

        {/* Resume Card */}
        <div className="rounded bg-[#111417] border border-[#25292D] p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2.5 text-xs font-mono text-[#C8FF00]">
              <FileText className="w-4 h-4" />
              <span>OFFICIAL EMBEDDED & FIRMWARE RESUME</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-mono font-bold text-[#E8EAED]">
              Varun Kumar — Curriculum Vitae
            </h3>

            <p className="text-xs sm:text-sm text-[#9AA0A6] leading-relaxed">
              Comprehensive technical resume detailing register-level driver development, FreeRTOS automotive architectures, compiler contributions, laboratory instrumentation methodologies, and academic coursework.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#9AA0A6] pt-1">
              <span>PDF Path: <code className="text-[#E8EAED] bg-[#0B0D0F] px-2 py-0.5 rounded border border-[#25292D]">/resume/Varun_Kumar_Resume.pdf</code></span>
              <span>Updated for 2026 Opportunities</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 font-mono text-xs">
            <button
              onClick={onOpenResumeModal}
              id="view-web-resume-btn"
              className="px-5 py-3 rounded bg-[#C8FF00] text-[#0B0D0F] font-bold tracking-wider uppercase hover:bg-[#d5ff33] transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-1 focus:ring-[#C8FF00]"
            >
              <Eye className="w-4 h-4" />
              <span>VIEW WEB RESUME</span>
            </button>

            <a
              href="/resume/Varun_Kumar_Resume.pdf"
              download="Varun_Kumar_Resume.pdf"
              onClick={handleDownloadClick}
              id="download-resume-pdf-btn"
              className="px-5 py-3 rounded bg-[#0B0D0F] border border-[#25292D] hover:border-[#C8FF00] text-[#E8EAED] hover:text-[#C8FF00] font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-1 focus:ring-[#C8FF00]"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD RESUME</span>
            </a>
          </div>
        </div>

        {/* Download Notice if file is in development environment */}
        {downloadNotice && (
          <div className="mt-4 p-3 rounded bg-[#161A1F] border border-[#25292D] text-xs font-mono text-[#9AA0A6] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#C8FF00]" />
              <span>Requested PDF download at path <code className="text-[#E8EAED]">/resume/Varun_Kumar_Resume.pdf</code>. You can also view or print the complete Web Resume directly above.</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
