import React from 'react';
import { FEATURED_REPOSITORIES, PROFILE } from '../data/portfolioData';
import { Github, ExternalLink, GitBranch, Terminal, Star, GitFork, ArrowUpRight } from 'lucide-react';

export const GitHubSection: React.FC = () => {
  return (
    <section id="github" className="py-20 bg-[#0B0D0F] border-b border-[#25292D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#25292D] pb-5 gap-4">
          <div>
            <div className="text-xs font-mono text-[#C8FF00] tracking-widest uppercase mb-1">
              // SECTION 07
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-[#E8EAED] tracking-tight uppercase">
              FROM THE CODEBASE
            </h2>
            <div className="text-sm font-mono text-[#9AA0A6] mt-1">
              "Selected work from my public repositories."
            </div>
          </div>

          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded bg-[#111417] text-[#E8EAED] hover:text-[#C8FF00] border border-[#25292D] hover:border-[#C8FF00] font-mono text-xs tracking-wider transition-colors flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            <span>VIEW ALL ON GITHUB</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_REPOSITORIES.map((repo, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded bg-[#111417] border border-[#25292D] hover:border-[#C8FF00]/60 transition-all duration-150 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Repo Header */}
                <div className="flex items-start justify-between gap-2 font-mono">
                  <div className="flex items-center gap-2 text-xs text-[#9AA0A6]">
                    <GitBranch className="w-3.5 h-3.5 text-[#C8FF00]" />
                    <span className="truncate max-w-[200px]">{repo.fullName}</span>
                  </div>
                  <span className="text-[10px] text-[#C8FF00] px-1.5 py-0.5 bg-[#0B0D0F] border border-[#25292D] rounded">
                    {repo.status}
                  </span>
                </div>

                {/* Repo Title */}
                <h3 className="text-base font-mono font-bold text-[#E8EAED] group-hover:text-[#C8FF00] transition-colors">
                  {repo.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#9AA0A6] leading-relaxed">
                  {repo.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1 font-mono text-[10px]">
                  {repo.tags.map((t, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded bg-[#0B0D0F] border border-[#25292D] text-[#9AA0A6]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Repo Footer & CTA */}
              <div className="pt-4 border-t border-[#25292D] flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-3 text-[#9AA0A6]">
                  <span className="flex items-center gap-1.5 text-xs text-[#E8EAED]">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.languageColor }}></span>
                    <span>{repo.language}</span>
                  </span>
                  <span className="text-[11px]">• {repo.commits}</span>
                </div>

                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-[#0B0D0F] border border-[#25292D] text-[#E8EAED] hover:text-[#C8FF00] hover:border-[#C8FF00] transition-colors"
                  aria-label={`View ${repo.name} on GitHub`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Account Note */}
        <div className="mt-8 p-4 rounded bg-[#111417] border border-[#25292D] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#9AA0A6]">
            <Terminal className="w-4 h-4 text-[#C8FF00]" />
            <span>PRIMARY REPOSITORY HOST: github.com/{PROFILE.github.split('/').pop()}</span>
          </div>
          <div className="text-[11px] text-[#C8FF00]">
            VERIFIED OPEN-SOURCE & SILICON DRIVER COMMITS
          </div>
        </div>
      </div>
    </section>
  );
};
