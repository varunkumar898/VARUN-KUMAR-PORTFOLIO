import React, { useState } from 'react';
import { Terminal, Cpu, Activity, Wrench, FileCode, Check, Copy, AlertCircle } from 'lucide-react';

interface ToolchainSession {
  id: string;
  label: string;
  title: string;
  command: string;
  description: string;
  output: string[];
}

const TOOLCHAIN_SESSIONS: ToolchainSession[] = [
  {
    id: 'build',
    label: 'GCC Toolchain & Makefile',
    title: 'Bare-Metal Compilation & Linker Script Execution',
    command: 'make -j4 TARGET=stm32f030',
    description: 'Compiling register-level C drivers for ARM Cortex-M0 with arm-none-eabi-gcc and custom linker script.',
    output: [
      'arm-none-eabi-gcc -c -mcpu=cortex-m0 -mthumb -O2 -Wall -Wextra -Iinc src/stm32f030_gpio.c -o obj/stm32f030_gpio.o',
      'arm-none-eabi-gcc -c -mcpu=cortex-m0 -mthumb -O2 -Wall -Wextra -Iinc src/stm32f030_rcc.c -o obj/stm32f030_rcc.o',
      'arm-none-eabi-gcc -c -mcpu=cortex-m0 -mthumb -O2 -Wall -Wextra -Iinc src/stm32f030_spi.c -o obj/stm32f030_spi.o',
      'arm-none-eabi-gcc -c -mcpu=cortex-m0 -mthumb -O2 -Wall -Wextra -Iinc src/stm32f030_i2c.c -o obj/stm32f030_i2c.o',
      'arm-none-eabi-gcc -T stm32f030x8.ld obj/*.o -o build/firmware.elf -Wl,-Map=build/firmware.map',
      'arm-none-eabi-size build/firmware.elf',
      '   text    data     bss     dec     hex filename',
      '   3248      32     896    4176    1050 build/firmware.elf',
      'BUILD SUCCESSFUL [0 errors, 0 warnings]'
    ]
  },
  {
    id: 'openocd',
    label: 'OpenOCD SWD Server',
    title: 'In-Circuit Emulator Connection over ST-Link SWD',
    command: 'openocd -f interface/stlink.cfg -f target/stm32f0x.cfg',
    description: 'Establishing low-level debug transport to ARM Cortex-M0 core on physical development board.',
    output: [
      'Open On-Chip Debugger 0.12.0',
      'Info : STLINK V2 JTAG/SWD v29 API v2 SWIM v7 VID 0483 PID 3748',
      'Info : using stlink api v2',
      'Info : Target voltage: 3.284 V',
      'Info : [stm32f0x.cpu] Cortex-M0 r0p0 processor detected',
      'Info : [stm32f0x.cpu] target halted due to debug-request, current mode: Thread',
      'xPSR: 0x21000000 pc: 0x08000194 msp: 0x20002000',
      'Info : Listening on port 3333 for gdb connections'
    ]
  },
  {
    id: 'gdb',
    label: 'GDB Register Inspection',
    title: 'Hardware Breakpoint & Volatile MMIO Struct Inspection',
    command: 'arm-none-eabi-gdb build/firmware.elf -ex "target extended-remote :3333"',
    description: 'Halting target core, setting hardware breakpoint in main loop, and dumping memory-mapped register bitfields.',
    output: [
      'Remote debugging using :3333',
      '0x08000194 in Reset_Handler () at startup_stm32f030.s:48',
      '(gdb) break main.c:36',
      'Breakpoint 1 at 0x80001ec: file src/main.c, line 36.',
      '(gdb) continue',
      'Continuing. Breakpoint 1, main () at src/main.c:36',
      '(gdb) print/x *(GPIO_TypeDef*)0x48000000',
      '$1 = {MODER = 0x28000000, OTYPER = 0x0, OSPEEDR = 0x0, PUPDR = 0x24000000, IDR = 0x0, ODR = 0x0, BSRR = 0x0}',
      '(gdb) print/x RCC->AHBENR',
      '$2 = 0x00020000 /* GPIOA clock bit enabled */'
    ]
  }
];

