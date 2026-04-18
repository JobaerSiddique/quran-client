// components/SurahCard.tsx
"use client";

import Link from "next/link";

interface SurahCardProps {
  surah: {
    surahNumber: number;
    nameArabic: string;
    nameEnglish: string;
    nameTransliteration: string;
    totalAyahs: number;
    revelationType: string;
  };
  index: number;
}

export default function SurahCard({ surah, index }: SurahCardProps) {
  return (
    <Link href={`/surah/${surah.surahNumber}`}>
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer">
        <div className="card-body">
          <div className="flex justify-between items-start">
            <div className="badge badge-primary badge-lg">
              {surah.surahNumber}
            </div>
            <div className="text-right">
              {/* Arabic text with global class */}
              <div className="arabic-text text-2xl mb-2">
                {surah.nameArabic}
              </div>
              <div className="text-sm font-semibold">{surah.nameEnglish}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {surah.nameTransliteration}
              </div>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
            <span>{surah.revelationType}</span>
            <span>{surah.totalAyahs} verses</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
