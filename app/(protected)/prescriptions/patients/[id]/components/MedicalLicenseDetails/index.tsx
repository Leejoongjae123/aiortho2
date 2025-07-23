import { Button } from '@/components/ui/button';

export default function MedicalLicenseDetails() {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col md:flex-row justify-between">
        <div className="flex flex-col mb-9">
          <span className="text-[var(--aiortho-gray-900)] text-[22px] font-bold leading-[1.4]">
            라이센스 번호
          </span>
          <span className="whitespace-pre-line text-[var(--aiortho-gray-600)] mt-3">
            {`보호자 휴대폰 번호로 전송된 라이센스 번호를 입력해,\nAIOrtho App에서 자가 치료를 할 수 있습니다.`}
          </span>
        </div>

        <Button
          type="button"
          size="lg"
          className="w-full mb-5 md:w-auto cursor-pointer bg-[var(--aiortho-gray-600)] text-white disabled:bg-[var(--aiortho-gray-200)] disabled:text-[var(--aiortho-gray-500)] hover:bg-[var(--aiortho-gray-600)]/80"
          disabled
        >
          전송
        </Button>
      </div>
    </div>
  );
}
