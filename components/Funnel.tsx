import { Children, isValidElement, ReactNode, ReactElement } from 'react';

export type NonEmptyArray<T> = readonly [T, ...T[]];

export interface StepProps<Steps extends NonEmptyArray<string>> {
  name: Steps[number];
  onEnter?: () => void;
  children: ReactNode;
}

export interface FunnelProps<Steps extends NonEmptyArray<string>> {
  steps: Steps;
  step: Steps[number];
  children: Array<React.ReactElement<StepProps<Steps>>> | ReactElement<StepProps<Steps>>;
}

export default function Funnel<Steps extends NonEmptyArray<string>>({
  step,
  steps,
  children,
}: FunnelProps<Steps>) {
  const validChildren = Children.toArray(children)
    .filter(isValidElement)
    .filter(item => steps.includes((item.props as Partial<StepProps<Steps>>).name ?? '')) as Array<
    React.ReactElement<StepProps<Steps>>
  >;

  const targetStep = validChildren.find(child => child.props.name === step);

  return <>{targetStep}</>;
}

Funnel.Step = function Step<Steps extends NonEmptyArray<string>>({ children }: StepProps<Steps>) {
  return <>{children}</>;
};
