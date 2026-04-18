// // contexts/SettingsContext.tsx
// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { IUserSettings } from "@/types";

// const defaultSettings: IUserSettings = {
//   arabicFont: "amiri",
//   arabicFontSize: 1.2,
//   translationFontSize: 0.9,
// };

// interface SettingsContextType {
//   settings: IUserSettings;
//   updateSettings: (newSettings: Partial<IUserSettings>) => void;
//   resetSettings: () => void;
//   isSettingsOpen: boolean;
//   setIsSettingsOpen: (open: boolean) => void;
// }

// const SettingsContext = createContext<SettingsContextType | undefined>(
//   undefined,
// );

// export function SettingsProvider({ children }: { children: React.ReactNode }) {
//   const [settings, setSettings] = useState<IUserSettings>(defaultSettings);
//   const [isSettingsOpen, setIsSettingsOpen] = useState(false);

//   useEffect(() => {
//     const saved = localStorage.getItem("quran_settings");
//     if (saved) {
//       const parsedSettings = JSON.parse(saved);
//       setSettings({
//         arabicFont: parsedSettings.arabicFont || defaultSettings.arabicFont,
//         arabicFontSize:
//           parsedSettings.arabicFontSize || defaultSettings.arabicFontSize,
//         translationFontSize:
//           parsedSettings.translationFontSize ||
//           defaultSettings.translationFontSize,
//       });
//     }
//   }, []);

//   const updateSettings = (newSettings: Partial<IUserSettings>) => {
//     const updated = { ...settings, ...newSettings };
//     setSettings(updated);
//     localStorage.setItem("quran_settings", JSON.stringify(updated));
//   };

//   const resetSettings = () => {
//     setSettings(defaultSettings);
//     localStorage.setItem("quran_settings", JSON.stringify(defaultSettings));
//   };

//   return (
//     <SettingsContext.Provider
//       value={{
//         settings,
//         updateSettings,
//         resetSettings,
//         isSettingsOpen,
//         setIsSettingsOpen,
//       }}
//     >
//       {children}
//     </SettingsContext.Provider>
//   );
// }

// export const useSettings = () => {
//   const context = useContext(SettingsContext);
//   if (!context)
//     throw new Error("useSettings must be used within SettingsProvider");
//   return context;
// };

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { IUserSettings } from "@/types";
import { ARABIC_FONTS } from "@/utils/constants";

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

  // ✅ Apply settings to CSS
  const applySettings = (s: IUserSettings) => {
    document.documentElement.style.setProperty(
      "--arabic-font-size",
      `${s.arabicFontSize}rem`,
    );
    document.documentElement.style.setProperty(
      "--translation-font-size",
      `${s.translationFontSize}rem`,
    );

    // remove old font classes
    const body = document.body;
    ARABIC_FONTS.forEach((f) => body.classList.remove(`font-${f.id}`));

    body.classList.add(`font-${s.arabicFont}`);
  };

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("quran_settings");

    if (saved) {
      const parsed = JSON.parse(saved);
      const merged = { ...defaultSettings, ...parsed };
      setSettings(merged);
      applySettings(merged);
    } else {
      applySettings(defaultSettings);
    }
  }, []);

  const updateSettings = (newSettings: Partial<IUserSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem("quran_settings", JSON.stringify(updated));
    applySettings(updated);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem("quran_settings", JSON.stringify(defaultSettings));
    applySettings(defaultSettings);
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
