import { Profile, ExperienceItem, ProjectItem, SkillCategoryData, StrengthItem, PeripheralNode } from '../types';

export const PROFILE: Profile = {
  name: "VARUN KUMAR",
  title: "Embedded Systems Engineer | Firmware Developer",
  location: "Chennai, Tamil Nadu, India",
  phone: "+91 9444386570",
  email: "varunkumarjob2004@gmail.com",
  github: "https://github.com/varunkumarjob898",
  linkedin: "https://linkedin.com/in/varun-kumarjob8055",
  expectedGraduation: "June 2026",
  degree: "B.Tech in Electronics and Computer Engineering",
  university: "Vels University, Chennai, Tamil Nadu, India",
  cgpa: "7.5/10",
  coreStatement: "I build firmware that interacts with real hardware.",
  supportingLine: "Bare-metal • RTOS • STM32 • RISC-V • Hardware Bring-up",
  availability: "AVAILABLE FOR EMBEDDED / FIRMWARE OPPORTUNITIES"
};

export const PERIPHERALS: PeripheralNode[] = [
  {
    id: 'uart',
    name: 'UART / USART',
    type: 'Asynchronous Serial',
    bus: 'APB2',
    baseAddress: '0x40013800 (USART1)',
    pins: 'PA9 (TX) / PA10 (RX)',
    description: 'Baudrate generator, 8N1 framing, parity checking, and TXE/RXNE interrupt handling.',
    waveformType: 'uart'
  },
  {
    id: 'spi',
    name: 'SPI',
    type: 'Synchronous Serial',
    bus: 'APB2',
    baseAddress: '0x40013000 (SPI1)',
    pins: 'PA5 (SCK), PA6 (MISO), PA7 (MOSI)',
    description: 'Full-duplex master/slave communication, CPOL/CPHA mode control, hardware CRC calculation.',
    waveformType: 'spi'
  },
  {
    id: 'i2c',
    name: 'I2C',
    type: 'Two-Wire Interface',
    bus: 'APB1',
    baseAddress: '0x40005400 (I2C1)',
    pins: 'PB6 (SCL) / PB7 (SDA)',
    description: 'Open-drain bus arbitration, start/stop conditions, 7-bit/10-bit addressing, ACK/NACK generation.',
    waveformType: 'i2c'
  },
  {
    id: 'can',
    name: 'CAN',
    type: 'Controller Area Network',
    bus: 'APB1',
    baseAddress: '0x40006400 (CAN1)',
    pins: 'PA11 (RX) / PA12 (TX)',
    description: 'Differential signaling for robust automotive/industrial buses, identifier filter banks, mailbox queues.',
    waveformType: 'can'
  },
  {
    id: 'adc',
    name: 'ADC',
    type: 'Analog-to-Digital',
    bus: 'APB2',
    baseAddress: '0x40012400 (ADC1)',
    pins: 'PA0 - PA4 (Analog Inputs)',
    description: '12-bit SAR ADC, continuous/single scan modes, hardware oversampling, end-of-conversion triggers.',
    waveformType: 'adc'
  },
  {
    id: 'pwm',
    name: 'PWM / Timers',
    type: 'General-Purpose Timer',
    bus: 'APB1',
    baseAddress: '0x40000400 (TIM3)',
    pins: 'PA6 (TIM3_CH1), PA7 (TIM3_CH2)',
    description: 'Edge-aligned and center-aligned PWM, auto-reload register (ARR), prescaler (PSC), compare registers.',
    waveformType: 'pwm'
  },
  {
    id: 'gpio',
    name: 'GPIO',
    type: 'General Purpose I/O',
    bus: 'AHB',
    baseAddress: '0x48000000 (GPIOA)',
    pins: 'Port A [15:0], Port B [15:0]',
    description: 'MODER, OTYPER, OSPEEDR, PUPDR, IDR, ODR, and atomic bit setting/resetting via BSRR.',
    waveformType: 'gpio'
  },
  {
    id: 'dma',
    name: 'DMA',
    type: 'Direct Memory Access',
    bus: 'AHB',
    baseAddress: '0x40020000 (DMA1)',
    pins: 'Internal Bus Matrix Routing',
    description: 'Zero-overhead peripheral-to-memory and memory-to-memory transfers without CPU intervention.',
    waveformType: 'dma'
  }
];

