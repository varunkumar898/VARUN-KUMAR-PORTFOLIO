import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { X, ExternalLink, Github, Copy, Check, Terminal, Cpu, CheckCircle2, ChevronRight, FileCode2 } from 'lucide-react';

interface ProjectDetailModalProps {
  project: any | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'implementation' | 'debugging' | 'validation' | 'results'>('overview');
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs: { id: typeof activeTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'implementation', label: 'Implementation' },
    { id: 'debugging', label: 'Debugging' },
    { id: 'validation', label: 'Validation' },
    { id: 'results', label: 'Results' }
  ];

  const problemText = project.problem || (typeof project.details?.overview === 'string' ? project.details.overview : project.description);
  const approachText = project.approach || project.details?.architecture?.description || 'Direct register-level bitfield manipulation referencing reference manual specifications.';
  const implementationPoints = project.details?.implementation?.points || [project.implementation || 'Authored modular firmware functions with strict register offsets.'];
  const codeSnippet = project.details?.implementation?.codeSnippet;
  const debuggingChallenges = project.details?.debugging?.challenges || [project.debugging || 'Hardware logic analyzer and SWD trace verification.'];
  const instruments = project.details?.debugging?.instrumentsUsed || ['OpenOCD', 'GDB via ST-Link SWD', '8-channel logic analyzer'];
  const validationMethods = project.details?.validation?.methods || [project.validation || 'Bench tested and validated on physical microcontroller target.'];
  const outcomes = project.details?.results?.outcomes || ['Engineered functional, modular embedded software verified on target silicon.'];
  const keyTakeaway = project.details?.results?.keyTakeaway || 'Low-level hardware awareness yields deterministic firmware with minimal resource overhead.';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-[#12161F] border border-[#232B38] rounded shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#ECEFF4]">
        {/* Header Bar */}
        <div className="p-4 sm:p-6 bg-[#181E29] border-b border-[#232B38] flex items-center justify-between gap-4 font-mono">
          <div>
            <div className="text-xs text-[#D4A03D] uppercase tracking-wider mb-1">
              ENGINEERING LOG // {project.category}
            </div>
            <h3 id="project-modal-title" className="text-lg sm:text-xl font-bold text-[#ECEFF4] tracking-tight">
              {project.title}
            </h3>
            <div className="text-xs text-[#9AA7B8] mt-0.5 font-sans">
              {project.subtitle}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded border border-[#232B38] bg-[#12161F] text-[#9AA7B8] hover:text-[#ECEFF4] hover:border-[#D4A03D]/60 focus:outline-none transition-colors cursor-pointer"
            aria-label="Close Project Detail"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-[#232B38] bg-[#0B0E14] px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-xs font-mono tracking-wider uppercase whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#D4A03D] text-[#D4A03D] font-semibold bg-[#12161F]'
                  : 'border-transparent text-[#9AA7B8] hover:text-[#ECEFF4]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#9AA7B8] flex-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div className="p-4 rounded bg-[#0B0E14] border border-[#232B38]">
                <div className="text-xs font-mono text-[#D4A03D] uppercase tracking-wider mb-2 font-bold">
                  PROJECT SUMMARY & PROBLEM
                </div>
                <p className="text-sm text-[#ECEFF4] leading-relaxed font-sans">
                  {problemText}
                </p>
              </div>

              {project.metadata && (
                <div className="p-4 rounded bg-[#0B0E14] border border-[#232B38]">
                  <div className="text-xs font-mono text-[#ECEFF4] uppercase tracking-wider mb-2 font-semibold">
                    HARDWARE CONTEXT & SPECIFICATIONS
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    {project.metadata.targetHardware && (
                      <div>
                        <span className="text-[#657386] block text-[10px]">TARGET PLATFORM</span>
                        <span className="text-[#ECEFF4]">{project.metadata.targetHardware}</span>
                      </div>
                    )}
                    {project.metadata.status && (
                      <div>
                        <span className="text-[#657386] block text-[10px]">STATUS</span>
                        <span className="text-[#D4A03D]">{project.metadata.status}</span>
                      </div>
                    )}
                    {project.metadata.commits && (
                      <div>
                        <span className="text-[#657386] block text-[10px]">REPOSITORY COMMITS</span>
                        <span className="text-[#ECEFF4]">{project.metadata.commits}</span>
                      </div>
                    )}
                    {project.metadata.codeStyle && (
                      <div>
                        <span className="text-[#657386] block text-[10px]">DESIGN STYLE</span>
                        <span className="text-[#ECEFF4]">{project.metadata.codeStyle}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {project.drivers && (
                <div>
                  <div className="text-xs font-mono text-[#ECEFF4] font-semibold mb-2">
                    REGISTER-LEVEL PERIPHERALS IMPLEMENTED ({project.drivers.length}):
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                    {project.drivers.map((drv: string, idx: number) => (
                      <div key={idx} className="p-2 rounded bg-[#0B0E14] border border-[#232B38] text-center text-[#D4A03D]">
                        stm32_{drv.toLowerCase()}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="text-xs font-mono text-[#ECEFF4] font-semibold mb-2">
                  TECHNOLOGIES & TOOLS:
                </div>
                <div className="flex flex-wrap gap-2">
                  {(project.technologies || []).map((t: string, idx: number) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-[#0B0E14] border border-[#232B38] font-mono text-xs text-[#9AA7B8]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-5">
              <div className="text-xs font-mono text-[#D4A03D] uppercase tracking-wider font-bold">
                SYSTEM TOPOLOGY & APPROACH
              </div>

              <p className="text-sm leading-relaxed text-[#ECEFF4] font-sans">
                {approachText}
              </p>

              {project.details?.architecture?.diagramSteps && (
                <div className="space-y-2 font-mono pt-2">
                  {project.details.architecture.diagramSteps.map((step: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-[#0B0E14] border border-[#232B38] flex items-center justify-center text-xs text-[#D4A03D] font-bold">
                        {idx + 1}
                      </div>
                      <div className="flex-1 p-2.5 rounded bg-[#0B0E14] border border-[#232B38] text-xs text-[#ECEFF4]">
                        {step}
                      </div>
                      {idx < project.details.architecture.diagramSteps.length - 1 && (
                        <ChevronRight className="w-4 h-4 text-[#232B38] hidden sm:block" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: IMPLEMENTATION */}
          {activeTab === 'implementation' && (
            <div className="space-y-5">
              <div>
                <div className="text-xs font-mono text-[#D4A03D] uppercase tracking-wider mb-2 font-bold">
                  IMPLEMENTATION DETAILS
                </div>
                <ul className="space-y-2 list-disc list-inside text-sm text-[#9AA7B8] font-sans">
                  {implementationPoints.map((hl: string, idx: number) => (
                    <li key={idx} className="leading-relaxed">
                      {hl}
                    </li>
                  ))}
                </ul>
              </div>

              {codeSnippet && (
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between text-[#9AA7B8]">
                    <span className="flex items-center gap-1.5 text-[#D4A03D]">
                      <Terminal className="w-3.5 h-3.5" />
                      {codeSnippet.title}
                    </span>
                    <button
                      onClick={() => handleCopyCode(codeSnippet.code)}
                      className="px-2 py-1 rounded bg-[#0B0E14] border border-[#232B38] hover:border-[#D4A03D]/60 text-[#9AA7B8] hover:text-[#ECEFF4] flex items-center gap-1 text-[10px] cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3 text-[#2EA043]" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'COPIED' : 'COPY CODE'}</span>
                    </button>
                  </div>

                  <pre className="p-4 rounded bg-[#0B0E14] border border-[#232B38] overflow-x-auto text-[#ECEFF4] leading-relaxed text-xs">
                    <code>{codeSnippet.code}</code>
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: DEBUGGING */}
          {activeTab === 'debugging' && (
            <div className="space-y-5">
              <div className="text-xs font-mono text-[#D4A03D] uppercase tracking-wider font-bold">
                ISOLATION & HARDWARE DEBUGGING
              </div>

              <div className="space-y-3 font-sans">
                {debuggingChallenges.map((ch: string, idx: number) => (
                  <div key={idx} className="p-3.5 rounded bg-[#0B0E14] border border-[#232B38] text-sm text-[#9AA7B8]">
                    <span className="text-xs font-mono text-[#D4A03D] font-bold block mb-1">
                      CHALLENGE #{idx + 1}
                    </span>
                    {ch}
                  </div>
                ))}
              </div>

              <div>
                <div className="text-xs font-mono text-[#ECEFF4] font-semibold mb-2">
                  INSTRUMENTS USED:
                </div>
                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  {instruments.map((inst: string, idx: number) => (
                    <span key={idx} className="px-3 py-1.5 rounded bg-[#0B0E14] border border-[#232B38] text-[#ECEFF4]">
                      {inst}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: VALIDATION */}
          {activeTab === 'validation' && (
            <div className="space-y-5">
              <div className="text-xs font-mono text-[#D4A03D] uppercase tracking-wider font-bold">
                EMPIRICAL VALIDATION & OBSERVATION
              </div>

              <ul className="space-y-2 list-disc list-inside text-sm text-[#9AA7B8] font-sans">
                {validationMethods.map((method: string, idx: number) => (
                  <li key={idx} className="leading-relaxed">
                    {method}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* TAB 6: RESULTS */}
          {activeTab === 'results' && (
            <div className="space-y-5">
              <div className="text-xs font-mono text-[#D4A03D] uppercase tracking-wider font-bold">
                ENGINEERING OUTCOMES
              </div>

              <ul className="space-y-2.5 font-sans">
                {outcomes.map((out: string, idx: number) => (
                  <li key={idx} className="p-3.5 rounded bg-[#0B0E14] border border-[#232B38] flex items-start gap-2.5 text-sm text-[#ECEFF4]">
                    <CheckCircle2 className="w-4 h-4 text-[#2EA043] shrink-0 mt-0.5" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>

              <div className="p-4 rounded bg-[#0B0E14] border border-[#D4A03D]/40">
                <div className="text-xs font-mono text-[#D4A03D] uppercase tracking-wider mb-1 font-bold">
                  KEY ENGINEERING TAKEAWAY
                </div>
                <p className="text-sm text-[#ECEFF4] leading-relaxed font-sans">
                  "{keyTakeaway}"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#181E29] border-t border-[#232B38] flex items-center justify-between font-mono text-xs">
          <div className="text-[#657386] text-[11px] hidden sm:block">
            VERIFIED REPOSITORY RECORD • VARUN KUMAR
          </div>

          <div className="flex items-center gap-3">
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded bg-[#D4A03D] hover:bg-[#E5B252] text-[#0B0E14] font-bold flex items-center gap-1.5 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB REPO</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-[#12161F] border border-[#232B38] text-[#ECEFF4] hover:border-[#D4A03D]/60 transition-colors cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
