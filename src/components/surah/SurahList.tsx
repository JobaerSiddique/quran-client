// "use client";

// import { useState } from "react";
// import SurahCard from "./SurahCard";
// import LoadingSpinner from "../common/LoadingSpinner";
// import ErrorMessage from "../common/ErrorMessage";
// import { motion } from "framer-motion";
// import { useGetSurahs } from "@/hooks/quran.hooks";

// // Skeleton
// const SkeletonCard = () => (
//   <div className="animate-pulse">
//     <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 h-32"></div>
//   </div>
// );

// export default function SurahList() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const ITEMS_PER_PAGE = 12;

//   const { data, isLoading, isFetching, error, refetch } = useGetSurahs({
//     page: currentPage,
//     limit: ITEMS_PER_PAGE,
//   });

//   if (isLoading) return <LoadingSpinner />;

//   if (error)
//     return <ErrorMessage message="Failed to load surahs" onRetry={refetch} />;

//   if (!data?.data) return null;

//   const surahs = data.data;
//   const meta = data.meta;

//   const totalPages = meta.totalPage || 1;

//   const handlePageChange = (page: number) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // ================= PAGINATION NUMBERS =================
//   const getPageNumbers = () => {
//     const pages: (number | string)[] = [];
//     const maxVisible = 5;

//     if (totalPages <= maxVisible) {
//       for (let i = 1; i <= totalPages; i++) pages.push(i);
//     } else {
//       if (currentPage <= 3) {
//         for (let i = 1; i <= 4; i++) pages.push(i);
//         pages.push("...");
//         pages.push(totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pages.push(1);
//         pages.push("...");
//         for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
//       } else {
//         pages.push(1);
//         pages.push("...");
//         pages.push(currentPage - 1);
//         pages.push(currentPage);
//         pages.push(currentPage + 1);
//         pages.push("...");
//         pages.push(totalPages);
//       }
//     }

//     return pages;
//   };

//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
//   const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, meta.total);

//   return (
//     <div className="space-y-8">
//       {/* ================= GRID ================= */}
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={{
//           hidden: { opacity: 0 },
//           visible: {
//             opacity: 1,
//             transition: { staggerChildren: 0.05 },
//           },
//         }}
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//       >
//         {isFetching
//           ? Array(ITEMS_PER_PAGE)
//               .fill(0)
//               .map((_, i) => <SkeletonCard key={i} />)
//           : surahs.map((surah, index) => (
//               <SurahCard
//                 key={surah.surahNumber}
//                 surah={surah}
//                 index={startIndex + index}
//               />
//             ))}
//       </motion.div>

//       {/* ================= DAISYUI RADIO PAGINATION ================= */}
//       <div className="flex justify-center pt-4">
//         <div className="join">
//           {/* Prev */}
//           <button
//             className="join-item btn"
//             disabled={currentPage === 1}
//             onClick={() => handlePageChange(currentPage - 1)}
//           >
//             «
//           </button>

//           {/* Dynamic radio buttons */}
//           {getPageNumbers().map((page, index) => (
//             <div key={index}>
//               {page === "..." ? (
//                 <button className="join-item btn btn-disabled">...</button>
//               ) : (
//                 <input
//                   type="radio"
//                   name="pagination"
//                   className="join-item btn btn-square"
//                   aria-label={page.toString()}
//                   checked={currentPage === page}
//                   onChange={() => handlePageChange(page as number)}
//                 />
//               )}
//             </div>
//           ))}

//           {/* Next */}
//           <button
//             className="join-item btn"
//             disabled={currentPage === totalPages}
//             onClick={() => handlePageChange(currentPage + 1)}
//           >
//             »
//           </button>
//         </div>
//       </div>

//       {/* ================= INFO ================= */}
//       <div className="text-center text-sm text-gray-500 dark:text-gray-400">
//         Showing {startIndex} - {endIndex} of {meta.total} Surahs
//         <span className="ml-2 text-xs">
//           (Page {currentPage} of {totalPages})
//         </span>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import SurahCard from "./SurahCard";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import { useGetSurahs } from "@/hooks/quran.hooks";

// Skeleton
const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 h-32"></div>
  </div>
);

export default function SurahList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const ITEMS_PER_PAGE = 12;

  const { data, isLoading, isFetching, error, refetch } = useGetSurahs({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return <ErrorMessage message="Failed to load surahs" onRetry={refetch} />;

  if (!data?.data) return null;

  const surahs = data.data;
  const meta = data.meta;

  // Safe access with fallbacks
  const totalPages = meta?.totalPage || 1;
  const totalItems = meta?.total || 0;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ================= PAGINATION NUMBERS =================
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  // Don't render animations on server
  if (!isMounted) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array(ITEMS_PER_PAGE)
            .fill(0)
            .map((_, i) => (
              <SkeletonCard key={i} />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ================= GRID ================= */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        style={{
          opacity: isFetching ? 0.6 : 1,
          transition: "opacity 0.2s ease-in-out",
        }}
      >
        {isFetching
          ? Array(ITEMS_PER_PAGE)
              .fill(0)
              .map((_, i) => <SkeletonCard key={i} />)
          : surahs.map((surah, index) => (
              <SurahCard
                key={surah.surahNumber}
                surah={surah}
                index={startIndex + index}
              />
            ))}
      </div>

      {/* ================= DAISYUI RADIO PAGINATION ================= */}
      <div className="flex justify-center pt-4">
        <div className="join">
          {/* Prev */}
          <button
            className="join-item btn"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            «
          </button>

          {/* Dynamic radio buttons */}
          {getPageNumbers().map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <button className="join-item btn btn-disabled">...</button>
              ) : (
                <input
                  type="radio"
                  name="pagination"
                  className="join-item btn btn-square"
                  aria-label={page.toString()}
                  checked={currentPage === page}
                  onChange={() => handlePageChange(page as number)}
                />
              )}
            </div>
          ))}

          {/* Next */}
          <button
            className="join-item btn"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            »
          </button>
        </div>
      </div>

      {/* ================= INFO ================= */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Showing {startIndex} - {endIndex} of {totalItems} Surahs
        <span className="ml-2 text-xs">
          (Page {currentPage} of {totalPages})
        </span>
      </div>
    </div>
  );
}
