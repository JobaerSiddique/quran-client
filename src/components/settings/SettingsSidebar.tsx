"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, Type, RotateCcw } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { ARABIC_FONTS } from "@/utils/constants";

interface SettingsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsSidebar({
  isOpen,
  onClose,
}: SettingsSidebarProps) {
  const { settings, updateSettings, resetSettings } = useSettings();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-base-100 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="sticky top-0 bg-base-100 border-b border-base-200 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                <h2 className="text-xl font-bold">Reading Settings</h2>
              </div>
              <button onClick={onClose} className="btn btn-circle btn-ghost">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Arabic Font Selection */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                  <Type className="w-4 h-4" />
                  Arabic Font Style
                </label>
                <div className="flex flex-wrap gap-2">
                  {ARABIC_FONTS.map((font) => (
                    <button
                      key={font.id}
                      onClick={() =>
                        updateSettings({
                          arabicFont: font.id as
                            | "amiri"
                            | "me_quran"
                            | "kfgqpc"
                            | "traditional_arabic"
                            | "noto_nastaliq",
                        })
                      }
                      className={`btn ${settings.arabicFont === font.id ? "btn-primary" : "btn-outline"}`}
                    >
                      <span className={font.fontFamily}>{font.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Arabic Font Size */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                  Arabic Font Size: {settings.arabicFontSize.toFixed(1)}rem
                </label>
                <input
                  type="range"
                  min="0.8"
                  max="2.5"
                  step="0.05"
                  value={settings.arabicFontSize}
                  onChange={(e) =>
                    updateSettings({
                      arabicFontSize: parseFloat(e.target.value),
                    })
                  }
                  className="range range-primary range-sm"
                />
                <div className="flex justify-between text-xs mt-2 px-2">
                  <span>0.8rem</span>
                  <span>1.6rem</span>
                  <span>2.5rem</span>
                </div>
              </div>

              {/* Translation Font Size */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                  Translation Font Size:{" "}
                  {settings.translationFontSize.toFixed(1)}rem
                </label>
                <input
                  type="range"
                  min="0.7"
                  max="1.5"
                  step="0.05"
                  value={settings.translationFontSize}
                  onChange={(e) =>
                    updateSettings({
                      translationFontSize: parseFloat(e.target.value),
                    })
                  }
                  className="range range-primary range-sm"
                />
                <div className="flex justify-between text-xs mt-2 px-2">
                  <span>0.7rem</span>
                  <span>1.1rem</span>
                  <span>1.5rem</span>
                </div>
              </div>

              {/* Preview Section */}
              <div className="mt-6 p-4 bg-base-200 rounded-lg">
                <label className="text-sm font-semibold mb-2 block">
                  Preview
                </label>
                <div className="space-y-2">
                  <div
                    className="text-right text-lg preview-arabic"
                    style={{
                      fontSize: `${settings.arabicFontSize}rem`,
                      fontFamily: `var(--font-${settings.arabicFont})`,
                    }}
                  >
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </div>
                  <div
                    className="text-sm text-gray-600 dark:text-gray-400 preview-translation"
                    style={{ fontSize: `${settings.translationFontSize}rem` }}
                  >
                    In the name of Allah, the Most Gracious, the Most Merciful
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetSettings}
                className="btn btn-outline btn-error w-full gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset to Default
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
