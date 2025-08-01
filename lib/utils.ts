import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { UserRole } from '@/models';

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

// 배열에서 요소 위치 변경 헬퍼 함수
export const arrayMove = <T>(array: T[], from: number, to: number): T[] => {
  const newArray = [...array];
  const item = newArray.splice(from, 1)[0];
  newArray.splice(to, 0, item);
  return newArray;
};

// 제네릭 컬럼 타입 정의
export interface GenericTableColumn<T = any> {
  id: string;
  flex?: string;
  label: string;
  sortKey?: string;
}

// localStorage에서 컬럼 순서 불러오기 (제네릭 함수)
export const loadColumnOrder = <T extends GenericTableColumn>(
  defaultColumns: T[],
  storageKey: string
): T[] => {
  if (typeof window === 'undefined') return defaultColumns;

  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return defaultColumns;

    const savedOrder: string[] = JSON.parse(saved);

    // 저장된 순서에 따라 컬럼 재정렬
    const orderedColumns = savedOrder
      .map(id => defaultColumns.find(col => col.id === id))
      .filter(Boolean) as T[];

    // 새로 추가된 컬럼이 있다면 뒤에 추가
    const missingColumns = defaultColumns.filter(col => !savedOrder.includes(col.id));

    return [...orderedColumns, ...missingColumns];
  } catch (error) {
    console.warn('컬럼 순서 불러오기 실패:', error);
    return defaultColumns;
  }
};

// localStorage에 컬럼 순서 저장 (제네릭 함수)
export const saveColumnOrder = <T extends GenericTableColumn>(
  columns: T[],
  storageKey: string
): void => {
  if (typeof window === 'undefined') return;

  try {
    const columnIds = columns.map(col => col.id);
    localStorage.setItem(storageKey, JSON.stringify(columnIds));
  } catch (error) {
    console.warn('컬럼 순서 저장 실패:', error);
  }
};

// 현재 날짜를 YYYYMMDD 형태로 반환하는 함수
export function getCurrentDateYYYYMMDD(): string {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}${month}${day}`;
}

// 현재 날짜를 기준으로 몇 주 뒤의 날짜를 YYYYMMDD 형태로 반환하는 함수
export function getDateAfterWeeksYYYYMMDD(weeks: number): string {
  const now = new Date();
  const endDate = new Date(now.getTime() + weeks * 7 * 24 * 60 * 60 * 1000);

  const year = endDate.getFullYear().toString();
  const month = String(endDate.getMonth() + 1).padStart(2, '0');
  const day = String(endDate.getDate()).padStart(2, '0');

  return `${year}${month}${day}`;
}

// 현재 날짜와 주 수를 받아서 startDate와 endDate를 YYYYMMDD 형태로 반환하는 함수
export function getPeriodYYYYMMDD(weeks: number): {
  startDate: string;
  endDate: string;
} {
  return {
    startDate: getCurrentDateYYYYMMDD(),
    endDate: getDateAfterWeeksYYYYMMDD(weeks),
  };
}

export const isDoctorRole = (role: UserRole): role is 'Doctor' | 'Root' => {
  return role === 'Doctor' || role === 'Root';
};
