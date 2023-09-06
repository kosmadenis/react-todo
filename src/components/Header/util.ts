export function stripNonNumericalChars(text: string) {
  return text
    .split('')
    .filter((char) => !/[^0-9]/.test(char))
    .join('')
}
