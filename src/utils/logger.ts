import { LoggingApi } from '../api/loggingApi';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export type LogStack = 'frontend';
export type LogPackage = 'api' | 'component' | 'hook' | 'page' | 'state' | 'style' | 'auth' | 'config' | 'middleware' | 'utils';

export const Log = async (
  stack: LogStack,
  level: LogLevel,
  packageName: LogPackage,
  message: string
): Promise<void> => {
  const validLevels: LogLevel[] = ['debug', 'info', 'warn', 'error', 'fatal'];
  if (!validLevels.includes(level)) return;

  if (stack !== 'frontend') return;

  const validPackages: LogPackage[] = ['api', 'component', 'hook', 'page', 'state', 'style', 'auth', 'config', 'middleware', 'utils'];
  if (!validPackages.includes(packageName)) return;

  try {
    const payload = {
      stack,
      level,
      packageName,
      message,
      timestamp: new Date().toISOString(),
    };
    await LoggingApi.log(payload);
  } catch (error) {
    // Fail gracefully without console logging
  }
};
