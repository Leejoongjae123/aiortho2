'use client';

import React, { useState, useMemo } from 'react';
import { useFunnel } from '@/hooks';
import AuthFindTrigger from './components/AuthFindTrigger';
import AuthFindOtp from './components/AuthFindOtp';
import { AuthFindIdFormValues, AuthFindPasswordFormValues } from './types';

const AuthSteps = ['authFind', 'authFindOtp', 'authFindIdResult'] as const;

const AuthFind = () => {
  const [formValues, setFormValues] = useState<AuthFindIdFormValues | AuthFindPasswordFormValues>();
  const [foundId, setFoundId] = useState<string>();

  const [Funnel, nextStep] = useFunnel(AuthSteps, { initialStep: 'authFind' });

  const handleAuthFindFormSubmit = (values: AuthFindIdFormValues | AuthFindPasswordFormValues) => {
    setFormValues(values);
    nextStep('authFindOtp');
  };

  const handleAuthFindOtpValueSubmit = (values: string) => {
    setFoundId(values);
    nextStep('authFindIdResult');
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
      </Funnel>
    </div>
  );
};

export default AuthFind;
