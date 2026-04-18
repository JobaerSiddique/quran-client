"use client";

import { motion } from "framer-motion";
import SurahList from "@/components/surah/SurahList";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useGetQuranStats } from "@/hooks/quran.hooks";

export default function Home() {
  const { data: statsResponse, isLoading } = useGetQuranStats();

  if (isLoading) return <LoadingSpinner />;

  // Extract data from the API response structure
  const stats = statsResponse?.data;

  return (
    <div>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hero bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mb-12"
      >
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-4">Welcome to Quran App</h1>
            <p className="mb-6">
              Read, listen, and reflect upon the Holy Quran with translation and
              audio.
            </p>
            {stats && (
              <div className="stats shadow stats-vertical lg:stats-horizontal">
                <div className="stat">
                  <div className="stat-title">Total Surahs</div>
                  <div className="stat-value text-primary">
                    {stats.totalSurahs}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Total Ayahs</div>
                  <div className="stat-value text-primary">
                    {stats.totalAyahs?.toLocaleString()}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Meccan/Medinan</div>
                  <div className="stat-value ">
                    {stats.meccanSurahs} / {stats.medinanSurahs}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Longest Surah</div>
                  <div className="stat-value ">{stats.longestSurah?.name}</div>
                  <div className="stat-desc">
                    {stats.longestSurah?.ayahs} verses
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Shortest Surah</div>
                  <div className="stat-value ">{stats.shortestSurah?.name}</div>
                  <div className="stat-desc">
                    {stats.shortestSurah?.ayahs} verses
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Surah List Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="bg-primary text-primary-content px-3 py-1 rounded-lg text-sm">
            114
          </span>
          Chapters (Surahs)
        </h2>
        <SurahList />
      </div>
    </div>
  );
}
