/**
 * Returns the input data or an empty array
 */
export function defaultToEmpty<T>(data: T[]): T[];
export function defaultToEmpty<T>(data: T): T;
export function defaultToEmpty(): unknown[];
export function defaultToEmpty<T>(data?: T): T | unknown[] {
  return data || [];
}

/**
 * Parses the input and returns the data property or undefined.
 * This was used heavily in the v8 API and may no longer be needed in v9.
 */
export function mapData<T = unknown>(res: unknown): T | undefined {
  if (res && typeof res === 'object' && 'data' in res) {
    return (res as { data: T }).data;
  }
  return undefined;
}
