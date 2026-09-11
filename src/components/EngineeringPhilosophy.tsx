import React from 'react';
import { ENGINEERING_APPROACH } from '../data/portfolioData';
import { BookOpen, Activity, Bug, CheckCircle2, ChevronRight } from 'lucide-react';

export const EngineeringPhilosophy: React.FC = () => {
  const getIcon = (step: string) => {
    switch (step) {
      case '01':
        return <BookOpen className="w-4 h-4 text-[#C8FF00]" />;
      case '02':
        return <Activity className="w-4 h-4 text-[#C8FF00]" />;
      case '03':
        return <Bug className="w-4 h-4 text-[#C8FF00]" />;
      case '04':
      default:
        return <CheckCircle2 className="w-4 h-4 text-[#C8FF00]" />;
    }
  };

  return (
    <section id="philosophy" className="py-16 bg-[#111417] border-b border-[#25292D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Lead Quote */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono text-[#C8FF00] tracking-widest uppercase mb-2">
            // ENGINEERING APPROACH
          </div>
          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-[#E8EAED] tracking-tight">
            "Understand the hardware. Measure the behavior. Trace the firmware. Validate on silicon."
          </blockquote>
          <p className="mt-3 text-xs sm:text-sm font-mono text-[#9AA0A6]">
            Four-stage systematic discipline eliminating guesswork from embedded development.
          </p>
        </div>

        {/* 4 Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ENGINEERING_APPROACH.map((item, idx) => (
            <div
              key={item.step}
              className="p-5 rounded bg-[#0B0D0F] border border-[#25292D] hover:border-[#C8FF00]/50 transition-all duration-150 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#25292D] pb-3 mb-3">
                  <span className="font-mono text-xs text-[#9AA0A6] font-semibold">STAGE {item.step}</span>
                  <div className="p-1.5 rounded bg-[#161A1F] border border-[#25292D]">
                    {getIcon(item.step)}
                  </div>
                </div>

                <div className="text-base font-mono font-bold text-[#E8EAED] group-hover:text-[#C8FF00] transition-colors">
                  {item.title}
                </div>
                <div className="text-xs font-mono text-[#C8FF00] mt-0.5 mb-2">
                  {item.lead}
                </div>

                <p className="text-xs text-[#9AA0A6] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#25292D] flex items-center justify-between text-[10px] font-mono text-[#9AA0A6]">
                <span>{idx < 3 ? `PHASE ${idx + 1} → PHASE ${idx + 2}` : 'FINAL SIG-OFF'}</span>
                <ChevronRight className="w-3 h-3 text-[#C8FF00]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
