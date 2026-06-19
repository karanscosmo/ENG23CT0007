export type LogLevel = 'info' | 'warn' | 'error';
export type LogStack = 'api' | 'component' | 'hook' | 'page' | 'state' | 'style' | 'auth' | 'config' | 'middleware' | 'utils';

export const Log = async (
  stack: LogStack,
  level: LogLevel,
  packageName: string,
  message: string
): Promise<void> => {
  // Validate level
  const validLevels: LogLevel[] = ['info', 'warn', 'error'];
  if (!validLevels.includes(level)) {
    return;
  }

  // Validate stack
  const validStacks: LogStack[] = ['api', 'component', 'hook', 'page', 'state', 'style', 'auth', 'config', 'middleware', 'utils'];
  if (!validStacks.includes(stack)) {
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
