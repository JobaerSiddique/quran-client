// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import { quranApi } from "@/services/api";
// import AyahCard from "@/components/surah/AyahCard";
// import LoadingSpinner from "@/components/common/LoadingSpinner";
// import ErrorMessage from "@/components/common/ErrorMessage";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, Search as SearchIcon, Filter, X } from "lucide-react";

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const query = searchParams.get("q") || "";
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filterSurah, setFilterSurah] = useState<number | null>(null);
//   const [showFilters, setShowFilters] = useState(false);

//   // Fetch search results
//   const { data, isLoading, error, refetch } = useQuery({
//     queryKey: ["search", query, currentPage, filterSurah],
//     queryFn: () =>
//       quranApi.searchAyahs(query, {
//         page: currentPage,
//         limit: 20,
//         surah: filterSurah || undefined,
//       }),
//     enabled: !!query && query.trim().length > 0,
//     staleTime: 5000,
//   });

//   const results = data?.data || [];
//   const meta = data?.meta;

//   // Fetch all surahs for filter dropdown
//   const { data: surahsData } = useQuery({
//     queryKey: ["surahs"],
//     queryFn: () => quranApi.getSurahs(),
//     staleTime: Infinity,
//   });

//   const surahs = surahsData?.data || [];

//   // Handle page change
//   const handlePageChange = (newPage: number) => {
//     setCurrentPage(newPage);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // Clear filters
//   const clearFilters = () => {
//     setFilterSurah(null);
//     setCurrentPage(1);
//   };

//   if (!query) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center">
//         <div className="text-center">
//           <SearchIcon className="w-16 h-16 mx-auto text-base-content/20 mb-4" />
//           <h2 className="text-2xl font-bold mb-2">No Search Query</h2>
//           <p className="text-base-content/70">
//             Please enter a search term to find verses
//           </p>
//           <button
//             onClick={() => router.push("/")}
//             className="btn btn-primary mt-4"
//           >
//             Go to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (isLoading) return <LoadingSpinner />;
//   if (error) return <ErrorMessage message="Search failed" onRetry={refetch} />;

//   return (
//     <div className="max-w-4xl mx-auto">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mb-8"
//       >
//         <button
//           onClick={() => router.back()}
//           className="btn btn-ghost btn-sm mb-4 gap-2"
//         >
//           <ChevronLeft className="w-4 h-4" />
//           Back
//         </button>

//         <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 shadow-lg">
//           <div className="card-body">
//             <div className="flex items-center justify-between flex-wrap gap-4">
//               <div className="flex items-center gap-3">
//                 <div className="bg-primary/20 p-3 rounded-full">
//                   <SearchIcon className="w-6 h-6 text-primary" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl font-bold">Search Results</h1>
//                   <p className="text-base-content/70">
//                     Found {meta?.total || results.length} verses for "{query}"
//                   </p>
//                 </div>
//               </div>

//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="btn btn-outline btn-sm gap-2"
//               >
//                 <Filter className="w-4 h-4" />
//                 Filters
//                 {filterSurah !== null && (
//                   <span className="badge badge-primary badge-sm">1</span>
//                 )}
//               </button>
//             </div>

//             {/* Filters Panel */}
//             <AnimatePresence>
//               {showFilters && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   className="overflow-hidden"
//                 >
//                   <div className="border-t border-base-200 pt-4 mt-4">
//                     <div className="flex items-center justify-between mb-3">
//                       <h3 className="font-semibold">Filter by Surah</h3>
//                       {filterSurah !== null && (
//                         <button
//                           onClick={clearFilters}
//                           className="btn btn-ghost btn-xs text-error"
//                         >
//                           <X className="w-3 h-3" />
//                           Clear
//                         </button>
//                       )}
//                     </div>
//                     <select
//                       value={filterSurah || ""}
//                       onChange={(e) => {
//                         setFilterSurah(
//                           e.target.value ? parseInt(e.target.value) : null,
//                         );
//                         setCurrentPage(1);
//                       }}
//                       className="select select-bordered w-full"
//                     >
//                       <option value="">All Surahs</option>
//                       {surahs.map((surah) => (
//                         <option
//                           key={surah.surahNumber}
//                           value={surah.surahNumber}
//                         >
//                           {surah.surahNumber}. {surah.nameEnglish} (
//                           {surah.nameArabic})
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </motion.div>

//       {/* Results Count Badge */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="text-sm text-base-content/60">
//           Showing {results.length} of {meta?.total || 0} results
//         </div>
//         {filterSurah && (
//           <div className="badge badge-primary gap-2">
//             Filtered: Surah {filterSurah}
//             <button
//               onClick={clearFilters}
//               className="btn btn-xs btn-circle btn-ghost"
//             >
//               <X className="w-3 h-3" />
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Search Results */}
//       {results.length > 0 ? (
//         <>
//           <div className="space-y-4">
//             {results.map((result, index) => (
//               <AyahCard
//                 key={`${result.surahNumber}-${result.ayahNumber}`}
//                 ayah={result}
//                 index={index}
//               />
//             ))}
//           </div>

//           {/* Pagination */}
//           {meta && meta.totalPage > 1 && (
//             <div className="flex justify-center gap-2 mt-8">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="btn btn-outline btn-sm"
//               >
//                 Previous
//               </button>
//               <div className="join">
//                 {Array.from({ length: Math.min(5, meta.totalPage) }, (_, i) => {
//                   let pageNum;
//                   if (meta.totalPage <= 5) {
//                     pageNum = i + 1;
//                   } else if (currentPage <= 3) {
//                     pageNum = i + 1;
//                   } else if (currentPage >= meta.totalPage - 2) {
//                     pageNum = meta.totalPage - 4 + i;
//                   } else {
//                     pageNum = currentPage - 2 + i;
//                   }

//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => handlePageChange(pageNum)}
//                       className={`join-item btn btn-sm ${currentPage === pageNum ? "btn-primary" : "btn-outline"}`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}
//               </div>
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === meta.totalPage}
//                 className="btn btn-outline btn-sm"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </>
//       ) : (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-center py-16"
//         >
//           <SearchIcon className="w-20 h-20 mx-auto text-base-content/20 mb-4" />
//           <h3 className="text-xl font-semibold mb-2">No results found</h3>
//           <p className="text-base-content/70 mb-6">
//             We couldn't find any verses matching "{query}"
//           </p>
//           <div className="max-w-md mx-auto">
//             <p className="text-sm text-base-content/50 mb-4">
//               Try searching for:
//             </p>
//             <div className="flex flex-wrap gap-2 justify-center">
//               {[
//                 "Allah",
//                 "Mercy",
//                 "Peace",
//                 "Prayer",
//                 "Forgiveness",
//                 "Paradise",
//               ].map((term) => (
//                 <button
//                   key={term}
//                   onClick={() => {
//                     router.push(`/search?q=${encodeURIComponent(term)}`);
//                   }}
//                   className="badge badge-outline hover:badge-primary cursor-pointer transition-colors"
//                 >
//                   {term}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// }
import { Suspense } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import SearchContent from "./SearchContent";

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchContent />
    </Suspense>
  );
}