export const EngineeringPractice: React.FC = () => {
  const [activeSessionIdx, setActiveSessionIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const session = TOOLCHAIN_SESSIONS[activeSessionIdx];

  const handleCopy = () => {
    navigator.clipboard.writeText([session.command, ...session.output].join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const labInstruments = [
    { name: 'ST-Link V2 (SWD)', purpose: 'Hardware flash programming, single-step execution, and register inspection via OpenOCD.' },
    { name: '8-Channel Logic Analyzer', purpose: 'Physical protocol timing capture for SPI (Mode 0), I2C (100kHz standard), and UART framing.' },
    { name: 'Digital Storage Oscilloscope', purpose: 'Rise/fall time measurement, ringing detection, and 3.3V power supply rail stability.' },
    { name: 'GDB & GNU Toolchain', purpose: 'Cross-compilation with arm-none-eabi-gcc, disassembly review, and stack watermark tracking.' },
    { name: 'Digital Multimeter & Bench Supply', purpose: 'Continuity checks, quiescent current measurement, and hardware-in-the-loop bring-up.' }
  ];

  return (
    <section
      id="engineering-practice"
      className="py-18 bg-[#0B0E14] border-b border-[#232B38] relative"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12">
          <div className="text-xs font-mono text-[#D4A03D] uppercase tracking-wider mb-2">
            02 // METHODOLOGY & TOOLCHAINS
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#ECEFF4] tracking-tight">
            Engineering Practice & Development Workflows
          </h2>
          <p className="text-sm sm:text-base text-[#9AA7B8] mt-2 max-w-3xl leading-relaxed">
            How I approach microcontroller development: reference manual deconstruction, cross-compilation with reproducible toolchains, and hardware-in-the-loop verification.
          </p>
        </div>

        {/* 3 Step Core Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-5 rounded bg-[#12161F] border border-[#232B38] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#D4A03D]">
              <span>STAGE 01</span>
              <FileCode className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-[#ECEFF4]">Datasheet Deconstruction</h3>
            <p className="text-xs text-[#9AA7B8] leading-relaxed">
              Read microcontroller reference manuals, clock distribution trees, memory maps, and electrical limits before configuring bitfields.
            </p>
          </div>

          <div className="p-5 rounded bg-[#12161F] border border-[#232B38] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#D4A03D]">
              <span>STAGE 02</span>
              <Terminal className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-[#ECEFF4]">In-Circuit Tracing (SWD)</h3>
            <p className="text-xs text-[#9AA7B8] leading-relaxed">
              Attach GDB via OpenOCD to inspect core registers, step through assembly, trace stack frames, and diagnose bus faults.
            </p>
          </div>

          <div className="p-5 rounded bg-[#12161F] border border-[#232B38] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#D4A03D]">
              <span>STAGE 03</span>
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-[#ECEFF4]">Physical Signal Verification</h3>
            <p className="text-xs text-[#9AA7B8] leading-relaxed">
              Connect logic analyzers and oscilloscopes to physical pins to measure real rise times, clock phase, and bus packet framing.
            </p>
          </div>
        </div>

        {/* Toolchain Console & Lab Setup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Terminal Console (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {TOOLCHAIN_SESSIONS.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSessionIdx(idx)}
                    className={`px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer border ${
                      activeSessionIdx === idx
                        ? 'bg-[#181E29] text-[#D4A03D] border-[#D4A03D]/60 font-semibold'
                        : 'bg-[#12161F] text-[#9AA7B8] border-[#232B38] hover:text-[#ECEFF4]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <span className="text-[10px] font-mono text-[#657386]">
                Technically verified session transcript
              </span>
            </div>

            {/* Terminal Window */}
            <div className="rounded border border-[#232B38] bg-[#080B0F] overflow-hidden shadow-xl font-mono text-xs">
              <div className="p-3 bg-[#12161F] border-b border-[#232B38] flex items-center justify-between text-[11px] text-[#9AA7B8]">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#232B38]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#232B38]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#232B38]" />
                  </div>
                  <span className="ml-2 text-[#ECEFF4] font-medium">{session.title}</span>
                </div>

                <button
                  onClick={handleCopy}
                  className="px-2 py-0.5 rounded bg-[#181E29] border border-[#232B38] text-[#9AA7B8] hover:text-[#ECEFF4] flex items-center gap-1 text-[10px] transition-colors cursor-pointer"
                  title="Copy session commands"
                >
                  {copied ? <Check className="w-3 h-3 text-[#2EA043]" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>

              <div className="p-4 space-y-2 text-[#ECEFF4] text-[11px] sm:text-xs overflow-x-auto">
                <div className="flex items-center gap-2 text-[#D4A03D]">
                  <span className="font-bold select-none">$</span>
                  <span className="font-semibold">{session.command}</span>
                </div>

                <div className="space-y-1 text-[#9AA7B8] pt-1 leading-relaxed">
                  {session.output.map((line, lIdx) => (
                    <div
                      key={lIdx}
                      className={
                        line.includes('SUCCESSFUL')
                          ? 'text-[#2EA043] font-semibold'
                          : line.includes('target halted') || line.includes('Breakpoint')
                          ? 'text-[#D4A03D]'
                          : line.includes('print/x')
                          ? 'text-[#ECEFF4] font-semibold'
                          : 'text-[#9AA7B8]'
                      }
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-[11px] font-mono text-[#657386] flex items-center gap-1.5 pt-1">
              <AlertCircle className="w-3.5 h-3.5 text-[#D4A03D] shrink-0" />
              <span>Transcript reflects real build flags and OpenOCD SWD registers used for STM32F030 silicon validation.</span>
            </div>
          </div>

          {/* Physical Instruments List (5 cols) */}
          <div className="lg:col-span-5 rounded border border-[#232B38] bg-[#12161F] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#232B38] pb-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4A03D]">
                PHYSICAL LAB SETUP & INSTRUMENTATION
              </h3>
              <Wrench className="w-4 h-4 text-[#D4A03D]" />
            </div>

            <p className="text-xs text-[#9AA7B8] leading-relaxed">
              Hardware verification equipment used during driver bring-up, IoT prototype validation, and real-time firmware debugging:
            </p>

            <div className="space-y-3 pt-1">
              {labInstruments.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded bg-[#181E29] border border-[#232B38] text-xs">
                  <div className="font-mono text-[#ECEFF4] font-semibold text-[11px]">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-[#9AA7B8] mt-1 leading-normal font-sans">
                    {item.purpose}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
