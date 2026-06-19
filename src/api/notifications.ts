import { apiClient } from './index';
import { AppNotification, FetchNotificationsParams, PaginatedResponse } from '../types';

export const fetchNotifications = async (
  params: FetchNotificationsParams
): Promise<PaginatedResponse<AppNotification>> => {
  // Add authentication token
  const token = localStorage.getItem('auth_token') || 'dummy-bearer-token';
  
  const queryParams = new URLSearchParams();
  if (params.page !== undefined) queryParams.append('page', params.page.toString());
  if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());
  if (params.notification_type && params.notification_type !== 'All') {
    queryParams.append('notification_type', params.notification_type);
  }

  const response = await apiClient.get<PaginatedResponse<AppNotification>>(
    `/evaluation-service/notifications?${queryParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};
