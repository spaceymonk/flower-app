export const titleRegex = /^[a-zA-Z_][a-zA-Z0-9_]{1,29}$/;

export function validateTitle(title: string): boolean {
  const text = title.trim();
  const isValid = titleRegex.test(text);
  return isValid;
}
