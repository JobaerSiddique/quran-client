import { quranApi } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// Adjust the import path as needed
import { toast } from "sonner";

// Get all surahs
export const useGetSurahs = (params?: any) => {
  return useQuery({
    queryKey: ["GET_SURAHS", params],
    queryFn: async () => await quranApi.getSurahs(params),
  });
};

// Get single surah with ayahs
export const useGetSurahById = (id: number) => {
  return useQuery({
    queryKey: ["GET_SURAH_BY_ID", id],
    queryFn: async () => await quranApi.getSurahById(id),
    enabled: !!id, // Only run if id exists
  });
};

// Search ayahs
export const useSearchAyahs = (query: string, params?: any) => {
  return useQuery({
    queryKey: ["SEARCH_AYAHS", query, params],
    queryFn: async () => await quranApi.searchAyahs(query, params),
    enabled: !!query && query.length > 0, // Only search if query exists
  });
};

// Get ayahs by juz
export const useGetAyahsByJuz = (juzNumber: number, params?: any) => {
  return useQuery({
    queryKey: ["GET_AYAHS_BY_JUZ", juzNumber, params],
    queryFn: async () => await quranApi.getAyahsByJuz(juzNumber, params),
    enabled: !!juzNumber,
  });
};

// Get ayahs by page
export const useGetAyahsByPage = (pageNumber: number) => {
  return useQuery({
    queryKey: ["GET_AYAHS_BY_PAGE", pageNumber],
    queryFn: async () => await quranApi.getAyahsByPage(pageNumber),
    enabled: !!pageNumber,
  });
};

// Get Quran stats
export const useGetQuranStats = () => {
  return useQuery({
    queryKey: ["GET_QURAN_STATS"],
    queryFn: async () => await quranApi.getQuranStats(),
  });
};

// Optional: If you have mutations (e.g., for saving favorites, bookmarks, etc.)
// Example mutation for saving a favorite ayah
// export const useSaveFavoriteAyah = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationKey: ["SAVE_FAVORITE_AYAH"],
//     mutationFn: async (ayahData: any) => {
//       // Implement your save favorite API call here
//       const response = await someApi.post("/favorites", ayahData);
//       return response.data;
//     },
//     onSuccess: () => {
//       toast.success("Ayah saved to favorites");
//       queryClient.invalidateQueries({ queryKey: ["GET_FAVORITES"] });
//     },
//     onError: (error: Error) => {
//       toast.error(error.message);
//     },
//   });
// };
