import React from 'react';
import { ArrowRightLeft } from 'lucide-react';

export const About: React.FC = () => {
  const stats = [
    { top: 'B.Tech', bottom: 'ECE Degree' },
    { top: 'STM32', bottom: 'ARM Cortex-M' },
    { top: 'RISC-V', bottom: 'Architecture' },
    { top: 'FreeRTOS', bottom: 'Real-Time Sys' },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-[#0D1117] border-b border-[#2D3748] relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Centered Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-[32px] leading-[40px] font-bold text-[#F0F4F8] tracking-tight">
            ABOUT
          </h2>
          {/* 1px #2D3748 separator line with 40px width */}
          <div className="w-10 h-[1px] bg-[#2D3748] mx-auto my-3" />
          <p className="text-2xl font-semibold text-[#D4AF37] mt-2">
            Firmware meets hardware.
          </p>
        </div>

        {/* Centered Body Text: 16px line-height 28px */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-base leading-[28px] text-[#A8B8C8]">
            "I work at the boundary between firmware and hardware. My focus is low-level embedded development, 
            from register-level peripheral configuration and board bring-up to RTOS scheduling, communication 
            protocols and hardware debugging. I enjoy working close to the silicon—reading datasheets, 
            understanding timing behavior, debugging peripherals and validating firmware on real hardware."
          </p>
        </div>

        {/* Hardware <-> Firmware Boundary Bridge */}
        <div className="max-w-3xl mx-auto mb-14 p-4 rounded bg-[#1A1F28] border border-[#2D3748] font-mono text-xs">
          <div className="grid grid-cols-11 items-center gap-2 text-center">
            <div className="col-span-5 p-3 rounded bg-[#0D1117] border border-[#2D3748]">
              <div className="text-[10px] text-[#6B7280] uppercase tracking-wider">PHYSICAL DOMAIN</div>
              <div className="text-sm font-bold text-[#F0F4F8] mt-0.5">HARDWARE</div>
              <div className="text-[11px] text-[#A8B8C8] mt-0.5">Pins • Clocks • 3.3V Buses</div>
            </div>

            <div className="col-span-1 flex justify-center text-[#1E90FF]">
              <ArrowRightLeft className="w-4 h-4" />
            </div>

            <div className="col-span-5 p-3 rounded bg-[#0D1117] border border-[#2D3748]">
              <div className="text-[10px] text-[#6B7280] uppercase tracking-wider">EXECUTION DOMAIN</div>
              <div className="text-sm font-bold text-[#00D9FF] mt-0.5">FIRMWARE</div>
              <div className="text-[11px] text-[#A8B8C8] mt-0.5">Registers • ISRs • FreeRTOS</div>
            </div>
          </div>
        </div>

        {/* Stats Grid: 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded bg-[#1A1F28] border border-[#2D3748] hover:border-[#1E90FF] transition-colors duration-150 text-center flex flex-col justify-center"
            >
              <div className="font-mono text-sm uppercase text-[#D4AF37] font-semibold tracking-wider">
                {item.top}
              </div>
              <div className="text-base text-[#F0F4F8] font-medium mt-1">
                {item.bottom}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
