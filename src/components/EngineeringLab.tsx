import React from 'react';
import {
  Eye,
  Repeat,
  Activity,
  Search,
  Bug,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
} from 'lucide-react';

export const EngineeringLab: React.FC = () => {
  // Workflow items
  const workflowTop = [
    { title: 'OBSERVE', desc: 'Unusual behavior, fault states, timing violations', icon: <Eye className="w-5 h-5 text-[#D4AF37]" /> },
    { title: 'REPRODUCE', desc: 'Deterministic test case, trigger conditions, logging', icon: <Repeat className="w-5 h-5 text-[#1E90FF]" /> },
    { title: 'MEASURE', desc: 'Oscilloscope probes, logic analyzer traces, bus decode', icon: <Activity className="w-5 h-5 text-[#00D9FF]" /> },
  ];

  const workflowBottom = [
    { title: 'ISOLATE', desc: 'Hardware vs firmware boundary, register state check', icon: <Search className="w-5 h-5 text-[#1E90FF]" /> },
    { title: 'DEBUG', desc: 'GDB step-through, disassembly check, ISR timing', icon: <Bug className="w-5 h-5 text-[#D4AF37]" /> },
    { title: 'VALIDATE', desc: 'Corner-case testing, long-duration soak test, sign-off', icon: <CheckCircle2 className="w-5 h-5 text-[#10B981]" /> },
  ];

  const instrumentsList = [
    'Oscilloscope',
    'Logic Analyzer',
    'GDB Debugger',
    'OpenOCD',
    'JTAG / SWD Probes',
    'Digital Multimeter',
    'Protocol Analyzer',
    'Saleae Logic 8',
    'Rigol DS1054Z',
    'ST-Link V2',
    'CAN Bus Transceiver',
    'Serial UART Terminal',
  ];

  return (
    <section
      id="engineering-lab"
      className="py-20 bg-[#0D1117] border-b border-[#2D3748] relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[32px] leading-[40px] font-bold text-[#F0F4F8] tracking-tight">
            ENGINEERING LAB
          </h2>
          <div className="w-10 h-[1px] bg-[#2D3748] mx-auto my-3" />
          <p className="text-lg text-[#A8B8C8]">
            "How I approach hardware and firmware problems."
          </p>
        </div>

        {/* Workflow Grid (6 items: 3 top row, 3 bottom row) */}
        <div className="max-w-4xl mx-auto mb-16 space-y-6">
          {/* Top Row: OBSERVE -> REPRODUCE -> MEASURE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {workflowTop.map((item, idx) => (
              <div key={item.title} className="relative group">
                <div className="p-8 rounded-[4px] bg-[#1A1F28] border border-[#2D3748] hover:border-[#1E90FF] hover:-translate-y-1 transition-all duration-200 text-center flex flex-col items-center">
                  <div className="mb-3 p-2.5 rounded bg-[#0D1117] border border-[#2D3748]">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-bold text-[#F0F4F8] tracking-wider mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#A8B8C8] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {idx < 2 && (
                  <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-[#0D1117] border border-[#2D3748] items-center justify-center text-[#1E90FF]">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Center Connector Indicator on desktop */}
          <div className="hidden md:flex justify-end pr-14 py-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#1E90FF]">
              <span>TRANSITION TO ISOLATION</span>
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>

          {/* Bottom Row: VALIDATE <- DEBUG <- ISOLATE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {workflowBottom.slice().reverse().map((item, idx) => (
              <div key={item.title} className="relative group">
                <div className="p-8 rounded-[4px] bg-[#1A1F28] border border-[#2D3748] hover:border-[#1E90FF] hover:-translate-y-1 transition-all duration-200 text-center flex flex-col items-center">
                  <div className="mb-3 p-2.5 rounded bg-[#0D1117] border border-[#2D3748]">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-bold text-[#F0F4F8] tracking-wider mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#A8B8C8] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {idx < 2 && (
                  <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-[#0D1117] border border-[#2D3748] items-center justify-center text-[#1E90FF]">
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Debugging Instruments Section */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-[4px] bg-[#1A1F28] border border-[#2D3748]">
          <div className="flex items-center justify-between border-b border-[#2D3748] pb-4 mb-6">
            <h3 className="text-lg font-bold text-[#F0F4F8] tracking-tight">
              Debugging Instruments
            </h3>
            <span className="text-xs font-mono text-[#D4AF37]">
              PHYSICAL LAB SETUP
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {instrumentsList.map((inst, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-full bg-[#2D3748]/30 border border-[#2D3748] text-[13px] text-[#A8B8C8] hover:border-[#1E90FF] hover:text-[#F0F4F8] hover:bg-[#1E90FF]/10 transition-colors duration-150 cursor-default"
              >
                {inst}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
