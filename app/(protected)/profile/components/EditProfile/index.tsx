import { useAuthStore } from '@/store/authStore';
import { Doctor, Nurse, UserRole } from '@/models';
import { isDoctorRole } from '@/lib/utils';
import DoctorProfileEditForm from './DoctorProfileEditForm';
import NurseProfileEditForm from './NurseProfileEditForm';

interface EditProfileProps {
  role: UserRole;
  profile: Doctor | Nurse;
}

export default function EditProfile({ role, profile }: EditProfileProps) {
  const { auth } = useAuthStore();
  if (!auth) return null;

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold text-[var(--aiortho-gray-900)] mb-5">개인정보 수정</h1>
      <h2 className=" text-[var(--aiortho-gray-600)] mb-13">
        의사 면허 번호, 의료 기관명 변경 시 관리자의 재승인 절차가 필요할 수 있어요.
      </h2>

      {isDoctorRole(role) ? (
        <DoctorProfileEditForm profile={profile as Doctor} />
      ) : (
        <NurseProfileEditForm profile={profile as Nurse} />
      )}
    </div>
  );
}
