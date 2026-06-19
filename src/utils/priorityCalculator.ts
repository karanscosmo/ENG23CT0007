import { AppNotification } from '../types';
import { Log } from './logger';

const WEIGHTS: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export const calculatePriority = (notification: AppNotification): number => {
  try {
    Log('utils', 'info', 'priorityCalculator', `Priority calculation started for ${notification.id}`);
    
    const typeWeight = WEIGHTS[notification.type] || 0;
    const timestampMs = new Date(notification.timestamp).getTime();
    
    if (isNaN(timestampMs)) {
      throw new Error('Malformed timestamp');
    }
    
    // Type weight takes precedence, recency breaks ties
    const score = (typeWeight * 1e13) + timestampMs;
    
    Log('utils', 'info', 'priorityCalculator', `Priority calculation completed for ${notification.id}: ${score}`);
    return score;
  } catch (error) {
    Log('utils', 'error', 'priorityCalculator', `Error calculating priority: ${(error as Error).message}`);
    return 0; // fallback score
  }
};
