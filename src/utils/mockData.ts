import type { AppNotification } from '../types/notification';

export const generateMockNotifications = (): AppNotification[] => {
  const notifications: AppNotification[] = [];
  const types: Array<'Placement' | 'Result' | 'Event'> = ['Placement', 'Result', 'Event'];
  
  const messages = {
    Placement: [
      'You have been placed at Google!',
      'New placement drive by Amazon.',
      'You have been shortlisted by Microsoft!',
      'Placement drive at XYZ Corp.',
      'Offer letter released from Apple.'
    ],
    Result: [
      'Your test results are out.',
      'Passed the technical interview.',
      'Failed the aptitude round.',
      'Cleared the HR round.',
      'Semester 6 marks published.'
    ],
    Event: [
      'Upcoming hackathon tomorrow.',
      'Guest lecture by alumni.',
      'Coding competition registration open.',
      'Annual tech fest announced.',
      'Workshop on React and TypeScript.'
    ]
  };

  const now = Date.now();

  for (let i = 1; i <= 50; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const typeMessages = messages[type];
    const message = typeMessages[Math.floor(Math.random() * typeMessages.length)];
    
    // Spread out timestamps over the last 7 days
    const randomTimeOffset = Math.random() * 7 * 24 * 60 * 60 * 1000;
    
    notifications.push({
      id: `notif-${i}`,
      type,
      message,
      timestamp: new Date(now - randomTimeOffset).toISOString()
    });
  }

  // Sort by newest first
  return notifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const MOCK_NOTIFICATIONS = generateMockNotifications();
