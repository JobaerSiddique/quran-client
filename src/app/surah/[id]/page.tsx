"use client";

import { useParams, useRouter } from "next/navigation";

import { useSettings } from "@/hooks/useSettings";
import AyahCard from "@/components/surah/AyahCard";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import { motion } from "framer-motion";
import { ChevronLeft, Play, Info } from "lucide-react";
import { useGetSurahById } from "@/hooks/quran.hooks";

export default function SurahPage() {
  const { id } = useParams();
  const router = useRouter();
  const surahNumber = parseInt(id as string);
  const { data, isLoading, error, refetch } = useGetSurahById(surahNumber);
  const { settings } = useSettings();
  const fontFamily =
    settings.arabicFont === "amiri" ? "font-arabic" : "font-arabic-lateef";

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return <ErrorMessage message="Failed to load surah" onRetry={refetch} />;
  if (!data) return null;

  const { surah, ayahs } = data?.data;

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button
          onClick={() => router.back()}
          className="btn btn-ghost btn-sm mb-4 gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <div className="card bg-gradient-to-r from-primary/5 to-secondary/5 shadow-xl">
          <div className="card-body text-center">
            <div className="flex justify-center gap-2 mb-2">
              <div className="badge badge-primary">{surah.revelationType}</div>
              <div className="badge badge-outline">
                {surah.totalAyahs} Verses
              </div>
            </div>
            <div
              className={`text-4xl mb-3 ${fontFamily}`}
              style={{ fontSize: `${settings.arabicFontSize + 0.5}rem` }}
            >
              {surah.nameArabic}
            </div>
            <h1 className="text-3xl font-bold">{surah.nameEnglish}</h1>
            <p className="text-base-content/70">{surah.nameTransliteration}</p>
            <div className="flex justify-center gap-4 mt-4">
              <button className="btn btn-outline btn-sm gap-2">
                <Info className="w-4 h-4" />
                About
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ayahs List */}
      <div className="space-y-4">
        {ayahs.map((ayah, index) => (
          <AyahCard key={ayah.ayahNumber} ayah={ayah} index={index} />
        ))}
      </div>
    </div>
  );
}
