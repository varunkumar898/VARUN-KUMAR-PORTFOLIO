import { Profile, ExperienceItem, ProjectItem, SkillCategoryData, StrengthItem, PeripheralNode } from '../types';

export const PROFILE: Profile = {
  name: "VARUN KUMAR",
  title: "Embedded Systems Engineer | C/C++ Firmware | RTOS | Driver Development",
  location: "Chennai, Tamil Nadu, India",
  phone: "+91 9444386570",
  email: "varunkumarjob2004@gmail.com",
  github: "https://github.com/varunkumar898",
  linkedin: "https://linkedin.com/in/varunkumarjob8055",
  degree: "B.Tech in Electronics and Computer Engineering",
  university: "Vels University, Chennai, Tamil Nadu, India",
  cgpa: "7.5/10",
  coreStatement: "Embedded engineer writing C/C++ firmware, bare-metal device drivers, and deterministic FreeRTOS tasks for ARM Cortex-M microcontrollers.",
  supportingLine: "STM32 • Bare-Metal • FreeRTOS • Driver Architecture • OpenOCD / GDB • Logic Analyzers",
  availability: "AVAILABLE FOR EMBEDDED / FIRMWARE ROLES"
};

export const PERIPHERALS: PeripheralNode[] = [
  {
    id: 'gpio',
    name: 'GPIO (BSRR / MODER)',
    type: 'General Purpose I/O',
    bus: 'AHB',
    baseAddress: '0x48000000 (GPIOA)',
    pins: 'Port A [15:0], Port B [15:0]',
    pinMapping: 'PA0 - PA15 (Configurable I/O)',
    clockSpeed: 'AHB @ 48 MHz (0 Wait States)',
    registerConfig: 'MODER: Output | BSRR: Atomic Set/Reset',
    dmaChannel: 'Direct Bus Access',
    irqNumber: 'EXTI4_15 (Vector 7)',
    description: 'Direct register-level bitfield manipulation. Atomic pin write via Bit Set/Reset Register (BSRR) avoiding read-modify-write race conditions in interrupt contexts.',
    waveformType: 'gpio'
  },
  {
    id: 'uart',
    name: 'UART / USART',
    type: 'Asynchronous Serial',
    bus: 'APB2',
    baseAddress: '0x40013800 (USART1)',
    pins: 'PA9 (TX) / PA10 (RX)',
    pinMapping: 'PA9 (TX), PA10 (RX)',
    clockSpeed: 'APB2 @ 48 MHz (115200 Baud)',
    registerConfig: 'CR1: UE|TE|RE | BRR: 0x01A1',
    dmaChannel: 'DMA1 Ch2/3',
    irqNumber: 'USART1_IRQn (Vector 27)',
    description: 'Hardware baudrate calculation, 8N1 framing, parity check, and non-blocking ISR queue dispatching for RFID & GPS telemetry.',
    waveformType: 'uart'
  },
  {
    id: 'spi',
    name: 'SPI Master',
    type: 'Synchronous Serial',
    bus: 'APB2',
    baseAddress: '0x40013000 (SPI1)',
    pins: 'PA5 (SCK), PA6 (MISO), PA7 (MOSI)',
    pinMapping: 'PA5 (SCK), PA6 (MISO), PA7 (MOSI)',
    clockSpeed: 'APB2 @ 48 MHz (12 MHz SCK)',
    registerConfig: 'CR1: MSTR|SPE|BR[1] (Mode 0: CPOL=0, CPHA=0)',
    dmaChannel: 'DMA1 Ch2/3',
    irqNumber: 'SPI1_IRQn (Vector 25)',
    description: 'Full-duplex master communication, hardware NSS control, verified clock slew rate and frame alignment with logic analyzer.',
    waveformType: 'spi'
  },
  {
    id: 'i2c',
    name: 'I2C Master',
    type: 'Two-Wire Interface',
    bus: 'APB1',
    baseAddress: '0x40005400 (I2C1)',
    pins: 'PB6 (SCL) / PB7 (SDA)',
    pinMapping: 'PB6 (SCL), PB7 (SDA)',
    clockSpeed: 'APB1 @ 48 MHz (100 kHz Standard Mode)',
    registerConfig: 'CR1: PE | TIMINGR: 0x00B01A4B (Computed)',
    dmaChannel: 'DMA1 Ch6/7',
    irqNumber: 'I2C1_IRQn (Vector 23)',
    description: 'Open-drain bus arbitration, start/stop condition sequencing, 7-bit peripheral addressing, and ACK/NACK fault recovery.',
    waveformType: 'i2c'
  },
  {
    id: 'adc',
    name: 'ADC (12-bit SAR)',
    type: 'Analog-to-Digital',
    bus: 'APB2',
    baseAddress: '0x40012400 (ADC1)',
    pins: 'PA0 - PA4 (Analog Inputs)',
    pinMapping: 'PA0 - PA4 (Analog Inputs)',
    clockSpeed: 'APB2 @ 48 MHz (14 MHz ADC_CLK)',
    registerConfig: 'CR: ADEN | CHSELR: Channel Select',
    dmaChannel: 'DMA1 Ch1',
    irqNumber: 'ADC1_COMP_IRQn (Vector 12)',
    description: '12-bit Successive Approximation Register (SAR) ADC, continuous channel scan, calibrated against VREF = 3.30V.',
    waveformType: 'adc'
  },
  {
    id: 'pwm',
    name: 'TIM3 / PWM',
    type: 'General-Purpose Timer',
    bus: 'APB1',
    baseAddress: '0x40000400 (TIM3)',
    pins: 'PA6 (TIM3_CH1), PA7 (TIM3_CH2)',
    pinMapping: 'PA6 (TIM3_CH1), PA7 (TIM3_CH2)',
    clockSpeed: 'APB1 @ 48 MHz (20 kHz PWM)',
    registerConfig: 'CCMR1: OC1M[110] | CCER: CC1E | ARR: 2400',
    dmaChannel: 'DMA1 Ch3 (CC1)',
    irqNumber: 'TIM3_IRQn (Vector 16)',
    description: 'Edge-aligned PWM generation with prescaler, auto-reload register (ARR), and capture/compare registers for actuator timing control.',
    waveformType: 'pwm'
  }
];

