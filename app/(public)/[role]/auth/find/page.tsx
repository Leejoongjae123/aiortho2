'use client';

import React, { useState, useMemo } from 'react';
import { useFunnel } from '@/hooks';
import AuthFindTrigger from './components/AuthFindTrigger';
import AuthFindOtp from './components/AuthFindOtp';
import AuthFindPasswordReset from './components/AuthFindPasswordReset';
import { AuthFindIdFormValues, AuthFindPasswordFormValues } from './types';

const AuthSteps = ['authFind', 'authFindOtp', 'authFindIdResult', 'authFindPasswordReset'] as const;

const AuthFind = () => {
  const [formValues, setFormValues] = useState<AuthFindIdFormValues | AuthFindPasswordFormValues>();
  const [foundId, setFoundId] = useState<string>();

  const [Funnel, nextStep] = useFunnel(AuthSteps, { initialStep: 'authFind' });

  const handleAuthFindFormSubmit = (values: AuthFindIdFormValues | AuthFindPasswordFormValues) => {
    if (!values) return;

    setFormValues(values);
    nextStep('authFindOtp');
  };

  const handleAuthFindOtpValueSubmit = (values?: string) => {
    if (!formValues) return;

    if ('email' in formValues) {
      // 새 비밀번호 변경
      nextStep('authFindPasswordReset');
    } else {
      // 계정정보 결과
      setFoundId(values);
      nextStep('authFindIdResult');
    }
  };

  const foundAuth = useMemo(
    () => (formValues?.name && foundId ? { name: formValues.name, email: foundId } : undefined),
    [formValues?.name, foundId]
  );

  return (
    <div className="flex flex-col items-center pt-10 bg-white w-full h-full justify-center px-4 md:px-7">
      <Funnel>
        <Funnel.Step name="authFind">
          <AuthFindTrigger onSubmit={handleAuthFindFormSubmit} />
        </Funnel.Step>
        <Funnel.Step name="authFindOtp">
          <AuthFindOtp formValues={formValues} onSubmit={handleAuthFindOtpValueSubmit} />
        </Funnel.Step>
        <Funnel.Step name="authFindIdResult">
          <AuthFindTrigger foundAuth={foundAuth} />
        </Funnel.Step>
        <Funnel.Step name="authFindPasswordReset">
          <AuthFindPasswordReset />
        </Funnel.Step>
      </Funnel>
    </div>
  );
};

export default AuthFind;
