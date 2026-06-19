import { AuthManager } from './authApi';
import { LOG_API_URL } from '../utils/constants';

export const LoggingApi = {
  log: async (payload: any): Promise<void> => {
    try {
      const token = await AuthManager.authenticate();
      await fetch(LOG_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      // Graceful failure, no console.log
    }
  }
};
