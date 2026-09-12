import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, RefreshCw, Cpu } from 'lucide-react';

interface CommandOutput {
  cmd: string;
  desc: string;
  output: string[];
}

export const TerminalWorkflow: React.FC = () => {
  const commands: CommandOutput[] = [
    {
      cmd: 'make -j4 TARGET=stm32f030',
      desc: 'Compile register-level drivers with arm-none-eabi-gcc',
      output: [
        'arm-none-eabi-gcc -c -mcpu=cortex-m0 -mthumb -O2 -Wall -Wextra -Iinc src/stm32f030_gpio.c -o obj/stm32f030_gpio.o',
        'arm-none-eabi-gcc -c -mcpu=cortex-m0 -mthumb -O2 -Wall -Wextra -Iinc src/stm32f030_rcc.c -o obj/stm32f030_rcc.o',
        'arm-none-eabi-gcc -c -mcpu=cortex-m0 -mthumb -O2 -Wall -Wextra -Iinc src/stm32f030_spi.c -o obj/stm32f030_spi.o',
        'arm-none-eabi-gcc -c -mcpu=cortex-m0 -mthumb -O2 -Wall -Wextra -Iinc src/stm32f030_uart.c -o obj/stm32f030_uart.o',
        'arm-none-eabi-gcc -T stm32f030x8.ld obj/*.o -o build/firmware.elf -Wl,-Map=build/firmware.map',
        'arm-none-eabi-size build/firmware.elf',
        '   text    data     bss     dec     hex filename',
        '   3412      44    1024    4480    1180 build/firmware.elf',
        'BUILD SUCCESSFUL [0 errors, 0 warnings]'
      ]
    },
    {
      cmd: 'openocd -f interface/stlink.cfg -f target/stm32f0x.cfg',
      desc: 'Establish in-circuit SWD connection to ARM Cortex-M0',
      output: [
        'Open On-Chip Debugger 0.12.0',
        'Info : STLINK V2 JTAG/SWD v29 API v2 SWIM v7 VID 0483 PID 3748',
        'Info : using stlink api v2',
        'Info : Target voltage: 3.284512 V',
        'Info : [stm32f0x.cpu] Cortex-M0 r0p0 processor detected',
        'Info : [stm32f0x.cpu] target halted due to debug-request, current mode: Thread',
        'xPSR: 0x21000000 pc: 0x08000194 msp: 0x20002000',
        'Info : Listening on port 3333 for gdb connections'
      ]
    },
    {
      cmd: 'arm-none-eabi-gdb build/firmware.elf -ex "target extended-remote :3333"',
      desc: 'Attach debugger, examine registers and inspect memory',
      output: [
        'Remote debugging using :3333',
        '0x08000194 in Reset_Handler () at startup_stm32f030x8.s:62',
        '62          bl main',
        '(gdb) print/x *(GPIO_TypeDef*)0x48000000',
        '$1 = {MODER = 0x28000000, OTYPER = 0x0, OSPEEDR = 0x0, PUPDR = 0x24000000, IDR = 0x0, ODR = 0x0}',
        '(gdb) break main.c:48',
        'Breakpoint 1 at 0x8000204: file src/main.c, line 48.',
        '(gdb) continue',
        'Continuing... Breakpoint 1, main () at src/main.c:48',
        '48          SPI_Transmit(&SPI1_Handle, txBuffer, sizeof(txBuffer));'
      ]
    }
  ];

  const [selectedCmdIdx, setSelectedCmdIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeCommand = commands[selectedCmdIdx];

  const handleCopy = () => {
    navigator.clipboard.writeText([activeCommand.cmd, ...activeCommand.output].join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 bg-[#1A1F28] border-b border-[#2D3748] relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#F0F4F8]">
            <Terminal className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-bold tracking-wider uppercase">BUILD & DEBUGGING WORKFLOW CONSOLE</span>
          </div>
          <div className="text-[#A8B8C8] text-[11px]">
            Embedded toolchain execution sessions (GCC • OpenOCD • GDB)
          </div>
        </div>

        {/* Command Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-3 font-mono text-xs">
          {commands.map((c, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCmdIdx(idx)}
              className={`px-3.5 py-1.5 rounded border transition-colors ${
                selectedCmdIdx === idx
                  ? 'bg-[#0D1117] text-[#D4AF37] border-[#D4AF37] font-bold'
                  : 'bg-[#0D1117]/60 text-[#A8B8C8] border-[#2D3748] hover:border-[#1E90FF] hover:text-[#F0F4F8]'
              }`}
            >
              $ {c.cmd.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Terminal Window */}
        <div className="rounded-[4px] bg-[#0D1117] border border-[#2D3748] overflow-hidden shadow-2xl font-mono text-xs">
          {/* Title Bar */}
          <div className="p-3 bg-[#080B0E] border-b border-[#2D3748] flex items-center justify-between text-[#A8B8C8]">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2D3748]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#2D3748]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#2D3748]" />
              </div>
              <span className="text-[11px] text-[#A8B8C8] ml-2">
                arm-embedded-toolchain — bash
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[#00D9FF] hidden sm:inline">
                {activeCommand.desc}
              </span>
              <button
                onClick={handleCopy}
                className="px-2 py-0.5 rounded border border-[#2D3748] bg-[#1A1F28] hover:border-[#1E90FF] text-[#A8B8C8] hover:text-[#1E90FF] flex items-center gap-1 text-[10px] transition-colors"
                title="Copy terminal session"
              >
                {copied ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-5 space-y-2 overflow-x-auto text-[#A8B8C8] leading-relaxed">
            <div className="flex items-center gap-2 text-[#00D9FF]">
              <span className="text-[#D4AF37] font-bold">$</span>
              <span className="font-semibold">{activeCommand.cmd}</span>
            </div>
            <div className="space-y-1 text-[#F0F4F8]/80 text-[11px] sm:text-xs">
              {activeCommand.output.map((line, lIdx) => (
                <div
                  key={lIdx}
                  className={
                    line.includes('SUCCESSFUL')
                      ? 'text-[#10B981] font-bold'
                      : line.includes('error') || line.includes('fault')
                      ? 'text-[#EF4444]'
                      : line.includes('Breakpoint') || line.includes('Listening')
                      ? 'text-[#00D9FF]'
                      : 'text-[#A8B8C8]'
                  }
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
