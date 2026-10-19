import React from 'react';
import { Cpu, Terminal, Activity, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const About: React.FC = () => {
  const { profile } = usePortfolio();

  return (
    <section
      id="about"
      className="py-18 bg-[#12161F] border-b border-[#232B38] relative"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12">
          <div className="text-xs font-mono text-[#D4A03D] uppercase tracking-wider mb-2">
            01 // BACKGROUND & FOCUS
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#ECEFF4] tracking-tight">
            Understanding software at the hardware boundary.
          </h2>
        </div>

        {/* Editorial Narrative & Engineering Bridge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Narrative text (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-[#9AA7B8] leading-relaxed">
            <p>
              I am an embedded software and firmware engineer completing my <span className="text-[#ECEFF4] font-medium">B.Tech in Electronics and Computer Engineering</span> at Vels University, Chennai. My interest lies in what happens between the compiler output and physical copper traces on a circuit board.
            </p>
            <p>
              Rather than treating microcontrollers as black boxes wrapped in thousands of lines of vendor HAL code, I prefer reading datasheet register maps, timing diagrams, and electrical characteristics. Writing bare-metal peripheral drivers for the <span className="text-[#ECEFF4] font-mono text-xs sm:text-sm">STM32F030</span> directly from reference manual RM0360 gave me deep intuition for clock distribution trees, memory-mapped I/O, and atomic register modification.
            </p>
            <p>
              In real-time systems, I use <span className="text-[#ECEFF4] font-medium">FreeRTOS</span> to partition concurrent responsibilities—such as sensor telemetry polling, RFID protocol decoding, and actuator safety interlocks—into deterministic tasks connected by thread-safe queues and semaphores. I test and validate firmware using real instruments: in-circuit debugging with OpenOCD and GDB over SWD, and signal inspection using logic analyzers and oscilloscopes.
            </p>
          </div>

          {/* Practical Engineering Layers (5 cols) */}
          <div className="lg:col-span-5 rounded border border-[#232B38] bg-[#0B0E14] p-5 space-y-4 font-mono text-xs">
            <div className="text-xs text-[#D4A03D] font-bold uppercase tracking-wide border-b border-[#232B38] pb-2">
              HOW FIRMWARE MEETS SILICON
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded bg-[#181E29] border border-[#232B38]">
                <div className="flex items-center justify-between text-[#ECEFF4] font-semibold text-xs mb-1">
                  <span>01. Physical Hardware</span>
                  <span className="text-[#657386] text-[10px]">SILICON & PINS</span>
                </div>
                <p className="text-[11px] text-[#9AA7B8] leading-normal font-sans">
                  STM32 & ESP32 silicon packages, 3.3V logic levels, pull-up/pull-down networks, and PCB signal traces.
                </p>
              </div>

              <div className="flex justify-center text-[#D4A03D]">
                <ArrowRight className="w-4 h-4 rotate-90" />
              </div>

              <div className="p-3 rounded bg-[#181E29] border border-[#232B38]">
                <div className="flex items-center justify-between text-[#ECEFF4] font-semibold text-xs mb-1">
                  <span>02. Peripheral Registers</span>
                  <span className="text-[#657386] text-[10px]">MMIO BITFIELDS</span>
                </div>
                <p className="text-[11px] text-[#9AA7B8] leading-normal font-sans">
                  Memory-mapped peripheral registers, clock gating (RCC), atomic bit setting (BSRR), and vector table routing (NVIC/EXTI).
                </p>
              </div>

              <div className="flex justify-center text-[#D4A03D]">
                <ArrowRight className="w-4 h-4 rotate-90" />
              </div>

              <div className="p-3 rounded bg-[#181E29] border border-[#232B38]">
                <div className="flex items-center justify-between text-[#ECEFF4] font-semibold text-xs mb-1">
                  <span>03. Firmware & RTOS</span>
                  <span className="text-[#657386] text-[10px]">C/C++ & SCHEDULING</span>
                </div>
                <p className="text-[11px] text-[#9AA7B8] leading-normal font-sans">
                  Deterministic task priorities, non-blocking ISR queue dispatch, mutex protection, and hardware-in-the-loop validation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
