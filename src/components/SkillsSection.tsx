import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Search, Cpu, Terminal, Layers, Wrench, Radio, Activity } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'firmware': return <Terminal className="w-4 h-4 text-[#D4A03D]" />;
      case 'rtos': return <Layers className="w-4 h-4 text-[#D4A03D]" />;
      case 'mcu': return <Cpu className="w-4 h-4 text-[#D4A03D]" />;
      case 'protocols': return <Radio className="w-4 h-4 text-[#D4A03D]" />;
      case 'debugging': return <Activity className="w-4 h-4 text-[#D4A03D]" />;
      default: return <Wrench className="w-4 h-4 text-[#D4A03D]" />;
    }
  };

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    if (!searchQuery.trim()) return cat;
    const q = searchQuery.toLowerCase();
    const matchesCat = cat.title.toLowerCase().includes(q);
    const filteredSkills = cat.skills.filter((s) => s.toLowerCase().includes(q));
    return {
      ...cat,
      skills: matchesCat ? cat.skills : filteredSkills,
    };
  }).filter((cat) => cat.skills.length > 0);

  return (
    <section
      id="skills"
      className="py-18 bg-[#0B0E14] border-b border-[#232B38] relative"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono text-[#D4A03D] uppercase tracking-wider mb-2">
              05 // TECHNICAL CAPABILITIES
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#ECEFF4] tracking-tight">
              Skills, Protocols & Toolchains
            </h2>
            <p className="text-sm text-[#9AA7B8] mt-2 max-w-xl leading-relaxed">
              Verified technical proficiencies grouped by domain. No artificial percentage meters.
            </p>
          </div>

          {/* Quick Filter */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-[#657386] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter skills (e.g. CAN, FreeRTOS, SPI)..."
              className="w-full pl-9 pr-3 py-2 rounded bg-[#12161F] border border-[#232B38] text-xs font-mono text-[#ECEFF4] placeholder-[#657386] focus:outline-none focus:border-[#D4A03D]/60 transition-colors"
            />
          </div>
        </div>

        {/* 6 Category Specification Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-5 rounded border border-[#232B38] bg-[#12161F] hover:border-[#D4A03D]/50 transition-colors flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#232B38] pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(cat.id)}
                    <h3 className="font-mono text-xs uppercase tracking-wide text-[#ECEFF4] font-semibold">
                      {cat.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#657386]">0{cat.number}</span>
                </div>

                {cat.description && (
                  <p className="text-xs text-[#9AA7B8] mb-4 font-sans leading-normal">
                    {cat.description}
                  </p>
                )}

                {/* Skills tags / pills */}
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded bg-[#181E29] border border-[#232B38] text-[11px] text-[#ECEFF4]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
