import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function decodeJWT(token: string) {
  return JSON.parse(atob(token.split('.')[1]));
}

export function toMatrix<T>(array: T[], columns: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / columns) }).map((_, rowIndex) =>
    array.slice(rowIndex * columns, rowIndex * columns + columns)
  );
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}
