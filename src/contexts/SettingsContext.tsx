// contexts/SettingsContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { IUserSettings } from "@/types";

const defaultSettings: IUserSettings = {
  arabicFont: "amiri",
  arabicFontSize: 1.2,
  translationFontSize: 0.9,
};

interface SettingsContextType {
  settings: IUserSettings;
  updateSettings: (newSettings: Partial<IUserSettings>) => void;
  resetSettings: () => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<IUserSettings>(defaultSettings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("quran_settings");
    if (saved) {
      const parsedSettings = JSON.parse(saved);
      setSettings({
        arabicFont: parsedSettings.arabicFont || defaultSettings.arabicFont,
        arabicFontSize:
          parsedSettings.arabicFontSize || defaultSettings.arabicFontSize,
        translationFontSize:
          parsedSettings.translationFontSize ||
          defaultSettings.translationFontSize,
      });
    }
  }, []);

  const updateSettings = (newSettings: Partial<IUserSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem("quran_settings", JSON.stringify(updated));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem("quran_settings", JSON.stringify(defaultSettings));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        isSettingsOpen,
        setIsSettingsOpen,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context)
    throw new Error("useSettings must be used within SettingsProvider");
  return context;
};
