'use client';

import { useFunnel, useDoctorProfile, useNurseProfile } from '@/hooks';
import { VerifyProfile, EditProfile } from '../components';
import { useAuthStore } from '@/store/authStore';
import { isDoctorRole } from '@/lib/utils';

const EDIT_PROFILE_STEPS = ['verify-profile', 'edit-profile'] as const;

export default function ProfileEditPage() {
  const { auth } = useAuthStore();
  if (!auth) return null;

  const [Funnel, nextStep] = useFunnel(EDIT_PROFILE_STEPS, {
    initialStep: 'verify-profile',
  });

  const isDoctor = isDoctorRole(auth.role);
  const doctorProfileQuery = useDoctorProfile({ enabled: isDoctor });
  const nurseProfileQuery = useNurseProfile({ enabled: !isDoctor });

  const profileQuery = isDoctor ? doctorProfileQuery : nurseProfileQuery;

  const handleVerifyProfileSuccess = () => {
    nextStep('edit-profile');
  };

  const profile = profileQuery.data;

  if (!profile) return null;

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
