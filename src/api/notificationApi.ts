import { API_BASE_URL } from '../utils/constants';
import { AuthManager } from './authApi';
import { Log } from '../utils/logger';
import type { AppNotification, FetchNotificationsParams, PaginatedResponse } from '../types/notification';

export class NotificationService {
  static async getPaginatedNotifications(
    params: FetchNotificationsParams
  ): Promise<PaginatedResponse<AppNotification>> {
    Log('frontend', 'info', 'api', 'Notification fetch started');
    try {
      const token = await AuthManager.authenticate();
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

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      Log('frontend', 'info', 'api', 'Notification fetch completed');
      return data;
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