export const TECHNICAL_HIGHLIGHTS = [
  { value: 'B.Tech', label: 'Electronics & Computer Eng', sublabel: 'Vels University (CGPA 7.5)' },
  { value: 'STM32', label: 'ARM Cortex-M0 & ESP32', sublabel: 'Bare-Metal & RTOS' },
  { value: 'RISC-V', label: 'Docker Toolchain & CI/CD', sublabel: 'MindGrow Internship' },
  { value: 'Drivers', label: 'Register-Level C', sublabel: 'No Vendor HAL Dependency' },
  { value: 'Hardware', label: 'In-Circuit Debugging', sublabel: 'OpenOCD • GDB • Logic Analyzer' }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Docker RISC-V Toolchain and CI/CD Infrastructure Development Intern',
    company: 'MindGrow',
    location: 'India',
    period: 'Apr 2026 – Jun 2026',
    duration: '3 months',
    logReference: 'EXP://MINDGROW/RISCV-CI-CD',
    tags: ['RISC-V', 'Docker', 'Jenkins CI/CD', 'OpenOCD', 'GDB', 'GCC Cross-Compiler', 'Linux CLI'],
    responsibilities: [
      'Built a containerized embedded development environment for a RISC-V toolchain (OpenOCD, GDB, cross-compiler) in a single reproducible Docker image.',
      'Automated the firmware build and test pipeline with Jenkins CI/CD and a Docker prebuild step, enabling fast iteration and validation across multiple toolchain configurations.'
    ]
  },
  {
    id: 'exp-2',
    role: 'NPD Engineer (Trainee)',
    company: 'TVS Sundram Fasteners Ltd',
    location: 'Tamil Nadu, India',
    period: 'Dec 2025 – Mar 2026',
    duration: '4 months',
    logReference: 'EXP://TVS/NPD-MFG',
    tags: ['AutoCAD', 'Industrial Applications', 'Technical Specifications', 'Prototype Validation', 'Manufacturing Precision'],
    responsibilities: [
      'Supported new product development for industrial applications, from concept through prototype validation.',
      'Created product models and technical specifications in AutoCAD to ensure manufacturing precision and assembly accuracy.'
    ]
  },
  {
    id: 'exp-3',
    role: 'Junior R&D Developer (Intern)',
    company: 'MH Cockpit',
    location: 'India',
    period: 'Jun 2025 – Oct 2025',
    duration: '5 months',
    logReference: 'EXP://MHCOCKPIT/RND-EMBEDDED',
    tags: ['ARM Cortex-M', 'Embedded Firmware', 'IoT Devices', 'Circuit Design', 'Logic Analyzer', 'Hardware Debugging'],
    responsibilities: [
      'Developed embedded firmware, circuit designs, and hardware-software integration for IoT devices and product prototypes.',
      'Performed hardware debugging, protocol analysis, embedded system testing, and prototype validation with lab equipment for product qualification.'
    ]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'stm32f030-drivers',
    slug: 'stm32f030-drivers',
    title: 'STM32F030x4 Peripheral Driver Library',
    subtitle: 'Register-Level Embedded C Drivers (No Vendor HAL)',
    category: 'Bare-Metal & Device Drivers',
    description: 'Wrote bare-metal device drivers for GPIO, RCC, NVIC, EXTI, SYSCFG, ADC, SPI, and I2C on the STM32F030x4 (ARM Cortex-M0, 16 KB flash, 4 KB SRAM) using register-level Embedded C, with no vendor HAL.',
    technologies: ['Embedded C', 'ARM Cortex-M0', 'STM32F030', 'Makefile', 'ARM GCC', 'OpenOCD', 'GDB', 'Logic Analyzer'],
    repositoryUrl: 'https://github.com/varunkumar898/Driver-for-STM32F030x4-x6-x8-xC',
    metadata: {
      commits: '17+ commits',
      status: 'Repository with Public Documentation',
      targetHardware: 'STM32F030x4 (Cortex-M0, 16 KB Flash, 4 KB SRAM)',
      codeStyle: 'Bare-metal C, direct register bitfield manipulation, zero vendor HAL'
    },
    drivers: ['GPIO', 'RCC', 'NVIC', 'SYSCFG', 'EXTI', 'ADC', 'SPI', 'I2C'],
    details: {
      overview: 'A modular, register-level peripheral driver suite written directly from the ST RM0360 Reference Manual and ARM Cortex-M0 Generic User Guide for the STM32F030x4 microcontroller. Every driver accesses peripheral registers via volatile struct pointer offsets, providing complete control over peripheral clocking, interrupt generation, and bus timing without vendor abstraction overhead.',
      architecture: {
        diagramSteps: [
          'APPLICATION FIRMWARE (Modular C Modules)',
          'DRIVER API LAYER (stm32f030_gpio.h, stm32f030_spi.h, etc.)',
          'REGISTER MAP DEFINITIONS (Base addresses & volatile bitfields)',
          'AHB / APB BUS INTERCONNECT (Memory-mapped peripheral registers)',
          'STM32F030x4 SILICON (ARM Cortex-M0 Core, 48 MHz SYSCLK)',
          'PHYSICAL PINS & LAB INSTRUMENTATION (ST-Link SWD, Logic Analyzer, DSO)'
        ],
        description: 'Memory-mapped peripheral architecture. Peripherals are mapped through typed C struct definitions matching silicon register offsets. Atomic bit manipulation is used for GPIO via BSRR to prevent race conditions during concurrent execution.'
      },
      implementation: {
        points: [
          'Engineered 8 core peripheral drivers: GPIO (modes, speeds, pull-up/down, alternate functions), RCC (system clock, PLL, APB/AHB prescalers), NVIC (interrupt enable, priority assignment), SYSCFG (EXTI multiplexing), EXTI (edge-triggered external interrupts), ADC (12-bit SAR conversion), SPI (master mode, CPOL/CPHA control), and I2C (timing registers, Start/Stop generation, 7-bit addressing).',
          'Constructed bare-metal toolchain from scratch: written startup assembly code initializing vector table and reset handler, custom GNU linker script (.ld) defining FLASH (16 KB) and SRAM (4 KB) partitions, and modular Makefile for arm-none-eabi-gcc.',
          'Configured OpenOCD flash programming scripts and GDB initialization files for seamless in-circuit debugging.'
        ],
        codeSnippet: {
          title: 'stm32f030_gpio.c - Register-Level Mode Configuration & Atomic Pin Set/Reset',
          language: 'c',
          code: `/* Direct register configuration for GPIO pin output mode */
void GPIO_Init(GPIO_TypeDef *pGPIOx, GPIO_PinConfig_t *pPinConfig) {
    uint32_t temp = 0;

    /* 1. Configure Pin Mode (Input, Output, Alt Function, Analog) */
    temp = (pPinConfig->GPIO_PinMode << (2 * pPinConfig->GPIO_PinNumber));
    pGPIOx->MODER &= ~(0x3 << (2 * pPinConfig->GPIO_PinNumber)); // Clear 2-bit field
    pGPIOx->MODER |= temp;                                       // Set desired mode

    /* 2. Configure Output Speed */
    temp = (pPinConfig->GPIO_PinSpeed << (2 * pPinConfig->GPIO_PinNumber));
    pGPIOx->OSPEEDR &= ~(0x3 << (2 * pPinConfig->GPIO_PinNumber));
    pGPIOx->OSPEEDR |= temp;

    /* 3. Configure Pull-up / Pull-down resistors */
    temp = (pPinConfig->GPIO_PinPuPdControl << (2 * pPinConfig->GPIO_PinNumber));
    pGPIOx->PUPDR &= ~(0x3 << (2 * pPinConfig->GPIO_PinNumber));
    pGPIOx->PUPDR |= temp;
}

/* Atomic pin write using Bit Set/Reset Register (BSRR) to avoid RMW race conditions */
void GPIO_WriteToOutputPin(GPIO_TypeDef *pGPIOx, uint8_t PinNumber, uint8_t Value) {
    if (Value == GPIO_PIN_SET) {
        pGPIOx->BSRR = (1 << PinNumber);          // Set bit [15:0]
    } else {
        pGPIOx->BSRR = (1 << (PinNumber + 16));   // Reset bit [31:16]
    }
}`
        }
      },
      debugging: {
        challenges: [
          'Peripheral Clock Gating: Verified that enabling RCC peripheral clocks requires appropriate settle time before accessing peripheral configuration registers, otherwise generating bus faults.',
          'I2C Timing Register Calculation: Derived PRESC, SCLDEL, SDADEL, SCLH, and SCLL bitfield values directly from clock equations in RM0360 to ensure 100 kHz standard mode timing compliance.',
          'EXTI Multiplexing: Handled interrupt line routing through SYSCFG registers to map pins accurately across Port A and Port B.'
        ],
        instrumentsUsed: ['OpenOCD via ST-Link V2 (SWD)', 'GDB interactive debugger', '8-channel 24 MHz logic analyzer']
      },
      validation: {
        methods: [
          'Attached logic analyzer to SPI SCK, MOSI, and MISO lines to inspect clock phase (Mode 0) and byte framing.',
          'Inspected I2C Start condition, 7-bit peripheral address transmission, and ACK bit timing using logic analyzer traces.',
          'Stepped through startup assembly in GDB to verify vector table relocation and stack pointer initialization.'
        ],
        metrics: [
          'Minimal footprint: Pure register C drivers with zero external HAL overhead.',
          'Repository: 17+ Git commits with public documentation detailing pinout, build steps, and hardware bring-up.'
        ]
      },
      results: {
        outcomes: [
          'Created standalone, modular C driver library ready for bare-metal ARM Cortex-M projects.',
          'Deep practical understanding of microcontroller memory maps, clock trees, and register interfaces.',
          'Public GitHub repository with comprehensive README, schematics, and verification steps.'
        ],
        keyTakeaway: 'Working directly with microcontroller registers establishes true hardware comprehension and eliminates hidden vendor library overhead.'
      }
    }
  },
  {
    id: 'smart-number-plate',
    slug: 'smart-number-plate',
    title: 'Smart Number Plate for Theft Detection',
    subtitle: 'Real-Time Embedded Vehicle Security Prototype',
    category: 'RTOS & Automotive Systems',
    description: 'Developed bare-metal and FreeRTOS-based firmware on an ARM microcontroller for vehicle theft detection and actuator lockout control with real-time responsiveness.',
    technologies: ['FreeRTOS', 'ARM Cortex-M', 'Embedded C', 'RFID', 'Logic Analyzer', 'OpenOCD', 'GDB', 'UART', 'SPI'],
    repositoryUrl: 'https://github.com/varunkumar898',
    metadata: {
      status: 'Functional Hardware Prototype',
      targetHardware: 'ARM Microcontroller Target',
      codeStyle: 'FreeRTOS tasks, non-blocking ISRs, queue message passing'
    },
    details: {
      overview: 'An embedded vehicle security prototype combining RFID authentication and real-time control logic under FreeRTOS. The system interrogates authorized credentials, evaluates security state transitions, and controls vehicle lockout actuators within deterministic timing constraints.',
      architecture: {
        diagramSteps: [
          'RFID READER / CREDENTIAL SENSOR',
          'UART / SPI INTERRUPT SERVICE ROUTINES',
          'FREERTOS MESSAGE QUEUES (xQueueSendFromISR)',
          'AUTHENTICATION & CONTROL TASK (Preemptive priority scheduling)',
          'HARDWARE PROTECTION & SOLENOID ACTUATOR'
        ],
        description: 'Multi-tasking architecture dividing wireless protocol handling, state evaluation, and physical lockout triggering into discrete FreeRTOS tasks to guarantee deterministic responsiveness.'
      },
      implementation: {
        points: [
          'Implemented FreeRTOS task scheduling with discrete task priorities for credential acquisition and safety-critical lockout evaluation.',
          'Engineered non-blocking ISR handlers dispatching received RFID packets into thread-safe FreeRTOS queues via xQueueSendFromISR.',
          'Implemented closed-loop feedback control logic and hardware protection circuits protecting microcontroller pins from inductive kickback.'
        ],
        codeSnippet: {
          title: 'rfid_isr_dispatch.c - Non-blocking ISR to FreeRTOS Queue Transfer',
          language: 'c',
          code: `/* UART Receive ISR for RFID Packet Decoding */
void USART_RFID_IRQHandler(void) {
    BaseType_t xHigherPriorityTaskWoken = pdFALSE;
    uint8_t rxByte;

    if (USART1->ISR & USART_ISR_RXNE) {
        rxByte = (uint8_t)(USART1->RDR & 0xFF);

        /* Push raw byte into FreeRTOS queue without blocking ISR */
        xQueueSendFromISR(xRfidQueue, &rxByte, &xHigherPriorityTaskWoken);

        /* Yield immediately if a higher priority evaluation task was unblocked */
        portYIELD_FROM_ISR(xHigherPriorityTaskWoken);
    }
}`
        }
      },
      debugging: {
        challenges: [
          'Sensor timing jitter: Replaced busy-waiting loops with FreeRTOS queues and event flags to prevent task starvation.',
          'Signal bounce and noise: Isolated transient spikes during actuator engagement with flyback diodes and hardware decoupling.'
        ],
        instrumentsUsed: ['Logic analyzer on serial lines', 'GDB / OpenOCD for firmware breakpoint inspection']
      },
      validation: {
        methods: [
          'Validated signal timing and protocol frame integrity with a logic analyzer.',
          'Debugged hardware-firmware integration issues step-by-step using OpenOCD and GDB.'
        ],
        metrics: [
          'Real-time responsiveness: Fast, deterministic lockout trigger upon confirmed unauthorized condition.',
          'Zero deadlock during continuous multi-cycle RFID tag read sequences.'
        ]
      },
      results: {
        outcomes: [
          'Successfully demonstrated real-time automotive theft detection on physical hardware.',
          'Practical application of FreeRTOS queues, task priorities, and interrupt management.',
          'Integrated hardware protection circuits safeguarding microcontroller I/O.'
        ],
        keyTakeaway: 'Reliable real-time embedded systems depend on deterministic task scheduling and clean interrupt boundaries.'
      }
    }
  },
  {
    id: 'embedded-ui-designer',
    slug: 'embedded-ui-designer',
    title: 'Embedded UI Designer (Final Year Project)',
    subtitle: 'Desktop UI Design Tool & Firmware Code Generation',
    category: 'Developer Tools & Systems',
    description: 'Built a desktop UI design tool for embedded systems with an SDK, a type-safe REST API engine, and multi-language firmware code generation for microcontrollers.',
    technologies: ['C/C++', 'TypeScript', 'Embedded UI', 'SDK', 'REST API Engine', 'Code Generation', 'Linux'],
    repositoryUrl: 'https://github.com/varunkumar898',
    metadata: {
      status: 'Final Year Engineering Project',
      targetHardware: 'Microcontrollers with Graphic/OLED Displays',
      codeStyle: 'Type-safe SDK, compact C/C++ firmware data structures'
    },
    details: {
      overview: 'A specialized desktop tool designed to streamline embedded display development. Allows engineers to visually lay out widgets, buttons, dials, and telemetry gauges, and automatically generates compact, type-safe C and C++ data structures and render callbacks for resource-constrained microcontrollers.',
      architecture: {
        diagramSteps: [
          'DESKTOP CANVAS (Visual layout & component hierarchy)',
          'UI SPECIFICATION ENGINE (JSON layout schema)',
          'TYPE-SAFE REST API & SDK (Cross-tool integration)',
          'FIRMWARE CODE GENERATOR (AST & code emission engine)',
          'GENERATED C/C++ HEADERS (Directly compilable into microcontroller project)'
        ],
        description: 'Decoupled architecture connecting an intuitive desktop canvas with a code generation pipeline that translates coordinates and widget properties into optimized C structs.'
      },
      implementation: {
        points: [
          'Engineered desktop UI interface allowing rapid configuration of embedded display components and screen hierarchies.',
          'Built an SDK and type-safe REST API engine facilitating extensible tooling integration.',
          'Authored code generation templates producing minimal-overhead C/C++ source code suitable for Flash-constrained microcontrollers.'
        ]
      },
      debugging: {
        challenges: [
          'Flash footprint optimization: Minimized generated font and bitmap representation arrays to preserve microcontroller SRAM.',
          'Coordinate scaling: Maintained pixel-perfect alignment across diverse display resolutions (128x64 OLED, 320x240 TFT).'
        ],
        instrumentsUsed: ['Target microcontroller display modules', 'Linux development environment']
      },
      validation: {
        methods: [
          'Generated firmware files integrated directly into microcontroller build pipelines to verify rendering accuracy.'
        ],
        metrics: [
          'Full-featured desktop application providing automated C/C++ code generation.'
        ]
      },
      results: {
        outcomes: [
          'Significantly reduced manual C coordinate boilerplate for embedded display developers.',
          'Built end-to-end type-safe toolchain bridging desktop design with microcontroller firmware.'
        ],
        keyTakeaway: 'Building developer tools requires empathy for the resource limitations of target embedded hardware.'
      }
    }
  },
  {
    id: 'opensource-systems',
    slug: 'opensource-systems',
    title: 'Open Source Systems Contributions',
    subtitle: 'LLVM Backend Optimizations & ARM System Porting',
    category: 'Compilers & Systems Infrastructure',
    description: 'Contributed to low-level open source systems: compiler backend improvements in Gravel Launcher (LLVM performance) and SolidCraft system function porting to ARM architectures (Windows on ARM & Linux ARM).',
    technologies: ['C++', 'C', 'LLVM', 'ARM Architecture', 'Compiler Backend', 'Git', 'Linux CLI'],
    repositoryUrl: 'https://github.com/varunkumar898',
    metadata: {
      status: 'Merged Open Source Contributions',
      targetHardware: 'ARM64 & x86_64 Host/Target Systems',
      codeStyle: 'Modern C++, LLVM IR visitors, POSIX/ARM runtime APIs'
    },
    details: {
      overview: 'Practical contributions to low-level open source systems software. Contributed to Gravel Launcher compiler backend optimization (tokenizer refinement, AST construction, and LLVM code generation) and ported SolidCraft core system functions to ARM devices across both Windows on ARM and Linux.',
      architecture: {
        diagramSteps: [
          'SOURCE CODE TOKENIZER (Lexical analysis & token stream)',
          'ABSTRACT SYNTAX TREE (AST node construction)',
          'LLVM BACKEND CODEGEN (Lowering to LLVM IR instructions)',
          'ARM ARCHITECTURE PORT (System calls, runtime mapping, ABI compatibility)'
        ],
        description: 'Working at compiler and architecture boundaries to optimize execution and enable native execution on ARM devices.'
      },
      implementation: {
        points: [
          'Refined lexical tokenizer and Abstract Syntax Tree node construction in Gravel Launcher.',
          'Optimized compiler backend visitor logic generating LLVM Intermediate Representation.',
          'Ported platform system functions in SolidCraft to execute natively on ARM hardware targets.'
        ]
      },
      debugging: {
        challenges: [
          'Memory lifecycle across AST nodes: Prevented leaks and dangling references using modern C++ memory semantics.',
          'Cross-architecture ABI differences: Handled word size and register calling conventions when porting to ARM.'
        ],
        instrumentsUsed: ['GDB / Valgrind', 'LLVM toolchain', 'Git / GitHub CI runners']
      },
      validation: {
        methods: [
          'Verified compiler test suites and automated builds on ARM and x86 targets.'
        ],
        metrics: [
          'Merged contributions into open source repositories.'
        ]
      },
      results: {
        outcomes: [
          'Demonstrated ability to contribute to complex multi-file native C/C++ codebases.',
          'Deep understanding of instruction generation, LLVM compiler pipelines, and ARM runtime systems.'
        ],
        keyTakeaway: 'Understanding compiler internals and processor architectures provides deep insight into writing high-performance firmware.'
      }
    }
  }
];

