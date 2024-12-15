export const yearRange = (
  start: number,
  stop: number,
  step: number,
): number[] =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export function daysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}
