import React, { useState } from 'react';
import { PERIPHERALS } from '../data/portfolioData';
import { PeripheralNode } from '../types';
import { Activity, Cpu, Layers } from 'lucide-react';

export const HeroTechnicalVisual: React.FC = () => {
  const [selectedPeripheral, setSelectedPeripheral] = useState<PeripheralNode>(PERIPHERALS[0]); // default UART

  // Render simulated oscilloscope waveform for the selected peripheral with Royal color palette
  const renderWaveform = (type: PeripheralNode['waveformType']) => {
    switch (type) {
      case 'uart':
        return (
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between text-[#A8B8C8] text-[11px]">
              <span>TX (115200 8N1): START [0] 0x55 [01010101] STOP [1]</span>
              <span className="text-[#00D9FF]">IDLE HIGH (3.3V)</span>
            </div>
            <svg viewBox="0 0 400 44" className="w-full h-11 bg-[#0D1117] border border-[#2D3748] rounded">
              <line x1="0" y1="22" x2="400" y2="22" stroke="#2D3748" strokeDasharray="2,2" />
              <path
                d="M 0,8 L 30,8 L 30,36 L 65,36 L 65,8 L 100,8 L 100,36 L 135,36 L 135,8 L 170,8 L 170,36 L 205,36 L 205,8 L 240,8 L 240,36 L 275,36 L 275,8 L 310,8 L 310,36 L 345,36 L 345,8 L 400,8"
                fill="none"
                stroke="#00D9FF"
                strokeWidth="1.75"
              />
              <text x="35" y="32" fill="#A8B8C8" fontSize="8">START</text>
              <text x="75" y="20" fill="#A8B8C8" fontSize="8">0</text>
              <text x="110" y="32" fill="#A8B8C8" fontSize="8">1</text>
              <text x="145" y="20" fill="#A8B8C8" fontSize="8">0</text>
              <text x="180" y="32" fill="#A8B8C8" fontSize="8">1</text>
              <text x="215" y="20" fill="#A8B8C8" fontSize="8">0</text>
              <text x="250" y="32" fill="#A8B8C8" fontSize="8">1</text>
              <text x="285" y="20" fill="#A8B8C8" fontSize="8">0</text>
              <text x="320" y="32" fill="#A8B8C8" fontSize="8">1</text>
              <text x="355" y="20" fill="#A8B8C8" fontSize="8">STOP</text>
            </svg>
          </div>
        );
      case 'spi':
        return (
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between text-[#A8B8C8] text-[11px]">
              <span>SPI1 (CPOL=0, CPHA=0, 12 MHz SCK + MOSI)</span>
              <span className="text-[#00D9FF]">FULL DUPLEX</span>
            </div>
            <svg viewBox="0 0 400 44" className="w-full h-11 bg-[#0D1117] border border-[#2D3748] rounded">
              <path
                d="M 0,16 L 30,16 L 30,6 L 50,6 L 50,16 L 70,16 L 70,6 L 90,6 L 90,16 L 110,16 L 110,6 L 130,6 L 130,16 L 150,16 L 150,6 L 170,6 L 170,16 L 190,16 L 190,6 L 210,6 L 210,16 L 230,16 L 230,6 L 250,6 L 250,16 L 270,16 L 270,6 L 290,6 L 290,16 L 400,16"
                fill="none"
                stroke="#6B7280"
                strokeWidth="1.2"
              />
              <path
                d="M 0,38 L 30,38 L 30,26 L 90,26 L 90,38 L 150,38 L 150,26 L 210,26 L 210,38 L 270,38 L 270,26 L 330,26 L 330,38 L 400,38"
                fill="none"
                stroke="#00D9FF"
                strokeWidth="1.6"
              />
              <text x="6" y="13" fill="#A8B8C8" fontSize="7">SCK</text>
              <text x="6" y="34" fill="#00D9FF" fontSize="7">MOSI</text>
            </svg>
          </div>
        );
      case 'i2c':
        return (
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between text-[#A8B8C8] text-[11px]">
              <span>I2C1: START condition → 7-bit Addr [0x68] → ACK</span>
              <span className="text-[#00D9FF]">100 kHz STD</span>
            </div>
            <svg viewBox="0 0 400 44" className="w-full h-11 bg-[#0D1117] border border-[#2D3748] rounded">
              <path
                d="M 0,8 L 40,8 L 40,20 L 70,20 L 70,8 L 100,8 L 100,20 L 130,20 L 130,8 L 160,8 L 160,20 L 190,20 L 190,8 L 220,8 L 220,20 L 250,20 L 250,8 L 280,8 L 280,20 L 310,20 L 310,8 L 340,8 L 340,20 L 370,20 L 370,8 L 400,8"
                fill="none"
                stroke="#6B7280"
                strokeWidth="1.2"
              />
              <path
                d="M 0,30 L 25,30 L 25,40 L 80,40 L 80,30 L 140,30 L 140,40 L 230,40 L 230,30 L 290,30 L 290,40 L 350,40 L 380,40 L 380,30 L 400,30"
                fill="none"
                stroke="#00D9FF"
                strokeWidth="1.6"
              />
              <text x="5" y="15" fill="#A8B8C8" fontSize="7">SCL</text>
              <text x="5" y="37" fill="#00D9FF" fontSize="7">SDA</text>
              <text x="25" y="42" fill="#00D9FF" fontSize="7">START</text>
              <text x="325" y="42" fill="#A8B8C8" fontSize="7">ACK</text>
            </svg>
          </div>
        );
      case 'can':
        return (
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between text-[#A8B8C8] text-[11px]">
              <span>CAN 2.0B (Differential CAN_H / CAN_L @ 500 kbps)</span>
              <span className="text-[#10B981]">DOMINANT / RECESSIVE</span>
            </div>
            <svg viewBox="0 0 400 44" className="w-full h-11 bg-[#0D1117] border border-[#2D3748] rounded">
              <path
                d="M 0,22 L 50,22 L 50,10 L 100,10 L 100,22 L 150,22 L 150,10 L 200,10 L 200,22 L 250,22 L 250,10 L 300,10 L 300,22 L 400,22"
                fill="none"
                stroke="#00D9FF"
                strokeWidth="1.6"
              />
              <path
                d="M 0,22 L 50,22 L 50,34 L 100,34 L 100,22 L 150,22 L 150,34 L 200,34 L 200,22 L 250,22 L 250,34 L 300,34 L 300,22 L 400,22"
                fill="none"
                stroke="#1E90FF"
                strokeWidth="1.6"
              />
              <text x="5" y="12" fill="#00D9FF" fontSize="7">CAN_H (3.5V)</text>
              <text x="5" y="42" fill="#1E90FF" fontSize="7">CAN_L (1.5V)</text>
            </svg>
          </div>
        );
      case 'gpio':
        return (
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between text-[#A8B8C8] text-[11px]">
              <span>GPIO Push-Pull Output (Rise Time &lt; 8.2 ns)</span>
              <span className="text-[#00D9FF]">HIGH SPEED</span>
            </div>
            <svg viewBox="0 0 400 44" className="w-full h-11 bg-[#0D1117] border border-[#2D3748] rounded">
              <path
                d="M 0,36 L 40,36 L 44,8 L 100,8 L 104,36 L 160,36 L 164,8 L 220,8 L 224,36 L 280,36 L 284,8 L 340,8 L 344,36 L 400,36"
                fill="none"
                stroke="#00D9FF"
                strokeWidth="1.8"
              />
              <text x="48" y="24" fill="#A8B8C8" fontSize="8">VDD: 3.3V</text>
            </svg>
          </div>
        );
      case 'pwm':
        return (
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between text-[#A8B8C8] text-[11px]">
              <span>TIM1 PWM Channel 1 (20 kHz, 40% Duty Cycle)</span>
              <span className="text-[#D4AF37]">ARR = 2400, CCR1 = 960</span>
            </div>
            <svg viewBox="0 0 400 44" className="w-full h-11 bg-[#0D1117] border border-[#2D3748] rounded">
              <path
                d="M 0,36 L 20,36 L 20,8 L 60,8 L 60,36 L 120,36 L 120,8 L 160,8 L 160,36 L 220,36 L 220,8 L 260,8 L 260,36 L 320,36 L 320,8 L 360,8 L 360,36 L 400,36"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1.8"
              />
              <text x="65" y="24" fill="#A8B8C8" fontSize="8">Ton: 20µs / T: 50µs</text>
            </svg>
          </div>
        );
      case 'adc':
        return (
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between text-[#A8B8C8] text-[11px]">
              <span>ADC 12-Bit SAR Conversion (VREF = 3.30V, 1.0 MSPS)</span>
              <span className="text-[#00D9FF]">RAW: 0x0A9F (2.19V)</span>
            </div>
            <svg viewBox="0 0 400 44" className="w-full h-11 bg-[#0D1117] border border-[#2D3748] rounded">
              <path
                d="M 0,38 Q 70,5 140,24 T 280,18 T 400,32"
                fill="none"
                stroke="#00D9FF"
                strokeWidth="1.8"
              />
              <circle cx="140" cy="24" r="3" fill="#D4AF37" />
              <text x="148" y="20" fill="#D4AF37" fontSize="8">SAMPLE POINT (239.5 CYC)</text>
            </svg>
          </div>
        );
      default:
        return (
          <div className="h-11 bg-[#0D1117] border border-[#2D3748] rounded flex items-center justify-center font-mono text-xs text-[#A8B8C8]">
            DIRECT MEMORY-MAPPED DMA STREAM
          </div>
        );
    }
  };

  return (
    <div className="rounded bg-[#1A1F28] border border-[#2D3748] p-5 sm:p-6 shadow-xl space-y-5">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#2D3748] pb-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[#F0F4F8] font-semibold tracking-wide">
            MCU SYSTEM ARCHITECTURE
          </span>
        </div>
        <div className="text-[11px] text-[#A8B8C8] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1E90FF] animate-pulse"></span>
          <span>SELECT PERIPHERAL</span>
        </div>
      </div>

      {/* MCU Center Diagram with Surrounding Peripherals */}
      <div className="relative py-2">
        {/* Visual Bus Network */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {PERIPHERALS.map((p) => {
            const isSelected = selectedPeripheral.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPeripheral(p)}
                className={`p-2.5 rounded text-left transition-all duration-150 border font-mono ${
                  isSelected
                    ? 'bg-[#0D1117] border-[#1E90FF] shadow-sm shadow-[#1E90FF]/20'
                    : 'bg-[#0D1117]/60 border-[#2D3748] hover:border-[#1E90FF]/60 hover:bg-[#0D1117]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold ${
                      isSelected ? 'text-[#00D9FF]' : 'text-[#F0F4F8]'
                    }`}
                  >
                    {p.name}
                  </span>
                  {/* 6px circle node indicator */}
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      isSelected ? 'bg-[#00D9FF]' : 'bg-[#1E90FF]'
                    }`}
                  />
                </div>
                <div className="text-[10px] text-[#A8B8C8] mt-0.5 truncate">
                  {p.bus} • {p.baseAddress.slice(0, 6)}...
                </div>
              </button>
            );
          })}
        </div>

        {/* Center STM32 MCU Package Card */}
        <div className="p-3.5 rounded bg-[#0D1117] border border-[#2D3748] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded border border-[#2D3748] bg-[#1A1F28] flex items-center justify-center text-[#D4AF37] font-mono font-bold text-xs">
              STM32
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-[#F0F4F8] flex items-center gap-2">
                <span>STM32F030 / ARM CORTEX-M0</span>
                <span className="text-[10px] text-[#D4AF37] px-1.5 py-0.2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded">
                  48 MHz
                </span>
              </div>
              <div className="text-[11px] font-mono text-[#A8B8C8]">
                AHB/APB Matrix • NVIC Priority Controller • DMA Engine
              </div>
            </div>
          </div>

          <div className="text-right font-mono text-[11px] text-[#A8B8C8] hidden sm:block">
            <div>3.3V SILICON PINOUT</div>
            <div className="text-[#00D9FF]">ACTIVE BUS TRACE</div>
          </div>
        </div>
      </div>

      {/* Selected Peripheral Telemetry Details */}
      <div className="space-y-3 pt-1 border-t border-[#2D3748]">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1E90FF]"></span>
            <span className="font-bold text-[#F0F4F8]">{selectedPeripheral.name} BUS PROBE</span>
            <span className="text-[#A8B8C8]">({selectedPeripheral.bus})</span>
          </div>
          <div className="text-[11px] text-[#D4AF37]">
            BASE: {selectedPeripheral.baseAddress}
          </div>
        </div>

        {/* Oscilloscope Waveform Display */}
        {renderWaveform(selectedPeripheral.waveformType)}

        {/* Pin Mapping and Bitfield Info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
          <div className="p-2 rounded bg-[#0D1117] border border-[#2D3748]">
            <div className="text-[9px] text-[#6B7280]">HARDWARE PINS</div>
            <div
              className="text-[#F0F4F8] font-medium truncate mt-0.5"
              title={selectedPeripheral.pins || selectedPeripheral.pinMapping || ''}
            >
              {selectedPeripheral.pins || selectedPeripheral.pinMapping || 'Direct Matrix'}
            </div>
          </div>
          <div className="p-2 rounded bg-[#0D1117] border border-[#2D3748]">
            <div className="text-[9px] text-[#6B7280]">CLOCK DOMAIN</div>
            <div
              className="text-[#F0F4F8] font-medium truncate mt-0.5"
              title={selectedPeripheral.clockSpeed || `${selectedPeripheral.bus} @ 48 MHz`}
            >
              {selectedPeripheral.clockSpeed || `${selectedPeripheral.bus} @ 48 MHz`}
            </div>
          </div>
          <div className="p-2 rounded bg-[#0D1117] border border-[#2D3748]">
            <div className="text-[9px] text-[#6B7280]">REGISTER CONFIG</div>
            <div
              className="text-[#00D9FF] font-medium truncate mt-0.5"
              title={selectedPeripheral.registerConfig || 'DIRECT MMIO'}
            >
              {selectedPeripheral.registerConfig || 'DIRECT MMIO'}
            </div>
          </div>
          <div className="p-2 rounded bg-[#0D1117] border border-[#2D3748]">
            <div className="text-[9px] text-[#6B7280]">DMA CH / IRQ</div>
            <div
              className="text-[#D4AF37] font-medium truncate mt-0.5"
              title={selectedPeripheral.dmaChannel ? `${selectedPeripheral.dmaChannel} / #${selectedPeripheral.irqNumber}` : 'DIRECT BUS'}
            >
              {selectedPeripheral.dmaChannel
                ? `${selectedPeripheral.dmaChannel} / #${selectedPeripheral.irqNumber}`
                : 'DIRECT BUS'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
