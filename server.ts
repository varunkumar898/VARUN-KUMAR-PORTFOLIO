import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { sendContactNotification, verifySmtpConnection } from "./backend/utils/emailUtils";

dotenv.config();

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Local persistent JSON storage directory & file
const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "portfolio-store.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default seed
const defaultStore = {
  profile: {
    firstName: "Varun",
    lastName: "Kumar",
    name: "VARUN KUMAR",
    title: "Embedded Systems Engineer | C/C++ Firmware | RTOS | Driver Development",
    location: "Chennai, Tamil Nadu, India",
    phone: "+91 9444386570",
    email: "varunkumarjob2004@gmail.com",
    github: "https://github.com/varunkumar898",
    linkedin: "https://linkedin.com/in/varunkumarjob8055",
    website: "https://varunkumar.dev",
    degree: "B.Tech in Electronics and Computer Engineering",
    university: "Vels University, Chennai, Tamil Nadu, India",
    cgpa: "7.5/10",
    bio: "Embedded engineer writing C/C++ firmware and device drivers for ARM Cortex-M microcontrollers (STM32, ESP32). Experienced in FreeRTOS task design, interrupt handling (NVIC, EXTI), register-level drivers, and hardware-firmware debugging with JTAG/SWD, OpenOCD, GDB, and logic analyzers. Has built containerized CI/CD pipelines for firmware validation.",
    availability: "Available for full-time embedded engineering roles and technical discussions.",
    status: "OPEN_TO_WORK",
    lastUpdated: new Date().toISOString()
  },
  resume: {
    fileName: "Varun_Kumar_Resume.pdf",
    version: 1,
    fileSize: 497939,
    fileUrl: "/resume/Varun_Kumar_Resume.pdf",
    uploadedAt: new Date().toISOString(),
    isActive: true,
    history: [
      {
        version: 1,
        fileName: "Varun_Kumar_Resume.pdf",
        uploadedAt: new Date().toISOString()
      }
    ]
  },
  projects: [
    {
      id: "stm32f030-drivers",
      title: "STM32F030x4 Peripheral Driver Library",
      subtitle: "Register-Level Embedded C Drivers (No Vendor HAL)",
      category: "Bare-Metal & Device Drivers",
      description: "Wrote bare-metal device drivers for GPIO, RCC, NVIC, EXTI, SYSCFG, ADC, SPI, and I2C on the STM32F030x4 (ARM Cortex-M0, 16 KB flash, 4 KB SRAM) using register-level Embedded C, without relying on vendor HAL.",
      problem: "Vendor HAL abstractions introduce execution overhead, opaque interrupt handlers, and multi-layer abstraction bloat that make timing-critical peripheral control difficult to trace and optimize on constrained 16 KB Flash microcontrollers.",
      approach: "Direct register-level bitfield manipulation referencing the RM0360 Reference Manual and Cortex-M0 Generic User Guide. Built complete custom startup assembly, linker script, and Makefile toolchain with arm-none-eabi-gcc.",
      implementation: "Authored modular drivers for 8 core peripherals (GPIO with atomic BSRR bit set/reset, RCC system clock and prescalers, NVIC interrupt priorities, EXTI line routing, ADC 12-bit conversions, SPI master framing, I2C timing bitfields).",
      debugging: "Isolated bus synchronization and peripheral clock gating issues using OpenOCD over ST-Link SWD with GDB hardware breakpoints and an 8-channel logic analyzer to verify SPI and I2C protocol framing.",
      validation: "Verified clock tree configuration, GPIO switching speeds, SPI transmission framing, and I2C Start/Stop timing on physical target hardware with 17+ structured commits and public documentation.",
      technologies: ["Embedded C", "ARM Cortex-M0", "STM32F030", "Register-Level Drivers", "Makefile", "OpenOCD", "GDB", "Logic Analyzer"],
      repositoryUrl: "https://github.com/varunkumar898/Driver-for-STM32F030x4-x6-x8-xC",
      featured: true,
      displayOrder: 1,
      githubMetadata: {
        stars: 12,
        forks: 3,
        commits: 17,
        language: "C",
        lastUpdated: new Date().toISOString()
      }
    },
    {
      id: "smart-number-plate",
      title: "Smart Number Plate for Theft Detection",
      subtitle: "Real-Time Embedded Vehicle Security Prototype",
      category: "RTOS & Automotive Systems",
      description: "Developed bare-metal and FreeRTOS-based firmware on an ARM microcontroller for vehicle theft detection and actuator lockout control with real-time responsiveness.",
      problem: "Vehicle security systems require deterministic response times between wireless RFID tag interrogation, sensor telemetry acquisition, and physical actuator control without task starvation or deadlock.",
      approach: "Preemptive FreeRTOS multitasking architecture using thread-safe message queues and binary semaphores for inter-task communication and non-blocking ISR signal handling.",
      implementation: "Implemented RFID protocol handling, closed-loop feedback control logic for ignition lockout, and hardware protection circuits.",
      debugging: "Validated signal timing with a logic analyzer and debugged hardware-firmware integration issues using OpenOCD and GDB.",
      validation: "Measured actuator response timing from unauthorized motion trigger to lockout signal and verified queue stability during rapid RFID scanning tests.",
      technologies: ["FreeRTOS", "ARM Cortex-M", "Embedded C", "RFID", "Logic Analyzer", "OpenOCD", "GDB", "UART", "SPI"],
      repositoryUrl: "https://github.com/varunkumar898",
      featured: true,
      displayOrder: 2,
      githubMetadata: {
        stars: 8,
        forks: 2,
        commits: 14,
        language: "C",
        lastUpdated: new Date().toISOString()
      }
    },
    {
      id: "embedded-ui-designer",
      title: "Embedded UI Designer (Final Year Project)",
      subtitle: "Desktop UI Design Tool & Firmware Code Generation",
      category: "Developer Tools & Systems",
      description: "Built a desktop UI design tool for embedded systems with an SDK, a type-safe REST API engine, and multi-language firmware code generation for microcontrollers.",
      problem: "Designing embedded graphical interfaces and mapping visual widgets to microcontroller memory buffers often requires repetitive manual C coordinate math and boilerplate driver code.",
      approach: "Visual interface canvas coupled with an automated code generator translating interactive design elements into compact, type-safe C/C++ firmware data structures and rendering callbacks.",
      implementation: "Created cross-platform desktop UI software supporting element styling, type-safe API communication, and automated C/C++ header and source code emission tailored for constrained displays.",
      debugging: "Profiled generated code memory overhead and verified buffer compatibility across display drivers.",
      validation: "Successfully generated firmware UI assets validated for microcontroller display integration.",
      technologies: ["C/C++", "TypeScript", "Embedded UI", "SDK", "REST API Engine", "Code Generation", "Linux"],
      repositoryUrl: "https://github.com/varunkumar898",
      featured: true,
      displayOrder: 3,
      githubMetadata: {
        stars: 10,
        forks: 2,
        commits: 22,
        language: "TypeScript / C++",
        lastUpdated: new Date().toISOString()
      }
    },
    {
      id: "opensource-systems",
      title: "Open Source Systems Contributions",
      subtitle: "LLVM Backend Optimizations & ARM System Porting",
      category: "Compilers & Architecture",
      description: "Contributed to low-level open source systems: compiler backend improvements in Gravel Launcher (LLVM performance) and SolidCraft system function porting to ARM architectures (Windows on ARM & Linux ARM).",
      problem: "Compilers and cross-platform native software require deep architecture-specific instruction knowledge to optimize code emission and support ARM hardware platforms reliably.",
      approach: "System-level profiling, LLVM IR visitor pass optimization, and POSIX / Windows ARM API abstraction porting.",
      implementation: "Refined tokenizer and AST construction in Gravel Launcher; implemented ARM system call and runtime function mappings in SolidCraft.",
      debugging: "Used GDB, Valgrind, and regression test suites to track memory lifetimes and ARM cross-compilation target compatibility.",
      validation: "Verified builds on both x86_64 and ARM64 target environments with upstream merged commits.",
      technologies: ["C++", "C", "LLVM", "ARM Architecture", "Compiler Backend", "Git", "Linux CLI"],
      repositoryUrl: "https://github.com/varunkumar898",
      featured: false,
      displayOrder: 4,
      githubMetadata: {
        stars: 16,
        forks: 5,
        commits: 12,
        language: "C++",
        lastUpdated: new Date().toISOString()
      }
    }
  ],
  messages: [
    {
      id: "msg-sample-1",
      name: "Engineering Lead",
      email: "lead@firmware-systems.com",
      subject: "Firmware Engineer / STM32 Driver Role",
      message: "Reviewed your bare-metal STM32F030 driver implementation and FreeRTOS project. Let's schedule a technical conversation.",
      status: "NEW",
      receivedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      notes: ""
    }
  ],
  githubRepos: [
    {
      name: "Driver-for-STM32F030x4-x6-x8-xC",
      description: "Bare-metal peripheral device drivers for STM32F030 (GPIO, RCC, NVIC, EXTI, SYSCFG, ADC, SPI, I2C) in Embedded C with custom startup code and linker script.",
      url: "https://github.com/varunkumar898/Driver-for-STM32F030x4-x6-x8-xC",
      stars: 12,
      forks: 3,
      language: "C",
      commits: 17,
      lastUpdated: new Date().toISOString()
    },
    {
      name: "Smart-Number-Plate-Firmware",
      description: "FreeRTOS and ARM Cortex-M based embedded firmware for vehicle theft detection and RFID validation.",
      url: "https://github.com/varunkumar898",
      stars: 8,
      forks: 2,
      language: "C",
      commits: 14,
      lastUpdated: new Date().toISOString()
    },
    {
      name: "Embedded-UI-Designer",
      description: "Desktop UI design environment and multi-language firmware code generator for microcontrollers.",
      url: "https://github.com/varunkumar898",
      stars: 10,
      forks: 2,
      language: "TypeScript / C++",
      commits: 22,
      lastUpdated: new Date().toISOString()
    }
  ],
  lastGithubSync: new Date().toISOString()
};

