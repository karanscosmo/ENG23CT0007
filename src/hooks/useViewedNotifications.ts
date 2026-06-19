import { useState, useEffect } from 'react';
import { StorageUtils } from '../utils/storage';
import { Log } from '../utils/logger';

export const useViewedNotifications = () => {
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const ids = StorageUtils.getViewedIds();
    setViewedIds(ids);
  }, []);

  const markAsViewed = (id: string) => {
    setViewedIds(prev => {
      if (prev.has(id)) return prev;
      const updated = new Set(prev).add(id);
      StorageUtils.saveViewedIds(updated);
      Log('frontend', 'info', 'hook', `Viewed notification marked: ${id}`);
      return updated;
    });
  };

  const isViewed = (id: string) => viewedIds.has(id);

  return { viewedIds, markAsViewed, isViewed };
};
