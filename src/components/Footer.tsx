import React from 'react';
import { PROFILE } from '../data/portfolioData';
import { Github, Linkedin, Mail, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-[#0B0D0F] border-t border-[#25292D] text-[#9AA0A6] font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#25292D]">
          {/* Brand Info */}
          <div>
            <div className="text-sm font-bold text-[#E8EAED] tracking-wider flex items-center gap-2">
              <span>{PROFILE.name}</span>
              <span className="text-[10px] text-[#C8FF00] px-1 py-0.2 bg-[#C8FF00]/10 border border-[#C8FF00]/30 rounded">
                EMBEDDED
              </span>
            </div>
            <div className="text-[11px] text-[#9AA0A6] mt-0.5">
              Embedded Systems Engineer • Firmware Developer
            </div>
            <div className="text-[11px] text-[#9AA0A6] mt-0.5">
              Chennai, Tamil Nadu, India
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9AA0A6] hover:text-[#C8FF00] transition-colors flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9AA0A6] hover:text-[#C8FF00] transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${PROFILE.email}`}
              className="text-[#9AA0A6] hover:text-[#C8FF00] transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Precision quote & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <div className="text-[#E8EAED]">
            "Built with precision. Debugged on real hardware."
          </div>
          <div className="text-[#9AA0A6]">
            © {new Date().getFullYear()} {PROFILE.name} • STM32 & RISC-V Firmware
          </div>
        </div>
      </div>
    </footer>
  );
};
