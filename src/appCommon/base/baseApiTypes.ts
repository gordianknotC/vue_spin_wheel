import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
  
export type TPager = {
  page: number;
  pages: number;
  per_page: number;
  total: number;
};

export type Optional<T> = T | undefined | null;
export type TFuzzyResponse = any



