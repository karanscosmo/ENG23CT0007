import { Log } from './logger';

const VIEWED_KEY = 'viewed_notifications';

export const StorageUtils = {
  getViewedIds: (): Set<string> => {
    try {
      const stored = localStorage.getItem(VIEWED_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          Log('frontend', 'debug', 'utils', 'Storage read successful for viewed notifications');
          return new Set(parsed);
        }
      }
    } catch (error) {
      Log('frontend', 'error', 'utils', 'Storage read failed for viewed notifications');
    }
    return new Set();
  },

  saveViewedIds: (ids: Set<string>): void => {
    try {
      localStorage.setItem(VIEWED_KEY, JSON.stringify(Array.from(ids)));
      Log('frontend', 'debug', 'utils', 'Storage write successful for viewed notifications');
    } catch (error) {
      Log('frontend', 'error', 'utils', 'Storage write failed for viewed notifications');
    }
  }
};
