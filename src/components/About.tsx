import React from 'react';
import { TECHNICAL_HIGHLIGHTS } from '../data/portfolioData';
import { Cpu, ArrowRightLeft, Microchip, Layers, Terminal } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#0B0D0F] border-b border-[#25292D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#25292D] pb-5 gap-4">
          <div>
            <div className="text-xs font-mono text-[#C8FF00] tracking-widest uppercase mb-1">
              // SECTION 01
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-[#E8EAED] tracking-tight uppercase">
              ABOUT
            </h2>
            <div className="text-sm font-mono text-[#9AA0A6] mt-1">
              Firmware meets hardware.
            </div>
          </div>
          <div className="text-xs font-mono text-[#9AA0A6] bg-[#111417] px-3 py-1.5 rounded border border-[#25292D] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00]"></span>
            <span>DISCIPLINE: LOW-LEVEL SILICON</span>
          </div>
        </div>

        {/* Narrative & Positioning */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* Main Prose */}
          <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-[#9AA0A6] leading-relaxed">
            <p className="text-base sm:text-lg font-mono text-[#E8EAED] leading-normal">
              I work at the boundary between firmware and hardware.
            </p>
            <p>
              My focus is low-level embedded development, from register-level peripheral configuration and board bring-up to RTOS scheduling, communication protocols and hardware debugging.
            </p>
            <p>
              I enjoy working close to the silicon—reading datasheets, understanding timing behavior, debugging peripherals and validating firmware on real hardware.
            </p>
          </div>

          {/* Interactive Boundary Visualization: HARDWARE ↔ FIRMWARE */}
          <div className="lg:col-span-5 p-5 rounded bg-[#111417] border border-[#25292D] space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between text-[#9AA0A6] border-b border-[#25292D] pb-2">
              <span className="text-[#C8FF00] font-semibold">// CORE BOUNDARY</span>
              <span className="text-[10px]">LAYER TRANSLATION</span>
            </div>

            <div className="grid grid-cols-11 items-center gap-1 text-center py-2">
              <div className="col-span-5 p-3 rounded bg-[#161A1F] border border-[#25292D]">
                <div className="text-[10px] text-[#9AA0A6] uppercase tracking-wider">PHYSICAL DOMAIN</div>
                <div className="text-sm font-bold text-[#E8EAED] mt-1">HARDWARE</div>
                <div className="text-[10px] text-[#9AA0A6] mt-1">Pins • Clocks • Buses</div>
              </div>

              <div className="col-span-1 flex justify-center text-[#C8FF00]">
                <ArrowRightLeft className="w-4 h-4" />
              </div>

              <div className="col-span-5 p-3 rounded bg-[#161A1F] border border-[#25292D]">
                <div className="text-[10px] text-[#9AA0A6] uppercase tracking-wider">EXECUTION DOMAIN</div>
                <div className="text-sm font-bold text-[#C8FF00] mt-1">FIRMWARE</div>
                <div className="text-[10px] text-[#9AA0A6] mt-1">Registers • ISRs • RTOS</div>
              </div>
            </div>

            <div className="p-2.5 rounded bg-[#0B0D0F] border border-[#25292D] text-[11px] text-[#9AA0A6] space-y-1">
              <div className="flex justify-between">
                <span>Core Toolset:</span>
                <span className="text-[#E8EAED]">ARM-GCC • Make • GDB • OpenOCD</span>
              </div>
              <div className="flex justify-between">
                <span>Instrumentation:</span>
                <span className="text-[#E8EAED]">Rigol DSO • 8CH Logic Analyzer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Information Blocks (NOT fake counters) */}
        <div>
          <div className="text-xs font-mono text-[#9AA0A6] tracking-wider uppercase mb-4">
            // TECHNICAL FOUNDATION HIGHLIGHTS
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {TECHNICAL_HIGHLIGHTS.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded bg-[#111417] border border-[#25292D] hover:border-[#C8FF00]/60 transition-colors group"
              >
                <div className="text-xl sm:text-2xl font-mono font-bold text-[#C8FF00] tracking-tight group-hover:translate-x-0.5 transition-transform">
                  {item.value}
                </div>
                <div className="text-xs font-mono font-semibold text-[#E8EAED] mt-1">
                  {item.label}
                </div>
                <div className="text-[11px] font-mono text-[#9AA0A6] mt-0.5">
                  {item.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
