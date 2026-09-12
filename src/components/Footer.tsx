import React from 'react';
import { Lock } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { profile, openAdmin } = usePortfolio();

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 bg-[#0D1117] border-t border-[#2D3748] text-[13px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Varun Kumar © 2025 (13px, secondary text) */}
          <div className="text-[#A8B8C8] font-mono flex items-center gap-2">
            <span>Varun Kumar © 2025</span>
            <button
              onClick={openAdmin}
              className="text-[11px] font-mono text-[#6B7280] hover:text-[#D4AF37] px-1.5 py-0.5 rounded border border-[#2D3748] hover:border-[#D4AF37]/50 flex items-center gap-1 transition-colors cursor-pointer"
              title="Access Admin CMS"
            >
              <Lock className="w-3 h-3 text-[#D4AF37]" />
              <span>Admin</span>
            </button>
          </div>

          {/* Center: Built with precision. Designed for engineers. (13px, muted) */}
          <div className="text-[#6B7280] text-center font-mono text-xs">
            Built with precision. Register-level engineering portfolio.
          </div>

          {/* Right: Links to Top ↑ | GitHub | LinkedIn | Email (13px, muted) */}
          <div className="flex items-center gap-3 text-[#6B7280] font-mono text-xs">
            <a
              href="#top"
              onClick={handleScrollToTop}
              className="hover:text-[#1E90FF] transition-colors"
            >
              Top ↑
            </a>
            <span>|</span>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1E90FF] transition-colors"
            >
              GitHub
            </a>
            <span>|</span>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1E90FF] transition-colors"
            >
              LinkedIn
            </a>
            <span>|</span>
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-[#1E90FF] transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
