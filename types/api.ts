/**
 * Generic API response types — used by all service functions.
 */

/** Standard API success response wrapper. */
export interface ApiResponse<T> {
  data: T;
  status: number;
}

/** Standard API error response. */
export interface ApiError {
  message: string;
  code?: string;
  status: number;
}

/** Paginated response wrapper. */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
