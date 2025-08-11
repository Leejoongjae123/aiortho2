import { z } from 'zod';

// Zod 스키마 정의
export const patientFormSchema = z.object({
  patientName: z
    .string()
    .min(2, { message: '이름은 2자 이상 입력해주세요' })
    .max(10, { message: '이름은 10자 이하로 입력해주세요' })
    .regex(/^[가-힣]+$/, { message: '한글만 입력 가능합니다' })
    .refine(
      val => {
        const singleConsonantVowel = /[ㄱ-ㅎㅏ-ㅣ]/;
        return !singleConsonantVowel.test(val);
      },
      { message: '자음이나 모음만 사용할 수 없습니다' }
    ),
  birthDate: z
    .string()
    .length(6, '생년월일 6자리를 입력해주세요')
    .regex(/^\d{6}$/, '생년월일은 숫자 6자리여야 합니다')
    .refine(val => {
      const num = parseInt(val, 10);
      return num >= 190001 && num <= 999999;
    }, '올바른 생년월일을 입력해주세요'),
  genderDigit: z
    .string()
    .min(1, '성별을 입력해주세요')
    .regex(/^[1-4]$/, '성별은 1, 2, 3, 4 중 하나여야 합니다'),
  hospitalNumber: z
    .string()
    .min(1, '병원 환자 번호를 입력해주세요')
    .regex(/^\d+$/, '병원 환자 번호는 숫자여야 합니다'),
  guardianName: z.string().min(1, '보호자명을 입력해주세요'),
  guardianPhone: z
    .string()
    .min(1, '보호자 휴대폰 번호를 입력해주세요')
    .refine(val => {
      const numbers = val.replace(/[^0-9]/g, '');
      return numbers.length === 11;
    }, '휴대폰 번호는 11자리여야 합니다')
    .refine(val => {
      const numbers = val.replace(/[^0-9]/g, '');
      return numbers.startsWith('010');
    }, '휴대폰 번호는 010으로 시작해야 합니다')
    .transform(val => val.replace(/[^0-9]/g, '')),
});

export type PatientFormData = z.infer<typeof patientFormSchema>;
