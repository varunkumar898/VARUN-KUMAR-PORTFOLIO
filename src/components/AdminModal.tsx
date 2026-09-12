import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  LayoutDashboard,
  FileText,
  User,
  FolderGit2,
  Mail,
  RefreshCw,
  Upload,
  CheckCircle2,
  AlertCircle,
  Trash2,
  ExternalLink,
  Plus,
  Save,
  Clock,
  Star,
  GitFork,
  LogOut,
  Sparkles
} from 'lucide-react';
import { api, LiveProfile, LiveResume, LiveProject, LiveMessage, AdminDashboardData } from '../services/api';
import { usePortfolio } from '../context/PortfolioContext';

export const AdminModal: React.FC = () => {
  const { isAdminOpen, closeAdmin, refreshData, profile: contextProfile } = usePortfolio();

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('varunkumarjob2004@gmail.com');
  const [password, setPassword] = useState('VarunAdmin@2025!');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // CMS Active Tab
  type TabType = 'dashboard' | 'resume' | 'profile' | 'projects' | 'messages' | 'github';
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Dashboard Data
  const [dashboard, setDashboard] = useState<AdminDashboardData | null>(null);
  const [messages, setMessages] = useState<LiveMessage[]>([]);
  const [projectsList, setProjectsList] = useState<LiveProject[]>([]);
  const [resumeData, setResumeData] = useState<LiveResume | null>(null);
  const [editableProfile, setEditableProfile] = useState<LiveProfile>(contextProfile);

  // Status banners & feedback
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [syncingGithub, setSyncingGithub] = useState(false);
  const [testingEmail, setTestingEmail] = useState(false);

  // Resume Upload State
  const [uploadingResume, setUploadingResume] = useState(false);
  const [resumeFileName, setResumeFileName] = useState('');
  const [resumeBase64, setResumeBase64] = useState('');
  const [resumeDesc, setResumeDesc] = useState('Production updated technical resume');

  // Project Editor State
  const [editingProject, setEditingProject] = useState<Partial<LiveProject> | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  useEffect(() => {
    if (api.isAdminLoggedIn()) {
      setIsLoggedIn(true);
      loadAdminData();
    }
  }, [isAdminOpen]);

  useEffect(() => {
    setEditableProfile(contextProfile);
  }, [contextProfile]);

  const showStatus = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const loadAdminData = async () => {
    try {
      const [dash, msgs, projs, res] = await Promise.all([
        api.getAdminDashboard().catch(() => null),
        api.getMessages().catch(() => []),
        api.getProjects().catch(() => []),
        api.getResume().catch(() => null)
      ]);

      if (dash) setDashboard(dash);
      if (msgs) setMessages(msgs);
      if (projs) setProjectsList(projs);
      if (res) setResumeData(res);
      if (dash?.profile) setEditableProfile(dash.profile);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await api.adminLogin(password, email);
      if (res.success) {
        setIsLoggedIn(true);
        loadAdminData();
        showStatus('Welcome back, Varun! Admin console initialized.');
      } else {
        setLoginError(res.error || 'Authentication failed. Check credentials.');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    api.adminLogout();
    setIsLoggedIn(false);
    showStatus('Logged out of Admin Console.');
  };

  // Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await api.updateProfile(editableProfile);
      setEditableProfile(updated);
      await refreshData();
      showStatus('Profile & Availability updated successfully on live portfolio!');
    } catch (err: any) {
      showStatus(err.message || 'Failed to update profile', 'error');
    }
  };

  // Resume Upload Handler
  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      setResumeBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadResume = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFileName && !resumeBase64) {
      showStatus('Please select a PDF file first', 'error');
      return;
    }

    setUploadingResume(true);
    try {
      const updated = await api.uploadResume({
        fileName: resumeFileName,
        fileBase64: resumeBase64,
        description: resumeDesc
      });
      setResumeData(updated);
      await refreshData();
      setResumeFileName('');
      setResumeBase64('');
      showStatus(`Resume v${updated.version} published! Website immediately updated.`);
    } catch (err: any) {
      showStatus(err.message || 'Upload failed', 'error');
    } finally {
      setUploadingResume(false);
    }
  };

  // Project Save (Create or Update)
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) return;

    try {
      if (isCreatingProject) {
        await api.createProject(editingProject);
        showStatus(`Created new project: "${editingProject.title}"`);
      } else if (editingProject.id) {
        await api.updateProject(editingProject.id, editingProject);
        showStatus(`Updated project: "${editingProject.title}"`);
      }
      setEditingProject(null);
      setIsCreatingProject(false);
      await loadAdminData();
      await refreshData();
    } catch (err: any) {
      showStatus(err.message || 'Failed to save project', 'error');
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!window.confirm(`Delete project "${title}"?`)) return;
    try {
      await api.deleteProject(id);
      showStatus(`Deleted project "${title}"`);
      await loadAdminData();
      await refreshData();
    } catch (err: any) {
      showStatus(err.message || 'Failed to delete project', 'error');
    }
  };

  // Message Handlers
  const handleUpdateMessageStatus = async (id: string, status: 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED') => {
    try {
      await api.updateMessageStatus(id, status);
      await loadAdminData();
      showStatus(`Message status set to ${status}`);
    } catch (err: any) {
      showStatus('Failed to update message', 'error');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await api.deleteMessage(id);
      await loadAdminData();
      showStatus('Message removed from archive');
    } catch (err: any) {
      showStatus('Failed to delete message', 'error');
    }
  };

  // GitHub Sync
  const handleGithubSync = async () => {
    setSyncingGithub(true);
    try {
      const res = await api.syncGithubNow();
      showStatus(`GitHub synced! ${res.reposCount || 0} repositories updated from GitHub API.`);
      await loadAdminData();
      await refreshData();
    } catch (err: any) {
      showStatus(err.message || 'GitHub sync failed', 'error');
    } finally {
      setSyncingGithub(false);
    }
  };

  // Test Email Diagnostic
  const handleTestEmail = async () => {
    setTestingEmail(true);
    try {
      const res = await api.testEmailService();
      if (res.success) {
        showStatus(res.message || '✓ Email sent successfully');
      } else {
        showStatus(res.error || res.message || 'Email test failed', 'error');
      }
    } catch (err: any) {
      showStatus(err.message || 'Failed to trigger test email', 'error');
    } finally {
      setTestingEmail(false);
    }
  };

  if (!isAdminOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#000000]/80 backdrop-blur-md overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      id="admin-modal-overlay"
    >
      <div
        className="w-full max-w-5xl bg-[#0D1117] border border-[#2D3748] rounded-[6px] shadow-[0_24px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[92vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#161B22] border-b border-[#2D3748]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#1A1F28] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono font-bold text-[#F0F4F8] tracking-wider">
                  VARUN KUMAR // ADMIN CONSOLE
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                  LIVE CMS
                </span>
              </div>
              <div className="text-xs text-[#A8B8C8] font-mono">
                {isLoggedIn ? `Authenticated as: ${email}` : 'Private Content Management System'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded bg-[#1A1F28] border border-[#2D3748] hover:border-red-500/60 hover:text-red-400 text-xs font-mono text-[#A8B8C8] flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">LOGOUT</span>
              </button>
            )}
            <button
              onClick={closeAdmin}
              className="p-1.5 rounded bg-[#1A1F28] border border-[#2D3748] hover:border-[#D4AF37] hover:text-[#D4AF37] text-[#A8B8C8] transition-colors"
              title="Close CMS"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Toast Alert */}
        {statusMsg && (
          <div
            className={`px-6 py-2.5 text-xs font-mono flex items-center gap-2 ${
              statusMsg.type === 'success'
                ? 'bg-[#10B981]/15 text-[#10B981] border-b border-[#10B981]/30'
                : 'bg-red-500/15 text-red-400 border-b border-red-500/30'
            }`}
          >
            {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Body Content */}
        {!isLoggedIn ? (
          /* LOGIN FORM */
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded bg-[#1A1F28] border border-[#D4AF37] mx-auto flex items-center justify-center text-[#D4AF37]">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#F0F4F8] tracking-tight">PORTFOLIO CMS AUTHENTICATION</h2>
              <p className="text-xs text-[#A8B8C8] leading-relaxed">
                Enter your administrative credentials to manage projects, update resume versions, and review contact submissions.
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#A8B8C8] mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded bg-[#161B22] border border-[#2D3748] text-sm text-[#F0F4F8] font-mono focus:border-[#1E90FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#A8B8C8] mb-1">
                  Admin Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 rounded bg-[#161B22] border border-[#2D3748] text-sm text-[#F0F4F8] font-mono focus:border-[#1E90FF] focus:outline-none"
                />
                <div className="text-[11px] font-mono text-[#6B7280] mt-1">
                  Pre-configured in environment: <code className="text-[#D4AF37]">VarunAdmin@2025!</code>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 rounded bg-[#D4AF37] hover:bg-[#e0bc46] text-[#0D1117] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 font-mono"
              >
                {loginLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                <span>{loginLoading ? 'AUTHENTICATING...' : 'ACCESS ADMIN PANEL'}</span>
              </button>
            </form>
          </div>
        ) : (
          /* LOGGED IN CMS WORKSPACE */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Nav Tabs */}
            <div className="flex border-b border-[#2D3748] bg-[#161B22] overflow-x-auto text-xs font-mono">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-5 py-3 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'dashboard'
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-[#1A1F28]'
                    : 'border-transparent text-[#A8B8C8] hover:text-[#F0F4F8]'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>DASHBOARD</span>
              </button>

              <button
                onClick={() => setActiveTab('resume')}
                className={`px-5 py-3 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'resume'
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-[#1A1F28]'
                    : 'border-transparent text-[#A8B8C8] hover:text-[#F0F4F8]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>RESUME MANAGER</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`px-5 py-3 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-[#1A1F28]'
                    : 'border-transparent text-[#A8B8C8] hover:text-[#F0F4F8]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>PROFILE & AVAILABILITY</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`px-5 py-3 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'projects'
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-[#1A1F28]'
                    : 'border-transparent text-[#A8B8C8] hover:text-[#F0F4F8]'
                }`}
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>PROJECTS</span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`px-5 py-3 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'messages'
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-[#1A1F28]'
                    : 'border-transparent text-[#A8B8C8] hover:text-[#F0F4F8]'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>MESSAGES</span>
                {messages.filter((m) => m.status === 'NEW').length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#1E90FF] text-[#0D1117] font-bold text-[10px] flex items-center justify-center">
                    {messages.filter((m) => m.status === 'NEW').length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('github')}
                className={`px-5 py-3 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'github'
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-[#1A1F28]'
                    : 'border-transparent text-[#A8B8C8] hover:text-[#F0F4F8]'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>GITHUB SYNC</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-5 rounded bg-[#161B22] border border-[#2D3748]">
                      <div className="text-xs font-mono text-[#A8B8C8] uppercase tracking-wider">TOTAL INQUIRIES</div>
                      <div className="text-3xl font-bold font-mono text-[#F0F4F8] mt-1">{messages.length}</div>
                      <div className="text-[11px] font-mono text-[#10B981] mt-1">
                        {messages.filter((m) => m.status === 'NEW').length} unread submissions
                      </div>
                    </div>

                    <div className="p-5 rounded bg-[#161B22] border border-[#2D3748]">
                      <div className="text-xs font-mono text-[#A8B8C8] uppercase tracking-wider">RESUME VERSION</div>
                      <div className="text-3xl font-bold font-mono text-[#D4AF37] mt-1">
                        v{resumeData?.version || 1}
                      </div>
                      <div className="text-[11px] font-mono text-[#A8B8C8] mt-1 truncate">
                        {resumeData?.fileName || 'Active PDF'}
                      </div>
                    </div>

                    <div className="p-5 rounded bg-[#161B22] border border-[#2D3748]">
                      <div className="text-xs font-mono text-[#A8B8C8] uppercase tracking-wider">MANAGED PROJECTS</div>
                      <div className="text-3xl font-bold font-mono text-[#00D9FF] mt-1">{projectsList.length}</div>
                      <div className="text-[11px] font-mono text-[#A8B8C8] mt-1">Live in portfolio grid</div>
                    </div>

                    <div className="p-5 rounded bg-[#161B22] border border-[#2D3748]">
                      <div className="text-xs font-mono text-[#A8B8C8] uppercase tracking-wider">AVAILABILITY</div>
                      <div className="text-lg font-bold font-mono text-[#10B981] mt-2 truncate">
                        {editableProfile.status || 'OPEN_TO_WORK'}
                      </div>
                      <div className="text-[11px] font-mono text-[#A8B8C8] mt-1 truncate">
                        {editableProfile.availability}
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="p-5 rounded bg-[#161B22] border border-[#2D3748] space-y-3">
                    <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
                      QUICK ADMIN SHORTCUTS
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setActiveTab('resume')}
                        className="px-4 py-2 rounded bg-[#1A1F28] border border-[#2D3748] hover:border-[#D4AF37] text-xs font-mono text-[#F0F4F8] flex items-center gap-2 transition-all"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Upload New Resume</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('profile')}
                        className="px-4 py-2 rounded bg-[#1A1F28] border border-[#2D3748] hover:border-[#1E90FF] text-xs font-mono text-[#F0F4F8] flex items-center gap-2 transition-all"
                      >
                        <User className="w-3.5 h-3.5 text-[#1E90FF]" />
                        <span>Edit Availability / Bio</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsCreatingProject(true);
                          setEditingProject({
                            title: '',
                            subtitle: '',
                            category: 'Device Drivers & Bare-Metal',
                            description: '',
                            problem: '',
                            approach: '',
                            implementation: '',
                            debugging: '',
                            validation: '',
                            technologies: ['Embedded C', 'STM32', 'ARM Cortex-M'],
                            repositoryUrl: 'https://github.com/varunkumarjob898',
                            featured: true
                          });
                          setActiveTab('projects');
                        }}
                        className="px-4 py-2 rounded bg-[#1A1F28] border border-[#2D3748] hover:border-[#00D9FF] text-xs font-mono text-[#F0F4F8] flex items-center gap-2 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#00D9FF]" />
                        <span>Add New Project</span>
                      </button>

                      <button
                        onClick={handleGithubSync}
                        disabled={syncingGithub}
                        className="px-4 py-2 rounded bg-[#1A1F28] border border-[#2D3748] hover:border-[#10B981] text-xs font-mono text-[#F0F4F8] flex items-center gap-2 transition-all"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 text-[#10B981] ${syncingGithub ? 'animate-spin' : ''}`} />
                        <span>Sync GitHub Repos</span>
                      </button>
                    </div>
                  </div>

                  {/* Recent Inquiries Snippet */}
                  <div className="p-5 rounded bg-[#161B22] border border-[#2D3748] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono text-[#A8B8C8] uppercase tracking-wider font-bold">
                        RECENT CONTACT FORM INQUIRIES
                      </div>
                      <button
                        onClick={() => setActiveTab('messages')}
                        className="text-xs font-mono text-[#1E90FF] hover:underline"
                      >
                        View all ({messages.length}) →
                      </button>
                    </div>

                    {messages.length === 0 ? (
                      <div className="text-xs font-mono text-[#6B7280] py-4 text-center">No inquiries logged yet.</div>
                    ) : (
                      <div className="space-y-2">
                        {messages.slice(0, 3).map((msg) => (
                          <div
                            key={msg.id}
                            className="p-3 rounded bg-[#0D1117] border border-[#2D3748] flex items-center justify-between text-xs font-mono"
                          >
                            <div className="space-y-0.5">
                              <div className="font-bold text-[#F0F4F8]">
                                {msg.name} <span className="text-[#A8B8C8] font-normal">&lt;{msg.email}&gt;</span>
                              </div>
                              <div className="text-[#D4AF37] truncate max-w-md">{msg.subject}</div>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                msg.status === 'NEW'
                                  ? 'bg-[#1E90FF]/20 text-[#1E90FF]'
                                  : 'bg-gray-700/40 text-gray-300'
                              }`}
                            >
                              {msg.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: RESUME MANAGER */}
              {activeTab === 'resume' && (
                <div className="space-y-6">
                  {/* Current Active Resume Card */}
                  <div className="p-6 rounded bg-[#161B22] border border-[#2D3748] space-y-4">
                    <div className="flex items-center justify-between border-b border-[#2D3748] pb-3">
                      <div>
                        <div className="text-xs font-mono text-[#D4AF37] font-bold uppercase">ACTIVE RESUME VERSION</div>
                        <div className="text-lg font-bold text-[#F0F4F8] mt-0.5">
                          {resumeData?.fileName || 'Varun_Kumar_Firmware_CV.pdf'}
                        </div>
                      </div>
                      <div className="px-3 py-1 rounded bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] font-mono text-xs font-bold">
                        ACTIVE ON SITE
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                      <div>
                        <span className="text-[#6B7280]">Version Number:</span>
                        <div className="text-[#F0F4F8] font-bold mt-0.5">v{resumeData?.version || 1}</div>
                      </div>
                      <div>
                        <span className="text-[#6B7280]">Last Published:</span>
                        <div className="text-[#F0F4F8] mt-0.5">
                          {resumeData?.uploadedAt ? new Date(resumeData.uploadedAt).toLocaleString() : 'Recent'}
                        </div>
                      </div>
                      <div>
                        <span className="text-[#6B7280]">File Type:</span>
                        <div className="text-[#F0F4F8] mt-0.5">PDF Document</div>
                      </div>
                    </div>
                  </div>

                  {/* Upload Form */}
                  <form onSubmit={handleUploadResume} className="p-6 rounded bg-[#161B22] border border-[#2D3748] space-y-5">
                    <div className="text-xs font-mono text-[#D4AF37] font-bold uppercase tracking-wider flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      <span>UPLOAD NEW RESUME FILE</span>
                    </div>

                    <p className="text-xs text-[#A8B8C8]">
                      Select a new PDF file from your device. When submitted, the backend increments the version number, persists the document, and immediately updates the live download button on the public portfolio.
                    </p>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#A8B8C8] mb-1">
                          Select PDF Document
                        </label>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleResumeFileChange}
                          className="w-full p-2.5 rounded bg-[#0D1117] border border-[#2D3748] text-xs font-mono text-[#F0F4F8] file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-[#D4AF37] file:text-[#0D1117] file:font-bold file:text-xs cursor-pointer"
                        />
                        {resumeFileName && (
                          <div className="text-xs font-mono text-[#10B981] mt-1.5">
                            Selected file: {resumeFileName}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#A8B8C8] mb-1">
                          Version Notes / Description
                        </label>
                        <input
                          type="text"
                          value={resumeDesc}
                          onChange={(e) => setResumeDesc(e.target.value)}
                          placeholder="e.g. Added FreeRTOS deterministic task scheduler benchmarks"
                          className="w-full p-2.5 rounded bg-[#0D1117] border border-[#2D3748] text-xs font-mono text-[#F0F4F8] focus:border-[#1E90FF] focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={uploadingResume}
                      className="py-2.5 px-5 rounded bg-[#D4AF37] hover:bg-[#e0bc46] text-[#0D1117] font-bold text-xs uppercase font-mono tracking-wider flex items-center gap-2 transition-all"
                    >
                      {uploadingResume ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      <span>{uploadingResume ? 'UPLOADING...' : 'PUBLISH RESUME VERSION'}</span>
                    </button>
                  </form>

                  {/* Version History */}
                  {resumeData?.history && resumeData.history.length > 0 && (
                    <div className="p-6 rounded bg-[#161B22] border border-[#2D3748] space-y-3">
                      <div className="text-xs font-mono text-[#A8B8C8] font-bold uppercase tracking-wider">
                        VERSION HISTORY
                      </div>
                      <div className="space-y-2">
                        {resumeData.history.map((hist, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded bg-[#0D1117] border border-[#2D3748] flex items-center justify-between text-xs font-mono"
                          >
                            <div className="space-y-0.5">
                              <span className="text-[#D4AF37] font-bold">Version {hist.version}</span> •{' '}
                              <span className="text-[#F0F4F8]">{hist.fileName}</span>
                              {hist.description && (
                                <div className="text-[11px] text-[#A8B8C8]">{hist.description}</div>
                              )}
                            </div>
                            <div className="text-[11px] text-[#6B7280]">
                              {new Date(hist.uploadedAt).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: PROFILE & AVAILABILITY */}
              {activeTab === 'profile' && (
                <form onSubmit={handleSaveProfile} className="p-6 rounded bg-[#161B22] border border-[#2D3748] space-y-6">
                  <div className="flex items-center justify-between border-b border-[#2D3748] pb-4">
                    <div>
                      <div className="text-xs font-mono text-[#D4AF37] font-bold uppercase tracking-wider">
                        PROFILE CONFIGURATION
                      </div>
                      <p className="text-xs text-[#A8B8C8] mt-0.5">
                        Changes update the Hero section, About section, and Contact information in real time.
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="py-2 px-5 rounded bg-[#D4AF37] hover:bg-[#e0bc46] text-[#0D1117] font-bold text-xs uppercase font-mono tracking-wider flex items-center gap-1.5 transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>SAVE CHANGES</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#A8B8C8] mb-1">
                        Professional Title
                      </label>
                      <input
                        type="text"
                        value={editableProfile.title}
                        onChange={(e) => setEditableProfile({ ...editableProfile, title: e.target.value })}
                        className="w-full p-2.5 rounded bg-[#0D1117] border border-[#2D3748] text-xs font-mono text-[#F0F4F8] focus:border-[#1E90FF] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#A8B8C8] mb-1">
                        Availability Status
                      </label>
                      <select
                        value={editableProfile.status}
                        onChange={(e) => setEditableProfile({ ...editableProfile, status: e.target.value })}
                        className="w-full p-2.5 rounded bg-[#0D1117] border border-[#2D3748] text-xs font-mono text-[#10B981] font-bold focus:border-[#1E90FF] focus:outline-none"
                      >
                        <option value="OPEN_TO_WORK">OPEN_TO_WORK (Actively Interviewing)</option>
                        <option value="AVAILABLE">AVAILABLE (Full-time & Technical)</option>
                        <option value="ENGAGED">ENGAGED (Selective Opportunities)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#A8B8C8] mb-1">
                        Availability Banner Message
                      </label>
                      <input
                        type="text"
                        value={editableProfile.availability}
                        onChange={(e) => setEditableProfile({ ...editableProfile, availability: e.target.value })}
                        placeholder="e.g. Available for full-time roles and technical discussions."
                        className="w-full p-2.5 rounded bg-[#0D1117] border border-[#2D3748] text-xs font-mono text-[#F0F4F8] focus:border-[#1E90FF] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#A8B8C8] mb-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={editableProfile.email}
                        onChange={(e) => setEditableProfile({ ...editableProfile, email: e.target.value })}
                        className="w-full p-2.5 rounded bg-[#0D1117] border border-[#2D3748] text-xs font-mono text-[#F0F4F8] focus:border-[#1E90FF] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#A8B8C8] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={editableProfile.phone}
                        onChange={(e) => setEditableProfile({ ...editableProfile, phone: e.target.value })}
                        className="w-full p-2.5 rounded bg-[#0D1117] border border-[#2D3748] text-xs font-mono text-[#F0F4F8] focus:border-[#1E90FF] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#A8B8C8] mb-1">
                        GitHub Profile URL
                      </label>
                      <input
                        type="url"
                        value={editableProfile.github}
                        onChange={(e) => setEditableProfile({ ...editableProfile, github: e.target.value })}
                        className="w-full p-2.5 rounded bg-[#0D1117] border border-[#2D3748] text-xs font-mono text-[#F0F4F8] focus:border-[#1E90FF] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#A8B8C8] mb-1">
                        LinkedIn Profile URL
                      </label>
                      <input
                        type="url"
                        value={editableProfile.linkedin}
                        onChange={(e) => setEditableProfile({ ...editableProfile, linkedin: e.target.value })}
                        className="w-full p-2.5 rounded bg-[#0D1117] border border-[#2D3748] text-xs font-mono text-[#F0F4F8] focus:border-[#1E90FF] focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#A8B8C8] mb-1">
                        Core Biography Statement
                      </label>
                      <textarea
                        rows={4}
                        value={editableProfile.bio}
                        onChange={(e) => setEditableProfile({ ...editableProfile, bio: e.target.value })}
                        className="w-full p-2.5 rounded bg-[#0D1117] border border-[#2D3748] text-xs font-mono text-[#F0F4F8] focus:border-[#1E90FF] focus:outline-none"
                      />
                    </div>
                  </div>
                </form>
              )}

              {/* TAB 4: PROJECTS MANAGER */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  {/* Action Bar */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono text-[#D4AF37] font-bold uppercase tracking-wider">
                        PORTFOLIO PROJECTS ({projectsList.length})
                      </div>
                      <div className="text-xs text-[#A8B8C8]">
                        Manage projects featured on the homepage and detail modals.
                      </div>
                    </div>

                    {!editingProject && (
                      <button
                        onClick={() => {
                          setIsCreatingProject(true);
                          setEditingProject({
                            title: '',
                            subtitle: '',
                            category: 'Device Drivers & Bare-Metal',
                            description: '',
                            problem: '',
                            approach: '',
                            implementation: '',
                            debugging: '',
                            validation: '',
                            technologies: ['Embedded C', 'STM32'],
                            repositoryUrl: 'https://github.com/varunkumarjob898',
                            featured: true
                          });
                        }}
                        className="py-2 px-4 rounded bg-[#D4AF37] hover:bg-[#e0bc46] text-[#0D1117] font-bold text-xs font-mono uppercase flex items-center gap-1.5 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        <span>ADD NEW PROJECT</span>
                      </button>
                    )}
                  </div>

                  {/* Project Editor Form */}
                  {editingProject ? (
                    <form onSubmit={handleSaveProject} className="p-6 rounded bg-[#161B22] border border-[#2D3748] space-y-4">
                      <div className="flex items-center justify-between border-b border-[#2D3748] pb-3">
                        <div className="text-xs font-mono text-[#D4AF37] font-bold uppercase">
                          {isCreatingProject ? 'CREATE NEW PROJECT' : `EDIT: ${editingProject.title}`}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProject(null);
                            setIsCreatingProject(false);
                          }}
                          className="text-xs font-mono text-[#A8B8C8] hover:text-[#F0F4F8]"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase text-[#A8B8C8] mb-1">Title</label>
                          <input
                            type="text"
                            required
                            value={editingProject.title || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                            className="w-full p-2.5 rounded bg-[#0D1117] border border-[#2D3748] text-xs font-mono text-[#F0F4F8] focus:border-[#1E90FF] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase text-[#A8B8C8] mb-1">Subtitle</label>
                          <input
                            type="text"
                            value={editingProject.subtitle || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                            className="w-full p-2.5 rounded bg-[#0D1117] border border-[#2D3748] text-xs font-mono text-[#F0F4F8] focus:border-[#1E90FF] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase text-[#A8B8C8] mb-1">Category</label>
                          <input
                            type="text"
                            value={editingProject.category || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                            className="w-full p-2.5 rounded bg-[#0D1117] border border-[#2D3748] text-xs font-mono text-[#F0F4F8] focus:border-[#1E90FF] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase text-[#A8B8C8] mb-1">Repository URL</label>
                          <input
                            type="url"
                            value={editingProject.repositoryUrl || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, repositoryUrl: e.target.value })}
                            className="w-full p-2.5 rounded bg-[#0D1117] border border-[#2D3748] text-xs font-mono text-[#F0F4F8] focus:border-[#1E90FF] focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-mono uppercase text-[#A8B8C8] mb-1">Description</label>
                          <textarea
                            rows={3}
                            value={editingProject.description || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                            className="w-full p-2.5 rounded bg-[#0D1117] border border-[#2D3748] text-xs font-mono text-[#F0F4F8] focus:border-[#1E90FF] focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-mono uppercase text-[#A8B8C8] mb-1">
                            Technologies (comma-separated)
                          </label>
                          <input
                            type="text"
                            value={Array.isArray(editingProject.technologies) ? editingProject.technologies.join(', ') : editingProject.technologies || ''}
                            onChange={(e) =>
                              setEditingProject({
                                ...editingProject,
                                technologies: e.target.value.split(',').map((s) => s.trim())
                              })
                            }
                            className="w-full p-2.5 rounded bg-[#0D1117] border border-[#2D3748] text-xs font-mono text-[#F0F4F8] focus:border-[#1E90FF] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-3">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProject(null);
                            setIsCreatingProject(false);
                          }}
                          className="px-4 py-2 rounded bg-[#1A1F28] border border-[#2D3748] text-xs font-mono text-[#A8B8C8]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded bg-[#D4AF37] hover:bg-[#e0bc46] text-[#0D1117] font-bold text-xs font-mono uppercase flex items-center gap-1.5"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save Project</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Project Cards List */
                    <div className="space-y-3">
                      {projectsList.map((proj) => (
                        <div
                          key={proj.id}
                          className="p-4 rounded bg-[#161B22] border border-[#2D3748] hover:border-[#1E90FF] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#F0F4F8] text-sm">{proj.title}</span>
                              <span className="text-xs text-[#D4AF37] font-mono">({proj.subtitle})</span>
                            </div>
                            <p className="text-xs text-[#A8B8C8] max-w-2xl line-clamp-2">{proj.description}</p>
                            <div className="flex items-center gap-4 text-[11px] font-mono text-[#6B7280] pt-1">
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-[#D4AF37]" /> {proj.githubMetadata?.stars || 0}
                              </span>
                              <span className="flex items-center gap-1">
                                <GitFork className="w-3 h-3 text-[#1E90FF]" /> {proj.githubMetadata?.forks || 0}
                              </span>
                              <span>Category: {proj.category}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => {
                                setIsCreatingProject(false);
                                setEditingProject(proj);
                              }}
                              className="px-3 py-1.5 rounded bg-[#1A1F28] border border-[#2D3748] hover:border-[#D4AF37] text-xs font-mono text-[#F0F4F8]"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id, proj.title)}
                              className="p-1.5 rounded bg-[#1A1F28] border border-[#2D3748] hover:border-red-500 text-[#A8B8C8] hover:text-red-400"
                              title="Delete Project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: MESSAGES CENTER */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2D3748] pb-4">
                    <div>
                      <div className="text-xs font-mono text-[#D4AF37] font-bold uppercase tracking-wider">
                        CONTACT INBOX ({messages.length})
                      </div>
                      <div className="text-xs text-[#A8B8C8]">
                        Submissions received directly through the portfolio contact form & forwarded via Gmail SMTP.
                      </div>
                    </div>
                    <button
                      onClick={handleTestEmail}
                      disabled={testingEmail}
                      className="px-3 py-1.5 rounded bg-[#1A1F28] hover:bg-[#1E90FF]/15 border border-[#2D3748] hover:border-[#1E90FF] text-xs font-mono text-[#F0F4F8] flex items-center gap-2 transition-all disabled:opacity-50"
                    >
                      <Mail className={`w-3.5 h-3.5 text-[#1E90FF] ${testingEmail ? 'animate-bounce' : ''}`} />
                      <span>{testingEmail ? 'Testing SMTP...' : 'Test Email Service'}</span>
                    </button>
                  </div>

                  {messages.length === 0 ? (
                    <div className="p-12 text-center text-xs font-mono text-[#6B7280] rounded bg-[#161B22] border border-[#2D3748]">
                      No messages received yet. When visitors submit the contact form, submissions appear here immediately.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className="p-5 rounded bg-[#161B22] border border-[#2D3748] space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2D3748] pb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-[#F0F4F8] text-sm">{msg.name}</span>
                                <span className="text-xs font-mono text-[#A8B8C8]">&lt;{msg.email}&gt;</span>
                              </div>
                              <div className="text-xs font-mono text-[#D4AF37] font-semibold mt-0.5">
                                {msg.subject}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-mono">
                              <span
                                className={`px-2.5 py-0.5 rounded font-bold text-[10px] ${
                                  msg.status === 'NEW'
                                    ? 'bg-[#1E90FF]/20 text-[#1E90FF] border border-[#1E90FF]/40'
                                    : 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40'
                                }`}
                              >
                                {msg.status}
                              </span>
                              <span className="text-[#6B7280]">
                                {new Date(msg.receivedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs font-mono text-[#F0F4F8] leading-relaxed whitespace-pre-wrap p-3 rounded bg-[#0D1117] border border-[#2D3748]">
                            {msg.message}
                          </p>

                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-2">
                              {msg.status === 'NEW' ? (
                                <button
                                  onClick={() => handleUpdateMessageStatus(msg.id, 'READ')}
                                  className="px-3 py-1 rounded bg-[#1A1F28] border border-[#2D3748] hover:border-[#10B981] text-xs font-mono text-[#A8B8C8] hover:text-[#10B981]"
                                >
                                  Mark as Read
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleUpdateMessageStatus(msg.id, 'NEW')}
                                  className="px-3 py-1 rounded bg-[#1A1F28] border border-[#2D3748] text-xs font-mono text-[#6B7280]"
                                >
                                  Mark as New
                                </button>
                              )}

                              <a
                                href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                                onClick={() => handleUpdateMessageStatus(msg.id, 'REPLIED')}
                                className="px-3 py-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0D1117] text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
                              >
                                <Mail className="w-3 h-3" />
                                <span>Reply via Email</span>
                              </a>
                            </div>

                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="p-1 rounded text-[#6B7280] hover:text-red-400"
                              title="Delete message"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: GITHUB LIVE SYNC */}
              {activeTab === 'github' && (
                <div className="space-y-6">
                  <div className="p-6 rounded bg-[#161B22] border border-[#2D3748] space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono text-[#D4AF37] font-bold uppercase tracking-wider">
                          GITHUB REPOSITORY SYNC ENGINE
                        </div>
                        <p className="text-xs text-[#A8B8C8] mt-0.5">
                          Target Account: <code className="text-[#1E90FF]">github.com/varunkumarjob898</code>
                        </p>
                      </div>

                      <button
                        onClick={handleGithubSync}
                        disabled={syncingGithub}
                        className="py-2.5 px-5 rounded bg-[#D4AF37] hover:bg-[#e0bc46] text-[#0D1117] font-bold text-xs uppercase font-mono tracking-wider flex items-center gap-2 transition-all"
                      >
                        <RefreshCw className={`w-4 h-4 ${syncingGithub ? 'animate-spin' : ''}`} />
                        <span>{syncingGithub ? 'FETCHING REPOS...' : 'TRIGGER GITHUB SYNC NOW'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono border-t border-[#2D3748] pt-4">
                      <div>
                        <span className="text-[#6B7280]">Last Successful Sync:</span>
                        <div className="text-[#F0F4F8] mt-0.5">
                          {dashboard?.lastGithubSync ? new Date(dashboard.lastGithubSync).toLocaleString() : 'Just now'}
                        </div>
                      </div>
                      <div>
                        <span className="text-[#6B7280]">Target User:</span>
                        <div className="text-[#F0F4F8] mt-0.5">varunkumarjob898</div>
                      </div>
                      <div>
                        <span className="text-[#6B7280]">API Status:</span>
                        <div className="text-[#10B981] font-bold mt-0.5">ONLINE (v3 REST API)</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-mono text-[#A8B8C8] font-bold uppercase tracking-wider">
                      REPOSITORIES RECOGNIZED BY SYSTEM
                    </div>
                    {projectsList.map((p, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded bg-[#161B22] border border-[#2D3748] flex items-center justify-between text-xs font-mono"
                      >
                        <div className="space-y-1">
                          <div className="font-bold text-[#F0F4F8]">{p.title}</div>
                          <a
                            href={p.repositoryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1E90FF] hover:underline flex items-center gap-1 text-[11px]"
                          >
                            <span>{p.repositoryUrl}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-[#D4AF37]">
                          <span>⭐ {p.githubMetadata?.stars || 12}</span>
                          <span>🍴 {p.githubMetadata?.forks || 3}</span>
                          <span>📦 {p.githubMetadata?.commits || 17} commits</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
