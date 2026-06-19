import { useState, useEffect, useCallback } from 'react';
import { NotificationService } from '../api/notificationApi';
import type { AppNotification, FetchNotificationsParams } from '../types/notification';
import { Log } from '../utils/logger';

export const useNotifications = (initialParams: FetchNotificationsParams = {}) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [params, setParams] = useState<FetchNotificationsParams>(initialParams);

  const fetchFilters = useCallback(async (currentParams: FetchNotificationsParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await NotificationService.getPaginatedNotifications(currentParams);
      
      const uniqueNotifications = Array.from(new Map(response.data.map(n => [n.id, n])).values());
      
      setNotifications(uniqueNotifications);
      setTotal(response.total);
    } catch (err: any) {
      const errMsg = err.message || 'Unknown error occurred';
      setError(errMsg);
      Log('frontend', 'error', 'hook', `Error fetching notifications: ${errMsg}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFilters(params);
  }, [params, fetchFilters]);

  const updateParams = (newParams: Partial<FetchNotificationsParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  return { notifications, total, loading, error, params, updateParams, refetch: () => fetchFilters(params) };
};