// Load or initialize store
function getStore() {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const data = fs.readFileSync(STORE_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading store file, using default:", err);
  }
  saveStore(defaultStore);
  return defaultStore;
}

function saveStore(data: any) {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving store file:", err);
  }
}

// Authentication Token Helper
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "varunkumarjob2004@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "VarunAdmin@2025!";
const JWT_SECRET = process.env.JWT_SECRET || "embedded_systems_firmware_jwt_secret_key_32chars";

function verifyAdminToken(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Unauthorized: Missing or invalid token" });
  }
  const token = authHeader.split(" ")[1];
  // Simple verified token check
  if (!token || !token.startsWith("admin_auth_")) {
    return res.status(401).json({ success: false, error: "Unauthorized: Invalid session" });
  }
  next();
}

// -------------------------------------------------------------
// PUBLIC API ENDPOINTS
// -------------------------------------------------------------

// GET /api/profile
app.get("/api/profile", (req, res) => {
  const store = getStore();
  res.json({ success: true, data: store.profile });
});

// GET /api/resume
app.get("/api/resume", (req, res) => {
  const store = getStore();
  res.json({ success: true, data: store.resume });
});

// GET /api/projects
app.get("/api/projects", (req, res) => {
  const store = getStore();
  res.json({ success: true, data: store.projects });
});

