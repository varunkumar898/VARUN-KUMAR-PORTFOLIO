import React, { useState } from 'react';
import { Cpu, Radio, Wrench, Search, Layers } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const coreColumns = [
    {
      id: 'hardware',
      title: 'HARDWARE & ARCHITECTURE',
      icon: <Cpu className="w-4 h-4 text-[#D4AF37]" />,
      items: [
        'STM32 (F0, F4 series)',
        'ARM Cortex-M0 / M4',
        'RISC-V RV32I / RV32E',
        'ESP32 / ESP8266',
        '8051 Microcontroller',
        'FreeRTOS Multitasking',
        'Bare-metal Embedded C',
        'Direct Register Manipulation',
      ],
    },
    {
      id: 'protocols',
      title: 'PROTOCOLS & INTERFACES',
      icon: <Radio className="w-4 h-4 text-[#1E90FF]" />,
      items: [
        'UART (115200 8N1, Ring Buffer)',
        'SPI (CPOL, CPHA, DMA Streams)',
        'I2C (100k Standard, 400k Fast)',
        'CAN 2.0B (Standard & Extended)',
        'GPIO (Push-Pull, Open-Drain)',
        'PWM (Edge/Center-Aligned Timers)',
        'ADC (12-bit SAR, DMA transfers)',
        'DMA (Direct Memory-to-Peripheral)',
      ],
    },
    {
      id: 'tools',
      title: 'TOOLS & WORKFLOW',
      icon: <Wrench className="w-4 h-4 text-[#00D9FF]" />,
      items: [
        'Keil µVision IDE',
        'STM32CubeIDE / CubeMX',
        'GDB Interactive Debugger',
        'OpenOCD In-Circuit Tracing',
        'Saleae Logic 8 Analyzer',
        'Digital Storage Oscilloscope',
        'Git / GitHub Version Control',
        'Docker Containerized Toolchain',
      ],
    },
  ];

  const filteredColumns = coreColumns.map((col) => {
    if (!searchQuery.trim()) return col;
    const q = searchQuery.toLowerCase();
    return {
      ...col,
      items: col.items.filter((item) => item.toLowerCase().includes(q)),
    };
  });

  return (
    <section
      id="skills"
      className="py-20 bg-[#0D1117] border-b border-[#2D3748] relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-[32px] leading-[40px] font-bold text-[#F0F4F8] tracking-tight">
            TECHNICAL SKILLS
          </h2>
          <div className="w-10 h-[1px] bg-[#2D3748] mx-auto my-3" />
          <p className="text-lg text-[#A8B8C8]">
            "Tools and technologies I use daily."
          </p>
        </div>

        {/* Search Input for Quick Verification */}
        <div className="max-w-md mx-auto mb-12 relative">
          <div className="relative">
            <Search className="w-4 h-4 text-[#A8B8C8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies, registers, protocols..."
              className="w-full pl-10 pr-4 py-2.5 rounded-[4px] bg-[#1A1F28] border border-[#2D3748] text-[#F0F4F8] placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#1E90FF] focus:ring-1 focus:ring-[#1E90FF] transition-colors"
            />
          </div>
        </div>

        {/* 3-Column Skills Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredColumns.map((col) => (
            <div
              key={col.id}
              className="p-8 rounded-[4px] bg-[#1A1F28] border border-[#2D3748] hover:border-[#1E90FF] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Column Header: 14px, gold #D4AF37, monospace, uppercase, letter-spacing 1px */}
                <div className="flex items-center justify-between border-b border-[#2D3748] pb-4 mb-6">
                  <h3 className="font-mono text-sm uppercase tracking-[1px] text-[#D4AF37] font-semibold">
                    {col.title}
                  </h3>
                  <div className="p-1.5 rounded bg-[#0D1117] border border-[#2D3748]">
                    {col.icon}
                  </div>
                </div>

                {/* Items: 15px, primary text #F0F4F8, line-height 28px */}
                <ul className="space-y-2">
                  {col.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-[15px] leading-[28px] text-[#F0F4F8]"
                    >
                      {/* Bullet: Small dot, color #1E90FF */}
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E90FF] mt-3 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                  {col.items.length === 0 && (
                    <li className="text-xs text-[#6B7280] italic py-2">
                      No matching skills found in this domain.
                    </li>
                  )}
                </ul>
              </div>

              {/* Bottom Domain Tag */}
              <div className="mt-8 pt-4 border-t border-[#2D3748] flex items-center justify-between text-xs font-mono text-[#A8B8C8]">
                <span>PRACTICAL EXPERTISE</span>
                <span className="text-[#00D9FF]">EMPIRICAL</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
