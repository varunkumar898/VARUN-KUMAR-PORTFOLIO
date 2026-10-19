import React, { useState } from 'react';
import { Cpu, Terminal, FileCode2, Layers, Check } from 'lucide-react';

interface PeripheralSpec {
  id: string;
  name: string;
  bus: string;
  baseAddress: string;
  registers: string;
  codeSnippet: string;
  notes: string;
}

const PERIPHERAL_SPECS: PeripheralSpec[] = [
  {
    id: 'gpio',
    name: 'GPIO / Port A',
    bus: 'AHB (48 MHz)',
    baseAddress: '0x48000000',
    registers: 'MODER (0x00), OTYPER (0x04), OSPEEDR (0x08), BSRR (0x18)',
    codeSnippet: `/* Atomic pin write using BSRR - no read-modify-write race */
void GPIO_WritePin(GPIO_TypeDef *pGPIOx, uint8_t pin, uint8_t val) {
    if (val == GPIO_PIN_SET) {
        pGPIOx->BSRR = (1 << pin);        /* Set bit [15:0] */
    } else {
        pGPIOx->BSRR = (1 << (pin + 16)); /* Reset bit [31:16] */
    }
}`,
    notes: 'Eliminates RMW hazards in high-frequency interrupt service routines. 2 CPU cycle execution.'
  },
  {
    id: 'uart',
    name: 'USART1 Serial',
    bus: 'APB2 (48 MHz)',
    baseAddress: '0x40013800',
    registers: 'CR1 (0x00), BRR (0x0C), ISR (0x1C), RDR (0x24), TDR (0x28)',
    codeSnippet: `/* Configure 115200 baud on APB2 @ 48 MHz (Divisor = 0x01A1) */
USART1->BRR = 0x01A1;
USART1->CR1 |= (USART_CR1_TE | USART_CR1_RE | USART_CR1_RXNEIE);
USART1->CR1 |= USART_CR1_UE; /* Enable Peripheral */`,
    notes: 'Non-blocking RXNE interrupt pushes raw byte into FreeRTOS queue for RFID decoding.'
  },
  {
    id: 'spi',
    name: 'SPI1 Master',
    bus: 'APB2 (48 MHz)',
    baseAddress: '0x40013000',
    registers: 'CR1 (0x00), CR2 (0x04), SR (0x08), DR (0x0C)',
    codeSnippet: `/* Full-duplex master: 12 MHz SCK (BR[2:0]=001, CPOL=0, CPHA=0) */
SPI1->CR1 = (1 << SPI_CR1_MSTR_Pos) | (1 << SPI_CR1_BR_Pos);
SPI1->CR2 = (7 << SPI_CR2_DS_Pos)   | (1 << SPI_CR2_FRXTH_Pos); /* 8-bit */
SPI1->CR1 |= (1 << SPI_CR1_SPE_Pos); /* Enable SPI */`,
    notes: 'Clock edge timing and frame alignment verified using 8-channel logic analyzer.'
  },
  {
    id: 'i2c',
    name: 'I2C1 Bus',
    bus: 'APB1 (48 MHz)',
    baseAddress: '0x40005400',
    registers: 'CR1 (0x00), CR2 (0x04), TIMINGR (0x10), ISR (0x18), RXDR (0x24)',
    codeSnippet: `/* 100 kHz Standard Mode TIMINGR calculation from RM0360 */
/* PRESC=0xB, SCLDEL=0x4, SDADEL=0x2, SCLH=0x0F, SCLL=0x13 */
I2C1->TIMINGR = 0x00B01A4B;
I2C1->CR1 |= I2C_CR1_PE; /* Peripheral Enable */`,
    notes: 'Derived directly from clock equations. Open-drain pins PB6/PB7 with external 4.7k pull-ups.'
  }
];

export const HeroTechnicalVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('gpio');
  const [copied, setCopied] = useState<boolean>(false);

  const activeSpec = PERIPHERAL_SPECS.find((s) => s.id === activeTab) || PERIPHERAL_SPECS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSpec.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded border border-[#232B38] bg-[#12161F] overflow-hidden shadow-xl">
      {/* Visual Title Bar */}
      <div className="p-3.5 bg-[#181E29] border-b border-[#232B38] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-mono">
          <Cpu className="w-3.5 h-3.5 text-[#D4A03D]" />
          <span className="font-semibold text-[#ECEFF4]">STM32F030x4 REGISTER ARCHITECTURE</span>
        </div>
        <div className="text-[11px] font-mono text-[#657386]">
          RM0360 • Cortex-M0 @ 48 MHz
        </div>
      </div>

      {/* Peripheral Tabs */}
      <div className="flex border-b border-[#232B38] bg-[#0B0E14] overflow-x-auto">
        {PERIPHERAL_SPECS.map((spec) => {
          const isActive = spec.id === activeTab;
          return (
            <button
              key={spec.id}
              onClick={() => setActiveTab(spec.id)}
              className={`px-3.5 py-2 text-xs font-mono whitespace-nowrap transition-colors flex items-center gap-1.5 border-r border-[#232B38] cursor-pointer ${
                isActive
                  ? 'bg-[#12161F] text-[#D4A03D] font-semibold border-b-2 border-b-[#D4A03D]'
                  : 'text-[#9AA7B8] hover:text-[#ECEFF4] hover:bg-[#181E29]'
              }`}
            >
              <span>{spec.name}</span>
            </button>
          );
        })}
      </div>

      {/* Peripheral Detail Body */}
      <div className="p-4 sm:p-5 space-y-4 text-xs font-mono">
        {/* Address and Bus Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
          <div className="p-2.5 rounded bg-[#181E29] border border-[#232B38]">
            <span className="text-[#657386] block text-[10px] uppercase">MMIO BASE ADDRESS</span>
            <span className="text-[#ECEFF4] font-semibold mt-0.5 block">{activeSpec.baseAddress} ({activeSpec.bus})</span>
          </div>
          <div className="p-2.5 rounded bg-[#181E29] border border-[#232B38]">
            <span className="text-[#657386] block text-[10px] uppercase">KEY BITFIELD REGISTERS</span>
            <span className="text-[#D4A03D] font-medium mt-0.5 block truncate" title={activeSpec.registers}>
              {activeSpec.registers}
            </span>
          </div>
        </div>

        {/* Code Excerpt */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-[#657386]">
            <div className="flex items-center gap-1.5 text-[#9AA7B8]">
              <FileCode2 className="w-3.5 h-3.5 text-[#D4A03D]" />
              <span>DRIVER IMPLEMENTATION (C)</span>
            </div>
            <button
              onClick={handleCopy}
              className="text-[#9AA7B8] hover:text-[#ECEFF4] flex items-center gap-1 text-[10px] transition-colors cursor-pointer"
              title="Copy snippet"
            >
              {copied ? <Check className="w-3 h-3 text-[#2EA043]" /> : null}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
          </div>

          <pre className="p-3 rounded bg-[#0B0E14] border border-[#232B38] text-[#ECEFF4] overflow-x-auto text-[11px] leading-relaxed">
            <code>{activeSpec.codeSnippet}</code>
          </pre>
        </div>

        {/* Verification Note */}
        <div className="p-2.5 rounded bg-[#181E29]/60 border border-[#232B38] text-[11px] text-[#9AA7B8] flex items-start gap-2">
          <span className="text-[#D4A03D] font-bold">ℹ</span>
          <span>{activeSpec.notes}</span>
        </div>
      </div>
    </div>
  );
};
