import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Project,
  InnovationCategory,
  TeamMember,
  Achievement,
  EventItem,
  Partner,
  MembershipApplication,
  MediaItem,
  NavigationItem,
  SiteSettings,
  AdminUser,
  ToastMessage,
} from '../types';
import {
  initialProjects,
  initialInnovationCategories,
  initialTeamMembers,
  initialAchievements,
  initialEvents,
  initialPartners,
  initialApplications,
  initialMedia,
  initialNavigation,
  initialSiteSettings,
  initialAdminUser,
} from './initialData';

interface CMSContextType {
  projects: Project[];
  innovationCategories: InnovationCategory[];
  teamMembers: TeamMember[];
  achievements: Achievement[];
  events: EventItem[];
  partners: Partner[];
  applications: MembershipApplication[];
  media: MediaItem[];
  navigation: NavigationItem[];
  settings: SiteSettings;
  adminUser: AdminUser;
  toasts: ToastMessage[];

  // Toast actions
  addToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Project actions
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Innovation actions
  addInnovationCategory: (category: Omit<InnovationCategory, 'id' | 'order'>) => void;
  updateInnovationCategory: (id: string, updates: Partial<InnovationCategory>) => void;
  deleteInnovationCategory: (id: string) => void;
  reorderInnovationCategories: (categories: InnovationCategory[]) => void;

  // Team actions
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;

  // Achievement actions
  addAchievement: (achievement: Omit<Achievement, 'id'>) => void;
  updateAchievement: (id: string, updates: Partial<Achievement>) => void;
  deleteAchievement: (id: string) => void;
  toggleAchievementFeatured: (id: string) => void;

