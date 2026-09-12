// src/services/api.ts
// Client-side API service connecting React to Express backend endpoints

export interface LiveProfile {
  firstName: string;
  lastName: string;
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  website: string;
  degree: string;
  university: string;
  cgpa: string;
  bio: string;
  availability: string;
  status: string;
  lastUpdated?: string;
}

export interface LiveResume {
  fileName: string;
  version: number;
  fileSize: number;
  fileUrl: string;
  uploadedAt: string;
  description?: string;
  isActive: boolean;
  history?: Array<{
    version: number;
    fileName: string;
    uploadedAt: string;
    description?: string;
  }>;
}

export interface LiveProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  problem: string;
  approach: string;
  implementation: string;
  debugging: string;
  validation: string;
  technologies: string[];
  repositoryUrl: string;
  featured: boolean;
  displayOrder: number;
  githubMetadata: {
    stars: number;
    forks: number;
    commits: number;
    language: string;
    lastUpdated: string;
  };
}

export interface LiveMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';
  receivedAt: string;
  notes?: string;
}

export interface AdminDashboardData {
  totalMessages: number;
  newMessages: number;
  projectCount: number;
  resumeVersion: number;
  lastResumeUpdate: string;
  lastGithubSync: string;
  profile: LiveProfile;
}

const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('varun_portfolio_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  // Public endpoints
  async getProfile(): Promise<LiveProfile> {
    const res = await fetch('/api/profile');
    const json = await res.json();
    return json.data;
  },

  async getResume(): Promise<LiveResume> {
    const res = await fetch('/api/resume');
    const json = await res.json();
    return json.data;
  },

  async getProjects(): Promise<LiveProject[]> {
    const res = await fetch('/api/projects');
    const json = await res.json();
    return json.data;
  },

  async getGithubRepos(): Promise<{ data: any[]; lastSynced: string }> {
    const res = await fetch('/api/github/repos');
    const json = await res.json();
    return { data: json.data || [], lastSynced: json.lastSynced || '' };
  },

  async sendContactMessage(payload: { name: string; email: string; subject: string; message: string }): Promise<{ success: boolean; message: string }> {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  },

  // Admin authentication
  async adminLogin(password: string, email: string = 'varunkumarjob2004@gmail.com'): Promise<{ success: boolean; token?: string; error?: string }> {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const json = await res.json();
    if (json.success && json.token) {
      localStorage.setItem('varun_portfolio_admin_token', json.token);
    }
    return json;
  },

  adminLogout(): void {
    localStorage.removeItem('varun_portfolio_admin_token');
  },

  isAdminLoggedIn(): boolean {
    return Boolean(localStorage.getItem('varun_portfolio_admin_token'));
  },

  // Protected Admin CMS endpoints
  async getAdminDashboard(): Promise<AdminDashboardData> {
    const res = await fetch('/api/admin/dashboard', {
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Unauthorized');
    const json = await res.json();
    return json.data;
  },

  async updateProfile(updates: Partial<LiveProfile>): Promise<LiveProfile> {
    const res = await fetch('/api/admin/profile/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update profile');
    const json = await res.json();
    return json.data;
  },

  async uploadResume(payload: { fileName: string; fileUrl?: string; fileBase64?: string; description?: string }): Promise<LiveResume> {
    const res = await fetch('/api/admin/resume/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to upload resume');
    const json = await res.json();
    return json.data;
  },

  async createProject(project: Partial<LiveProject>): Promise<LiveProject> {
    const res = await fetch('/api/admin/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(project)
    });
    if (!res.ok) throw new Error('Failed to create project');
    const json = await res.json();
    return json.data;
  },

  async updateProject(id: string, updates: Partial<LiveProject>): Promise<LiveProject> {
    const res = await fetch(`/api/admin/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update project');
    const json = await res.json();
    return json.data;
  },

  async deleteProject(id: string): Promise<void> {
    const res = await fetch(`/api/admin/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to delete project');
  },

  async getMessages(): Promise<LiveMessage[]> {
    const res = await fetch('/api/admin/messages', {
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to get messages');
    const json = await res.json();
    return json.data;
  },

  async updateMessageStatus(id: string, status: 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED', notes?: string): Promise<LiveMessage> {
    const res = await fetch(`/api/admin/messages/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ status, notes })
    });
    if (!res.ok) throw new Error('Failed to update message');
    const json = await res.json();
    return json.data;
  },

  async deleteMessage(id: string): Promise<void> {
    const res = await fetch(`/api/admin/messages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to delete message');
  },

  async syncGithubNow(): Promise<any> {
    const res = await fetch('/api/admin/github/sync', {
      method: 'POST',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to sync with GitHub');
    return await res.json();
  },

  async testEmailService(): Promise<{ success: boolean; message?: string; error?: string }> {
    const res = await fetch('/api/admin/test-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      }
    });
    const json = await res.json();
    return json;
  }
};
