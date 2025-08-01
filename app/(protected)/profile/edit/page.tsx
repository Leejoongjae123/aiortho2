'use client';

import { useFunnel } from '@/hooks';
import { VerifyProfile, EditProfile } from '../components';

const EDIT_PROFILE_STEPS = ['verify-profile', 'edit-profile'] as const;

export default function ProfileEditPage() {
  const [Funnel, nextStep] = useFunnel(EDIT_PROFILE_STEPS, {
    initialStep: 'verify-profile',
  });

  const handleVerifyProfileSuccess = () => {
    nextStep('edit-profile');
  };

  return (
    <section className="flex flex-col max-w-[680px]">
      <Funnel>
        <Funnel.Step name="verify-profile">
          <VerifyProfile onClick={handleVerifyProfileSuccess} />
        </Funnel.Step>
        <Funnel.Step name="edit-profile">
          <EditProfile />
        </Funnel.Step>
      </Funnel>
    </section>
  );
}
