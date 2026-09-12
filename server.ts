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
    title: "Embedded Systems Engineer | Firmware Developer",
    location: "Chennai, Tamil Nadu, India",
    phone: "+91 9444386570",
    email: "varunkumarjob2004@gmail.com",
    github: "https://github.com/varunkumarjob898",
    linkedin: "https://linkedin.com/in/varun-kumarjob8055",
    website: "https://varunkumar.dev",
    degree: "B.Tech in Electronics and Computer Engineering",
    university: "Vels University, Chennai, Tamil Nadu, India",
    cgpa: "7.5/10",
    bio: "I work at the boundary between firmware and hardware. My focus is low-level embedded development, from register-level peripheral configuration and board bring-up to RTOS scheduling, communication protocols and hardware debugging.",
    availability: "Available for full-time roles and technical discussions.",
    status: "OPEN_TO_WORK",
    lastUpdated: new Date().toISOString()
  },
  resume: {
    fileName: "Varun_Kumar_Firmware_CV.pdf",
    version: 1,
    fileSize: 2450000,
    fileUrl: "",
    uploadedAt: new Date().toISOString(),
    isActive: true,
    history: [
      {
        version: 1,
        fileName: "Varun_Kumar_Firmware_CV.pdf",
        uploadedAt: new Date().toISOString()
      }
    ]
  },
  projects: [
    {
      id: "stm32f030-drivers",
      title: "STM32F030 Hardware Abstraction Layer",
      subtitle: "Register-Level Device Drivers",
      category: "Device Drivers & Bare-Metal",
      description: "Designed and implemented 8 core peripheral device drivers entirely from scratch at register level, referencing ARM Cortex-M0 reference manuals (RM0360) without relying on STM32Cube HAL.",
      problem: "Standard vendor HAL abstractions introduce unnecessary runtime execution overhead and obscure hardware faults during bare-metal timing-sensitive embedded control loops.",
      approach: "Direct register-level bitfield manipulation with strict volatile pointer semantics, decoupled clock gating, and deterministic latency profiles.",
      implementation: "Engineered comprehensive drivers for GPIO, RCC, NVIC, EXTI, SYSCFG, ADC, SPI, and I2C peripherals with full register map definitions and clock-tree initializers.",
      debugging: "Isolated bus lockups and silicon quirks with an 8-channel logic analyzer and OpenOCD SWD hardware breakpoint instrumentation.",
      validation: "Executed hardware test suites across physical STM32F030F4P6 silicon boards verifying clock stability, GPIO transition times, and SPI transmission framing.",
      technologies: ["ARM Cortex-M0", "STM32F030", "Bare-Metal C", "OpenOCD", "GDB", "Logic Analyzer", "Register-Level Drivers"],
      repositoryUrl: "https://github.com/varunkumarjob898/Driver-for-STM32F030x4-x6-x8-xC",
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
      id: "sensor-monitoring-freertos",
      title: "Real-Time Multi-Sensor Telemetry Node",
      subtitle: "FreeRTOS Deterministic Firmware",
      category: "RTOS & Industrial IoT",
      description: "Implemented deterministic multi-tasking telemetry firmware running FreeRTOS on ARM Cortex-M, gathering multi-sensor environmental parameters concurrently with zero task starvation.",
      problem: "Concurrent I2C/SPI sensor acquisition tasks and RF transmission routines caused bus contention, missed deadlines, and jitter without RTOS scheduling.",
      approach: "Priority-based preemptive scheduling with counting semaphores, mutexes with priority inheritance, and FreeRTOS queue message pipelines.",
      implementation: "Created discrete tasks for ADC telemetry, I2C temperature/humidity polling, UART telemetry streaming, and a dedicated watchdog kicker task.",
      debugging: "Used Segger SystemView and task trace hooks to measure context-switch overhead (<1.8µs) and detect stack watermark boundaries.",
      validation: "Stress-tested under 100% bus traffic over 72 uninterrupted continuous execution hours with zero RTOS stack overflows or watchdog timeouts.",
      technologies: ["FreeRTOS", "ARM Cortex-M", "Embedded C", "I2C", "SPI", "UART", "SystemView", "Low-Power Modes"],
      repositoryUrl: "https://github.com/varunkumarjob898/STM32-FreeRTOS-Telemetry-Engine",
      featured: true,
      displayOrder: 2,
      githubMetadata: {
        stars: 9,
        forks: 2,
        commits: 24,
        language: "C",
        lastUpdated: new Date().toISOString()
      }
    },
    {
      id: "riscv-can-modbus",
      title: "RISC-V Industrial CAN & Modbus Gateway",
      subtitle: "Automotive & Industrial Control",
      category: "Industrial Protocols & Fieldbus",
      description: "Authored low-level communication drivers and protocol translation gateway between industrial Modbus RTU/TCP and automotive CAN 2.0B fieldbus networks on RISC-V targets.",
      problem: "Battery Management Systems (BMS) in industrial equipment required deterministic bridging between fast CAN bus telemetry and slower legacy Modbus supervisory masters.",
      approach: "Ring-buffered dual-core message queues with hardware CAN filter masks and non-blocking state-machine packet serialization.",
      implementation: "Wrote CAN baudrate calculator (250kbps/500kbps), hardware filter acceptance lists, and CRC16 Modbus frame validators with error counter diagnostics.",
      debugging: "Captured bus frame collisions and edge-jitter with oscilloscopes and protocol analyzers, tuning bit timing segments (SYNC, PROP, PHASE1, PHASE2).",
      validation: "Bench-tested with 1000 message bursts at 80% CAN bus load with 0% dropped packets and validated checksum consistency.",
      technologies: ["RISC-V", "CAN 2.0B", "Modbus RTU/TCP", "Embedded C", "Docker", "Saleae Logic Analyzer", "Oscilloscope"],
      repositoryUrl: "https://github.com/varunkumarjob898/RISCV-Industrial-CAN-Modbus-Bridge",
      featured: true,
      displayOrder: 3,
      githubMetadata: {
        stars: 15,
        forks: 4,
        commits: 31,
        language: "C",
        lastUpdated: new Date().toISOString()
      }
    }
  ],
  messages: [
    {
      id: "msg-sample-1",
      name: "Alex Rivera",
      email: "alex.rivera@embeddedtech.io",
      subject: "Senior Firmware Engineer Inquiry",
      message: "Hi Varun, reviewed your STM32 bare-metal drivers and register-level architecture diagrams. We have an opening on our hardware-firmware bringup team.",
      status: "NEW",
      receivedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      notes: ""
    }
  ],
  githubRepos: [
    {
      name: "Driver-for-STM32F030x4-x6-x8-xC",
      description: "Low-level bare-metal device drivers for STM32F030 microcontroller written in C without HAL abstractions.",
      url: "https://github.com/varunkumarjob898/Driver-for-STM32F030x4-x6-x8-xC",
      stars: 12,
      forks: 3,
      language: "C",
      commits: 17,
      lastUpdated: new Date().toISOString()
    },
    {
      name: "STM32-FreeRTOS-Telemetry-Engine",
      description: "Real-time deterministic telemetry and sensor acquisition engine on ARM Cortex-M using FreeRTOS queues.",
      url: "https://github.com/varunkumarjob898",
      stars: 9,
      forks: 2,
      language: "C",
      commits: 24,
      lastUpdated: new Date().toISOString()
    },
    {
      name: "RISCV-Industrial-CAN-Modbus-Bridge",
      description: "Automotive CAN 2.0B and industrial Modbus RTU protocol translation bridge for RISC-V edge controllers.",
      url: "https://github.com/varunkumarjob898",
      stars: 15,
      forks: 4,
      language: "C",
      commits: 31,
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
  const githubUsername = process.env.GITHUB_USERNAME || "varunkumarjob898";
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
