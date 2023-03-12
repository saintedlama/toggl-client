/**
 * Returns the input data or an empty array
 * @param {any} data Input data
 * @returns any
 */
export function defaultToEmpty(data) {
  return data || [];
}

/**
 * Parses the input and returns the data property or an undefined
 * This was used heavily in the v8 API and may no longer be needed in v9.
 * @param {any} res A response from the Toggl API
 * @returns object||undefined
 */
export function mapData(res) {
  return (res || {}).data;
}
