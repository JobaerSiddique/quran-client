// hooks/useSettings.ts
import { useState, useEffect } from "react";
import { IUserSettings } from "@/types";

const defaultSettings: IUserSettings = {
  arabicFont: "amiri",
  arabicFontSize: 1.2,
  translationFontSize: 0.9,
};

export const useSettings = () => {
  const [settings, setSettings] = useState<IUserSettings>(defaultSettings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Apply settings to CSS variables
  const applySettingsToCSS = (newSettings: IUserSettings) => {
    // Set CSS variables for font sizes
    document.documentElement.style.setProperty(
      "--arabic-font-size",
      `${newSettings.arabicFontSize}rem`,
    );
    document.documentElement.style.setProperty(
      "--translation-font-size",
      `${newSettings.translationFontSize}rem`,
    );

    // Apply font class to body
    const body = document.body;
    const fontClasses = [
      "font-amiri",
      "font-me-quran",
      "font-kfgqpc",
      "font-traditional-arabic",
      "font-noto-nastaliq",
    ];
    fontClasses.forEach((cls) => body.classList.remove(cls));
    body.classList.add(`font-${newSettings.arabicFont}`);

    // Dispatch custom event for components to listen
    window.dispatchEvent(
      new CustomEvent("settingsChanged", { detail: newSettings }),
    );
  };

  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("quran_settings");
    if (saved) {
      const parsedSettings = JSON.parse(saved);
      const newSettings = {
        arabicFont: parsedSettings.arabicFont || defaultSettings.arabicFont,
        arabicFontSize:
          parsedSettings.arabicFontSize || defaultSettings.arabicFontSize,
        translationFontSize:
          parsedSettings.translationFontSize ||
          defaultSettings.translationFontSize,
      };
      setSettings(newSettings);
      applySettingsToCSS(newSettings);
    } else {
      applySettingsToCSS(defaultSettings);
    }
  }, []);

  // Save settings to localStorage whenever they change
  const updateSettings = (newSettings: Partial<IUserSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem("quran_settings", JSON.stringify(updated));
    applySettingsToCSS(updated);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem("quran_settings", JSON.stringify(defaultSettings));
    applySettingsToCSS(defaultSettings);
  };

  return {
    settings,
    updateSettings,
    resetSettings,
    isSettingsOpen,
    setIsSettingsOpen,
  };
};
