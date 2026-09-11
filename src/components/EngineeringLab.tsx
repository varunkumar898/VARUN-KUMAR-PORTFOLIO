import React, { useState } from 'react';
import { LAB_WORKFLOW_STEPS, DEBUGGING_FLOWCHART, LAB_INSTRUMENTS } from '../data/portfolioData';
import { Activity, Cpu, Sliders, Play, Pause, RefreshCw, Terminal, Layers, Search, CheckCircle2 } from 'lucide-react';

export const EngineeringLab: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<'uart' | 'spi' | 'i2c' | 'pwm'>('uart');
  const [isRunning, setIsRunning] = useState(true);
  const [pwmDuty, setPwmDuty] = useState(65);
  const [activeStepId, setActiveStepId] = useState<string>('1');

  // Interactive register map inspector state
  const [selectedRegister, setSelectedRegister] = useState<'RCC_CR' | 'GPIOA_MODER' | 'USART1_CR1'>('GPIOA_MODER');

  const getRegisterData = () => {
    switch (selectedRegister) {
      case 'RCC_CR':
        return {
          address: '0x40021000',
          resetValue: '0x000000XX',
          description: 'Clock Control Register - manages HSI, HSE oscillators, and PLL enable flags.',
          bitfields: [
            { bits: '31:26', name: 'Reserved', value: '0b000000', desc: 'Reserved, must be kept at reset value' },
            { bits: '25', name: 'PLLRDY', value: '1', desc: 'PLL clock ready flag (hardware locked)' },
            { bits: '24', name: 'PLLON', value: '1', desc: 'PLL enable bit' },
            { bits: '19', name: 'CSSON', value: '0', desc: 'Clock security system enable' },
            { bits: '18', name: 'HSEBYP', value: '0', desc: 'HSE crystal oscillator bypass' },
            { bits: '17', name: 'HSERDY', value: '1', desc: 'HSE oscillator ready flag' },
            { bits: '16', name: 'HSEON', value: '1', desc: 'HSE oscillator enable (8MHz crystal)' },
            { bits: '1:0', name: 'HSION', value: '1', desc: 'Internal 8MHz RC oscillator enable' }
          ]
        };
      case 'USART1_CR1':
        return {
          address: '0x40013800',
          resetValue: '0x00000000',
          description: 'USART Control Register 1 - word length, parity selection, TX/RX enable and interrupts.',
          bitfields: [
            { bits: '28', name: 'M1', value: '0', desc: 'Word length bit 1 (8-bit data mode)' },
            { bits: '12', name: 'M0', value: '0', desc: 'Word length bit 0 (8-bit data mode)' },
            { bits: '10', name: 'PCE', value: '0', desc: 'Parity control enable (No parity)' },
            { bits: '7', name: 'TXEIE', value: '1', desc: 'TXE interrupt enable (Transmit buffer empty)' },
            { bits: '5', name: 'RXNEIE', value: '1', desc: 'RXNE interrupt enable (Received data ready)' },
            { bits: '3', name: 'TE', value: '1', desc: 'Transmitter enable' },
            { bits: '2', name: 'RE', value: '1', desc: 'Receiver enable' },
            { bits: '0', name: 'UE', value: '1', desc: 'USART enable (Silicon active)' }
          ]
        };
      case 'GPIOA_MODER':
      default:
        return {
          address: '0x48000000',
          resetValue: '0x28000000',
          description: 'GPIO Port A Mode Register - sets pin I/O direction (Input, Output, Alternate Function, Analog).',
          bitfields: [
            { bits: '31:20', name: 'MODER[15:10]', value: '0x000', desc: 'PA15..PA10 default input / JTAG' },
            { bits: '19:18', name: 'MODER9', value: '0b10', desc: 'PA9 Alternate Function mode (USART1_TX)' },
            { bits: '17:16', name: 'MODER8', value: '0b00', desc: 'PA8 Input mode (Floating sensor in)' },
            { bits: '15:14', name: 'MODER7', value: '0b10', desc: 'PA7 Alternate Function mode (SPI1_MOSI)' },
            { bits: '13:12', name: 'MODER6', value: '0b10', desc: 'PA6 Alternate Function mode (SPI1_MISO)' },
            { bits: '11:10', name: 'MODER5', value: '0b10', desc: 'PA5 Alternate Function mode (SPI1_SCK)' },
            { bits: '9:8', name: 'MODER4', value: '0b01', desc: 'PA4 General purpose output mode (LED / CS)' },
            { bits: '1:0', name: 'MODER0', value: '0b11', desc: 'PA0 Analog mode (ADC1_IN0)' }
          ]
        };
    }
  };

  const regInfo = getRegisterData();

  return (
    <section id="engineering-lab" className="py-20 bg-[#0B0D0F] border-b border-[#25292D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#25292D] pb-5 gap-4">
          <div>
            <div className="text-xs font-mono text-[#C8FF00] tracking-widest uppercase mb-1">
              // SECTION 04
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-[#E8EAED] tracking-tight uppercase">
              ENGINEERING LAB
            </h2>
            <div className="text-sm font-mono text-[#9AA0A6] mt-1">
              "How I approach hardware and firmware problems."
            </div>
          </div>
          <div className="text-xs font-mono text-[#9AA0A6] bg-[#111417] px-3 py-1.5 rounded border border-[#25292D] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00]"></span>
            <span>HARDWARE BENCH & TIMING TRACE</span>
          </div>
        </div>

        {/* 1. Systematic Engineering Workflow (6 stages) */}
        <div className="mb-14">
          <div className="text-xs font-mono text-[#C8FF00] uppercase tracking-wider mb-3">
            // PROBLEM ISOLATION METHODOLOGY
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {LAB_WORKFLOW_STEPS.map((wf) => (
              <div
                key={wf.step}
                className="p-4 rounded bg-[#111417] border border-[#25292D] hover:border-[#C8FF00]/50 transition-colors"
              >
                <div className="text-[10px] font-mono text-[#C8FF00] font-bold">
                  STEP {wf.step}
                </div>
                <div className="text-sm font-mono font-bold text-[#E8EAED] mt-1 mb-1.5">
                  {wf.title}
                </div>
                <p className="text-xs text-[#9AA0A6] leading-relaxed">
                  {wf.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Interactive Digital Storage Oscilloscope & Logic Analyzer */}
        <div className="mb-14 rounded bg-[#111417] border border-[#25292D] p-5 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#25292D] pb-4 font-mono">
            <div className="flex items-center gap-2.5">
              <Activity className="w-5 h-5 text-[#C8FF00]" />
              <div>
                <div className="text-sm font-bold text-[#E8EAED]">
                  VIRTUAL LOGIC ANALYZER / OSCILLOSCOPE TRACE
                </div>
                <div className="text-[11px] text-[#9AA0A6]">
                  Simulated 24 MSa/s Protocol Capture • Hardware Slew & Timing
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-3 py-1.5 rounded flex items-center gap-1.5 font-bold transition-colors ${
                  isRunning
                    ? 'bg-[#161A1F] text-[#C8FF00] border border-[#C8FF00]/40'
                    : 'bg-[#C8FF00] text-[#0B0D0F]'
                }`}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isRunning ? 'FREEZE TRACE' : 'RUN CAPTURE'}</span>
              </button>

              <button
                onClick={() => {
                  setSelectedChannel('uart');
                  setIsRunning(true);
                }}
                className="p-1.5 rounded bg-[#161A1F] border border-[#25292D] text-[#9AA0A6] hover:text-[#E8EAED]"
                title="Reset Channel"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Channel Selector Pills */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            <button
              onClick={() => setSelectedChannel('uart')}
              className={`px-3 py-1.5 rounded border transition-colors ${
                selectedChannel === 'uart'
                  ? 'bg-[#C8FF00] text-[#0B0D0F] border-[#C8FF00] font-bold'
                  : 'bg-[#0B0D0F] text-[#9AA0A6] border-[#25292D] hover:text-[#E8EAED]'
              }`}
            >
              CH 1: UART TX (115200 8N1)
            </button>
            <button
              onClick={() => setSelectedChannel('spi')}
              className={`px-3 py-1.5 rounded border transition-colors ${
                selectedChannel === 'spi'
                  ? 'bg-[#C8FF00] text-[#0B0D0F] border-[#C8FF00] font-bold'
                  : 'bg-[#0B0D0F] text-[#9AA0A6] border-[#25292D] hover:text-[#E8EAED]'
              }`}
            >
              CH 2: SPI SCK + MOSI (12MHz)
            </button>
            <button
              onClick={() => setSelectedChannel('i2c')}
              className={`px-3 py-1.5 rounded border transition-colors ${
                selectedChannel === 'i2c'
                  ? 'bg-[#C8FF00] text-[#0B0D0F] border-[#C8FF00] font-bold'
                  : 'bg-[#0B0D0F] text-[#9AA0A6] border-[#25292D] hover:text-[#E8EAED]'
              }`}
            >
              CH 3: I2C SCL + SDA (START/ACK)
            </button>
            <button
              onClick={() => setSelectedChannel('pwm')}
              className={`px-3 py-1.5 rounded border transition-colors ${
                selectedChannel === 'pwm'
                  ? 'bg-[#C8FF00] text-[#0B0D0F] border-[#C8FF00] font-bold'
                  : 'bg-[#0B0D0F] text-[#9AA0A6] border-[#25292D] hover:text-[#E8EAED]'
              }`}
            >
              CH 4: TIM3 PWM OUTPUT ({pwmDuty}%)
            </button>
          </div>

          {/* Oscilloscope Screen */}
          <div className="rounded bg-[#0B0D0F] border border-[#25292D] p-4 relative overflow-hidden font-mono text-xs">
            <div className="flex items-center justify-between text-[#9AA0A6] text-[10px] mb-2 border-b border-[#25292D] pb-1">
              <span>TIMEBASE: 10 µs / DIV • CH1: 1.00V / DIV • TRIGGER: AUTO (EDGE RISING)</span>
              <span className="text-[#C8FF00] flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full bg-[#C8FF00] ${isRunning ? 'animate-pulse' : ''}`}></span>
                {isRunning ? 'LIVE SAMPLING' : 'STOPPED / HOLD'}
              </span>
            </div>

            {/* Waveform Canvas */}
            <div className="w-full h-36 bg-[#070809] border border-[#25292D] rounded relative flex items-center justify-center p-2">
              {/* Grid lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#1A1E22]" strokeWidth="0.8">
                <line x1="20%" y1="0" x2="20%" y2="100%" />
                <line x1="40%" y1="0" x2="40%" y2="100%" />
                <line x1="60%" y1="0" x2="60%" y2="100%" />
                <line x1="80%" y1="0" x2="80%" y2="100%" />
                <line x1="0" y1="25%" x2="100%" y2="25%" strokeDasharray="2,2" />
                <line x1="0" y1="50%" x2="100%" y2="50%" strokeDasharray="3,3" />
                <line x1="0" y1="75%" x2="100%" y2="75%" strokeDasharray="2,2" />
              </svg>

              {/* Channel SVG Waveform Rendering */}
              {selectedChannel === 'uart' && (
                <svg viewBox="0 0 600 100" className="w-full h-full relative z-10">
                  <path
                    d="M 0,25 L 50,25 L 50,85 L 110,85 L 110,25 L 170,25 L 170,85 L 230,85 L 230,25 L 290,25 L 290,85 L 350,85 L 350,25 L 410,25 L 410,85 L 470,85 L 470,25 L 600,25"
                    fill="none"
                    stroke="#C8FF00"
                    strokeWidth="2.5"
                  />
                  <text x="55" y="78" fill="#9AA0A6" fontSize="10">START</text>
                  <text x="125" y="42" fill="#E8EAED" fontSize="10">0x55 (D0=1)</text>
                  <text x="245" y="42" fill="#E8EAED" fontSize="10">D2=1</text>
                  <text x="365" y="42" fill="#E8EAED" fontSize="10">D4=1</text>
                  <text x="480" y="42" fill="#C8FF00" fontSize="10">STOP BIT</text>
                </svg>
              )}

              {selectedChannel === 'spi' && (
                <svg viewBox="0 0 600 100" className="w-full h-full relative z-10">
                  {/* SCK */}
                  <path
                    d="M 0,35 L 40,35 L 40,15 L 70,15 L 70,35 L 100,35 L 100,15 L 130,15 L 130,35 L 160,35 L 160,15 L 190,15 L 190,35 L 220,35 L 220,15 L 250,15 L 250,35 L 280,35 L 280,15 L 310,15 L 310,35 L 340,35 L 340,15 L 370,15 L 370,35 L 400,35 L 400,15 L 430,15 L 430,35 L 600,35"
                    fill="none"
                    stroke="#9AA0A6"
                    strokeWidth="1.8"
                  />
                  {/* MOSI */}
                  <path
                    d="M 0,85 L 40,85 L 40,60 L 130,60 L 130,85 L 220,85 L 220,60 L 310,60 L 310,85 L 400,85 L 400,60 L 600,60"
                    fill="none"
                    stroke="#C8FF00"
                    strokeWidth="2.4"
                  />
                  <text x="10" y="24" fill="#9AA0A6" fontSize="10">CH1: SCK (12 MHz)</text>
                  <text x="10" y="75" fill="#C8FF00" fontSize="10">CH2: MOSI [0xAA]</text>
                </svg>
              )}

              {selectedChannel === 'i2c' && (
                <svg viewBox="0 0 600 100" className="w-full h-full relative z-10">
                  {/* SCL */}
                  <path
                    d="M 0,20 L 50,20 L 50,45 L 90,45 L 90,20 L 130,20 L 130,45 L 170,45 L 170,20 L 210,20 L 210,45 L 250,45 L 250,20 L 290,20 L 290,45 L 330,45 L 330,20 L 370,20 L 370,45 L 410,45 L 410,20 L 450,20 L 450,45 L 490,45 L 490,20 L 600,20"
                    fill="none"
                    stroke="#9AA0A6"
                    strokeWidth="1.8"
                  />
                  {/* SDA */}
                  <path
                    d="M 0,65 L 35,65 L 35,90 L 110,90 L 110,65 L 190,65 L 190,90 L 310,90 L 310,65 L 430,65 L 470,90 L 510,90 L 510,65 L 600,65"
                    fill="none"
                    stroke="#C8FF00"
                    strokeWidth="2.4"
                  />
                  <text x="38" y="94" fill="#C8FF00" fontSize="9">START</text>
                  <text x="140" y="80" fill="#E8EAED" fontSize="9">ADDR 0x68 (MPU6050)</text>
                  <text x="475" y="94" fill="#9AA0A6" fontSize="9">SLAVE ACK</text>
                </svg>
              )}

              {selectedChannel === 'pwm' && (
                <svg viewBox="0 0 600 100" className="w-full h-full relative z-10">
                  <path
                    d={`M 0,80 L 30,80 L 30,20 L ${30 + pwmDuty * 1.5},20 L ${30 + pwmDuty * 1.5},80 L 180,80 L 180,20 L ${180 + pwmDuty * 1.5},20 L ${180 + pwmDuty * 1.5},80 L 330,80 L 330,20 L ${330 + pwmDuty * 1.5},20 L ${330 + pwmDuty * 1.5},80 L 480,80 L 480,20 L ${480 + pwmDuty * 1.5},20 L ${480 + pwmDuty * 1.5},80 L 600,80`}
                    fill="none"
                    stroke="#C8FF00"
                    strokeWidth="2.5"
                  />
                  <text x="45" y="45" fill="#C8FF00" fontSize="10">DUTY: {pwmDuty}% (HIGH)</text>
                  <text x="210" y="70" fill="#9AA0A6" fontSize="10">LOW</text>
                </svg>
              )}
            </div>

            {/* Channel-specific Interactive Controls (e.g. PWM duty slider) */}
            {selectedChannel === 'pwm' && (
              <div className="mt-3 flex items-center justify-between gap-4 p-2 bg-[#111417] rounded border border-[#25292D]">
                <span className="text-xs text-[#E8EAED]">ADJUST TIM3_CCR1 DUTY CYCLE:</span>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={pwmDuty}
                    onChange={(e) => setPwmDuty(Number(e.target.value))}
                    className="accent-[#C8FF00] cursor-pointer"
                  />
                  <span className="text-xs font-bold text-[#C8FF00] w-10">{pwmDuty}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. Debugging Flowchart */}
        <div className="mb-14">
          <div className="text-xs font-mono text-[#C8FF00] uppercase tracking-wider mb-3">
            // HARDWARE-SOFTWARE DEBUGGING SEQUENCE
          </div>

          <div className="p-5 rounded bg-[#111417] border border-[#25292D]">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 font-mono text-center">
              {DEBUGGING_FLOWCHART.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveStepId(item.id)}
                  className={`p-2.5 rounded border transition-all duration-150 flex flex-col items-center justify-between text-left ${
                    activeStepId === item.id
                      ? 'bg-[#C8FF00] text-[#0B0D0F] border-[#C8FF00] font-bold shadow-md'
                      : 'bg-[#0B0D0F] text-[#9AA0A6] border-[#25292D] hover:border-[#C8FF00]/50'
                  }`}
                >
                  <span className="text-[10px] opacity-75">0{idx + 1}</span>
                  <span className="text-[11px] leading-tight mt-1 mb-1 font-semibold">{item.label}</span>
                  <span className="text-[9px] opacity-60">PHASE</span>
                </button>
              ))}
            </div>

            {/* Active Flowchart Diagnostic Context */}
            <div className="mt-4 p-3.5 rounded bg-[#0B0D0F] border border-[#25292D] text-xs font-mono text-[#9AA0A6] flex items-center justify-between">
              <div>
                <span className="text-[#C8FF00] font-bold">CURRENT FOCUS: </span>
                <span className="text-[#E8EAED]">
                  {DEBUGGING_FLOWCHART.find((d) => d.id === activeStepId)?.label}
                </span>
                <span className="text-[#9AA0A6] ml-2">
                  — Eliminating signal race conditions and register misconfigurations.
                </span>
              </div>
              <div className="text-[11px] text-[#C8FF00] shrink-0">SILICON LEVEL</div>
            </div>
          </div>
        </div>

        {/* 4. Interactive STM32 Register Bitfield Inspector */}
        <div className="mb-14 rounded bg-[#111417] border border-[#25292D] p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#25292D] pb-3 font-mono">
            <div>
              <div className="text-xs font-bold text-[#E8EAED] flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#C8FF00]" />
                <span>STM32 PERIPHERAL REGISTER MAP INSPECTOR</span>
              </div>
              <div className="text-[11px] text-[#9AA0A6]">
                Direct Memory-Mapped I/O Bitfield Inspector (RM0360 Reference Manual)
              </div>
            </div>

            <div className="flex gap-2 text-xs">
              {(['GPIOA_MODER', 'RCC_CR', 'USART1_CR1'] as const).map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegister(reg)}
                  className={`px-2.5 py-1 rounded border transition-colors ${
                    selectedRegister === reg
                      ? 'bg-[#C8FF00] text-[#0B0D0F] border-[#C8FF00] font-bold'
                      : 'bg-[#0B0D0F] text-[#9AA0A6] border-[#25292D] hover:text-[#E8EAED]'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          <div className="font-mono text-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between bg-[#0B0D0F] p-3 rounded border border-[#25292D]">
              <div>
                <span className="text-[#9AA0A6]">REGISTER: </span>
                <span className="text-[#C8FF00] font-bold">{selectedRegister}</span>
                <span className="text-[#9AA0A6] ml-3">BASE ADDRESS: </span>
                <span className="text-[#E8EAED]">{regInfo.address}</span>
              </div>
              <div className="text-[#9AA0A6] text-[11px]">
                RESET: {regInfo.resetValue}
              </div>
            </div>

            <p className="text-xs text-[#9AA0A6] font-sans">
              {regInfo.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {regInfo.bitfields.map((field, idx) => (
                <div key={idx} className="p-2.5 rounded bg-[#0B0D0F] border border-[#25292D]">
                  <div className="flex items-center justify-between text-[11px] border-b border-[#25292D] pb-1 mb-1">
                    <span className="text-[#C8FF00] font-bold">{field.name}</span>
                    <span className="text-[#9AA0A6]">[{field.bits}]</span>
                  </div>
                  <div className="text-[11px] text-[#E8EAED] font-mono">
                    VAL: <span className="text-[#C8FF00]">{field.value}</span>
                  </div>
                  <div className="text-[10px] text-[#9AA0A6] font-sans mt-0.5 leading-tight">
                    {field.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Physical Instrumentation Workbench */}
        <div>
          <div className="text-xs font-mono text-[#C8FF00] uppercase tracking-wider mb-3">
            // PHYSICAL LABORATORY INSTRUMENTATION
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
            {LAB_INSTRUMENTS.map((inst, idx) => (
              <div key={idx} className="p-4 rounded bg-[#111417] border border-[#25292D] hover:border-[#C8FF00]/50 transition-colors">
                <div className="text-xs font-bold text-[#E8EAED] flex items-center justify-between mb-1.5">
                  <span>{inst.name}</span>
                  <span className="text-[10px] text-[#C8FF00]">BENCH</span>
                </div>
                <p className="text-xs text-[#9AA0A6] font-sans leading-relaxed">
                  {inst.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
