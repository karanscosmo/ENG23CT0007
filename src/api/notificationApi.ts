import { API_BASE_URL } from '../utils/constants';
import { AuthManager } from './authApi';
import { Log } from '../utils/logger';
import type { AppNotification, FetchNotificationsParams, PaginatedResponse } from '../types/notification';
import { MOCK_NOTIFICATIONS } from '../utils/mockData';

export class NotificationService {
  static async getPaginatedNotifications(
    params: FetchNotificationsParams
  ): Promise<PaginatedResponse<AppNotification>> {
    Log('frontend', 'info', 'api', 'Notification fetch started');
    try {
      const token = await AuthManager.authenticate();
      
      // Attempt actual fetch first
      try {
        const queryParams = new URLSearchParams();
        if (params.page !== undefined) queryParams.append('page', params.page.toString());
        if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());
        if (params.notification_type && params.notification_type !== 'All') {
          queryParams.append('notification_type', params.notification_type);
        }

        const response = await fetch(`${API_BASE_URL}/evaluation-service/notifications?${queryParams.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          Log('frontend', 'info', 'api', 'Notification fetch completed from actual server');
          return data;
        }
      } catch (e) {
        // Fall back to mock logic silently below
      }

      // ----------------------------------------------------
      // FALLBACK TO MOCK DATA IF NO SERVER IS RUNNING
      // ----------------------------------------------------
      Log('frontend', 'info', 'api', 'Falling back to mock data');
      
      let filtered = [...MOCK_NOTIFICATIONS];
      
      if (params.notification_type && params.notification_type !== 'All') {
        filtered = filtered.filter(n => n.type === params.notification_type);
      }

      const page = params.page || 1;
      const limit = params.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      const paginated = filtered.slice(startIndex, endIndex);

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      Log('frontend', 'info', 'api', 'Notification fetch completed (mock)');
      return {
        data: paginated,
        total: filtered.length,
        page,
        limit
      };
      
    } catch (error: any) {
      Log('frontend', 'error', 'api', `Notification fetch failed: ${error.message}`);
      throw error;
    }
  }

  static async getNotificationsByType(type: FetchNotificationsParams['notification_type']): Promise<PaginatedResponse<AppNotification>> {
    return this.getPaginatedNotifications({ notification_type: type });
  }

  static async getNotifications(): Promise<PaginatedResponse<AppNotification>> {
    return this.getPaginatedNotifications({});
  }
}