export const SKILL_CATEGORIES: SkillCategoryData[] = [
  {
    id: 'firmware',
    number: '01',
    title: 'Languages & Core Systems',
    description: 'Low-level and systems programming languages.',
    skills: [
      'C',
      'Embedded C',
      'C++ (OOP fundamentals)',
      'ARM Assembly',
      'Python',
      'Bash / Shell scripting'
    ]
  },
  {
    id: 'rtos',
    number: '02',
    title: 'RTOS & Real-Time Architecture',
    description: 'Deterministic task scheduling, queues, and interrupt management.',
    skills: [
      'FreeRTOS',
      'Task management',
      'Real-time scheduling',
      'Interrupt handling (NVIC, EXTI)',
      'State-based control logic',
      'Deterministic behavior',
      'Timing analysis'
    ]
  },
  {
    id: 'mcu',
    number: '03',
    title: 'Microcontrollers & Peripherals',
    description: 'Silicon targets and register-level peripheral drivers.',
    skills: [
      'ARM Cortex-M (M0)',
      'STM32 (F0, F4)',
      'ESP32',
      'RISC-V',
      'Bare-metal programming',
      'GPIO, RCC, NVIC, EXTI, SYSCFG',
      'ADC, SPI, I2C, UART, CAN',
      'Startup assembly & linker scripts'
    ]
  },
  {
    id: 'protocols',
    number: '04',
    title: 'Communication & Protocols',
    description: 'Physical buses and data transmission interfaces.',
    skills: [
      'UART / USART',
      'SPI',
      'I2C',
      'CAN',
      'TCP/IP',
      'Bluetooth',
      'RFID protocol handling'
    ]
  },
  {
    id: 'debugging',
    number: '05',
    title: 'Debugging & Test Benches',
    description: 'Hardware bring-up, in-circuit tracing, and bench equipment.',
    skills: [
      'JTAG / SWD',
      'OpenOCD',
      'GDB debugger',
      'Digital Storage Oscilloscope',
      'Logic Analyzer',
      'Multimeter',
      'Function Generator',
      'Bench Power Supply',
      'Hardware-in-the-loop validation'
    ]
  },
  {
    id: 'tools',
    number: '06',
    title: 'Build, CI/CD & Hardware Design',
    description: 'Toolchains, containers, automation, and circuit CAD.',
    skills: [
      'GNU Toolchain (GCC)',
      'Make',
      'Git & GitHub',
      'Docker',
      'Jenkins CI/CD',
      'Linux CLI & SSH',
      'Embedded Linux fundamentals',
      'Schematic design & PCB layout',
      'DFM & Power circuits',
      'Fusion 360'
    ]
  }
];

