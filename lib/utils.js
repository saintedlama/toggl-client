export function defaultToEmpty(data) {
  return data || [];
}

export function mapData(res) {
  return (res || {}).data;
}
