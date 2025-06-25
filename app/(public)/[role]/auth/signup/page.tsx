'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useFunnel } from '@/hooks';
import { CodeVerifyForm, DoctorSignUpForm, NurseSignUpForm } from './components';

const SIGNUP_STEPS = ['code-verify', 'form'] as const;

const AuthSignUpPage = () => {
  const { role } = useParams();
  const [signUpToken, setSignUpToken] = useState<string>('');

  const [Funnel, nextStep] = useFunnel(SIGNUP_STEPS, {
    initialStep: role === 'doctor' ? 'code-verify' : 'form',
  });

  const handleCodeVerifyFormSubmit = (token: string) => {
    setSignUpToken(token);
    nextStep('form');
  };

  return (
    <div className="flex flex-col items-center pt-10 bg-white w-full h-full justify-center px-4 md:px-7">
      <Funnel>
        <Funnel.Step name="code-verify">
          <CodeVerifyForm onSubmit={handleCodeVerifyFormSubmit} />
        </Funnel.Step>
        <Funnel.Step name="form">
          {role === 'doctor' ? <DoctorSignUpForm token={signUpToken} /> : <NurseSignUpForm />}
        </Funnel.Step>
      </Funnel>
    </div>
  );
};

export default AuthSignUpPage;
