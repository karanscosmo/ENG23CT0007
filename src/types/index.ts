export type NotificationType = 'Placement' | 'Result' | 'Event';

export interface AppNotification {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: string; // ISO 8601 string
}

export interface FetchNotificationsParams {
  page?: number;
  limit?: number;
  notification_type?: NotificationType | 'All';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