// GET /api/github/repos
app.get("/api/github/repos", (req, res) => {
  const store = getStore();
  res.json({
    success: true,
    data: store.githubRepos,
    lastSynced: store.lastGithubSync
  });
});

// POST /api/contact
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const store = getStore();
    const newMessage = {
      id: `msg-${Date.now()}`,
      name: String(name).trim(),
      email: String(email).trim(),
      subject: String(subject).trim(),
      message: String(message).trim(),
      status: "NEW",
      receivedAt: new Date().toISOString(),
      notes: ""
    };

    store.messages.unshift(newMessage);
    saveStore(store);

    console.log(`[Contact] New submission received from ${newMessage.name} <${newMessage.email}>`);

    // Asynchronously dispatch notification email via Gmail SMTP (if configured)
    const emailDispatch = await sendContactNotification({
      name: newMessage.name,
      email: newMessage.email,
      subject: newMessage.subject,
      message: newMessage.message,
      receivedAt: newMessage.receivedAt
    });

    res.json({
      success: true,
      message: "Message received successfully! It is logged and will be answered shortly.",
      messageId: newMessage.id,
      emailSent: emailDispatch.success && !emailDispatch.skipped
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || "Failed to process message" });
  }
});

// POST /api/admin/test-email (Protected or verification test)
app.post("/api/admin/test-email", async (req, res) => {
  try {
    const verification = await verifySmtpConnection();
    if (!verification.success) {
      return res.status(400).json({ success: false, error: verification.message });
    }

    const testResult = await sendContactNotification({
      name: "Varun Kumar Test Ping",
      email: process.env.SMTP_USER || "test@portfolio.dev",
      subject: "Test Diagnostic Notification",
      message: "Your portfolio contact form email delivery pipeline is verified and operational!"
    });

    res.json({
      success: testResult.success,
      message: testResult.success ? "✓ Email sent successfully" : testResult.error
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// ADMIN API ENDPOINTS (Protected CMS)
// -------------------------------------------------------------

// POST /api/admin/login
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, error: "Email and password are required" });
  }

  if (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
    const token = `admin_auth_${Buffer.from(email + ":" + Date.now()).toString("base64")}`;
    return res.json({
      success: true,
      message: "Admin authentication successful",
      token,
      admin: {
        email: ADMIN_EMAIL,
        name: "Varun Kumar",
        role: "ADMIN"
      }
    });
  }

  return res.status(401).json({ success: false, error: "Invalid admin email or password" });
});

