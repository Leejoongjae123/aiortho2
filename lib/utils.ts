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

// 날짜 형식 변환 함수 (YYYYMMDD -> YYYY.MM.DD 또는 YYYY.MM.DD (요일))
export function formatDate(dateString: string, includeDayOfWeek: boolean = false): string {
  if (!dateString || dateString.length !== 8) return '-';

  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);

  const baseFormat = `${year}.${month}.${day}`;

  if (!includeDayOfWeek) {
    return baseFormat;
  }

  // 요일 계산
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

  return `${baseFormat} (${dayOfWeek})`;
}

// ISO 날짜 형식 변환 함수 (2025-05-29T05:37:14.981Z -> YYYY.MM.DD 또는 YYYY.MM.DD (요일))
export function formatISODate(isoDateString: string, includeDayOfWeek: boolean = false): string {
  if (!isoDateString) return '-';

  try {
    const date = new Date(isoDateString);

    // 유효한 날짜인지 확인
    if (isNaN(date.getTime())) return '-';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const baseFormat = `${year}.${month}.${day}`;

    if (!includeDayOfWeek) {
      return baseFormat;
    }

    // 요일 계산
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

    return `${baseFormat} (${dayOfWeek})`;
  } catch (error) {
    return '-';
  }
}

// 기간 형식 변환 함수 (startDate, endDate -> YYYY.MM.DD - YYYY.MM.DD)
export function formatPeriod(startDate: string, endDate: string): string {
  if (!startDate || !endDate) return '-';

  const formattedStart = formatDate(startDate);
  const formattedEnd = formatDate(endDate);

  return `${formattedStart} - ${formattedEnd}`;
}
