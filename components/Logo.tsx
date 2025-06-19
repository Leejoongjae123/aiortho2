import React from 'react';

const Logo = ({ fontSize }: { fontSize?: string }) => {
  return (
    <div>
      <h1 className={`text-[color:var(--aiortho-primary)] font-bold text-[52px]`}>AIOrtho</h1>
      <p className="text-[color:var(--aiortho-gray-600)] text-[16px]">
        아이 사경 치료 관리자 페이지
      </p>
    </div>
  );
};

export default Logo;
