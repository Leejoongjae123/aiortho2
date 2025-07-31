import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ExerciseDirection, ExerciseDirectionLabel, Prescription } from '@/models';
import Divider from '@/components/Divider';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { calculateWeeks } from '@/lib/utils';
import { ChevronUp, Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { useStandardProgramStaticExercise } from './hooks';
import { createDefaultExercise } from './utils';
import { z } from 'zod';
import { EditIcon, DeleteIcon } from './icons';

interface PrescriptionProgramCardProps {
  prescription: Prescription;
  defaultIsOpen?: boolean;
  showControl?: boolean;
  isEditing?: boolean;
  isPending?: boolean;
  checkIsDirty?: boolean;
  onUpdate?: (prescription: Prescription, index?: number) => void;
  onDelete?: (index?: number) => void;
  onStartEditing?: () => void;
  onStopEditing?: () => void;
}

// 검증 스키마 정의
const exerciseSchema = z.object({
  exerciseId: z.string().min(1, '운동 종류를 선택해주세요.'),
  duration: z.number().min(1, '운동 시간을 선택해주세요.'),
  direction: z.nativeEnum(ExerciseDirection),
  description: z.string().optional(),
  name: z.string(),
});

const formSchema = z.object({
  exercises: z.array(exerciseSchema).min(1, '최소 1개의 운동이 필요합니다.'),
  repetitions: z.number().min(3).max(12),
});

type FormValues = z.infer<typeof formSchema>;

const INITIAL_REPEAT_COUNT = 3;
const MAX_EXERCISE_LENGTH = 4;

export default function PrescriptionProgramCard({
  prescription,
  defaultIsOpen = false,
  showControl = false,
  isEditing = false,
  isPending = false,
  checkIsDirty = false,
  onUpdate,
  onDelete,
  onStartEditing,
  onStopEditing,
}: PrescriptionProgramCardProps) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const staticExerciseListQuery = useStandardProgramStaticExercise();
  const { data: staticExerciseList } = staticExerciseListQuery;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exercises: prescription.exercises,
      repetitions: prescription.repeatCount ?? INITIAL_REPEAT_COUNT,
    },
  });

  const watchedExercises = watch('exercises');
  const watchedRepetitions = watch('repetitions');

  const handleExerciseChange = (value: string, idx: number) => {
    if (!staticExerciseList) return;

    const newExercise = staticExerciseList.find(exercise => exercise.exerciseId === value);
    if (!newExercise) return;

    const updatedExercises = [...watchedExercises];

    updatedExercises[idx] = { ...updatedExercises[idx], ...newExercise };
    setValue('exercises', updatedExercises);
  };

  const handleDirectionChange = (value: string, idx: number) => {
    const direction = value === 'left' ? ExerciseDirection.Left : ExerciseDirection.Right;
    const updatedExercises = [...watchedExercises];
    updatedExercises[idx] = { ...updatedExercises[idx], direction };
    setValue('exercises', updatedExercises);
  };

  const handleDurationChange = (value: number, idx: number) => {
    const updatedExercises = [...watchedExercises];
    updatedExercises[idx] = { ...updatedExercises[idx], duration: value };
    setValue('exercises', updatedExercises);
  };

  const handleAddExercise = () => {
    const newExercise = createDefaultExercise();
    setValue('exercises', [...watchedExercises, newExercise]);
  };

  const handleRepetitionsChange = (change: number) => {
    const newValue = watchedRepetitions + change;
    if (newValue >= 3 && newValue <= 12) {
      setValue('repetitions', newValue);
    }
  };

  const onSubmit = () => {
    onUpdate?.({
      ...prescription,
      exercises: watchedExercises,
      repeatCount: watchedRepetitions,
    });
    onStopEditing?.();
  };

  const handleCreateComplete = handleSubmit(onSubmit);

  const handleEdit = () => {
    setIsOpen(true);
    onStartEditing?.();
  };

  const handleDelete = () => {
    onDelete?.();
  };

  if (!staticExerciseList) {
    return null;
  }

  return (
    <Card
      className={cn(
        'relative border border-[var(--aiortho-gray-100)] p-5 transition-all duration-300 ease-in-out min-h-21 flex justify-center',
        isOpen ? 'shadow-md' : 'shadow-sm'
      )}
    >
      {!isEditing && showControl && (
        <div
          className={cn(
            'flex absolute top-[30px] -right-5 translate-x-full gap-3 text-[var(--aiortho-gray-400)]',
            isOpen && 'top-[22px]'
          )}
        >
          <button
            type="button"
            className="cursor-pointer hover:scale-130 transition-all duration-300"
            onClick={handleEdit}
          >
            <EditIcon />
          </button>
          <button
            type="button"
            className="cursor-pointer hover:scale-130 transition-all duration-300"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </button>
        </div>
      )}

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <div className="flex justify-between items-center cursor-pointer">
            <div className="flex gap-2">
              <span className="text-[var(--aiortho-gray-900)] text-lg font-semibold font-pretendard">
                {prescription.name}
              </span>

              {prescription.startDate && prescription.endDate && (
                <span className="text-xs text-[#A77600] font-bold p-2 bg-[#FEC53d]/20 rounded-sm">
                  {calculateWeeks(prescription.startDate, prescription.endDate)}주 처방
                </span>
              )}
            </div>

            <ChevronUp
              className={`text-[var(--aiortho-gray-700)] h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <Divider className="my-5" />

          <form onSubmit={e => e.preventDefault()}>
            <CardContent className="p-0 flex flex-col gap-7">
              {watchedExercises.map((exercise, idx) => (
                <div key={`재활운동-${idx + 1}`} className="flex flex-col gap-7">
                  <span className="text-[var(--aiortho-gray-900)] font-semibold">
                    재활 운동 {idx + 1}
                  </span>
                  <div className="flex flex-col gap-3">
                    <Label className="text-[var(--aiortho-gray-500)] text-sm px-0 py-0 ">
                      운동 종류 선택
                    </Label>

                    <Controller
                      name={`exercises.${idx}.exerciseId`}
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={(value: string) => {
                            field.onChange(value);
                            handleExerciseChange(value, idx);
                          }}
                        >
                          <SelectTrigger
                            className={cn(
                              'w-full border-[var(--aiortho-gray-200)] text-[var(--aiortho-gray-900)] focus-visible:ring-1 focus-visible:ring-[var(--aiortho-primary)] focus-visible:border-[var(--aiortho-primary)] px-4 py-3 data-[disabled]:opacity-100 disabled:bg-[#F0F3FA99] cursor-pointer disabled:text-[var(--aiortho-gray-600)]',
                              errors.exercises?.[idx]?.exerciseId &&
                                'border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500'
                            )}
                            disabled={!isEditing || isPending}
                          >
                            <SelectValue placeholder="운동 종류를 선택해주세요." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {staticExerciseList.map(exercise => (
                                <SelectItem
                                  key={`표준 static 프로그램-${exercise.exerciseId}`}
                                  value={exercise.exerciseId}
                                  className={cn(
                                    'cursor-pointer disabled:text-[var(--aiortho-gray-600)]'
                                  )}
                                >
                                  <span className="truncate">{exercise.name}</span>
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {/* FIXME: 기획 수정 시 삭제 */}
                    {/* {errors.exercises?.[idx]?.exerciseId && (
                      <span className="text-red-500 text-xs">
                        {errors.exercises[idx]?.exerciseId?.message}
                      </span>
                    )} */}
                  </div>

                  {exercise.description && (
                    <div className="flex flex-col gap-3">
                      <Label className="text-[var(--aiortho-gray-500)] text-sm px-0 py-0">
                        {exercise.description}
                      </Label>
                      <Controller
                        name={`exercises.${idx}.direction`}
                        control={control}
                        render={({ field }) => (
                          <RadioGroup
                            value={field.value}
                            onValueChange={value => {
                              field.onChange(value);
                              handleDirectionChange(value, idx);
                            }}
                          >
                            <div className="flex gap-5">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="left"
                                  id={`exercise-${idx}-direction-left`}
                                  className="text-[var(--aiortho-gray-500)] border-2 border-[var(--aiortho-gray-200)] data-[state=checked]:border-[var(--aiortho-primary)] data-[state=checked]:bg-transparent cursor-pointer disabled:border-[var(--aiortho-gray-200)] disabled:data-[state=checked]:border-[var(--aiortho-gray-200)]"
                                  checked={exercise.direction === ExerciseDirection.Left}
                                  disabled={!isEditing || isPending}
                                />
                                <Label
                                  htmlFor={`exercise-${idx}-direction-left`}
                                  className={cn(
                                    'text-[var(--aiortho-gray-900)] text-sm cursor-pointer',
                                    !isEditing && 'text-[var(--aiortho-gray-600)] cursor-default'
                                  )}
                                >
                                  {ExerciseDirectionLabel[ExerciseDirection.Left]}
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="right"
                                  id={`exercise-${idx}-direction-right`}
                                  className="text-[var(--aiortho-gray-500)] border-2 border-[var(--aiortho-gray-200)] data-[state=checked]:border-[var(--aiortho-primary)] data-[state=checked]:bg-transparent cursor-pointer disabled:border-[var(--aiortho-gray-200)] disabled:data-[state=checked]:border-[var(--aiortho-gray-200)]"
                                  checked={exercise.direction === ExerciseDirection.Right}
                                  disabled={!isEditing || isPending}
                                />
                                <Label
                                  htmlFor={`exercise-${idx}-direction-right`}
                                  className={cn(
                                    'text-[var(--aiortho-gray-900)] text-sm cursor-pointer',
                                    !isEditing && 'text-[var(--aiortho-gray-600)] cursor-default'
                                  )}
                                >
                                  {ExerciseDirectionLabel[ExerciseDirection.Right]}
                                </Label>
                              </div>
                            </div>
                          </RadioGroup>
                        )}
                      />
                    </div>
                  )}

                  {exercise.exerciseId && (
                    <div className="flex flex-col gap-3">
                      <Label className="text-[var(--aiortho-gray-500)] text-sm px-0 py-0 ">
                        시간 선택
                      </Label>
                      <Controller
                        name={`exercises.${idx}.duration`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value !== 0 ? String(field.value) : ''}
                            onValueChange={value => {
                              const numValue = Number(value);
                              field.onChange(numValue);
                              handleDurationChange(numValue, idx);
                            }}
                          >
                            <SelectTrigger
                              className={cn(
                                'w-full border-[var(--aiortho-gray-200)] text-[var(--aiortho-gray-900)] focus-visible:ring-1 focus-visible:ring-[var(--aiortho-primary)] focus-visible:border-[var(--aiortho-primary)] px-4 py-3 data-[disabled]:opacity-100 disabled:bg-[#F0F3FA99] cursor-pointer disabled:text-[var(--aiortho-gray-600)]',
                                errors.exercises?.[idx]?.duration &&
                                  'border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500'
                              )}
                              disabled={!isEditing || isPending}
                            >
                              <SelectValue placeholder="시간을 선택해주세요." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {Array.from({ length: 12 }, (_, i) => (
                                  <SelectItem
                                    key={`운동 시간-${i + 1}`}
                                    value={String(i + 1)}
                                    className={cn(
                                      'cursor-pointer',
                                      !isEditing && 'text-[var(--aiortho-gray-600)]'
                                    )}
                                  >
                                    {i + 1}분
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {/* FIXME: 기획 수정 시 삭제 */}
                      {/* {errors.exercises?.[idx]?.duration && (
                        <span className="text-red-500 text-xs">
                          {errors.exercises[idx]?.duration?.message}
                        </span>
                      )} */}
                    </div>
                  )}
                </div>
              ))}

              {watchedExercises.length < MAX_EXERCISE_LENGTH && isEditing && (
                <Button
                  type="button"
                  className="font-bold text-[var(--aiortho-primary)] bg-[#BDD5FF80] w-20 h-10 rounded-lg cursor-pointer hover:bg-[#BDD5FF]"
                  onClick={handleAddExercise}
                >
                  항목 추가
                </Button>
              )}

              <Divider />

              <div className="flex justify-between">
                <div className="flex flex-col gap-3">
                  <p className="text-[var(--aiortho-gray-900)] text-lg font-bold">
                    프로그램 반복 수
                  </p>
                  <p className="text-[var(--aiortho-gray-600)] text-sm">
                    최소 3회, 최대 12회까지 설정할 수 있어요
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer h-6 w-6 text-[var(--aiortho-gray-500)] bg-[var(--aiortho-gray-100)] hover:text-[var(--aiortho-gray-900)] disabled:text-[#DADFE9] disabled:bg-[#F7F9FC]"
                    onClick={() => handleRepetitionsChange(-1)}
                    disabled={watchedRepetitions <= 3 || !isEditing || isPending}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-[var(--aiortho-gray-600)] text-sm mx-2">
                    {watchedRepetitions}회
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer h-6 w-6 text-[var(--aiortho-gray-500)] bg-[var(--aiortho-gray-100)] hover:text-[var(--aiortho-gray-900)] disabled:text-[#DADFE9] disabled:bg-[#F7F9FC]"
                    onClick={() => handleRepetitionsChange(1)}
                    disabled={watchedRepetitions >= 12 || !isEditing || isPending}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                {isEditing && (
                  <Button
                    type="button"
                    className="cursor-pointer w-27 h-11 font-semibold rounded-lg"
                    disabled={isPending || (checkIsDirty && !isDirty)}
                    onClick={handleCreateComplete}
                  >
                    생성 완료
                  </Button>
                )}

                {isEditing && checkIsDirty && !isDirty && (
                  <Button
                    type="button"
                    variant="secondary"
                    className="cursor-pointer w-27 h-11 font-semibold rounded-lg"
                    onClick={() => onStopEditing?.()}
                  >
                    수정 취소
                  </Button>
                )}
              </div>
            </CardContent>
          </form>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
