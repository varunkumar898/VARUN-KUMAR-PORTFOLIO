import React from 'react';
import { PROFILE } from '../data/portfolioData';
import { Github, ExternalLink, GitBranch, Star, GitFork, ArrowUpRight } from 'lucide-react';

export const GitHubSection: React.FC = () => {
  const stats = [
    { label: 'Repositories', value: '15+' },
    { label: 'Contributions', value: '200+ (2025)' },
    { label: 'Primary Languages', value: 'C, Python, Assembly' },
  ];

  const recentRepos = [
    {
      name: 'STM32 Driver Library',
      description: 'Register-level bare-metal peripheral drivers for STM32F030 & F4: UART, SPI, I2C, ADC, PWM, and DMA.',
      language: 'C',
      languageColor: '#555555',
      status: 'Active',
      url: 'https://github.com/varunkmr/stm32f030-drivers',
      stars: 12,
      forks: 4,
    },
    {
      name: 'RISC-V Bare Metal Examples',
      description: 'RV32I assembly bootloader, CSR register access routines, and interrupt vector table implementations.',
      language: 'Assembly/C',
      languageColor: '#6E4C13',
      status: 'Active',
      url: 'https://github.com/varunkmr/riscv-baremetal',
      stars: 9,
      forks: 2,
    },
    {
      name: 'FreeRTOS Scheduler Demos',
      description: 'Priority-based preemptive scheduling, counting semaphores, message queues, and memory stack watermarking.',
      language: 'C',
      languageColor: '#555555',
      status: 'Active',
      url: 'https://github.com/varunkmr/freertos-demos',
      stars: 7,
      forks: 1,
    },
    {
      name: 'Logic Analyzer Protocol Decoders',
      description: 'Custom Python protocol decoders for parsing UART framing, SPI packets, and CAN 2.0B arbitration traces.',
      language: 'Python',
      languageColor: '#3572A5',
      status: 'Active',
      url: 'https://github.com/varunkmr/logic-decoders',
      stars: 15,
      forks: 5,
    },
  ];

  // Generate a 52-week x 7-day contribution grid simulation
  // with royal blue / subtle gold / muted green levels
  const generateContributionWeeks = () => {
    const weeks = [];
    const levelColors = [
      'bg-[#1A1F28]', // empty/level 0
      'bg-[#1E90FF]/30', // level 1
      'bg-[#1E90FF]/60', // level 2
      'bg-[#1E90FF]', // level 3
      'bg-[#D4AF37]', // level 4 (peak commit day)
    ];

    for (let w = 0; w < 32; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        // pseudo-random deterministic intensity based on index
        const rand = ((w * 7 + d * 13) % 10);
        let level = 0;
        if (rand > 2 && rand <= 5) level = 1;
        else if (rand > 5 && rand <= 7) level = 2;
        else if (rand > 7 && rand <= 8) level = 3;
        else if (rand > 8) level = 4;
        days.push(levelColors[level]);
      }
      weeks.push(days);
    }
    return weeks;
  };

  const contributionGrid = generateContributionWeeks();

  return (
    <section
      id="github"
      className="py-20 bg-[#0D1117] border-b border-[#2D3748] relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[32px] leading-[40px] font-bold text-[#F0F4F8] tracking-tight">
            OPEN SOURCE & ACTIVITY
          </h2>
          <div className="w-10 h-[1px] bg-[#2D3748] mx-auto my-3" />
          <p className="text-lg text-[#A8B8C8]">
            "Code, contributions, and active projects."
          </p>
        </div>

        {/* GitHub Stats Cards (3 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="p-6 rounded-[4px] bg-[#1A1F28] border border-[#2D3748] hover:border-[#1E90FF] transition-colors"
            >
              <div className="text-sm font-mono text-[#A8B8C8] uppercase tracking-wider">
                {s.label}
              </div>
              <div className="text-[28px] leading-tight font-bold text-[#D4AF37] mt-2">
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Contribution Graph (Simplified representation) */}
        <div className="max-w-4xl mx-auto mb-16 p-6 rounded-[4px] bg-[#1A1F28] border border-[#2D3748] overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#2D3748] pb-3 mb-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-[#F0F4F8]">
              <GitBranch className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>COMMITS & REPOSITORIES (PAST 12 MONTHS)</span>
            </div>
            <span className="text-[#00D9FF]">200+ COMMITS</span>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="flex gap-1.5 min-w-[620px]">
              {contributionGrid.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1.5">
                  {week.map((colorClass, dIdx) => (
                    <div
                      key={dIdx}
                      className={`w-3 h-3 rounded-[2px] ${colorClass}`}
                      title={`Week ${wIdx + 1}, Day ${dIdx + 1}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-end gap-2 text-[11px] font-mono text-[#A8B8C8]">
            <span>Less</span>
            <div className="w-2.5 h-2.5 rounded-[2px] bg-[#1A1F28]" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-[#1E90FF]/30" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-[#1E90FF]/60" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-[#1E90FF]" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-[#D4AF37]" />
            <span>More</span>
          </div>
        </div>

        {/* Recent Repositories Grid (2 columns) */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#F0F4F8] tracking-tight">
              Featured Repositories
            </h3>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#1E90FF] hover:underline flex items-center gap-1"
            >
              <span>VIEW ALL REPOSITORIES</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentRepos.map((repo, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[4px] bg-[#1A1F28] border border-[#2D3748] hover:border-[#1E90FF] transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-[#F0F4F8] group-hover:text-[#1E90FF] transition-colors flex items-center gap-2"
                    >
                      <span>{repo.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <span className="text-[10px] font-mono text-[#10B981] px-2 py-0.5 rounded bg-[#10B981]/10 border border-[#10B981]/30 shrink-0">
                      {repo.status}
                    </span>
                  </div>

                  <p className="text-[13px] leading-[22px] text-[#A8B8C8] mb-4">
                    {repo.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#2D3748] flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-[#F0F4F8]">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: repo.languageColor }}
                    />
                    <span>{repo.language}</span>
                  </span>

                  <div className="flex items-center gap-3 text-[#A8B8C8]">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#D4AF37]" />
                      <span>{repo.stars}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" />
                      <span>{repo.forks}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
