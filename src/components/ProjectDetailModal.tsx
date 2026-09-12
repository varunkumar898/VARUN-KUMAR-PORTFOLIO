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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-[#1A1F28] border border-[#2D3748] rounded-[4px] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="p-4 sm:p-6 bg-[#0D1117] border-b border-[#2D3748] flex items-center justify-between gap-4 font-mono">
          <div>
            <div className="text-xs text-[#D4AF37] uppercase tracking-wider mb-1">
              SPECIFICATION & VERIFICATION BENCH
            </div>
            <h3 id="project-modal-title" className="text-lg sm:text-xl font-bold text-[#F0F4F8] tracking-tight">
              {project.title}
            </h3>
            <div className="text-xs text-[#A8B8C8] mt-0.5">
              {project.subtitle}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded border border-[#2D3748] bg-[#1A1F28] text-[#A8B8C8] hover:text-[#1E90FF] hover:border-[#1E90FF] focus:outline-none focus:ring-2 focus:ring-[#1E90FF] transition-colors"
            aria-label="Close Project Detail"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-[#2D3748] bg-[#0D1117] px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-xs font-mono tracking-wider uppercase whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[#D4AF37] text-[#D4AF37] font-semibold bg-[#1A1F28]'
                  : 'border-transparent text-[#A8B8C8] hover:text-[#1E90FF]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#A8B8C8] flex-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div className="p-5 rounded bg-[#0D1117] border border-[#2D3748]">
                <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-2">
                  PROBLEM & OBJECTIVE
                </div>
                <p className="text-sm text-[#F0F4F8] leading-relaxed">
                  {typeof project.details.overview === 'string'
                    ? project.details.overview
                    : (project.details.overview as any)?.problem || project.description}
                </p>
              </div>

              {project.metadata && (
                <div className="p-5 rounded bg-[#0D1117] border border-[#2D3748]">
                  <div className="text-xs font-mono text-[#00D9FF] uppercase tracking-wider mb-2">
                    HARDWARE SPECIFICATION & STATUS
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    {project.metadata.targetHardware && (
                      <div>
                        <span className="text-[#6B7280] block text-[10px]">TARGET HARDWARE</span>
                        <span className="text-[#F0F4F8]">{project.metadata.targetHardware}</span>
                      </div>
                    )}
                    {project.metadata.status && (
                      <div>
                        <span className="text-[#6B7280] block text-[10px]">VERIFICATION STATUS</span>
                        <span className="text-[#10B981]">{project.metadata.status}</span>
                      </div>
                    )}
                    {project.metadata.commits && (
                      <div>
                        <span className="text-[#6B7280] block text-[10px]">CODEBASE VOLUME</span>
                        <span className="text-[#D4AF37]">{project.metadata.commits}</span>
                      </div>
                    )}
                    {project.metadata.codeStyle && (
                      <div>
                        <span className="text-[#6B7280] block text-[10px]">STANDARD / STYLE</span>
                        <span className="text-[#A8B8C8]">{project.metadata.codeStyle}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {project.drivers && (
                <div>
                  <div className="text-xs font-mono text-[#F0F4F8] font-semibold mb-2">
                    REGISTER-LEVEL DRIVERS IMPLEMENTED ({project.drivers.length}):
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                    {project.drivers.map((drv, idx) => (
                      <div key={idx} className="p-2 rounded bg-[#0D1117] border border-[#2D3748] text-center text-[#D4AF37]">
                        stm32_{drv.toLowerCase()}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.contributions && (
                <div>
                  <div className="text-xs font-mono text-[#F0F4F8] font-semibold mb-2">
                    COMPILER SUBSYSTEM CONTRIBUTIONS:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                    {project.contributions.map((contr, idx) => (
                      <div key={idx} className="p-2.5 rounded bg-[#0D1117] border border-[#2D3748] text-[#F0F4F8] flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                        <span>{contr}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div>
                <div className="text-xs font-mono text-[#F0F4F8] font-semibold mb-2">
                  TECHNOLOGIES & PROTOCOLS:
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-[#0D1117] border border-[#2D3748] font-mono text-xs text-[#A8B8C8]">
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
              <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
                EXECUTION FLOW & TOPOLOGY
              </div>

              <p className="text-sm leading-relaxed text-[#F0F4F8]">
                {project.details.architecture.description || (project.details.architecture as any).overview || ''}
              </p>

              <div className="space-y-2 font-mono">
                {(project.details.architecture.diagramSteps || []).map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-[#0D1117] border border-[#2D3748] flex items-center justify-center text-xs text-[#D4AF37] font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1 p-3 rounded bg-[#0D1117] border border-[#2D3748] text-xs text-[#F0F4F8]">
                      {step}
                    </div>
                    {idx < (project.details.architecture.diagramSteps?.length || 0) - 1 && (
                      <ChevronRight className="w-4 h-4 text-[#2D3748] hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: IMPLEMENTATION */}
          {activeTab === 'implementation' && (
            <div className="space-y-5">
              <div>
                <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-2">
                  KEY IMPLEMENTATION HIGHLIGHTS
                </div>
                <ul className="space-y-2 list-disc list-inside text-sm text-[#A8B8C8]">
                  {((project.details.implementation as any).points || (project.details.implementation as any).highlights || []).map((hl: string, idx: number) => (
                    <li key={idx} className="leading-relaxed">
                      {hl}
                    </li>
                  ))}
                </ul>
              </div>

              {project.details.implementation.codeSnippet && (
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between text-[#A8B8C8]">
                    <span className="flex items-center gap-1.5 text-[#00D9FF]">
                      <Terminal className="w-3.5 h-3.5" />
                      {project.details.implementation.codeSnippet.title}
                    </span>
                    <button
                      onClick={() => handleCopyCode(project.details.implementation.codeSnippet!.code)}
                      className="px-2 py-1 rounded bg-[#0D1117] border border-[#2D3748] hover:border-[#1E90FF] text-[#A8B8C8] hover:text-[#1E90FF] flex items-center gap-1 text-[10px]"
                    >
                      {copied ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'COPIED' : 'COPY CODE'}</span>
                    </button>
                  </div>

                  <pre className="p-4 rounded bg-[#0D1117] border border-[#2D3748] overflow-x-auto text-[#F0F4F8] leading-relaxed text-xs">
                    <code>{project.details.implementation.codeSnippet.code}</code>
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: DEBUGGING */}
          {activeTab === 'debugging' && (
            <div className="space-y-5">
              <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
                PHYSICAL ISOLATION & DEBUGGING METHODOLOGY
              </div>

              <div className="space-y-3">
                {project.details.debugging.challenges.map((ch, idx) => (
                  <div key={idx} className="p-4 rounded bg-[#0D1117] border border-[#2D3748] text-sm text-[#A8B8C8]">
                    <span className="text-xs font-mono text-[#D4AF37] font-bold block mb-1">
                      CHALLENGE #{idx + 1}
                    </span>
                    {ch}
                  </div>
                ))}
              </div>

              <div>
                <div className="text-xs font-mono text-[#F0F4F8] font-semibold mb-2">
                  INSTRUMENTATION USED DURING VALIDATION:
                </div>
                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  {project.details.debugging.instrumentsUsed.map((inst, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded bg-[#0D1117] border border-[#2D3748] text-[#00D9FF]">
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
              <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
                EMPIRICAL VALIDATION & METRICS
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.details.validation.metrics.map((metric, idx) => (
                  <div key={idx} className="p-4 rounded bg-[#0D1117] border border-[#2D3748] text-xs font-mono text-[#F0F4F8]">
                    <div className="text-[10px] text-[#6B7280]">METRIC 0{idx + 1}</div>
                    <div className="text-[#10B981] font-semibold mt-1">{metric}</div>
                  </div>
                ))}
              </div>

              <div>
                <div className="text-xs font-mono text-[#F0F4F8] font-semibold mb-2">
                  VERIFICATION PROTOCOLS:
                </div>
                <ul className="space-y-2 list-disc list-inside text-sm text-[#A8B8C8]">
                  {project.details.validation.methods.map((method, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {method}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 6: RESULTS */}
          {activeTab === 'results' && (
            <div className="space-y-5">
              <div className="text-xs font-mono text-[#10B981] uppercase tracking-wider">
                ENGINEERING OUTCOMES
              </div>

              <ul className="space-y-3">
                {project.details.results.outcomes.map((out, idx) => (
                  <li key={idx} className="p-4 rounded bg-[#0D1117] border border-[#2D3748] flex items-start gap-3 text-sm text-[#F0F4F8]">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>

              <div className="p-5 rounded bg-[#0D1117] border border-[#D4AF37]/40">
                <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-1">
                  KEY ENGINEERING TAKEAWAY
                </div>
                <p className="text-sm text-[#F0F4F8] leading-relaxed">
                  "{project.details.results.keyTakeaway}"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#0D1117] border-t border-[#2D3748] flex items-center justify-between font-mono text-xs">
          <div className="text-[#A8B8C8] text-[11px] hidden sm:block">
            CONFIDENTIAL TECHNICAL SPECIFICATION • VARUN KUMAR
          </div>

          <div className="flex items-center gap-3">
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded bg-[#D4AF37] text-[#0D1117] font-bold flex items-center gap-1.5 hover:bg-[#e0bc46] transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>REPOSITORY SOURCE</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-[#1A1F28] border border-[#2D3748] text-[#F0F4F8] hover:text-[#1E90FF] hover:border-[#1E90FF] transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
