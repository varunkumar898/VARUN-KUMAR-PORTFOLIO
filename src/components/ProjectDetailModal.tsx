import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { X, ExternalLink, Github, Copy, Check, Terminal, Cpu, CheckCircle2, ChevronRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-[#111417] border border-[#25292D] rounded shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-[#161A1F] border-b border-[#25292D] flex items-center justify-between gap-4 font-mono">
          <div>
            <div className="text-[10px] text-[#C8FF00] uppercase tracking-wider mb-0.5">
              // SPECIFICATION & VERIFICATION BENCH
            </div>
            <h3 id="project-modal-title" className="text-lg sm:text-xl font-bold text-[#E8EAED] tracking-tight">
              {project.title}
            </h3>
            <div className="text-xs text-[#9AA0A6]">
              {project.subtitle}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded border border-[#25292D] bg-[#0B0D0F] text-[#9AA0A6] hover:text-[#E8EAED] hover:border-[#C8FF00] focus:outline-none focus:ring-1 focus:ring-[#C8FF00]"
            aria-label="Close Project Detail"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-[#25292D] bg-[#0B0D0F] px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2.5 text-xs font-mono tracking-wider uppercase whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[#C8FF00] text-[#C8FF00] font-semibold bg-[#111417]'
                  : 'border-transparent text-[#9AA0A6] hover:text-[#E8EAED]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 font-sans text-xs sm:text-sm text-[#9AA0A6] flex-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 rounded bg-[#0B0D0F] border border-[#25292D]">
                <div className="text-[10px] font-mono text-[#C8FF00] uppercase tracking-wider mb-1">
                  PROJECT SCOPE
                </div>
                <p className="text-sm sm:text-base text-[#E8EAED] leading-relaxed">
                  {project.details.overview}
                </p>
              </div>

              {project.drivers && (
                <div>
                  <div className="text-xs font-mono text-[#E8EAED] font-semibold mb-2">
                    REGISTER-LEVEL DRIVERS IMPLEMENTED ({project.drivers.length}):
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                    {project.drivers.map((drv, idx) => (
                      <div key={idx} className="p-2 rounded bg-[#0B0D0F] border border-[#25292D] text-center text-[#C8FF00]">
                        stm32_{drv.toLowerCase()}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.contributions && (
                <div>
                  <div className="text-xs font-mono text-[#E8EAED] font-semibold mb-2">
                    COMPILER SUBSYSTEM CONTRIBUTIONS:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                    {project.contributions.map((contr, idx) => (
                      <div key={idx} className="p-2 rounded bg-[#0B0D0F] border border-[#25292D] text-[#E8EAED] flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C8FF00]" />
                        <span>{contr}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div>
                <div className="text-xs font-mono text-[#E8EAED] font-semibold mb-2">
                  TECHNOLOGIES & PROTOCOLS:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t, idx) => (
                    <span key={idx} className="px-2 py-1 rounded bg-[#0B0D0F] border border-[#25292D] font-mono text-xs text-[#E8EAED]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#C8FF00] uppercase tracking-wider">
                EXECUTION FLOW & DATA BUS TOPOLOGY
              </div>

              <div className="space-y-2 font-mono">
                {project.details.architecture.diagramSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-[#0B0D0F] border border-[#25292D] flex items-center justify-center text-[10px] text-[#C8FF00] font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1 p-2.5 rounded bg-[#0B0D0F] border border-[#25292D] text-xs text-[#E8EAED]">
                      {step}
                    </div>
                    {idx < project.details.architecture.diagramSteps.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-[#363C43] hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>

              <div className="p-4 rounded bg-[#0B0D0F] border border-[#25292D] text-xs text-[#9AA0A6] leading-relaxed">
                <span className="text-[#E8EAED] font-mono font-semibold block mb-1">Architecture Summary:</span>
                {project.details.architecture.description}
              </div>
            </div>
          )}

          {/* TAB 3: IMPLEMENTATION */}
          {activeTab === 'implementation' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#C8FF00] uppercase tracking-wider">
                  TECHNICAL IMPLEMENTATION DETAILS
                </div>
                <ul className="space-y-2">
                  {project.details.implementation.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#9AA0A6]">
                      <span className="text-[#C8FF00] font-mono mt-0.5">›</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code Snippet */}
              {project.details.implementation.codeSnippet && (
                <div className="rounded border border-[#25292D] bg-[#0B0D0F] overflow-hidden">
                  <div className="p-2.5 bg-[#161A1F] border-b border-[#25292D] flex items-center justify-between font-mono text-xs">
                    <span className="text-[#E8EAED] font-semibold">
                      {project.details.implementation.codeSnippet.title}
                    </span>
                    <button
                      onClick={() => handleCopyCode(project.details.implementation.codeSnippet!.code)}
                      className="px-2 py-1 rounded border border-[#25292D] bg-[#0B0D0F] text-[#9AA0A6] hover:text-[#C8FF00] flex items-center gap-1 text-[11px]"
                    >
                      {copied ? <Check className="w-3 h-3 text-[#C8FF00]" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>
                  <pre className="p-4 text-[11px] sm:text-xs font-mono text-[#E8EAED] overflow-x-auto leading-relaxed">
                    <code>{project.details.implementation.codeSnippet.code}</code>
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: DEBUGGING */}
          {activeTab === 'debugging' && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#C8FF00] uppercase tracking-wider">
                ISOLATED FAULTS & HARDWARE DIAGNOSTICS
              </div>

              <div className="space-y-3">
                {project.details.debugging.challenges.map((ch, idx) => (
                  <div key={idx} className="p-3.5 rounded bg-[#0B0D0F] border border-[#25292D]">
                    <div className="text-[10px] font-mono text-[#C8FF00] uppercase tracking-wider mb-1">
                      DIAGNOSTIC CASE 0{idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-[#E8EAED] leading-relaxed">
                      {ch}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded bg-[#161A1F] border border-[#25292D]">
                <div className="text-xs font-mono text-[#E8EAED] font-semibold mb-2">
                  INSTRUMENTS USED FOR ISOLATION:
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.details.debugging.instrumentsUsed.map((inst, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-[#0B0D0F] border border-[#25292D] font-mono text-xs text-[#C8FF00]">
                      {inst}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: VALIDATION */}
          {activeTab === 'validation' && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#C8FF00] uppercase tracking-wider">
                SILICON-LEVEL MEASUREMENT & PROTOCOL VALIDATION
              </div>

              <div className="space-y-2">
                {project.details.validation.methods.map((method, idx) => (
                  <div key={idx} className="p-3 rounded bg-[#0B0D0F] border border-[#25292D] flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C8FF00] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#E8EAED]">{method}</span>
                  </div>
                ))}
              </div>

              {project.details.validation.metrics && (
                <div className="p-3.5 rounded bg-[#161A1F] border border-[#25292D]">
                  <div className="text-xs font-mono text-[#E8EAED] font-semibold mb-2">
                    QUANTIFIED VALIDATION METRICS:
                  </div>
                  <ul className="space-y-1.5">
                    {project.details.validation.metrics.map((metric, idx) => (
                      <li key={idx} className="text-xs font-mono text-[#9AA0A6] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00]"></span>
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: RESULTS */}
          {activeTab === 'results' && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#C8FF00] uppercase tracking-wider">
                PRODUCTION OUTCOMES & CODE STABILITY
              </div>

              <div className="space-y-2">
                {project.details.results.outcomes.map((out, idx) => (
                  <div key={idx} className="p-3 rounded bg-[#0B0D0F] border border-[#25292D] text-xs sm:text-sm text-[#E8EAED] flex items-start gap-2">
                    <span className="text-[#C8FF00] font-mono font-bold select-none">›</span>
                    <span>{out}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded bg-[#0B0D0F] border-l-2 border-[#C8FF00] border-y border-r border-[#25292D]">
                <div className="text-[10px] font-mono text-[#C8FF00] uppercase tracking-wider mb-1">
                  KEY ENGINEERING TAKEAWAY
                </div>
                <p className="text-xs sm:text-sm font-mono text-[#E8EAED]">
                  "{project.details.results.keyTakeaway}"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#161A1F] border-t border-[#25292D] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="text-[#9AA0A6] text-[11px]">
            Target: {project.metadata?.targetHardware || 'Hardware Prototype'}
          </div>

          <div className="flex items-center gap-3">
            {project.repositoryUrl ? (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded bg-[#C8FF00] text-[#0B0D0F] font-bold tracking-wider hover:bg-[#d5ff33] transition-colors flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>VIEW REPOSITORY</span>
              </a>
            ) : (
              <span className="px-3 py-1.5 rounded bg-[#0B0D0F] border border-[#25292D] text-[#9AA0A6]">
                Hardware Prototype
              </span>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded border border-[#25292D] bg-[#0B0D0F] text-[#E8EAED] hover:text-[#C8FF00]"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
