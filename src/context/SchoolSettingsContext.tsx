import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { SCHOOL_CONFIG, type SchoolConfigType } from "../config/school";

interface SchoolSettingsContextType {
  settings: SchoolConfigType;
  updateSettings: (newSettings: Partial<SchoolConfigType>) => Promise<boolean>;
  resetToDefaults: () => Promise<void>;
  isLoading: boolean;
  lastSaved: string | null;
}

const STORAGE_KEY = "spps_school_settings";

const SchoolSettingsContext = createContext<SchoolSettingsContextType>({
  settings: SCHOOL_CONFIG,
  updateSettings: async () => false,
  resetToDefaults: async () => {},
  isLoading: false,
  lastSaved: null,
});

export const SchoolSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SchoolConfigType>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...SCHOOL_CONFIG,
          ...parsed,
          name: { ...SCHOOL_CONFIG.name, ...(parsed.name || {}) },
          address: { ...SCHOOL_CONFIG.address, ...(parsed.address || {}) },
          contact: { ...SCHOOL_CONFIG.contact, ...(parsed.contact || {}) },
          social: { ...SCHOOL_CONFIG.social, ...(parsed.social || {}) },
          maintenanceMessage: { ...SCHOOL_CONFIG.maintenanceMessage, ...(parsed.maintenanceMessage || {}) },
        };
      }
    } catch (e) {
      console.warn("Failed to read settings from localStorage:", e);
    }
    return SCHOOL_CONFIG;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Sync from backend /api/settings on mount
  useEffect(() => {
    let isMounted = true;
    const fetchBackendSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data === "object" && Object.keys(data).length > 0) {
            if (isMounted) {
              const merged: SchoolConfigType = {
                ...SCHOOL_CONFIG,
                ...data,
                name: { ...SCHOOL_CONFIG.name, ...(data.name || {}) },
                address: { ...SCHOOL_CONFIG.address, ...(data.address || {}) },
                contact: { ...SCHOOL_CONFIG.contact, ...(data.contact || {}) },
                social: { ...SCHOOL_CONFIG.social, ...(data.social || {}) },
                maintenanceMessage: { ...SCHOOL_CONFIG.maintenanceMessage, ...(data.maintenanceMessage || {}) },
              };
              setSettings(merged);
              localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            }
          }
        }
      } catch (err) {
        // Backend not available (e.g. static host) - localStorage fallback already active
      }
    };
    fetchBackendSettings();
    return () => {
      isMounted = false;
    };
  }, []);

  const updateSettings = useCallback(async (newSettings: Partial<SchoolConfigType>): Promise<boolean> => {
    setIsLoading(true);
    try {
      const updated: SchoolConfigType = {
        ...settings,
        ...newSettings,
        name: { ...settings.name, ...(newSettings.name || {}) },
        address: { ...settings.address, ...(newSettings.address || {}) },
        contact: { ...settings.contact, ...(newSettings.contact || {}) },
        social: { ...settings.social, ...(newSettings.social || {}) },
        maintenanceMessage: { ...(settings.maintenanceMessage || SCHOOL_CONFIG.maintenanceMessage!), ...(newSettings.maintenanceMessage || {}) },
      };

      setSettings(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      // Attempt backend persistence
      try {
        await fetch("/api/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        });
      } catch (backendErr) {
        console.warn("Backend API sync failed, settings saved locally:", backendErr);
      }

      const now = new Date().toLocaleTimeString();
      setLastSaved(now);
      setIsLoading(false);
      return true;
    } catch (e) {
      console.error("Error updating settings:", e);
      setIsLoading(false);
      return false;
    }
  }, [settings]);

  const resetToDefaults = useCallback(async () => {
    setIsLoading(true);
    setSettings(SCHOOL_CONFIG);
    localStorage.removeItem(STORAGE_KEY);
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(SCHOOL_CONFIG),
      });
    } catch (e) {
      console.warn("Backend reset failed:", e);
    }
    setLastSaved(new Date().toLocaleTimeString());
    setIsLoading(false);
  }, []);

  return (
    <SchoolSettingsContext.Provider
      value={{
        settings,
        updateSettings,
        resetToDefaults,
        isLoading,
        lastSaved,
      }}
    >
      {children}
    </SchoolSettingsContext.Provider>
  );
};

export const useSchoolSettings = () => useContext(SchoolSettingsContext);

