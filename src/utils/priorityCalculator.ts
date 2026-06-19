import type { AppNotification } from '../types/notification';
import { Log } from './logger';
import { PRIORITY_WEIGHTS } from './constants';

export const calculatePriority = (notification: AppNotification): number => {
  try {
    Log('frontend', 'debug', 'utils', `Priority calculation started for ${notification.id}`);
    
    const typeWeight = PRIORITY_WEIGHTS[notification.type] || 0;
    const timestampMs = new Date(notification.timestamp).getTime();
    
    if (isNaN(timestampMs)) {
      throw new Error('Invalid timestamp');
    }
    
    const score = (typeWeight * 1e13) + timestampMs;
    
    Log('frontend', 'debug', 'utils', `Priority calculation completed for ${notification.id}: ${score}`);
    return score;
  } catch (error: any) {
    Log('frontend', 'error', 'utils', `Error calculating priority: ${error.message}`);
    return 0;
  }
};
