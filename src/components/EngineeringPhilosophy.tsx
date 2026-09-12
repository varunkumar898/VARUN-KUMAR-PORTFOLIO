import React from 'react';
import { BookOpen, Activity, Bug, CheckCircle2, ArrowRight } from 'lucide-react';

export const EngineeringPhilosophy: React.FC = () => {
  const stages = [
    {
      step: '01',
      title: 'UNDERSTAND',
      desc: 'Datasheets, hardware schematics, memory maps, timing constraints, and register bitfield definitions.',
      icon: <BookOpen className="w-5 h-5 text-[#D4AF37]" />,
    },
    {
      step: '02',
      title: 'MEASURE',
      desc: 'Physical logic levels, clock jitter, bus protocol frames with digital storage oscilloscope and logic analyzer.',
      icon: <Activity className="w-5 h-5 text-[#1E90FF]" />,
    },
    {
      step: '03',
      title: 'DEBUG',
      desc: 'GDB interactive breakpoints, OpenOCD in-circuit tracing, hardware fault register inspection, and ISR safety.',
      icon: <Bug className="w-5 h-5 text-[#00D9FF]" />,
    },
    {
      step: '04',
      title: 'VALIDATE',
      desc: 'Stress cycling, boundary test fixtures, power rail stability, and deterministic timing verification on real silicon.',
      icon: <CheckCircle2 className="w-5 h-5 text-[#10B981]" />,
    },
  ];

  return (
    <section
      id="philosophy"
      className="py-20 bg-[#1A1F28] border-b border-[#2D3748] relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-[32px] leading-[40px] font-bold text-[#F0F4F8] tracking-tight">
            ENGINEERING APPROACH
          </h2>
          <div className="w-10 h-[1px] bg-[#2D3748] mx-auto my-3" />
          <p className="text-lg text-[#A8B8C8]">
            "Understand the hardware. Measure the behavior. Trace the firmware. Validate on silicon."
          </p>
        </div>

        {/* Four Stages (Horizontal on desktop, connected with lines) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {stages.map((stage, idx) => (
            <div key={stage.step} className="relative group">
              <div className="h-full p-6 rounded bg-[#0D1117] border border-[#2D3748] hover:border-[#1E90FF] hover:shadow-lg hover:shadow-[#1E90FF]/10 transition-all duration-200 flex flex-col justify-between">
                <div>
                  {/* Icon and Step Indicator */}
                  <div className="flex items-center justify-between border-b border-[#2D3748] pb-3 mb-4">
                    <span className="font-mono text-xs text-[#A8B8C8]">
                      STAGE {stage.step}
                    </span>
                    <div className="p-2 rounded bg-[#1A1F28] border border-[#2D3748]">
                      {stage.icon}
                    </div>
                  </div>

                  {/* Stage Title: 16px white */}
                  <h3 className="text-base font-bold text-[#F0F4F8] tracking-wide mb-2">
                    {stage.title}
                  </h3>

                  {/* Description: 13px secondary text */}
                  <p className="text-[13px] leading-[22px] text-[#A8B8C8]">
                    {stage.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#2D3748] flex items-center justify-between text-[11px] font-mono text-[#6B7280]">
                  <span>DISCIPLINE</span>
                  <span className="text-[#10B981]">SYSTEMATIC</span>
                </div>
              </div>

              {/* Arrow connector between stages on desktop */}
              {idx < 3 && (
                <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-[#1A1F28] border border-[#2D3748] items-center justify-center text-[#1E90FF]">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
