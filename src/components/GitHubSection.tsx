import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { api } from '../services/api';
import { Github, ExternalLink, Star, GitFork, ArrowUpRight, GitBranch } from 'lucide-react';

export const GitHubSection: React.FC = () => {
  const { profile } = usePortfolio();
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const result = await api.getGithubRepos();
        if (result.data && result.data.length > 0) {
          setRepos(result.data.slice(0, 4));
        } else {
          setRepos([
            {
              name: 'Driver-for-STM32F030x4-x6-x8-xC',
              description: 'Bare-metal peripheral device drivers for STM32F030 (GPIO, RCC, NVIC, EXTI, SYSCFG, ADC, SPI, I2C) in Embedded C with custom startup code and linker script.',
              url: 'https://github.com/varunkumar898/Driver-for-STM32F030x4-x6-x8-xC',
              stars: 12,
              forks: 3,
              language: 'C',
              commits: 17
            },
            {
              name: 'Smart-Number-Plate-Firmware',
              description: 'FreeRTOS and ARM Cortex-M based embedded firmware for vehicle theft detection and RFID validation.',
              url: 'https://github.com/varunkumar898',
              stars: 8,
              forks: 2,
              language: 'C',
              commits: 14
            },
            {
              name: 'Embedded-UI-Designer',
              description: 'Desktop UI design environment and multi-language firmware code generator for microcontrollers.',
              url: 'https://github.com/varunkumar898',
              stars: 10,
              forks: 2,
              language: 'TypeScript / C++',
              commits: 22
            }
          ]);
        }
      } catch (err) {
        console.warn('GitHub repos fallback:', err);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section
      id="github"
      className="py-18 bg-[#0B0E14] border-b border-[#232B38] relative"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-mono text-[#D4A03D] uppercase tracking-wider mb-2">
              07 // OPEN SOURCE & REPOSITORIES
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#ECEFF4] tracking-tight">
              Code Repositories
            </h2>
            <p className="text-sm text-[#9AA7B8] mt-1">
              Public firmware drivers, prototypes, and tooling repositories on GitHub.
            </p>
          </div>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-[#D4A03D] hover:underline flex items-center gap-1.5 shrink-0"
          >
            <span>VISIT GITHUB PROFILE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Repository Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {repos.map((repo, idx) => (
            <div
              key={idx}
              className="p-5 rounded border border-[#232B38] bg-[#12161F] hover:border-[#D4A03D]/60 transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold font-mono text-[#ECEFF4] group-hover:text-[#D4A03D] transition-colors flex items-center gap-1.5 truncate"
                  >
                    <span className="truncate">{repo.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 shrink-0" />
                  </a>
                </div>

                <p className="text-xs text-[#9AA7B8] leading-relaxed line-clamp-3 font-sans">
                  {repo.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#232B38] flex items-center justify-between text-xs font-mono text-[#657386]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4A03D]" />
                  <span className="text-[#9AA7B8] text-[11px]">{repo.language || 'C'}</span>
                </div>

                <div className="flex items-center gap-3 text-[11px]">
                  {repo.stars !== undefined && (
                    <span className="flex items-center gap-1 text-[#9AA7B8]">
                      <Star className="w-3 h-3 text-[#D4A03D]" />
                      <span>{repo.stars}</span>
                    </span>
                  )}
                  {repo.forks !== undefined && (
                    <span className="flex items-center gap-1 text-[#9AA7B8]">
                      <GitFork className="w-3 h-3" />
                      <span>{repo.forks}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