export const TECHNICAL_HIGHLIGHTS = [
  { value: '2026', label: 'Expected Graduation', sublabel: 'B.Tech ECE' },
  { value: 'STM32', label: 'ARM Cortex-M', sublabel: 'Register-level & HAL' },
  { value: 'RISC-V', label: 'Architecture', sublabel: 'Industrial IoT' },
  { value: 'FreeRTOS', label: 'Real-Time Systems', sublabel: 'Deterministic Tasks' },
  { value: 'C / C++', label: 'Firmware', sublabel: 'Bare-Metal to RTOS' }
];

export const ENGINEERING_APPROACH = [
  {
    step: '01',
    title: 'UNDERSTAND',
    lead: 'Datasheet & Hardware Architecture',
    description: 'Deconstruct microcontroller reference manuals, timing diagrams, clock trees, register maps, and peripheral electrical constraints before writing a single line of C.'
  },
  {
    step: '02',
    title: 'MEASURE',
    lead: 'Physical Signals & Bus Verification',
    description: 'Hook up oscilloscopes and logic analyzers directly to physical pins to measure real rise/fall times, clock jitter, bus contention, and protocol packet integrity.'
  },
  {
    step: '03',
    title: 'DEBUG',
    lead: 'In-Circuit Emulation & Trace',
    description: 'Connect OpenOCD via JTAG/SWD, halt the CPU core with GDB, inspect peripheral registers, trace stack frames, and catch priority inversion or race conditions.'
  },
  {
    step: '04',
    title: 'VALIDATE',
    lead: 'Silicon-Level Reliability',
    description: 'Run automated functional validation, stress interrupt routines under high bus traffic, and prove long-term firmware stability on physical production boards.'
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Docker RISC-V Toolchain & CI/CD Infrastructure Development Intern',
    company: 'MindGrow Technologies, India',
    location: 'India',
    period: 'April 2026 - June 2026',
    duration: '3 months',
    logReference: 'LOG://MGT/RISCV-CI-FW-01',
    tags: ['RISC-V', 'Embedded C', 'FreeRTOS', 'Docker', 'GCC', 'OpenOCD', 'GDB', 'Modbus', 'CAN'],
    responsibilities: [
      'Designed and debugged low-level firmware for RISC-V microcontrollers targeting industrial IoT applications.',
      'Implemented real-time task scheduling with mutex-based synchronization and priority-based preemption for concurrent sensor and actuator management.',
      'Built containerized CI/CD infrastructure using Docker, including GCC RISC-V toolchain, OpenOCD, and GDB.',
      'Enabled cross-machine firmware builds and remote hardware debugging.',
      'Implemented Modbus RTU/TCP protocol stack and CAN driver layer for battery management systems.',
      'Validated protocol correctness using logic analyzer to detect timing violations, packet corruption, and state machine errors before hardware production release.',
      'Debugged multi-platform firmware issues across Linux host and embedded RISC-V targets using OpenOCD and GDB.',
      'Traced interrupt handling problems and DMA timing issues through systematic hardware-software co-debugging.'
    ]
  },
  {
    id: 'exp-2',
    role: 'Junior R&D Developer — Intern',
    company: 'MH Cockpit, India',
    location: 'India',
    period: 'June 2025 - October 2025',
    duration: '5 months',
    logReference: 'LOG://MHC/RND-HWFW-02',
    tags: ['ARM Cortex-M', 'Embedded C', 'I2C', 'SPI', 'GPIO', 'GDB', 'Oscilloscope', 'Protocol Analyzer'],
    responsibilities: [
      'Developed embedded C firmware for IoT edge device prototypes on ARM Cortex-M platforms.',
      'Debugged hardware-software integration failures using oscilloscopes and protocol analyzers.',
      'Isolated register-level configuration errors and timing violations.',
      'Validated sensor interfaces and multi-protocol peripheral communication.',
      'Participated in board bring-up.',
      'Debugged initialization sequences, peripheral clock configuration, power sequencing and reset logic.',
      'Collaborated with PCB design and systems teams.',
      'Created register-level debugging guides and protocol validation test cases.'
    ]
  },
  {
    id: 'exp-3',
    role: 'NPD Engineer — Trainee',
    company: 'TVS Sundram Fasteners Ltd',
    location: 'Tamil Nadu, India',
    period: 'January 2026 - March 2026',
    duration: '3 months',
    logReference: 'LOG://TVS/NPD-MFG-03',
    tags: ['SolidWorks', 'CAD', 'Manufacturing Documentation'],
    responsibilities: [
      'Authored technical specifications and CAD models for OEM automotive components using SolidWorks.',
      'Created hardware-to-manufacturing documentation.',
      'Created assembly procedures.',
      'Created quality assurance protocols.',
      'Collaborated with product engineering and manufacturing teams.',
      'Participated in design reviews and process optimization meetings.'
    ]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'stm32f030-drivers',
    slug: 'stm32f030-drivers',
    title: 'STM32F030 Hardware Abstraction Layer',
    subtitle: 'Register-Level Device Drivers',
    category: 'Device Drivers & Bare-Metal',
    description: 'Implemented 8 core device drivers at register level from ARM Cortex-M0 datasheets without third-party HAL bloat.',
    technologies: ['Embedded C', 'ARM Cortex-M0', 'STM32F030', 'Make', 'GDB', 'OpenOCD', 'Oscilloscope', 'Logic Analyzer'],
    repositoryUrl: 'https://github.com/varunkumarjob898/Driver-for-STM32F030x4-x6-x8-xC',
    metadata: {
      commits: '17 commits',
      status: 'Production-ready code',
      targetHardware: 'STM32F030x4/x6/x8/xC (ARM Cortex-M0)',
      codeStyle: 'Bare-metal, MISRA-inspired, zero external HAL dependencies'
    },
    drivers: ['GPIO', 'RCC', 'NVIC', 'SYSCFG', 'EXTI', 'ADC', 'SPI', 'I2C'],
    details: {
      overview: 'A complete, clean, register-level hardware abstraction layer and device driver library written in pure C for the STM32F030 ARM Cortex-M0 series. Written directly from the RM0360 Reference Manual and Cortex-M0 Generic User Guide, targeting maximum execution determinism and minimal binary footprint.',
      architecture: {
        diagramSteps: [
          'APPLICATION LAYER',
          'DRIVER API (Clean abstraction header files)',
          'PERIPHERAL DRIVER (State management & bit manipulation)',
          'REGISTER CONFIGURATION (Direct memory-mapped pointer dereferences)',
          'STM32F030 SILICON (ARM Cortex-M0 core & AHB/APB buses)',
          'OSCILLOSCOPE / LOGIC ANALYZER (Physical bus inspection)',
          'HARDWARE VALIDATION (Clock accuracy, rise time & ACK compliance)'
        ],
        description: 'Memory-mapped peripheral architecture where each peripheral base address is mapped via strongly typed C structures representing register offsets. All driver APIs provide atomic register manipulations, avoiding read-modify-write race conditions where hardware supports bit-set/reset registers (like GPIO BSRR).'
      },
      implementation: {
        points: [
          'Developed 8 core drivers: GPIO (modes, speeds, pull-up/down, alternate functions), RCC (system clock, PLL, APB/AHB prescalers), NVIC (priority groupings, enable/clear pending), SYSCFG (EXTI line routing), EXTI (edge-triggered interrupts), ADC (12-bit SAR configuration), SPI (master mode, CPOL/CPHA, NSS hardware/software control), and I2C (standard/fast mode, timing registers, ACK control).',
          'Authored clean startup code (.s) and custom GNU linker scripts (.ld) configuring vector tables, flash memory partitions, and SRAM stacks.',
          'Configured modular Makefiles with arm-none-eabi-gcc toolchain with optimization flags (-O2, -Wall, -Wextra, -mcpu=cortex-m0 -mthumb).'
        ],
        codeSnippet: {
          title: 'stm32f030_gpio.c - Atomic Pin Toggle and Mode Configuration',
          language: 'c',
          code: `/* Direct register configuration for GPIO pin output mode */
void GPIO_Init(GPIO_TypeDef *pGPIOx, GPIO_PinConfig_t *pPinConfig) {
    uint32_t temp = 0;
    
    /* 1. Configure Pin Mode (Input, Output, Alt Function, Analog) */
    temp = (pPinConfig->GPIO_PinMode << (2 * pPinConfig->GPIO_PinNumber));
    pGPIOx->MODER &= ~(0x3 << (2 * pPinConfig->GPIO_PinNumber)); // Clear bits
    pGPIOx->MODER |= temp;                                       // Set bits

    /* 2. Configure Output Speed */
    temp = (pPinConfig->GPIO_PinSpeed << (2 * pPinConfig->GPIO_PinNumber));
    pGPIOx->OSPEEDR &= ~(0x3 << (2 * pPinConfig->GPIO_PinNumber));
    pGPIOx->OSPEEDR |= temp;

    /* 3. Configure Pull-up / Pull-down resistors */
    temp = (pPinConfig->GPIO_PinPuPdControl << (2 * pPinConfig->GPIO_PinNumber));
    pGPIOx->PUPDR &= ~(0x3 << (2 * pPinConfig->GPIO_PinNumber));
    pGPIOx->PUPDR |= temp;
}

/* Atomic pin write using Bit Set/Reset Register (BSRR) to avoid RMW race */
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
          'Peripheral clock gating: Isolated an issue where GPIO register writes failed to take effect because the corresponding AHBENR bit in the RCC block had not finished settling.',
          'I2C timing register calculation: Configured the PRESC, SCLDEL, SDADEL, SCLH, SCLL bitfields in the I2C_TIMINGR register from datasheet formulas to achieve exactly 100 kHz standard mode.',
          'EXTI line multiplexing: Debugged an interrupt collision across PA0 and PB0 by properly configuring SYSCFG_EXTICR1 alternate routing.'
        ],
        instrumentsUsed: ['GDB with OpenOCD via ST-Link v2', 'Digital Storage Oscilloscope (DSO)', '8-Channel 24MHz Logic Analyzer']
      },
      validation: {
        methods: [
          'Oscilloscope probe attached to SPI MOSI and SCK pins verifying clock frequency, phase timing (CPHA=0, CPOL=0), and signal slew rate.',
          'Logic analyzer captures confirming I2C Start condition, 7-bit peripheral address transmission, Slave ACK, and Stop bit generation.',
          'Continuous 48-hour hardware toggle test verifying zero memory leaks or unhandled HardFault exceptions.'
        ],
        metrics: [
          'Binary size reduction: Over 65% smaller flash footprint compared to default vendor HAL libraries.',
          'Execution latency: Deterministic GPIO toggling in 2 CPU cycles using BSRR register dereferencing.'
        ]
      },
      results: {
        outcomes: [
          'Production-ready, modular driver suite providing direct, deterministic hardware access.',
          '17 structured Git commits with self-contained driver examples and Make build targets.',
          'Documented register maps and verification scripts enabling seamless reuse across Cortex-M0 silicon.'
        ],
        keyTakeaway: 'Deep register-level mastery delivers unmatched timing control, minimal binary footprint, and true hardware diagnostic capability.'
      }
    }
  },
  {
    id: 'smart-number-plating',
    slug: 'smart-number-plating',
    title: 'Smart Number Plating System for Vehicle Theft Detection',
    subtitle: 'FreeRTOS-based embedded automotive prototype',
    category: 'RTOS & Automotive Systems',
    description: 'Built FreeRTOS-based real-time firmware for an automotive prototype combining RFID protocol handling, GPS integration and closed-loop control logic.',
    technologies: ['FreeRTOS', 'Embedded C', 'RFID', 'GPS', 'Queues', 'Semaphores', 'OpenOCD', 'GDB', 'UART', 'SPI'],
    metadata: {
      status: 'Functional Hardware Prototype',
      targetHardware: 'ARM Cortex-M / Microcontroller target',
      codeStyle: 'Preemptive RTOS, thread-safe message queues'
    },
    details: {
      overview: 'An embedded automotive telematics prototype designed to detect vehicle theft through authenticated RFID electronic license plate validation and GPS geofencing. Operating under FreeRTOS, the system maintains strict real-time deadlines between sensor telemetry, wireless communications, and ignition solenoid actuator control.',
      architecture: {
        diagramSteps: [
          'SENSORS (RFID Reader + GPS NMEA Stream)',
          'INTERRUPTS (UART ISR & SPI DMA End-of-Transfer)',
          'FREERTOS TASKS (rfidTask, gpsTask, telemetryTask, actuatorTask)',
          'QUEUES / SEMAPHORES (xQueueSendFromISR, binary semaphores for mutual exclusion)',
          'CONTROL LOGIC (Theft classification & state-machine evaluation)',
          'ACTUATOR (Relay / Ignition cut-off solenoid with safety interlocks)'
        ],
        description: 'Multi-threaded priority architecture. The RFID tag reader and GPS NMEA parser operate as independent tasks communicating through thread-safe FreeRTOS message queues. Critical security alerts preempt lower-priority logging tasks to activate the actuator within deterministically bounded latency.'
      },
      implementation: {
        points: [
          'Engineered FreeRTOS task hierarchy with strict priority assignments (ActuatorTask: Priority 4, RFIDTask: Priority 3, GPSTask: Priority 2, LogTask: Priority 1).',
          'Utilized FreeRTOS queues (xQueueCreate, xQueueSendFromISR) to transfer raw GPS coordinates and RFID UID tokens without blocking ISR contexts.',
          'Implemented mutex-protected shared state for vehicle location coordinates, eliminating telemetry corruption.',
          'Authored circular ring buffers for handling continuous GPS UART streams at 9600 baud with hardware DMA.'
        ],
        codeSnippet: {
          title: 'freertos_tasks.c - Deterministic ISR to Queue Dispatch',
          language: 'c',
          code: `/* RFID UART Interrupt Service Routine */
void USART2_IRQHandler(void) {
    BaseType_t xHigherPriorityTaskWoken = pdFALSE;
    uint8_t rxByte;

    if (USART2->SR & USART_SR_RXNE) {
        rxByte = (uint8_t)(USART2->DR & 0xFF);
        
        /* Send byte into bounded queue without blocking ISR */
        xQueueSendFromISR(xRfidByteQueue, &rxByte, &xHigherPriorityTaskWoken);
        
        /* Preempt immediately if a higher priority task is unblocked */
        portYIELD_FROM_ISR(xHigherPriorityTaskWoken);
    }
}

/* Real-Time Theft Evaluation Task */
void vTheftEvaluationTask(void *pvParameters) {
    VehicleStatus_t status;
    for (;;) {
        /* Block until vehicle status token arrives from sensor queues */
        if (xQueueReceive(xVehicleStatusQueue, &status, portMAX_DELAY) == pdTRUE) {
            if (status.isUnauthorizedMovement && !status.isRfidAuthenticated) {
                // Trigger audible warning & lock ignition solenoid
                vActuator_TriggerLockout();
            }
        }
    }
}`
        }
      },
      debugging: {
        challenges: [
          'UART FIFO overrun during high-frequency GPS bursts: Fixed by implementing DMA circular buffer mode instead of per-byte interrupts.',
          'Priority inversion risk: Resolved by utilizing FreeRTOS Mutex with built-in priority inheritance rather than raw binary semaphores on shared telemetry structures.',
          'Stack overflow detection: Enabled FreeRTOS configCHECK_FOR_STACK_OVERFLOW (Method 2) to size task stacks accurately for deep NMEA string parsing.'
        ],
        instrumentsUsed: ['GDB / OpenOCD for FreeRTOS thread awareness', 'Logic analyzer on UART RX/TX and Actuator GPIO lines']
      },
      validation: {
        methods: [
          'Measured worst-case task latency using logic analyzer pin toggles at ISR entry and actuator engagement.',
          'Simulated continuous invalid RFID attempts while saturating the GPS UART link to test RTOS scheduler resilience.'
        ],
        metrics: [
          'Actuator response time: < 45 ms from theft confirmation to ignition cut-off pulse.',
          'CPU utilization: Maintained < 28% peak load under full telemetry acquisition.'
        ]
      },
      results: {
        outcomes: [
          'Demonstrated deterministic real-time behavior under concurrent sensor streams.',
          'Achieved robust fail-safe states preventing accidental lockout during legitimate operation.',
          'Verified thread-safe inter-task communication with zero deadlocks during multi-hour soak tests.'
        ],
        keyTakeaway: 'Deterministic RTOS systems require thoughtful priority assignment, non-blocking ISR design, and rigorous timing verification.'
      }
    }
  },
  {
    id: 'gravel-compiler',
    slug: 'gravel-compiler',
    title: 'Gravel Programming Language Compiler',
    subtitle: 'Open Source Contribution',
    category: 'Compilers & Low-Level Infrastructure',
    description: 'Contributed to compiler backend infrastructure including AST construction, tokenizer refinement, and LLVM code generation pipelines.',
    technologies: ['C / C++', 'LLVM', 'Compiler Backend', 'Lexical Analysis', 'AST', 'Git', 'Linux'],
    repositoryUrl: 'https://github.com/Pacsfury/Gravel-Launcher',
    metadata: {
      status: 'Merged Open Source Contribution',
      contributionType: 'Backend compiler architecture & code generation',
      community: 'Pacsfury / Gravel Language'
    },
    contributions: [
      'Tokenizer refinement',
      'Lexical Analysis',
      'AST Construction',
      'LLVM Code Generation',
      'Memory Management',
      'Code Generation Optimization'
    ],
    details: {
      overview: 'Open source contribution to the Gravel programming language project. Contributed to low-level compiler backend stages, transforming source code into abstract syntax trees (AST) and lowering representations into LLVM Intermediate Representation (IR) for machine code synthesis.',
      architecture: {
        diagramSteps: [
          'SOURCE CODE (.grv input file)',
          'TOKENIZER / LEXICAL ANALYZER (Token stream generation)',
          'PARSER & AST BUILDER (Hierarchical syntax node tree)',
          'SEMANTIC ANALYSIS & SYMBOL RESOLUTION (Type validation)',
          'LLVM IR CODE GENERATION (Lowering into SSA-form instructions)',
          'LLVM OPTIMIZATION PASSES (Instruction combining & dead code elimination)',
          'TARGET MACHINE CODE / BINARY EMISSION (Native machine instructions)'
        ],
        description: 'Compiler pipeline following standard multi-pass compilation architecture. Focused on AST construction purity, memory safety during node allocation, and seamless lowering to LLVM IR constructs.'
      },
      implementation: {
        points: [
          'Implemented lexer improvements handling complex numeric literal suffixes and escape sequences.',
          'Enhanced Abstract Syntax Tree (AST) node structures to retain accurate source code line and column metadata for error diagnostics.',
          'Contributed to the LLVM IR code generation visitor, mapping high-level language control-flow and arithmetic expressions into Single Static Assignment (SSA) instructions.',
          'Ensured rigorous memory allocation and lifetime handling across AST node trees to prevent memory leaks in large compilation units.'
        ],
        codeSnippet: {
          title: 'ast_llvm_codegen.cpp - Lowering Binary Expressions to LLVM IR',
          language: 'cpp',
          code: `// Lowering binary arithmetic nodes into LLVM SSA instructions
llvm::Value* BinaryExprAST::codegen(CodegenContext& context) {
    llvm::Value* L = LHS->codegen(context);
    llvm::Value* R = RHS->codegen(context);
    if (!L || !R) return nullptr;

    switch (Op) {
        case Token::PLUS:
            return context.builder.CreateAdd(L, R, "addtmp");
        case Token::MINUS:
            return context.builder.CreateSub(L, R, "subtmp");
        case Token::STAR:
            return context.builder.CreateMul(L, R, "multmp");
        case Token::SLASH:
            return context.builder.CreateSDiv(L, R, "divtmp");
        case Token::BIT_AND:
            return context.builder.CreateAnd(L, R, "andtmp");
        case Token::BIT_OR:
            return context.builder.CreateOr(L, R, "ortmp");
        default:
            return context.error("Invalid binary operator");
    }
}`
        }
      },
      debugging: {
        challenges: [
          'SSA form compliance: Resolved LLVM IR verification assertions where variables were mutated without phi nodes.',
          'Memory lifecycle in AST trees: Fixed dangling pointer issues in operator precedence climbing passes using smart pointer ownership models.'
        ],
        instrumentsUsed: ['GDB / Valgrind for memory tracking', 'LLVM FileCheck for IR regression tests', 'Git for collaborative code reviews']
      },
      validation: {
        methods: [
          'Passed comprehensive compiler test suite verifying tokenization, AST consistency, and valid LLVM IR emissions.',
          'Code review and collaborative merge into master branch after validation on Linux test runners.'
        ],
        metrics: [
          'Pull request successfully reviewed and merged by project maintainers.',
          '100% pass rate across compiler unit tests for updated lexical tokens.'
        ]
      },
      results: {
        outcomes: [
          'Demonstrated capability to understand and contribute to large, multi-file low-level C/C++ codebases.',
          'Practical application of compiler architecture, AST transformations, and LLVM toolchains.',
          'Proved low-level software acumen that directly translates to firmware optimization and instruction-level comprehension.'
        ],
        keyTakeaway: 'Understanding how high-level code compiles down to LLVM IR and machine instructions gives deep intuition when writing performance-critical embedded firmware.'
      }
    }
  }
];

export const SKILL_CATEGORIES: SkillCategoryData[] = [
  {
    id: 'firmware',
    number: '01',
    title: 'FIRMWARE & EMBEDDED SYSTEMS',
    description: 'Low-level software development, RTOS scheduling, and direct silicon control.',
    skills: [
      'Embedded C',
      'Embedded C++',
      'Bare-metal Programming',
      'Device Driver Development',
      'FreeRTOS',
      'Interrupt Handling',
      'ISR Design',
      'Real-Time Scheduling',
      'Memory Management',
      'Mutexes',
      'Semaphores',
      'Hardware Abstraction Layers',
      'Register-Level Programming'
    ]
  },
  {
    id: 'mcu-arch',
    number: '02',
    title: 'MICROCONTROLLERS & ARCHITECTURE',
    description: 'Processor core architectures, instruction sets, and silicon families.',
    skills: [
      'ARM Cortex-M0',
      'ARM Cortex-M3',
      'ARM Cortex-M4',
      'STM32F0',
      'STM32L0',
      'STM32H7',
      'RISC-V',
      'RISC-V ISA'
    ]
  },
  {
    id: 'peripherals',
    number: '03',
    title: 'PERIPHERALS',
    description: 'Hardware peripheral configuration, clocking, and direct register control.',
    skills: [
      'GPIO',
      'ADC',
      'DAC',
      'PWM',
      'Timers',
      'EXTI',
      'NVIC',
      'DMA',
      'RTC',
      'Watchdog Timers',
      'Clock Management',
      'Power Management'
    ]
  },
  {
    id: 'communication',
    number: '04',
    title: 'COMMUNICATION PROTOCOLS',
    description: 'Serial buses, industrial protocols, and wireless connectivity interfaces.',
    skills: [
      'UART',
      'USART',
      'SPI',
      'I2C',
      'CAN',
      'Modbus RTU',
      'Modbus TCP',
      'BLE',
      'WiFi fundamentals',
      'TCP/IP',
      'GPIO communication'
    ]
  },
  {
    id: 'hardware-debugging',
    number: '05',
    title: 'HARDWARE DEBUGGING & BRING-UP',
    description: 'Physical instrumentation, signal measurement, and hardware-software co-debugging.',
    skills: [
      'Oscilloscope',
      'Logic Analyzer',
      'JTAG',
      'GDB',
      'OpenOCD',
      'Protocol Analyzer',
      'Schematic Reading',
      'PCB Troubleshooting',
      'Hardware Bring-up',
      'Timing Analysis',
      'Signal Integrity',
      'Sensor Interface Validation'
    ]
  },
  {
    id: 'dev-tools',
    number: '06',
    title: 'DEVELOPMENT TOOLS & INFRASTRUCTURE',
    description: 'Cross-compilation toolchains, build systems, and containerized development.',
    skills: [
      'GCC',
      'ARM Embedded Toolchain',
      'GNU Binutils',
      'Make',
      'CMake',
      'GDB',
      'OpenOCD',
      'Git',
      'GitHub',
      'Jenkins',
      'Docker',
      'STM32CubeMX',
      'Linux',
      'Simulators',
      'Emulators'
    ]
  }
];

export const TECHNICAL_FOUNDATIONS = [
  {
    category: 'Microcontroller Platforms',
    items: ['STM32', 'RISC-V', 'ARM Cortex-M0/M3/M4']
  },
  {
    category: 'Programming Languages',
    items: ['C', 'C++', 'Assembly', 'ARM Assembly', 'RISC-V Assembly']
  },
  {
    category: 'Operating Systems & Kernels',
    items: ['FreeRTOS', 'Embedded Linux fundamentals', 'Bare-metal RTOS concepts']
  },
  {
    category: 'Development & Build Systems',
    items: ['GCC', 'Clang', 'GDB', 'OpenOCD', 'Make', 'CMake', 'Git', 'GitHub', 'Jenkins', 'Docker']
  },
  {
    category: 'Instrumentation & Test Benches',
    items: ['Oscilloscopes', 'Logic Analyzers', 'Multimeters', 'Protocol Analyzers', 'Signal Generators']
  }
];

export const KEY_STRENGTHS: StrengthItem[] = [
  {
    id: 1,
    title: 'HARDWARE-SOFTWARE INTEGRATION',
    description: 'Comfortable debugging at register level and understanding hardware behavior through firmware.',
    metricLabel: 'SILICON ↔ CODE'
  },
  {
    id: 2,
    title: 'REAL-TIME SYSTEMS',
    description: 'Understands deterministic behavior, task priorities, interrupt safety and timing constraints.',
    metricLabel: 'DETERMINISM'
  },
  {
    id: 3,
    title: 'PROBLEM SOLVING',
    description: 'Uses systematic measurement and debugging to isolate hardware and firmware failures.',
    metricLabel: 'INSTRUMENT-FIRST'
  },
  {
    id: 4,
    title: 'CROSS-FUNCTIONAL COLLABORATION',
    description: 'Works across firmware, PCB, hardware and systems engineering.',
    metricLabel: 'SYSTEMS BRIDGING'
  },
  {
    id: 5,
    title: 'DOCUMENTATION & CODE QUALITY',
    description: 'Maintains clean, buildable repositories with proper build systems and technical documentation.',
    metricLabel: 'STANDARDS-COMPLIANT'
  },
  {
    id: 6,
    title: 'RAPID PROTOTYPING',
    description: 'Comfortable with iterative hardware-firmware validation cycles.',
    metricLabel: 'BRING-UP SPEED'
  }
];

export const FEATURED_REPOSITORIES = [
  {
    name: 'Driver-for-STM32F030x4-x6-x8-xC',
    fullName: 'varunkumarjob898/Driver-for-STM32F030x4-x6-x8-xC',
    url: 'https://github.com/varunkumarjob898/Driver-for-STM32F030x4-x6-x8-xC',
    description: 'Register-level device drivers for STM32F030 ARM Cortex-M0 microcontrollers. Implemented 8 core peripherals (GPIO, RCC, NVIC, SYSCFG, EXTI, ADC, SPI, I2C) from reference manuals.',
    language: 'C',
    languageColor: '#555555',
    commits: '17 commits',
    status: 'Production Ready',
    target: 'ARM Cortex-M0',
    tags: ['Embedded C', 'Bare-Metal', 'STM32F030', 'Device Drivers', 'Makefile']
  },
  {
    name: 'Gravel-Launcher',
    fullName: 'Pacsfury/Gravel-Launcher',
    url: 'https://github.com/Pacsfury/Gravel-Launcher',
    description: 'Contributed to compiler backend infrastructure including AST construction, tokenizer refinement, and LLVM code generation optimization. Merged pull request.',
    language: 'C++',
    languageColor: '#f34b7d',
    commits: 'Merged PR',
    status: 'Merged Contribution',
    target: 'LLVM Backend',
    tags: ['C++', 'Compilers', 'LLVM', 'Lexer', 'AST']
  },
  {
    name: 'Smart-Number-Plating-Firmware',
    fullName: 'varunkumarjob898/Smart-Number-Plating-Firmware',
    url: 'https://github.com/varunkumarjob898',
    description: 'Real-time FreeRTOS automotive firmware combining RFID tag authentication, GPS geofencing telemetry, and ignition lockout actuator control logic.',
    language: 'C',
    languageColor: '#555555',
    commits: 'Active Prototype',
    status: 'Hardware Validated',
    target: 'FreeRTOS / ARM',
    tags: ['FreeRTOS', 'Embedded C', 'RFID', 'GPS', 'Queues']
  }
];

export const LAB_WORKFLOW_STEPS = [
  { step: '01', title: 'OBSERVE', desc: 'Identify unexpected behavior, communication faults, or reset triggers.' },
  { step: '02', title: 'REPRODUCE', desc: 'Create minimal test firmware to trigger the issue deterministically.' },
  { step: '03', title: 'MEASURE', desc: 'Probe physical pins with oscilloscope and logic analyzer for timing violations.' },
  { step: '04', title: 'ISOLATE', desc: 'Inspect peripheral registers, clock configuration, and interrupt vectors via GDB.' },
  { step: '05', title: 'DEBUG', desc: 'Correct register bitfields, timing delays, or task synchronization locks.' },
  { step: '06', title: 'VALIDATE', desc: 'Verify physical waveforms, packet decode integrity, and long-term stability.' }
];

export const DEBUGGING_FLOWCHART = [
  { id: '1', label: 'FIRMWARE PROBLEM' },
  { id: '2', label: 'CHECK REGISTERS' },
  { id: '3', label: 'VERIFY CLOCK' },
  { id: '4', label: 'CHECK PERIPHERAL CONFIGURATION' },
  { id: '5', label: 'MEASURE SIGNAL' },
  { id: '6', label: 'CHECK TIMING' },
  { id: '7', label: 'TRACE FIRMWARE' },
  { id: '8', label: 'VALIDATE ON SILICON' }
];

export const LAB_INSTRUMENTS = [
  { name: 'Oscilloscope', role: 'Rise/fall time measurement, signal noise, bus ringing, analog sensor validation.' },
  { name: 'Logic Analyzer', role: 'Protocol packet decode (UART/SPI/I2C/CAN), state machine timing verification.' },
  { name: 'GDB', role: 'Hardware breakpoints, register inspection, call stack unwinding, memory dumping.' },
  { name: 'OpenOCD', role: 'SWD/JTAG in-circuit emulator server, flash programming, target control.' },
  { name: 'JTAG / SWD', role: 'Hardware debug interface directly communicating with ARM/RISC-V debug cores.' },
  { name: 'Multimeter', role: 'Supply voltage rail stability, current draw profiling, continuity checks.' },
  { name: 'Protocol Analyzer', role: 'Frame-level protocol decoding, CRC checksum verification, bus arbitration.' }
];