export const TECHNICAL_FOUNDATIONS = [
  {
    category: 'Microcontroller Architectures',
    items: ['ARM Cortex-M (STM32)', 'ESP32', 'RISC-V']
  },
  {
    category: 'Programming Languages',
    items: ['C', 'Embedded C', 'C++', 'ARM Assembly', 'Python', 'Bash']
  },
  {
    category: 'Real-Time & Embedded OS',
    items: ['FreeRTOS', 'Bare-Metal Scheduling', 'Embedded Linux Fundamentals']
  },
  {
    category: 'Toolchains & Build Infrastructure',
    items: ['GNU GCC (arm-none-eabi-gcc)', 'Make', 'Docker', 'Jenkins CI/CD', 'Git']
  },
  {
    category: 'Lab Equipment & Debugging',
    items: ['OpenOCD', 'GDB', 'ST-Link SWD', 'Digital Storage Oscilloscope', 'Logic Analyzer']
  }
];

export const KEY_STRENGTHS: StrengthItem[] = [
  {
    id: 1,
    title: 'SILICON-TO-CODE BRIDGING',
    description: 'Direct register-level bitfield manipulation referencing reference manuals without opaque vendor HAL layers.',
    metricLabel: 'REGISTER LEVEL'
  },
  {
    id: 2,
    title: 'DETERMINISTIC RTOS DESIGN',
    description: 'Task prioritization, thread-safe queues, and non-blocking ISR deferral under FreeRTOS.',
    metricLabel: 'FREERTOS'
  },
  {
    id: 3,
    title: 'HARDWARE-IN-THE-LOOP DEBUGGING',
    description: 'Systematic in-circuit tracing with OpenOCD/GDB and physical waveform validation with logic analyzers and oscilloscopes.',
    metricLabel: 'INSTRUMENT-FIRST'
  },
  {
    id: 4,
    title: 'CONTAINERIZED CI/CD TOOLCHAINS',
    description: 'Reproducible Docker development environments and automated Jenkins pipelines for embedded builds.',
    metricLabel: 'DOCKER & CI/CD'
  },
  {
    id: 5,
    title: 'HARDWARE & MANUFACTURING AWARENESS',
    description: 'Experience in schematic design, circuit testing, and AutoCAD technical drawings for industrial production.',
    metricLabel: 'HARDWARE & CAD'
  },
  {
    id: 6,
    title: 'OPEN SOURCE CONTRIBUTOR',
    description: 'Active contributor to compiler infrastructure (LLVM) and multi-architecture ARM software porting.',
    metricLabel: 'SYSTEMS CODE'
  }
];

