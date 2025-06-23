'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';

interface AuthFindIdResultProps {
  name: string;
  email: string;
}

const AuthFindIdResult = ({ name, email }: AuthFindIdResultProps) => {
  const router = useRouter();
  const { role } = useParams();

  const handleClick = () => {
    router.push(`/${role}/auth`);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center cursor-default gap-2 my-20">
        <p className="text-sm text-[var(--aiortho-gray-600)]">{name} 회원님의 아이디입니다.</p>
        <span className="text-lg font-semibold text-[var(--aiortho-primary)] ">{email}</span>
      </div>

      <Button
        type="button"
        className="w-full py-5 mt-4 rounded-full cursor-pointer h-12 text-white"
        onClick={handleClick}
      >
        로그인
      </Button>
    </div>
  );
};

export default AuthFindIdResult;
