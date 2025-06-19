'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from './dialog';
import { Button } from './button';

// 방법 1: 일반적인 사용법 (제목이 보이는 경우)
export function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">다이얼로그 열기</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>프로필 편집</DialogTitle>
          <DialogDescription>
            여기에서 프로필 정보를 변경할 수 있습니다. 완료되면 저장을 클릭하세요.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              이름
            </label>
            <input id="name" defaultValue="홍길동" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              취소
            </Button>
          </DialogClose>
          <Button type="submit">저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 방법 2: 제목을 숨기고 싶은 경우 (접근성을 위해 숨겨진 제목 사용)
export function DialogWithHiddenTitle() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">알림 다이얼로그</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" hideTitle={true} hiddenTitle="알림 메시지">
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="text-6xl">🎉</div>
          <h2 className="text-xl font-semibold">축하합니다!</h2>
          <p className="text-center text-muted-foreground">작업이 성공적으로 완료되었습니다.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full">확인</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 방법 3: 기존 방식 (VisuallyHidden을 직접 사용)
export function DialogWithManualHiddenTitle() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">수동 숨김 제목</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {/* 이 방법도 여전히 사용 가능합니다 */}
          <DialogTitle className="sr-only">숨겨진 제목</DialogTitle>
          <DialogDescription>
            제목이 시각적으로는 보이지 않지만 스크린 리더에서는 접근 가능합니다.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>여기에 다이얼로그 내용이 들어갑니다.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
