import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { EngineeringPhilosophy } from './components/EngineeringPhilosophy';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ProjectsSection } from './components/ProjectsSection';
import { EngineeringLab } from './components/EngineeringLab';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { GitHubSection } from './components/GitHubSection';
import { TerminalWorkflow } from './components/TerminalWorkflow';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WebResumeModal } from './components/WebResumeModal';

export default function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0D0F] text-[#E8EAED] selection:bg-[#C8FF00] selection:text-[#0B0D0F]">
      {/* Fixed Sticky Header Navigation */}
      <Navbar onOpenResumeModal={() => setIsResumeModalOpen(true)} />

      {/* Main Flow */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* HERO */}
        <Hero onOpenResumeModal={() => setIsResumeModalOpen(true)} />

        {/* ABOUT ("Firmware meets hardware.") */}
        <About />

        {/* ENGINEERING PHILOSOPHY ("Understand the hardware. Measure the behavior...") */}
        <EngineeringPhilosophy />

        {/* EXPERIENCE (Timeline inspired by engineering logs) */}
        <ExperienceTimeline />

        {/* SELECTED PROJECTS (Problem, Approach, Implementation, Debugging, Validation, Result) */}
        <ProjectsSection />

        {/* ENGINEERING LAB (Oscilloscope, Logic Analyzer, Register Inspector, Flowchart) */}
        <EngineeringLab />

        {/* SKILLS (Categorized, no fake percentages, architecture coupling) */}
        <SkillsSection />

        {/* EDUCATION & KEY STRENGTHS */}
        <EducationSection />

        {/* GITHUB INTEGRATION ("FROM THE CODEBASE") */}
        <GitHubSection />

        {/* TERMINAL WORKFLOW ELEMENT */}
        <TerminalWorkflow />

        {/* RESUME */}
        <ResumeSection onOpenResumeModal={() => setIsResumeModalOpen(true)} />

        {/* CONTACT */}
        <ContactSection onOpenResumeModal={() => setIsResumeModalOpen(true)} />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* Interactive Web Resume / Printable CV Modal */}
      {isResumeModalOpen && (
        <WebResumeModal onClose={() => setIsResumeModalOpen(false)} />
      )}
    </div>
  );
}
