import { motion } from "framer-motion";
import { IAyah } from "@/types";
import { useSettings } from "@/hooks/useSettings";

import { Play, Pause, Bookmark, Share2, Volume2 } from "lucide-react";
import { useState } from "react";

interface AyahCardProps {
  ayah: IAyah;
  index: number;
}

export default function AyahCard({ ayah, index }: AyahCardProps) {
  const { settings } = useSettings();
  console.log(settings);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const fontFamily =
    settings.arabicFont === "amiri" ? "font-arabic" : "font-arabic-lateef";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
      whileHover={{ scale: 1.01 }}
      className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className="card-body p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="badge badge-primary badge-sm">
              Verse {ayah.ayahNumber}
            </div>
            {ayah.sajda && (
              <div className="badge badge-secondary badge-sm">Sajda</div>
            )}
          </div>
        </div>

        <div
          className={`text-right mb-6 leading-loose ${fontFamily}`}
          style={{ fontSize: `${settings.arabicFontSize}rem` }}
        >
          {ayah.textArabic} <br />
          {ayah.textEnglish}
        </div>

        {/* {settings.showTranslation && (
          <>
            <div className="divider"></div>
            <div
              className="text-base-content/80 leading-relaxed"
              style={{ fontSize: `${settings.translationFontSize}rem` }}
            >
              {ayah.textEnglish}
            </div>
          </>
        )} */}

        <div className="flex justify-between items-center mt-4 text-xs text-base-content/50">
          <span>Juz {ayah.juz}</span>
          <span>Page {ayah.page}</span>
        </div>
      </div>
    </motion.div>
  );
}
