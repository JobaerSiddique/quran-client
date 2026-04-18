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

// "use client";

// import { useState, useEffect } from "react";
// import SurahCard from "./SurahCard";
// import LoadingSpinner from "../common/LoadingSpinner";
// import ErrorMessage from "../common/ErrorMessage";
// import { useGetSurahs } from "@/hooks/quran.hooks";

// // Skeleton
// const SkeletonCard = () => (
//   <div className="animate-pulse">
//     <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 h-32"></div>
//   </div>
// );

// export default function SurahList() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isMounted, setIsMounted] = useState(false);
//   const ITEMS_PER_PAGE = 12;

//   const { data, isLoading, isFetching, error, refetch } = useGetSurahs({
//     page: currentPage,
//     limit: ITEMS_PER_PAGE,
//   });

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (isLoading) return <LoadingSpinner />;

//   if (error)
//     return <ErrorMessage message="Failed to load surahs" onRetry={refetch} />;

//   if (!data?.data) return null;

//   const surahs = data.data;
//   const meta = data.meta;

//   // Safe access with fallbacks
//   const totalPages = meta?.totalPage || 1;
//   const totalItems = meta?.total || 0;

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
//   const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

//   // Don't render animations on server
//   if (!isMounted) {
//     return (
//       <div className="space-y-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {Array(ITEMS_PER_PAGE)
//             .fill(0)
//             .map((_, i) => (
//               <SkeletonCard key={i} />
//             ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* ================= GRID ================= */}
//       <div
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//         style={{
//           opacity: isFetching ? 0.6 : 1,
//           transition: "opacity 0.2s ease-in-out",
//         }}
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
//       </div>

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
//         Showing {startIndex} - {endIndex} of {totalItems} Surahs
//         <span className="ml-2 text-xs">
//           (Page {currentPage} of {totalPages})
//         </span>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import SurahCard from "./SurahCard";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import { useGetSurahs } from "@/hooks/quran.hooks";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

// Skeleton Card Component
const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 h-32"></div>
  </div>
);

// Mobile Pagination Component
const MobilePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-sm btn-outline gap-1 min-w-[80px]"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <span className="text-sm font-medium px-3 py-1 bg-base-200 rounded-lg">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-sm btn-outline gap-1 min-w-[80px]"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Page indicator dots */}
      <div className="flex gap-1.5">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum = i + 1;
          if (totalPages > 5 && currentPage > 3) {
            pageNum = currentPage - 2 + i;
            if (pageNum > totalPages) return null;
          }
          if (pageNum > totalPages) return null;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                currentPage === pageNum
                  ? "bg-primary w-4"
                  : "bg-base-300 hover:bg-base-400"
              }`}
              aria-label={`Go to page ${pageNum}`}
            />
          );
        })}
      </div>
    </div>
  );
};

// Desktop Pagination Component
const DesktopPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
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

  return (
    <div className="join flex flex-wrap justify-center gap-2">
      {/* Previous Button */}
      <button
        className="join-item btn btn-sm md:btn-md min-w-[70px]"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Page Numbers */}
      <div className="flex flex-wrap justify-center gap-1">
        {getPageNumbers().map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <button
                className="btn btn-sm md:btn-md btn-ghost px-2 md:px-3"
                disabled
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`btn btn-sm md:btn-md min-w-[40px] md:min-w-[48px] ${
                  currentPage === page
                    ? "btn-primary text-primary-content font-bold scale-105 shadow-md"
                    : "btn-ghost hover:scale-105 transition-transform"
                }`}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        className="join-item btn btn-sm md:btn-md min-w-[70px]"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

// Responsive Pagination Component
const ResponsivePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const checkScreen = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    // Handle zoom/font size changes
    const observer = new ResizeObserver(checkScreen);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("resize", checkScreen);
      observer.disconnect();
    };
  }, []);

  if (isMobile || windowWidth < 640) {
    return (
      <MobilePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    );
  }

  return (
    <DesktopPagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default function SurahList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [fontSize, setFontSize] = useState("normal");
  const ITEMS_PER_PAGE = 12;

  const { data, isLoading, isFetching, error, refetch } = useGetSurahs({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  useEffect(() => {
    setIsMounted(true);

    // Detect font size changes
    const checkFontSize = () => {
      const bodyFontSize = window.getComputedStyle(document.body).fontSize;
      setFontSize(bodyFontSize);
    };

    checkFontSize();

    // Observe font size changes
    const observer = new ResizeObserver(checkFontSize);
    observer.observe(document.body);

    return () => observer.disconnect();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return <ErrorMessage message="Failed to load surahs" onRetry={refetch} />;

  if (!data?.data) return null;

  const surahs = data.data;
  const meta = data.meta;

  const totalPages = meta?.totalPage || 1;
  const totalItems = meta?.total || 0;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  // Server-side rendering fallback
  if (!isMounted) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
    <div className="space-y-6 sm:space-y-8 px-2 sm:px-4">
      {/* Grid with responsive columns */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
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

      {/* Responsive Pagination */}
      {totalPages > 1 && (
        <ResponsivePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Info Text with responsive sizing */}
      <div className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-2">
        Showing <span className="font-medium">{startIndex}</span> -{" "}
        <span className="font-medium">{endIndex}</span> of{" "}
        <span className="font-medium">{totalItems}</span> Surahs
        <span className="hidden sm:inline ml-2 text-xs">
          (Page {currentPage} of {totalPages})
        </span>
      </div>
    </div>
  );
}
