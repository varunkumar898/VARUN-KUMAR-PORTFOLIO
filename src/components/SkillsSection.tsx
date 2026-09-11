import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { ArrowRight, Layers, Cpu, Wrench, Radio, ShieldAlert, Terminal, Search } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCategories = SKILL_CATEGORIES.filter((cat) => {
    if (activeCategory !== 'all' && cat.id !== activeCategory) {
      return false;
    }
    if (searchQuery.trim() === '') return true;
    const query = searchQuery.toLowerCase();
    const matchesTitle = cat.title.toLowerCase().includes(query);
    const matchesSkill = cat.skills.some((s) => s.toLowerCase().includes(query));
    return matchesTitle || matchesSkill;
  });

  return (
    <section id="skills" className="py-20 bg-[#0B0D0F] border-b border-[#25292D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#25292D] pb-5 gap-4">
          <div>
            <div className="text-xs font-mono text-[#C8FF00] tracking-widest uppercase mb-1">
              // SECTION 05
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-[#E8EAED] tracking-tight uppercase">
              TECHNICAL COMPETENCIES
            </h2>
            <div className="text-sm font-mono text-[#9AA0A6] mt-1">
              Structured engineering matrices across silicon, firmware, and instrumentation.
            </div>
          </div>
          <div className="text-xs font-mono text-[#9AA0A6] bg-[#111417] px-3 py-1.5 rounded border border-[#25292D] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00]"></span>
            <span>NO ARBITRARY PERCENTAGES</span>
          </div>
        </div>

        {/* Architectural Relationship Pipeline */}
        <div className="mb-12 p-5 rounded bg-[#111417] border border-[#25292D]">
          <div className="text-xs font-mono text-[#C8FF00] uppercase tracking-wider mb-3">
            // EMBEDDED SYSTEM LAYER COUPLING
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 font-mono text-center text-xs">
            <div className="p-3 rounded bg-[#0B0D0F] border border-[#25292D]">
              <div className="text-[10px] text-[#9AA0A6]">LAYER 01</div>
              <div className="text-sm font-bold text-[#E8EAED] mt-1">APPLICATION</div>
              <div className="text-[10px] text-[#C8FF00] mt-0.5">Control Logic</div>
            </div>

            <div className="hidden sm:flex items-center justify-center text-[#363C43]">
              <ArrowRight className="w-4 h-4 text-[#C8FF00]" />
            </div>

            <div className="p-3 rounded bg-[#0B0D0F] border border-[#25292D]">
              <div className="text-[10px] text-[#9AA0A6]">LAYER 02</div>
              <div className="text-sm font-bold text-[#C8FF00] mt-1">RTOS / KERNEL</div>
              <div className="text-[10px] text-[#9AA0A6] mt-0.5">FreeRTOS Tasks</div>
            </div>

            <div className="hidden sm:flex items-center justify-center text-[#363C43]">
              <ArrowRight className="w-4 h-4 text-[#C8FF00]" />
            </div>

            <div className="p-3 rounded bg-[#0B0D0F] border border-[#25292D]">
              <div className="text-[10px] text-[#9AA0A6]">LAYER 03</div>
              <div className="text-sm font-bold text-[#E8EAED] mt-1">DEVICE DRIVERS</div>
              <div className="text-[10px] text-[#C8FF00] mt-0.5">Register Bitfields</div>
            </div>
          </div>
          <div className="mt-2 text-center text-[11px] font-mono text-[#9AA0A6]">
            ↓ DIRECT MEMORY-MAPPED REGISTERS ↓ PHYSICAL SILICON PIN MATRIX (3.3V)
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-1.5 font-mono text-xs w-full md:w-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded border transition-colors ${
                activeCategory === 'all'
                  ? 'bg-[#C8FF00] text-[#0B0D0F] border-[#C8FF00] font-bold'
                  : 'bg-[#111417] text-[#9AA0A6] border-[#25292D] hover:text-[#E8EAED]'
              }`}
            >
              ALL DOMAINS ({SKILL_CATEGORIES.length})
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded border transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-[#C8FF00] text-[#0B0D0F] border-[#C8FF00] font-bold'
                    : 'bg-[#111417] text-[#9AA0A6] border-[#25292D] hover:text-[#E8EAED]'
                }`}
              >
                {cat.number}. {cat.title.split('&')[0]}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-64 font-mono text-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter skills (e.g. FreeRTOS, SPI)..."
              className="w-full bg-[#111417] border border-[#25292D] rounded px-3 py-1.5 text-[#E8EAED] placeholder-[#9AA0A6] focus:outline-none focus:border-[#C8FF00]"
            />
          </div>
        </div>

        {/* 6 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="p-5 rounded bg-[#111417] border border-[#25292D] hover:border-[#C8FF00]/50 transition-colors flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#25292D] pb-3 mb-3 font-mono">
                  <span className="text-xs text-[#C8FF00] font-bold">
                    CATEGORY {category.number}
                  </span>
                  <span className="text-[10px] text-[#9AA0A6] px-1.5 py-0.5 bg-[#0B0D0F] rounded border border-[#25292D]">
                    {category.skills.length} ITEMS
                  </span>
                </div>

                <h3 className="text-base font-mono font-bold text-[#E8EAED] tracking-tight">
                  {category.title}
                </h3>
                {category.description && (
                  <p className="text-xs text-[#9AA0A6] mt-1 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                )}

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {category.skills.map((skill, sIdx) => {
                    const isMatched = searchQuery && skill.toLowerCase().includes(searchQuery.toLowerCase());
                    return (
                      <span
                        key={sIdx}
                        className={`px-2 py-1 rounded text-xs font-mono border transition-colors ${
                          isMatched
                            ? 'bg-[#C8FF00] text-[#0B0D0F] border-[#C8FF00] font-bold'
                            : 'bg-[#0B0D0F] text-[#E8EAED] border-[#25292D] hover:border-[#C8FF00]/50'
                        }`}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-[#25292D] flex items-center justify-between text-[10px] font-mono text-[#9AA0A6]">
                <span>PRACTICAL HARDWARE APPLICATION</span>
                <span className="text-[#C8FF00]">VERIFIED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
