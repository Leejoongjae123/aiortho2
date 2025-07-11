'use client';

import { useAuthStore } from '@/store/authStore';
import useProfile from '@/hooks/useProfile';
import Divider from '@/components/Divider';
import Breadcrumb from '@/components/Breadcrumb';
import HomeProfile from './components/HomeProfile';
import QuickMenu from './components/QuickMenu';
import PatientDashboard from '@/components/PatientDashboard';

const HomePage = () => {
  const { auth } = useAuthStore();
  const profileQuery = useProfile(auth!.role);

  if (!auth || !profileQuery.data) return null;

  const { name, adminId } = profileQuery.data;

  return (
    <div className="flex flex-1 flex-col">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* HomeProfile */}
      <HomeProfile name={name} role={auth.role} code={adminId} />

      <Divider className="my-13" />

      {/* QuickMenu */}
      <QuickMenu />

      <Divider className="my-13 bg-transparent" />

      {/* PatientDashboard */}
      <PatientDashboard />
    </div>
  );
};

export default HomePage;
