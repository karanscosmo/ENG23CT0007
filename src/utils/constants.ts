export const PRIORITY_WEIGHTS: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
export const LOG_API_URL = import.meta.env.VITE_LOG_API_URL || 'http://localhost:8080/evaluation-service/logs';
