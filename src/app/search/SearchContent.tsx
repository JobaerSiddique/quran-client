"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { quranApi } from "@/services/api";
import AyahCard from "@/components/surah/AyahCard";

export default function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("q") || "";
  const [page, setPage] = useState(1);
  const [filterSurah, setFilterSurah] = useState<number | null>(null);

  const { data } = useQuery({
    queryKey: ["search", query, page, filterSurah],
    queryFn: () =>
      quranApi.searchAyahs(query, {
        page,
        limit: 20,
        surah: filterSurah || undefined,
      }),
    enabled: !!query,
  });

  const results = data?.data || [];

  if (!query) return <div>No query</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1>Search: {query}</h1>

      {results.map((ayah: any, i: number) => (
        <AyahCard key={i} ayah={ayah} index={i} />
      ))}
    </div>
  );
}
