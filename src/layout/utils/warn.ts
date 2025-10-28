const warnedMessages = new Set();

export function warnOnce(location: string, message: string): void {
  const mergedMessage = `[pro-naive-ui]/${location}]: ${message}`;
  if (warnedMessages.has(mergedMessage)) {
    return;
  }
  warnedMessages.add(mergedMessage);
}

export function warn(location: string, message: string): void {
  // eslint-disable-next-line no-console
  console.log('🚀 ~ method:warn line:11 -----', `[pro-naive-ui/${location}]: ${message}`);
}

export function throwError(location: string, message: string): never {
  throw new Error(`[pro-naive-ui/${location}]: ${message}`);
}
