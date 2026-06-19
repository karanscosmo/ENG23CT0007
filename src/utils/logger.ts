export type LogLevel = 'info' | 'warn' | 'error';

export const Log = async (
  stack: string,
  level: LogLevel,
  packageName: string,
  message: string
): Promise<void> => {
  // Validate level
  const validLevels: LogLevel[] = ['info', 'warn', 'error'];
  if (!validLevels.includes(level)) {
    return;
  }

  // Validate packageName
  if (!packageName || typeof packageName !== 'string' || packageName.trim() === '') {
    return;
  }

  try {
    const token = localStorage.getItem('auth_token') || 'dummy-bearer-token';
    const logUrl = import.meta.env.VITE_LOG_API_URL || 'http://localhost:8080/evaluation-service/logs';

    const payload = {
      stack,
      level,
      packageName,
      message,
      timestamp: new Date().toISOString(),
    };

    await fetch(logUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    // Fail gracefully without console logging
  }
};
