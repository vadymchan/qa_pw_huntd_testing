import { Month } from '@models/auth/candidate/Month';

const MONTH_NUMBERS: Record<Month, number> = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

export function formatDate(month: Month, year: number) {
  return `${year}-${MONTH_NUMBERS[month]}`;
}
