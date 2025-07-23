interface RehabilitationStatusProps {
  license?: string;
}

export default function RehabilitationStatus({ license }: RehabilitationStatusProps) {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col md:flex-row justify-between">
        <div className="flex flex-col mb-9">
          <span className="text-[var(--aiortho-gray-900)] text-[22px] font-bold leading-[1.4]">
            재활 치료 현황
          </span>
          <span className="text-[var(--aiortho-gray-600)] text-base font-normal leading-none mt-3">
            환자의 재활 치료 상세 현황을 확인할 수 있습니다.
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-9">
        {Boolean(license) ? (
          // FIXME: 재활 치료 현황 조회 API 연동 및 UI 필요
          <div className="flex flex-col gap-3">
            <span>재활 치료 현황</span>
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-25">
            <span className="text-[var(--aiortho-gray-500)] ">
              라이센스 번호로 앱 연동이 필요해요.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
