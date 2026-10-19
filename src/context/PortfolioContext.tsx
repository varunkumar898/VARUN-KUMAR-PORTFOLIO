import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, LiveProfile, LiveResume, LiveProject } from '../services/api';
import { PROFILE as initialProfile, PROJECTS as initialProjects } from '../data/portfolioData';

interface PortfolioContextType {
  profile: LiveProfile;
  resume: LiveResume | null;
  projects: LiveProject[];
  loading: boolean;
  isAdminOpen: boolean;
  openAdmin: () => void;
  closeAdmin: () => void;
  refreshData: () => Promise<void>;
  updateLiveProfile: (newProfile: LiveProfile) => void;
}

const fallbackProfile: LiveProfile = {
  firstName: "Varun",
  lastName: "Kumar",
  name: initialProfile.name,
  title: initialProfile.title,
  location: initialProfile.location,
  phone: initialProfile.phone,
  email: initialProfile.email,
  github: initialProfile.github,
  linkedin: initialProfile.linkedin,
  website: "https://varunkumar.dev",
  degree: initialProfile.degree,
  university: initialProfile.university,
  cgpa: initialProfile.cgpa,
  bio: "Embedded engineer writing C/C++ firmware and device drivers for ARM Cortex-M microcontrollers (STM32, ESP32). Experienced in FreeRTOS task design, interrupt handling (NVIC, EXTI), register-level drivers, and hardware-firmware debugging with JTAG/SWD, OpenOCD, GDB, and logic analyzers. Has built containerized CI/CD pipelines for firmware validation.",
  availability: "Available for full-time embedded engineering roles and technical discussions.",
  status: "OPEN_TO_WORK"
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<LiveProfile>(fallbackProfile);
  const [resume, setResume] = useState<LiveResume | null>(null);
  const [projects, setProjects] = useState<LiveProject[]>(initialProjects as any);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  const refreshData = async () => {
    try {
      const [fetchedProfile, fetchedResume, fetchedProjects] = await Promise.all([
        api.getProfile().catch(() => fallbackProfile),
        api.getResume().catch(() => null),
        api.getProjects().catch(() => initialProjects as any)
      ]);

      if (fetchedProfile) setProfile(fetchedProfile);
      if (fetchedResume) setResume(fetchedResume);
      if (fetchedProjects && fetchedProjects.length > 0) setProjects(fetchedProjects);
    } catch (err) {
      console.warn("Portfolio data refresh fallback:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
    // Check if URL has #admin hash
    if (window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }
  }, []);

  const openAdmin = () => setIsAdminOpen(true);
  const closeAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const updateLiveProfile = (newProfile: LiveProfile) => {
    setProfile(newProfile);
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        resume,
        projects,
        loading,
        isAdminOpen,
        openAdmin,
        closeAdmin,
        refreshData,
        updateLiveProfile
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
