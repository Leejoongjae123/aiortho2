# Dialog 컴포넌트 접근성 개선

## 문제점

기존 Dialog 컴포넌트에서 `DialogContent`를 사용할 때 `DialogTitle`이 없으면 다음과 같은 접근성 경고가 발생했습니다:

```
DialogContent requires a DialogTitle for the component to be accessible for screen reader users.
```

## 해결책

### 1. VisuallyHidden 컴포넌트 추가

- `components/ui/visually-hidden.tsx` 파일을 생성
- 스크린 리더에는 보이지만 시각적으로는 숨겨지는 요소를 위한 컴포넌트

### 2. DialogContent 개선

`DialogContent` 컴포넌트에 다음 props를 추가했습니다:

- `hideTitle?: boolean` - 제목을 숨길지 여부
- `hiddenTitle?: string` - 숨겨진 제목의 텍스트 (기본값: "Dialog")

## 사용법

### 방법 1: 일반적인 사용법 (제목이 보이는 경우)

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>다이얼로그 열기</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>제목</DialogTitle>
      <DialogDescription>설명</DialogDescription>
    </DialogHeader>
    {/* 내용 */}
  </DialogContent>
</Dialog>
```

### 방법 2: 제목을 숨기고 싶은 경우 (새로운 방법)

```tsx
<DialogContent hideTitle={true} hiddenTitle="알림 메시지">
  {/* 제목 없이 내용만 */}
  <div>내용</div>
</DialogContent>
```

### 방법 3: 기존 방식 (수동으로 숨김)

```tsx
<DialogContent>
  <DialogHeader>
    <DialogTitle className="sr-only">숨겨진 제목</DialogTitle>
    <DialogDescription>설명</DialogDescription>
  </DialogHeader>
  {/* 내용 */}
</DialogContent>
```

## 장점

1. **접근성 준수**: 모든 다이얼로그가 스크린 리더에서 적절한 제목을 가짐
2. **개발자 편의성**: `hideTitle` prop으로 간단하게 제목 숨김 처리
3. **하위 호환성**: 기존 코드는 그대로 동작
4. **유연성**: 여러 가지 방법으로 사용 가능

## 주의사항

- `hideTitle={true}`를 사용할 때는 반드시 `hiddenTitle`에 의미있는 제목을 제공하세요
- 가능하면 시각적으로도 제목을 보여주는 것이 좋습니다
- 접근성을 위해 제목은 다이얼로그의 목적을 명확히 설명해야 합니다
