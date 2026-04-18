export interface ISurah {
  _id: string;
  surahNumber: number;
  nameArabic: string;
  nameEnglish: string;
  nameTransliteration: string;
  totalAyahs: number;
  revelationType: "Meccan" | "Medinan";
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAyah {
  _id: string;
  surahNumber: number;
  ayahNumber: number;
  textArabic: string;
  textEnglish: string;
  juz: number;
  page: number;
  sajda: boolean;
  surahInfo?: ISurah;
}

export interface IUserSettings {
  arabicFont: string;
  arabicFontSize: number;
  translationFontSize: number;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}
