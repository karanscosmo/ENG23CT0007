import { useState, useEffect } from 'react';
import { Log } from '../utils/logger';

export const useViewedNotifications = () => {
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const stored = localStorage.getItem('viewed_notifications');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setViewedIds(new Set(parsed));
        }
      }
    } catch (error) {
      Log('hook', 'error', 'useViewedNotifications', `Failed to parse viewed notifications from localStorage`);
    }
  }, []);

  const markAsViewed = (id: string) => {
    setViewedIds(prev => {
      const updated = new Set(prev).add(id);
      try {
        localStorage.setItem('viewed_notifications', JSON.stringify(Array.from(updated)));
        Log('hook', 'info', 'useViewedNotifications', `Viewed notification marked: ${id}`);
      } catch (error) {
        Log('hook', 'error', 'useViewedNotifications', `Failed to persist viewed notifications`);
      }
      return updated;
    });
  };

  const isViewed = (id: string) => viewedIds.has(id);

  return { viewedIds, markAsViewed, isViewed };
};
