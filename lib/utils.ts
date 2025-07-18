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

// 기간을 주(week) 단위로 계산하는 함수
export function calculateWeeks(startDate: string, endDate: string): number {
  if (!startDate || !endDate) return 1;

  try {
    // YYYYMMDD 형식을 Date 객체로 변환
    const start = new Date(
      parseInt(startDate.substring(0, 4)),
      parseInt(startDate.substring(4, 6)) - 1, // 월은 0부터 시작
      parseInt(startDate.substring(6, 8))
    );

    const end = new Date(
      parseInt(endDate.substring(0, 4)),
      parseInt(endDate.substring(4, 6)) - 1, // 월은 0부터 시작
      parseInt(endDate.substring(6, 8))
    );

    // 유효한 날짜인지 확인
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 1;

    // 밀리초 차이를 일수로 변환
    const timeDiff = end.getTime() - start.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // 일수를 주로 변환 (7일 = 1주)
    const weeks = Math.ceil(daysDiff / 7);

    // 최소 1주 반환
    return Math.max(1, weeks);
  } catch (error) {
    return 1;
  }
}

// 휴대폰 번호 포맷팅 함수
export const formatPhoneNumber = (value: string) => {
  const numbers = value.replace(/[^0-9]/g, '');
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};
