'use client';

import { useAuthStore } from '@/store/authStore';
import { useDoctorProfile, useNurseProfile } from '@/hooks';
import Divider from '@/components/Divider';
import PatientDashboard from '@/components/PatientDashboard';
import { HomeProfile, QuickMenu } from './components';
import { isDoctorRole } from '@/lib/utils';

const HomePage = () => {
  const { auth } = useAuthStore();
  if (!auth) return null;

  const isDoctor = isDoctorRole(auth.role);

  const doctorProfileQuery = useDoctorProfile({ enabled: isDoctor });
  const nurseProfileQuery = useNurseProfile({ enabled: !isDoctor });

  const profileQuery = isDoctor ? doctorProfileQuery : nurseProfileQuery;
  const { data: profile } = profileQuery;

  if (!profile) return null;

  const { name, adminId } = profile;

  return (
    <div className="flex flex-1 flex-col">
      {/* HomeProfile */}
      <HomeProfile name={name} role={auth.role} code={adminId} />

      <Divider className="my-13" />

      {/* QuickMenu */}
      <QuickMenu role={auth.role} />

      <Divider className="my-13 bg-transparent" />

      {/* PatientDashboard */}
      <PatientDashboard />
    </div>
  );
};

export default HomePage;
