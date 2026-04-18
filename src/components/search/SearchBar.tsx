"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchAyahs } from "@/hooks/quran.hooks";

const POPULAR_SEARCHES = [
  "Allah",
  "Mercy",
  "Peace",
  "Paradise",
  "Prayer",
  "Forgiveness",
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const { data } = useSearchAyahs(query);
  const hasResults = data?.data && data.data.length > 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const handlePopularSearch = (term: string) => {
    setQuery(term);
    router.push(`/search?q=${encodeURIComponent(term)}`);
    setIsFocused(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search by English translation..."
            className="input input-bordered w-full pl-10 pr-10 bg-base-100"
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-4 h-4 text-base-content/50 hover:text-base-content" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </form>

      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            className="absolute z-10 w-full mt-2 bg-base-100 rounded-lg shadow-xl border border-base-200 overflow-hidden"
          >
            {query && hasResults ? (
              <div className="p-2">
                <div className="text-xs text-base-content/50 px-3 py-2">
                  Search Results
                </div>
                {data?.data.slice(0, 5).map((result) => (
                  <button
                    key={`${result.surahNumber}-${result.ayahNumber}`}
                    onClick={() =>
                      router.push(
                        `/surah/${result.surahNumber}#ayah-${result.ayahNumber}`,
                      )
                    }
                    className="w-full text-left px-3 py-2 hover:bg-base-200 rounded-lg transition-colors"
                  >
                    <div className="font-medium">
                      Surah {result.surahNumber}:{result.ayahNumber}
                    </div>
                    <div className="text-sm text-base-content/70 truncate">
                      {result.textEnglish.substring(0, 100)}...
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm font-medium mb-3">
                  <TrendingUp className="w-4 h-4" />
                  Popular Searches
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => handlePopularSearch(term)}
                      className="badge badge-outline hover:badge-primary cursor-pointer transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