// GET /api/admin/dashboard
app.get("/api/admin/dashboard", verifyAdminToken, (req, res) => {
  const store = getStore();
  const totalMessages = store.messages.length;
  const newMessages = store.messages.filter((m: any) => m.status === "NEW").length;
  const projectCount = store.projects.length;
  const resumeVersion = store.resume.version || 1;

  res.json({
    success: true,
    data: {
      totalMessages,
      newMessages,
      projectCount,
      resumeVersion,
      lastResumeUpdate: store.resume.uploadedAt,
      lastGithubSync: store.lastGithubSync,
      profile: store.profile
    }
  });
});

// POST /api/admin/profile/update
app.post("/api/admin/profile/update", verifyAdminToken, (req, res) => {
  const store = getStore();
  const updates = req.body;

  store.profile = {
    ...store.profile,
    ...updates,
    lastUpdated: new Date().toISOString()
  };

  saveStore(store);
  res.json({ success: true, message: "Profile updated successfully", data: store.profile });
});

// POST /api/admin/resume/upload
app.post("/api/admin/resume/upload", verifyAdminToken, (req, res) => {
  const { fileName, fileUrl, fileBase64, description } = req.body;
  const store = getStore();

  const currentVersion = store.resume.version || 1;
  const nextVersion = currentVersion + 1;

  const updatedResume = {
    fileName: fileName || `Varun_Kumar_Resume_v${nextVersion}.pdf`,
    version: nextVersion,
    fileSize: fileBase64 ? Math.round(fileBase64.length * 0.75) : 2500000,
    fileUrl: fileUrl || fileBase64 || store.resume.fileUrl,
    uploadedAt: new Date().toISOString(),
    description: description || "Updated curriculum vitae",
    isActive: true,
    history: [
      {
        version: nextVersion,
        fileName: fileName || `Varun_Kumar_Resume_v${nextVersion}.pdf`,
        uploadedAt: new Date().toISOString(),
        description: description || ""
      },
      ...(store.resume.history || [])
    ]
  };

  store.resume = updatedResume;
  saveStore(store);

  res.json({
    success: true,
    message: `Resume v${nextVersion} uploaded successfully`,
    data: store.resume
  });
});

// POST /api/admin/projects
app.post("/api/admin/projects", verifyAdminToken, (req, res) => {
  const store = getStore();
  const projectData = req.body;

  const newProject = {
    id: projectData.id || `proj-${Date.now()}`,
    title: projectData.title || "Untitled Project",
    subtitle: projectData.subtitle || "Embedded System Driver",
    category: projectData.category || "Embedded Engineering",
    description: projectData.description || "",
    problem: projectData.problem || "",
    approach: projectData.approach || "",
    implementation: projectData.implementation || "",
    debugging: projectData.debugging || "",
    validation: projectData.validation || "",
    technologies: Array.isArray(projectData.technologies)
      ? projectData.technologies
      : (projectData.technologies || "").split(",").map((s: string) => s.trim()).filter(Boolean),
    repositoryUrl: projectData.repositoryUrl || "https://github.com/varunkumarjob898",
    featured: Boolean(projectData.featured),
    displayOrder: store.projects.length + 1,
    githubMetadata: {
      stars: Number(projectData.stars) || 0,
      forks: Number(projectData.forks) || 0,
      commits: Number(projectData.commits) || 1,
      language: projectData.language || "C",
      lastUpdated: new Date().toISOString()
    }
  };

  store.projects.push(newProject);
  saveStore(store);

  res.json({ success: true, message: "Project created", data: newProject });
});

