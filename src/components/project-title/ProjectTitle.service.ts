export function validateTitle(title: string): boolean {
  const text = title.trim();
  if (text.length <= 5 || text.length > 30) return false;
  return true;
}
