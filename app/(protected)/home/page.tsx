'use client';

import { useAuthStore } from '@/store/authStore';
import HomeProfile from './components/HomeProfile';
import useProfile from '@/hooks/useProfile';

const HomePage = () => {
  const { auth } = useAuthStore();
  const profileQuery = useProfile(auth!.role);

  if (!auth || !profileQuery.data) return null;

  const { name, adminId } = profileQuery.data;

  return (
    <div className="flex flex-1 flex-col">
      {/* TODO: 세부 페이지 라우팅 구성 후 구현 */}
      {/* Breadcrumb */}

      {/* HomeProfile */}
      <HomeProfile name={name} role={auth.role} code={adminId} />

      {/* QuickMenu */}
      {/* PatientDashboard */}
    </div>
  );
};

export default HomePage;
