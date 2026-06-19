import { useState, useEffect, useCallback } from 'react';
import { NotificationService } from '../api/notificationApi';
import type { AppNotification, NotificationType } from '../types/notification';
import { MinHeap } from '../utils/minHeap';
import { Log } from '../utils/logger';

export const usePriorityNotifications = (topN: number = 10, filterType?: NotificationType | 'All') => {
  const [priorityNotifications, setPriorityNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPriority = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      Log('frontend', 'debug', 'hook', 'Fetching priority notifications');
      const response = await NotificationService.getPaginatedNotifications({ limit: 100, notification_type: filterType === 'All' ? undefined : filterType });
      
      if (!response.data || response.data.length === 0) {
        throw new Error('Empty dataset received');
      }

      const minHeap = new MinHeap(topN);
      response.data.forEach(notification => minHeap.insert(notification));
      
      setPriorityNotifications(minHeap.getTopNotifications());
    } catch (err: any) {
      const errMsg = err.message || 'Unknown error occurred';
      setError(errMsg);
      Log('frontend', 'error', 'hook', `Error fetching priority notifications: ${errMsg}`);
    } finally {
      setLoading(false);
    }
  }, [topN, filterType]);

  useEffect(() => {
    fetchPriority();
  }, [fetchPriority]);

  return { priorityNotifications, loading, error, refetch: fetchPriority };
};
