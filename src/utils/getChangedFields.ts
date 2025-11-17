// /utils/getChangedFields.ts
export function getChangedFields<T extends Record<string, unknown>>(oldData: T, newData: T) {
  const changes: string[] = [];
  for (const key in newData) {
    if (newData[key] !== oldData[key]) {
      changes.push(key);
    }
  }
  return changes;
}