'use client';

import { useFunnel, useDoctorProfile, useNurseProfile } from '@/hooks';
import { VerifyProfile, EditProfile } from '../components';
import { useAuthStore } from '@/store/authStore';
import { isDoctorRole } from '@/lib/utils';

const EDIT_PROFILE_STEPS = ['verify-profile', 'edit-profile'] as const;

export default function ProfileEditPage() {
  const { auth } = useAuthStore();
  if (!auth) return null;

  const profileQuery = isDoctorRole(auth.role) ? useDoctorProfile() : useNurseProfile();

  const [Funnel, nextStep] = useFunnel(EDIT_PROFILE_STEPS, {
    initialStep: 'edit-profile',
  });

  const handleVerifyProfileSuccess = () => {
    nextStep('edit-profile');
  };

  if (!profileQuery.data) return null;

  const profile = profileQuery.data;

  return (
    <section className="flex flex-col max-w-[680px]">
      <Funnel>
        <Funnel.Step name="verify-profile">
          <VerifyProfile role={auth.role} profile={profile} onClick={handleVerifyProfileSuccess} />
        </Funnel.Step>
        <Funnel.Step name="edit-profile">
          <EditProfile role={auth.role} profile={profile} />
        </Funnel.Step>
      </Funnel>
    </section>
  );
}
