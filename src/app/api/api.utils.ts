export function toFormData<T extends object>(body: T, exept?: string[]): FormData {
  const result = new FormData();
  for (const [key, value] of Object.entries(body)) {
    if (exept && exept.includes(key)) {
      result.append(key, value);
      continue;
    }
    if (typeof value === 'string') {
      result.append(key, value);
      continue;
    }
    if (typeof value === 'object') {
      result.append(key, JSON.stringify(value));
      continue;
    }
    result.append(key, (value as any).toString());
  }
  return result;
}
