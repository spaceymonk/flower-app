import './EditorStyle.css';

export const hightlightWithLineNumbers = (input: string) =>
  input
    .split('\n')
    .map((line: string, i: number) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join('\n');