export const FEATURED_REPOSITORIES = [
  {
    name: 'Driver-for-STM32F030x4-x6-x8-xC',
    fullName: 'varunkumar898/Driver-for-STM32F030x4-x6-x8-xC',
    url: 'https://github.com/varunkumar898/Driver-for-STM32F030x4-x6-x8-xC',
    description: 'Register-level bare-metal device drivers for STM32F030 (ARM Cortex-M0) in Embedded C. Drivers for GPIO, RCC, NVIC, EXTI, SYSCFG, ADC, SPI, and I2C with startup code, linker script, and Makefile.',
    language: 'C',
    languageColor: '#555555',
    commits: '17+ commits',
    status: 'Public Repository',
    target: 'ARM Cortex-M0',
    tags: ['Embedded C', 'Bare-Metal', 'STM32F030', 'Device Drivers', 'Makefile', 'OpenOCD']
  },
  {
    name: 'Smart-Number-Plate-Firmware',
    fullName: 'varunkumar898/Smart-Number-Plate-Firmware',
    url: 'https://github.com/varunkumar898',
    description: 'Real-time FreeRTOS automotive prototype firmware combining RFID authentication, closed-loop control logic, and hardware protection circuits.',
    language: 'C',
    languageColor: '#555555',
    commits: 'Active Prototype',
    status: 'Hardware Validated',
    target: 'ARM / FreeRTOS',
    tags: ['FreeRTOS', 'Embedded C', 'RFID', 'Queues', 'Logic Analyzer']
  },
  {
    name: 'Embedded-UI-Designer',
    fullName: 'varunkumar898/Embedded-UI-Designer',
    url: 'https://github.com/varunkumar898',
    description: 'Desktop UI design tool for embedded systems with an SDK, type-safe REST API engine, and multi-language firmware code generator for microcontrollers.',
    language: 'TypeScript / C++',
    languageColor: '#3178c6',
    commits: 'Final Year Project',
    status: 'Complete SDK',
    target: 'Desktop / MCU',
    tags: ['Desktop Tool', 'Code Generator', 'SDK', 'TypeScript', 'C++']
  }
];