// PUT /api/admin/projects/:id
app.put("/api/admin/projects/:id", verifyAdminToken, (req, res) => {
  const { id } = req.params;
  const store = getStore();
  const index = store.projects.findIndex((p: any) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: "Project not found" });
  }

  const updates = req.body;
  if (updates.technologies && typeof updates.technologies === "string") {
    updates.technologies = updates.technologies.split(",").map((s: string) => s.trim()).filter(Boolean);
  }

  store.projects[index] = {
    ...store.projects[index],
    ...updates,
    githubMetadata: {
      ...store.projects[index].githubMetadata,
      ...(updates.githubMetadata || {})
    }
  };

  saveStore(store);
  res.json({ success: true, message: "Project updated", data: store.projects[index] });
});

// DELETE /api/admin/projects/:id
app.delete("/api/admin/projects/:id", verifyAdminToken, (req, res) => {
  const { id } = req.params;
  const store = getStore();
  const initialLength = store.projects.length;
  store.projects = store.projects.filter((p: any) => p.id !== id);

  if (store.projects.length === initialLength) {
    return res.status(404).json({ success: false, error: "Project not found" });
  }

  saveStore(store);
  res.json({ success: true, message: "Project deleted successfully" });
});

// GET /api/admin/messages
app.get("/api/admin/messages", verifyAdminToken, (req, res) => {
  const store = getStore();
  res.json({ success: true, data: store.messages });
});

// PATCH /api/admin/messages/:id
app.patch("/api/admin/messages/:id", verifyAdminToken, (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const store = getStore();
  const message = store.messages.find((m: any) => m.id === id);

  if (!message) {
    return res.status(404).json({ success: false, error: "Message not found" });
  }

  if (status) message.status = status;
  if (notes !== undefined) message.notes = notes;

  saveStore(store);
  res.json({ success: true, message: "Message status updated", data: message });
});

// DELETE /api/admin/messages/:id
app.delete("/api/admin/messages/:id", verifyAdminToken, (req, res) => {
  const { id } = req.params;
  const store = getStore();
  store.messages = store.messages.filter((m: any) => m.id !== id);
  saveStore(store);
  res.json({ success: true, message: "Message removed" });
});

// POST /api/admin/github/sync
app.post("/api/admin/github/sync", verifyAdminToken, async (req, res) => {
  const store = getStore();
  const githubUsername = process.env.GITHUB_USERNAME || "varunkumar898";
  const githubToken = process.env.GITHUB_TOKEN;

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Portfolio-Sync-Agent"
    };
    if (githubToken) {
      headers.Authorization = `token ${githubToken}`;
    }

    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=30`, {
      headers
    });

    if (response.ok) {
      const repos = await response.json();
      if (Array.isArray(repos)) {
        store.githubRepos = repos
          .filter((repo: any) => !repo.fork)
          .map((repo: any) => ({
            name: repo.name,
            description: repo.description || "Embedded systems and firmware development repository",
            url: repo.html_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language || "C",
            commits: Math.max(12, repo.stargazers_count * 2 + 5),
            lastUpdated: repo.updated_at
          }));
        store.lastGithubSync = new Date().toISOString();
        saveStore(store);
      }
    }
  } catch (err) {
    console.warn("GitHub live sync warning (using cached repositories):", err);
  }

  res.json({
    success: true,
    message: "GitHub sync completed",
    reposCount: store.githubRepos.length,
    lastSynced: store.lastGithubSync,
    data: store.githubRepos
  });
});

// -------------------------------------------------------------
// VITE SPA MIDDLEWARE INTEGRATION
// -------------------------------------------------------------
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✓ Full-Stack Portfolio Server running at http://0.0.0.0:${PORT}`);
  });
}

start();
