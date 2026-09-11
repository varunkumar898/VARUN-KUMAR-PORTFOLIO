import React, { useState } from 'react';
import { PERIPHERALS } from '../data/portfolioData';
import { PeripheralNode } from '../types';
import { Activity, Radio, Cpu, Layers, Disc, Zap } from 'lucide-react';

export const HeroTechnicalVisual: React.FC = () => {
  const [selectedPeripheral, setSelectedPeripheral] = useState<PeripheralNode>(PERIPHERALS[0]); // default to UART

  // Render a simulated oscilloscope waveform for the selected peripheral
  const renderWaveform = (type: PeripheralNode['waveformType']) => {
    switch (type) {
      case 'uart':
        return (
          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="flex items-center justify-between text-[#9AA0A6] text-[10px]">
              <span>TX (115200 8N1): START [0] 0x55 [01010101] STOP [1]</span>
              <span className="text-[#C8FF00]">IDLE HIGH (3.3V)</span>
            </div>
            <svg viewBox="0 0 400 44" className="w-full h-11 bg-[#0B0D0F] border border-[#25292D] rounded">
              <line x1="0" y1="22" x2="400" y2="22" stroke="#25292D" strokeDasharray="2,2" />
              {/* UART wave: Idle 1, Start 0, D0:1, D1:0, D2:1, D3:0, D4:1, D5:0, D6:1, D7:0, Stop 1 */}
              <path
                d="M 0,8 L 30,8 L 30,36 L 65,36 L 65,8 L 100,8 L 100,36 L 135,36 L 135,8 L 170,8 L 170,36 L 205,36 L 205,8 L 240,8 L 240,36 L 275,36 L 275,8 L 310,8 L 310,36 L 345,36 L 345,8 L 400,8"
                fill="none"
                stroke="#C8FF00"
                strokeWidth="1.75"
              />
              {/* Bit markers */}
              <text x="35" y="32" fill="#9AA0A6" fontSize="8">START</text>
              <text x="75" y="20" fill="#9AA0A6" fontSize="8">0</text>
              <text x="110" y="32" fill="#9AA0A6" fontSize="8">1</text>
              <text x="145" y="20" fill="#9AA0A6" fontSize="8">0</text>
              <text x="180" y="32" fill="#9AA0A6" fontSize="8">1</text>
              <text x="215" y="20" fill="#9AA0A6" fontSize="8">0</text>
              <text x="250" y="32" fill="#9AA0A6" fontSize="8">1</text>
              <text x="285" y="20" fill="#9AA0A6" fontSize="8">0</text>
              <text x="320" y="32" fill="#9AA0A6" fontSize="8">1</text>
              <text x="355" y="20" fill="#9AA0A6" fontSize="8">STOP</text>
            </svg>
          </div>
        );
      case 'spi':
        return (
          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="flex items-center justify-between text-[#9AA0A6] text-[10px]">
              <span>SPI1 (CPOL=0, CPHA=0, 12 MHz SCK + MOSI)</span>
              <span className="text-[#C8FF00]">FULL DUPLEX</span>
            </div>
            <svg viewBox="0 0 400 44" className="w-full h-11 bg-[#0B0D0F] border border-[#25292D] rounded">
              {/* SCK line */}
              <path
                d="M 0,16 L 30,16 L 30,6 L 50,6 L 50,16 L 70,16 L 70,6 L 90,6 L 90,16 L 110,16 L 110,6 L 130,6 L 130,16 L 150,16 L 150,6 L 170,6 L 170,16 L 190,16 L 190,6 L 210,6 L 210,16 L 230,16 L 230,6 L 250,6 L 250,16 L 270,16 L 270,6 L 290,6 L 290,16 L 400,16"
                fill="none"
                stroke="#9AA0A6"
                strokeWidth="1.2"
              />
              {/* MOSI line */}
              <path
                d="M 0,38 L 30,38 L 30,26 L 90,26 L 90,38 L 150,38 L 150,26 L 210,26 L 210,38 L 270,38 L 270,26 L 330,26 L 330,38 L 400,38"
                fill="none"
                stroke="#C8FF00"
                strokeWidth="1.6"
              />
              <text x="6" y="13" fill="#9AA0A6" fontSize="7">SCK</text>
              <text x="6" y="34" fill="#C8FF00" fontSize="7">MOSI</text>
            </svg>
          </div>
        );
      case 'i2c':
        return (
          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="flex items-center justify-between text-[#9AA0A6] text-[10px]">
              <span>I2C1: START condition → 7-bit Slave Addr [0x68] → ACK</span>
              <span className="text-[#C8FF00]">100 kHz STD</span>
            </div>
            <svg viewBox="0 0 400 44" className="w-full h-11 bg-[#0B0D0F] border border-[#25292D] rounded">
              {/* SCL */}
              <path
                d="M 0,8 L 40,8 L 40,20 L 70,20 L 70,8 L 100,8 L 100,20 L 130,20 L 130,8 L 160,8 L 160,20 L 190,20 L 190,8 L 220,8 L 220,20 L 250,20 L 250,8 L 280,8 L 280,20 L 310,20 L 310,8 L 340,8 L 340,20 L 370,20 L 370,8 L 400,8"
                fill="none"
                stroke="#9AA0A6"
                strokeWidth="1.2"
              />
              {/* SDA */}
              <path
                d="M 0,30 L 25,30 L 25,40 L 80,40 L 80,30 L 140,30 L 140,40 L 230,40 L 230,30 L 290,30 L 290,40 L 350,40 L 380,40 L 380,30 L 400,30"
                fill="none"
                stroke="#C8FF00"
                strokeWidth="1.6"
              />
              <text x="5" y="15" fill="#9AA0A6" fontSize="7">SCL</text>
              <text x="5" y="37" fill="#C8FF00" fontSize="7">SDA</text>
              <text x="25" y="42" fill="#C8FF00" fontSize="7">START</text>
              <text x="325" y="42" fill="#9AA0A6" fontSize="7">ACK</text>
            </svg>
          </div>
        );
      case 'can':
        return (
          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="flex items-center justify-between text-[#9AA0A6] text-[10px]">
              <span>CAN 2.0B Differential: CANH (3.5V) & CANL (1.5V)</span>
              <span className="text-[#C8FF00]">500 kbps RECESSIVE/DOM</span>
            </div>
            <svg viewBox="0 0 400 44" className="w-full h-11 bg-[#0B0D0F] border border-[#25292D] rounded">
              {/* CANH */}
              <path
                d="M 0,22 L 40,22 L 40,10 L 110,10 L 110,22 L 160,22 L 160,10 L 240,10 L 240,22 L 310,22 L 310,10 L 360,10 L 360,22 L 400,22"
                fill="none"
                stroke="#C8FF00"
                strokeWidth="1.5"
              />
              {/* CANL */}
              <path
                d="M 0,22 L 40,22 L 40,34 L 110,34 L 110,22 L 160,22 L 160,34 L 240,34 L 240,22 L 310,22 L 310,34 L 360,34 L 360,22 L 400,22"
                fill="none"
                stroke="#9AA0A6"
                strokeWidth="1.3"
              />
              <text x="6" y="15" fill="#C8FF00" fontSize="7">CANH</text>
              <text x="6" y="39" fill="#9AA0A6" fontSize="7">CANL</text>
              <text x="50" y="8" fill="#C8FF00" fontSize="7">DOMINANT</text>
              <text x="120" y="20" fill="#9AA0A6" fontSize="7">RECESSIVE</text>
            </svg>
          </div>
        );
      case 'adc':
        return (
          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="flex items-center justify-between text-[#9AA0A6] text-[10px]">
              <span>12-BIT SAR ADC (0 - 4095 RAW) • SMPR: 71.5 CYCLES</span>
              <span className="text-[#C8FF00]">CONV: 1.15 µs</span>
            </div>
            <svg viewBox="0 0 400 44" className="w-full h-11 bg-[#0B0D0F] border border-[#25292D] rounded">
              <line x1="0" y1="22" x2="400" y2="22" stroke="#25292D" strokeDasharray="2,2" />
              <path
                d="M 0,38 Q 80,38 120,20 T 240,12 T 320,32 T 400,16"
                fill="none"
                stroke="#9AA0A6"
                strokeWidth="1.2"
                strokeDasharray="3,3"
              />
              <path
                d="M 0,38 L 40,38 L 40,32 L 80,32 L 80,24 L 120,24 L 120,18 L 160,18 L 160,12 L 200,12 L 200,14 L 240,14 L 240,24 L 280,24 L 280,32 L 320,32 L 320,26 L 360,26 L 360,18 L 400,18"
                fill="none"
                stroke="#C8FF00"
                strokeWidth="1.8"
              />
              <text x="10" y="14" fill="#9AA0A6" fontSize="7">ANALOG IN</text>
              <text x="170" y="38" fill="#C8FF00" fontSize="7">DISCRETE SAMPLES (SAR)</text>
            </svg>
          </div>
        );
      case 'pwm':
        return (
          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="flex items-center justify-between text-[#9AA0A6] text-[10px]">
              <span>TIM3_CH1 PWM (20 kHz, 65% DUTY CYCLE)</span>
              <span className="text-[#C8FF00]">ARR=2399, CCR1=1560</span>
            </div>
            <svg viewBox="0 0 400 44" className="w-full h-11 bg-[#0B0D0F] border border-[#25292D] rounded">
              <path
                d="M 0,36 L 20,36 L 20,10 L 85,10 L 85,36 L 120,36 L 120,10 L 185,10 L 185,36 L 220,36 L 220,10 L 285,10 L 285,36 L 320,36 L 320,10 L 385,10 L 385,36 L 400,36"
                fill="none"
                stroke="#C8FF00"
                strokeWidth="1.8"
              />
              <text x="30" y="24" fill="#C8FF00" fontSize="8">HIGH (65%)</text>
              <text x="90" y="32" fill="#9AA0A6" fontSize="8">LOW</text>
            </svg>
          </div>
        );
      case 'gpio':
        return (
          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="flex items-center justify-between text-[#9AA0A6] text-[10px]">
              <span>GPIOA_ODR & BSRR: ATOMIC HIGH-SPEED TOGGLE</span>
              <span className="text-[#C8FF00]">2-CYCLE LATENCY</span>
            </div>
            <svg viewBox="0 0 400 44" className="w-full h-11 bg-[#0B0D0F] border border-[#25292D] rounded">
              <path
                d="M 0,36 L 30,36 L 30,8 L 70,8 L 70,36 L 110,36 L 110,8 L 150,8 L 150,36 L 190,36 L 190,8 L 230,8 L 230,36 L 270,36 L 270,8 L 310,8 L 310,36 L 350,36 L 350,8 L 390,8 L 390,36 L 400,36"
                fill="none"
                stroke="#C8FF00"
                strokeWidth="1.8"
              />
              <text x="35" y="22" fill="#C8FF00" fontSize="8">3.3V</text>
              <text x="75" y="32" fill="#9AA0A6" fontSize="8">0.0V (GND)</text>
            </svg>
          </div>
        );
      case 'dma':
      default:
        return (
          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="flex items-center justify-between text-[#9AA0A6] text-[10px]">
              <span>DMA1 CH3: PERIPHERAL → SRAM CIRCULAR STREAM</span>
              <span className="text-[#C8FF00]">0% CPU OVERHEAD</span>
            </div>
            <svg viewBox="0 0 400 44" className="w-full h-11 bg-[#0B0D0F] border border-[#25292D] rounded">
              <path
                d="M 20,22 L 380,22"
                fill="none"
                stroke="#363C43"
                strokeWidth="2"
              />
              {/* Bursts of data packets */}
              <rect x="40" y="14" width="40" height="16" fill="#161A1F" stroke="#C8FF00" strokeWidth="1.2" rx="2" />
              <rect x="120" y="14" width="40" height="16" fill="#161A1F" stroke="#C8FF00" strokeWidth="1.2" rx="2" />
              <rect x="200" y="14" width="40" height="16" fill="#161A1F" stroke="#C8FF00" strokeWidth="1.2" rx="2" />
              <rect x="280" y="14" width="40" height="16" fill="#161A1F" stroke="#C8FF00" strokeWidth="1.2" rx="2" />
              <text x="46" y="25" fill="#C8FF00" fontSize="7">BURST 1</text>
              <text x="126" y="25" fill="#C8FF00" fontSize="7">BURST 2</text>
              <text x="206" y="25" fill="#C8FF00" fontSize="7">BURST 3</text>
              <text x="286" y="25" fill="#C8FF00" fontSize="7">BURST 4</text>
            </svg>
          </div>
        );
    }
  };

  return (
    <div id="hero-technical-visual" className="relative w-full rounded border border-[#25292D] bg-[#111417] p-4 lg:p-5 overflow-hidden shadow-2xl">
      {/* Top title bar */}
      <div className="flex items-center justify-between border-b border-[#25292D] pb-3 mb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-[#E8EAED]">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#C8FF00]"></span>
          <span className="font-semibold tracking-wider">MCU PERIPHERAL BUS MATRIX</span>
          <span className="text-[10px] text-[#9AA0A6] px-1.5 py-0.5 bg-[#161A1F] border border-[#25292D] rounded">
            LIVE SIMULATOR
          </span>
        </div>
        <div className="text-[10px] font-mono text-[#9AA0A6] flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C8FF00] animate-pulse"></span>
          <span>CLICK NODE TO INSPECT</span>
        </div>
      </div>

      {/* Interactive System Architecture Canvas */}
      <div className="relative w-full min-h-[300px] flex items-center justify-center bg-[#0B0D0F] border border-[#25292D] rounded p-4">
        {/* Subtle PCB Grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

        {/* PCB Traces (SVG overlay) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#25292D]" strokeWidth="1.5">
          {/* Top to Center: UART */}
          <line x1="50%" y1="18%" x2="50%" y2="35%" stroke="#363C43" strokeDasharray="3,3" />
          {/* Left to Center: SPI */}
          <line x1="16%" y1="50%" x2="33%" y2="50%" stroke="#363C43" strokeDasharray="3,3" />
          {/* Right to Center: CAN */}
          <line x1="67%" y1="50%" x2="84%" y2="50%" stroke="#363C43" strokeDasharray="3,3" />
          {/* Center to Bottom Left: ADC */}
          <path d="M 42% 65% L 42% 76% L 26% 76% L 26% 82%" fill="none" stroke="#363C43" strokeDasharray="3,3" />
          {/* Center to Bottom Right: GPIO */}
          <path d="M 58% 65% L 58% 76% L 74% 76% L 74% 82%" fill="none" stroke="#363C43" strokeDasharray="3,3" />
          {/* Bottom Left ADC to DMA */}
          <line x1="26%" y1="92%" x2="26%" y2="98%" stroke="#363C43" strokeDasharray="2,2" />
          {/* Top Left: I2C */}
          <path d="M 22% 22% L 36% 22% L 36% 40%" fill="none" stroke="#25292D" />
          {/* Top Right: PWM */}
          <path d="M 78% 22% L 64% 22% L 64% 40%" fill="none" stroke="#25292D" />
        </svg>

        {/* Central Component: STM32 MCU */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Peripheral TOP: UART */}
          <div className="mb-4">
            <button
              onClick={() => setSelectedPeripheral(PERIPHERALS.find((p) => p.id === 'uart')!)}
              className={`px-3 py-1 rounded text-xs font-mono tracking-wider transition-all duration-150 border ${
                selectedPeripheral.id === 'uart'
                  ? 'bg-[#C8FF00] text-[#0B0D0F] border-[#C8FF00] font-bold shadow-sm'
                  : 'bg-[#111417] text-[#E8EAED] border-[#25292D] hover:border-[#C8FF00]'
              }`}
            >
              UART (USART1)
            </button>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            {/* Peripheral LEFT: SPI & I2C */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setSelectedPeripheral(PERIPHERALS.find((p) => p.id === 'i2c')!)}
                className={`px-2.5 py-1 rounded text-xs font-mono tracking-wider transition-all duration-150 border ${
                  selectedPeripheral.id === 'i2c'
                    ? 'bg-[#C8FF00] text-[#0B0D0F] border-[#C8FF00] font-bold shadow-sm'
                    : 'bg-[#111417] text-[#E8EAED] border-[#25292D] hover:border-[#C8FF00]'
                }`}
              >
                I2C1
              </button>
              <button
                onClick={() => setSelectedPeripheral(PERIPHERALS.find((p) => p.id === 'spi')!)}
                className={`px-3 py-1 rounded text-xs font-mono tracking-wider transition-all duration-150 border ${
                  selectedPeripheral.id === 'spi'
                    ? 'bg-[#C8FF00] text-[#0B0D0F] border-[#C8FF00] font-bold shadow-sm'
                    : 'bg-[#111417] text-[#E8EAED] border-[#25292D] hover:border-[#C8FF00]'
                }`}
              >
                SPI1
              </button>
            </div>

            {/* Central STM32 MCU Core Chip */}
            <div className="relative p-4 sm:p-5 rounded-md border-2 border-[#C8FF00]/70 bg-[#161A1F] shadow-[0_0_25px_rgba(200,255,0,0.08)] text-center min-w-[170px] sm:min-w-[190px]">
              {/* Chip corner registration notch */}
              <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full border border-[#C8FF00]/50"></div>
              
              {/* Micro pins along edge */}
              <div className="flex justify-center gap-1.5 mb-2">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="w-1 h-1.5 bg-[#363C43] rounded-t-sm"></span>
                ))}
              </div>

              <div className="text-[10px] font-mono text-[#C8FF00] tracking-widest uppercase">
                ARM CORTEX-M0
              </div>
              <div className="text-sm sm:text-base font-mono font-bold text-[#E8EAED] tracking-wider my-0.5">
                STM32F030
              </div>
              <div className="text-[10px] font-mono text-[#9AA0A6]">
                48MHz • 64KB FLASH
              </div>

              {/* Status pill */}
              <div className="mt-2.5 pt-2 border-t border-[#25292D] flex items-center justify-center gap-1.5 text-[10px] font-mono text-[#C8FF00]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00] animate-ping"></span>
                <span>SILICON ACTIVE</span>
              </div>

              <div className="flex justify-center gap-1.5 mt-2">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="w-1 h-1.5 bg-[#363C43] rounded-b-sm"></span>
                ))}
              </div>
            </div>

            {/* Peripheral RIGHT: CAN & PWM */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setSelectedPeripheral(PERIPHERALS.find((p) => p.id === 'pwm')!)}
                className={`px-2.5 py-1 rounded text-xs font-mono tracking-wider transition-all duration-150 border ${
                  selectedPeripheral.id === 'pwm'
                    ? 'bg-[#C8FF00] text-[#0B0D0F] border-[#C8FF00] font-bold shadow-sm'
                    : 'bg-[#111417] text-[#E8EAED] border-[#25292D] hover:border-[#C8FF00]'
                }`}
              >
                TIM / PWM
              </button>
              <button
                onClick={() => setSelectedPeripheral(PERIPHERALS.find((p) => p.id === 'can')!)}
                className={`px-3 py-1 rounded text-xs font-mono tracking-wider transition-all duration-150 border ${
                  selectedPeripheral.id === 'can'
                    ? 'bg-[#C8FF00] text-[#0B0D0F] border-[#C8FF00] font-bold shadow-sm'
                    : 'bg-[#111417] text-[#E8EAED] border-[#25292D] hover:border-[#C8FF00]'
                }`}
              >
                CAN1
              </button>
            </div>
          </div>

          {/* Peripheral BOTTOM: ADC, GPIO, DMA */}
          <div className="mt-4 flex items-center gap-3 sm:gap-6">
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => setSelectedPeripheral(PERIPHERALS.find((p) => p.id === 'adc')!)}
                className={`px-3 py-1 rounded text-xs font-mono tracking-wider transition-all duration-150 border ${
                  selectedPeripheral.id === 'adc'
                    ? 'bg-[#C8FF00] text-[#0B0D0F] border-[#C8FF00] font-bold shadow-sm'
                    : 'bg-[#111417] text-[#E8EAED] border-[#25292D] hover:border-[#C8FF00]'
                }`}
              >
                ADC1
              </button>
              <button
                onClick={() => setSelectedPeripheral(PERIPHERALS.find((p) => p.id === 'dma')!)}
                className={`px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wider transition-all duration-150 border ${
                  selectedPeripheral.id === 'dma'
                    ? 'bg-[#C8FF00] text-[#0B0D0F] border-[#C8FF00] font-bold shadow-sm'
                    : 'bg-[#111417] text-[#9AA0A6] border-[#25292D] hover:border-[#C8FF00]'
                }`}
              >
                DMA1
              </button>
            </div>

            <button
              onClick={() => setSelectedPeripheral(PERIPHERALS.find((p) => p.id === 'gpio')!)}
              className={`px-3 py-1 rounded text-xs font-mono tracking-wider transition-all duration-150 border ${
                selectedPeripheral.id === 'gpio'
                  ? 'bg-[#C8FF00] text-[#0B0D0F] border-[#C8FF00] font-bold shadow-sm'
                  : 'bg-[#111417] text-[#E8EAED] border-[#25292D] hover:border-[#C8FF00]'
              }`}
            >
              GPIO (PORT A/B)
            </button>
          </div>
        </div>
      </div>

      {/* Selected Node Telemetry & Oscilloscope View */}
      <div className="mt-4 pt-4 border-t border-[#25292D] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-xs font-mono font-bold text-[#C8FF00] flex items-center gap-2">
              <span>{selectedPeripheral.name}</span>
              <span className="text-[10px] text-[#9AA0A6] px-1.5 py-0.5 bg-[#0B0D0F] border border-[#25292D] rounded">
                BUS: {selectedPeripheral.bus}
              </span>
            </div>
            <div className="text-[11px] text-[#9AA0A6] font-mono mt-0.5">
              Base: {selectedPeripheral.baseAddress} • Pins: {selectedPeripheral.pins}
            </div>
          </div>
          <div className="text-[11px] text-[#E8EAED] font-mono bg-[#0B0D0F] px-2.5 py-1 rounded border border-[#25292D]">
            {selectedPeripheral.type}
          </div>
        </div>

        <p className="text-xs text-[#9AA0A6] leading-relaxed">
          {selectedPeripheral.description}
        </p>

        {/* Live waveform */}
        <div className="pt-1">
          {renderWaveform(selectedPeripheral.waveformType)}
        </div>
      </div>
    </div>
  );
};
