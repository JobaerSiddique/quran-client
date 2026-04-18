import axios from "axios";
import { IApiResponse, ISurah, IAyah } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export const quranApi = {
  // Get all surahs
  getSurahs: async (params?: any): Promise<IApiResponse<ISurah[]>> => {
    const response = await api.get("/quran/surahs", { params });
    return response.data;
  },

  // Get single surah with ayahs
  getSurahById: async (
    id: number,
  ): Promise<IApiResponse<{ surah: ISurah; ayahs: IAyah[] }>> => {
    const response = await api.get(`/quran/surah/${id}`);
    return response.data;
  },

  // Search ayahs
  searchAyahs: async (
    query: string,
    params?: any,
  ): Promise<IApiResponse<any[]>> => {
    const response = await api.get("/quran/search", {
      params: { q: query, ...params },
    });
    return response.data;
  },

  // Get ayahs by juz
  getAyahsByJuz: async (
    juzNumber: number,
    params?: any,
  ): Promise<IApiResponse<IAyah[]>> => {
    const response = await api.get(`/quran/juz/${juzNumber}`, { params });
    return response.data;
  },

  // Get ayahs by page
  getAyahsByPage: async (pageNumber: number): Promise<IApiResponse<any>> => {
    const response = await api.get(`/quran/page/${pageNumber}`);
    return response.data;
  },

  // Get Quran stats
  getQuranStats: async (): Promise<IApiResponse<any>> => {
    const response = await api.get("/quran/stats");
    return response.data;
  },
};

export default api;
