export function validateTitle(title: string): boolean {
  const text = title.trim();
  if (text.length <= 0 || text.length > 30) return false;
  return true;
}
