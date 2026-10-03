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

/**
 * Formats a Date object or timestamp as 'YYYY-MM-DD'.
 */
export function formatDate(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Returns the start of the week (Sunday) formatted as 'YYYY-MM-DD'.
 */
export function startOfWeekDate(date: Date = new Date()): string {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  return formatDate(d);
}

/**
 * Offsets a date by a number of months and/or days and formats as 'YYYY-MM-DD'.
 */
export function offsetDate(date: Date = new Date(), offset: { months?: number; days?: number }): string {
  const d = new Date(date);
  if (offset.months) {
    d.setMonth(d.getMonth() + offset.months);
  }
  if (offset.days) {
    d.setDate(d.getDate() + offset.days);
  }
  return formatDate(d);
}