  // Event actions
  addEvent: (event: Omit<EventItem, 'id'>) => void;
  updateEvent: (id: string, updates: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;

  // Partner actions
  addPartner: (partner: Omit<Partner, 'id'>) => void;
  updatePartner: (id: string, updates: Partial<Partner>) => void;
  deletePartner: (id: string) => void;

  // Membership Application actions
  submitApplication: (app: Omit<MembershipApplication, 'id' | 'status' | 'submittedAt'>) => void;
  updateApplicationStatus: (id: string, status: MembershipApplication['status']) => void;
  deleteApplication: (id: string) => void;

  // Media actions
  addMediaItem: (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => void;
  deleteMediaItem: (id: string) => void;

  // Navigation actions
  updateNavigation: (items: NavigationItem[]) => void;
  toggleNavItem: (id: string) => void;

  // Settings & Theme
  updateSettings: (updates: Partial<SiteSettings>) => void;
  updateHeroSettings: (updates: Partial<SiteSettings['homepageHero']>) => void;
  toggleSectionVisibility: (sectionKey: keyof SiteSettings['sectionsVisibility']) => void;
  resetAllToDefault: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'pentatech_cms_v2_';

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}projects`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.some((p: Project) => p.title.toLowerCase().includes('afriversity'))) {
          return parsed;
        }
      } catch (e) {
        // ignore
      }
    }
    return initialProjects;
  });

  const [innovationCategories, setInnovationCategories] = useState<InnovationCategory[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}innovation`);
    return saved ? JSON.parse(saved) : initialInnovationCategories;
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}team`);
    return saved ? JSON.parse(saved) : initialTeamMembers;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}achievements`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.some((a: Achievement) => a.title.toLowerCase().includes('alx'))) {
          return parsed;
        }
      } catch (e) {
        // ignore
      }
    }
    return initialAchievements;
  });

  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}events`);
    return saved ? JSON.parse(saved) : initialEvents;
  });

  const [partners, setPartners] = useState<Partner[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}partners`);
    return saved ? JSON.parse(saved) : initialPartners;
  });

  const [applications, setApplications] = useState<MembershipApplication[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}applications`);
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [media, setMedia] = useState<MediaItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}media`);
    return saved ? JSON.parse(saved) : initialMedia;
  });

  const [navigation, setNavigation] = useState<NavigationItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}navigation`);
    return saved ? JSON.parse(saved) : initialNavigation;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}settings`);
    return saved ? JSON.parse(saved) : initialSiteSettings;
  });

  const [adminUser] = useState<AdminUser>(initialAdminUser);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // LocalStorage synchronizations
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}projects`, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}innovation`, JSON.stringify(innovationCategories));
  }, [innovationCategories]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}team`, JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}achievements`, JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}events`, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}partners`, JSON.stringify(partners));
  }, [partners]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}applications`, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}media`, JSON.stringify(media));
  }, [media]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}navigation`, JSON.stringify(navigation));
  }, [navigation]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}settings`, JSON.stringify(settings));
  }, [settings]);

  // Toast actions
  const addToast = (title: string, message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Projects CRUD
  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
    };
    setProjects((prev) => [newProject, ...prev]);
    addToast('Project Added', `"${projectData.title}" was added.`);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    addToast('Project Updated', 'Changes were saved successfully.');
  };

  const deleteProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    addToast('Project Removed', target ? `"${target.title}" was deleted.` : 'Project deleted.', 'info');
  };

  // Innovation CRUD
  const addInnovationCategory = (categoryData: Omit<InnovationCategory, 'id' | 'order'>) => {
    const newCategory: InnovationCategory = {
      ...categoryData,
      id: `inno-${Date.now()}`,
      order: innovationCategories.length + 1,
    };
    setInnovationCategories((prev) => [...prev, newCategory]);
    addToast('Innovation Category Added', newCategory.title);
  };

  const updateInnovationCategory = (id: string, updates: Partial<InnovationCategory>) => {
    setInnovationCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    addToast('Innovation Updated', 'Category updated successfully.');
  };

  const deleteInnovationCategory = (id: string) => {
    setInnovationCategories((prev) => prev.filter((c) => c.id !== id));
    addToast('Category Removed', 'Innovation area removed.', 'info');
  };

  const reorderInnovationCategories = (orderedList: InnovationCategory[]) => {
    setInnovationCategories(orderedList);
    addToast('Order Saved', 'Innovation categories reordered.');
  };

  // Achievements CRUD
  const addAchievement = (achData: Omit<Achievement, 'id'>) => {
    const newAch: Achievement = { ...achData, id: `ach-${Date.now()}` };
    setAchievements((prev) => [newAch, ...prev]);
    addToast('Achievement Added', achData.title);
  };

  const updateAchievement = (id: string, updates: Partial<Achievement>) => {
    setAchievements((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)));
    addToast('Achievement Updated', 'Milestone recognition updated.');
  };

  const deleteAchievement = (id: string) => {
    setAchievements((prev) => prev.filter((a) => a.id !== id));
    addToast('Achievement Deleted', 'Record removed.', 'info');
  };

  const toggleAchievementFeatured = (id: string) => {
    setAchievements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isFeatured: !a.isFeatured } : a))
    );
    addToast('Homepage Feature Toggled', 'Homepage display status updated.');
  };

  // Team CRUD
  const addTeamMember = (memberData: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = { ...memberData, id: `team-${Date.now()}` };
    setTeamMembers((prev) => [...prev, newMember]);
    addToast('Team Member Added', memberData.name);
  };

  const updateTeamMember = (id: string, updates: Partial<TeamMember>) => {
    setTeamMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
    addToast('Profile Updated', 'Team member profile saved.');
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
    addToast('Profile Deleted', 'Team member removed.', 'info');
  };

  // Events CRUD
  const addEvent = (eventData: Omit<EventItem, 'id'>) => {
    const newEvent: EventItem = { ...eventData, id: `evt-${Date.now()}` };
    setEvents((prev) => [newEvent, ...prev]);
    addToast('Event Scheduled', eventData.title);
  };

  const updateEvent = (id: string, updates: Partial<EventItem>) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
    addToast('Event Updated', 'Event saved.');
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    addToast('Event Removed', 'Event cancelled.', 'info');
  };

  // Partners CRUD
  const addPartner = (partnerData: Omit<Partner, 'id'>) => {
    const newPartner: Partner = { ...partnerData, id: `ptn-${Date.now()}` };
    setPartners((prev) => [...prev, newPartner]);
    addToast('Partner Added', partnerData.name);
  };

  const updatePartner = (id: string, updates: Partial<Partner>) => {
    setPartners((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    addToast('Partner Updated', 'Partner details updated.');
  };

  const deletePartner = (id: string) => {
    setPartners((prev) => prev.filter((p) => p.id !== id));
    addToast('Partner Removed', 'Partner removed from registry.', 'info');
  };

  // Membership Applications
  const submitApplication = (appData: Omit<MembershipApplication, 'id' | 'status' | 'submittedAt'>) => {
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newApp: MembershipApplication = {
      ...appData,
      id: `app-${Date.now().toString().slice(-4)}`,
      status: 'Pending',
      submittedAt: formattedDate,
    };
    setApplications((prev) => [newApp, ...prev]);
    addToast('Application Received', 'Your application to Team Pentatech has been submitted.');
  };

  const updateApplicationStatus = (id: string, status: MembershipApplication['status']) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    addToast('Status Updated', `Application marked as ${status}.`);
  };

  const deleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
    addToast('Application Deleted', 'Record removed.', 'info');
  };

  // Media
  const addMediaItem = (itemData: Omit<MediaItem, 'id' | 'uploadedAt'>) => {
    const newItem: MediaItem = {
      ...itemData,
      id: `med-${Date.now()}`,
      uploadedAt: 'Just now',
    };
    setMedia((prev) => [newItem, ...prev]);
    addToast('Media Added', `${itemData.name} added to library.`);
  };

  const deleteMediaItem = (id: string) => {
    setMedia((prev) => prev.filter((m) => m.id !== id));
    addToast('Asset Deleted', 'Media asset removed.', 'info');
  };

  // Navigation
  const updateNavigation = (items: NavigationItem[]) => {
    setNavigation(items);
    addToast('Navigation Saved', 'Menu structure updated.');
  };

  const toggleNavItem = (id: string) => {
    setNavigation((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isEnabled: !item.isEnabled } : item))
    );
  };

  // Settings
  const updateSettings = (updates: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
    addToast('Settings Saved', 'Site configuration updated.');
  };

  const updateHeroSettings = (updates: Partial<SiteSettings['homepageHero']>) => {
    setSettings((prev) => ({
      ...prev,
      homepageHero: { ...prev.homepageHero, ...updates },
    }));
    addToast('Hero Updated', 'Hero banner configuration published.');
  };

  const toggleSectionVisibility = (sectionKey: keyof SiteSettings['sectionsVisibility']) => {
    setSettings((prev) => ({
      ...prev,
      sectionsVisibility: {
        ...prev.sectionsVisibility,
        [sectionKey]: !prev.sectionsVisibility[sectionKey],
      },
    }));
    addToast('Visibility Toggled', `Section ${String(sectionKey)} visibility changed.`);
  };

  const resetAllToDefault = () => {
    setProjects(initialProjects);
    setInnovationCategories(initialInnovationCategories);
    setTeamMembers(initialTeamMembers);
    setAchievements(initialAchievements);
    setEvents(initialEvents);
    setPartners(initialPartners);
    setApplications(initialApplications);
    setMedia(initialMedia);
    setNavigation(initialNavigation);
    setSettings(initialSiteSettings);
    localStorage.clear();
    addToast('Reset Complete', 'Default platform data restored.', 'info');
  };

  return (
    <CMSContext.Provider
      value={{
        projects,
        innovationCategories,
        teamMembers,
        achievements,
        events,
        partners,
        applications,
        media,
        navigation,
        settings,
        adminUser,
        toasts,
        addToast,
        removeToast,
        addProject,
        updateProject,
        deleteProject,
        addInnovationCategory,
        updateInnovationCategory,
        deleteInnovationCategory,
        reorderInnovationCategories,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        toggleAchievementFeatured,
        addEvent,
        updateEvent,
        deleteEvent,
        addPartner,
        updatePartner,
        deletePartner,
        submitApplication,
        updateApplicationStatus,
        deleteApplication,
        addMediaItem,
        deleteMediaItem,
        updateNavigation,
        toggleNavItem,
        updateSettings,
        updateHeroSettings,
        toggleSectionVisibility,
        resetAllToDefault,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = (): CMSContextType => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
