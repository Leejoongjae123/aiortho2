import { Button } from '@/components/ui/button';

export default function PatientController() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Button type="button" className="w-full h-12 rounded-full font-bold cursor-pointer">
        처방하기
      </Button>
      <span className="underline underline-offset-4 text-[var(--aiortho-gray-800)] text-sm cursor-pointer">
        환자 삭제
      </span>
    </div>
  );
}
