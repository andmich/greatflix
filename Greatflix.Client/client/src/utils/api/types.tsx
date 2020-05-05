export interface GreatflixApiResponse<T> {
  isError: boolean;
  result: T
}

export interface TMDbApiResponse<T> {
  page: number;
  results: T[],
  total_results: number;
  total_pages: number;
}