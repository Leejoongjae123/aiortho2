import { useState } from 'react';
import { Check } from 'lucide-react';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

const termsData = [
  { id: 1, label: '만 14세 이상입니다.', required: true, link: null },
  {
    id: 2,
    label: '서비스 이용약관에 동의합니다.',
    required: true,
    link: '/nurse/auth/join-membership/service',
  },
  {
    id: 3,
    label: '개인정보 수집 및 이용에 동의합니다.',
    required: true,
    link: '/nurse/auth/join-membership/agree',
  },
  {
    id: 4,
    label: '이벤트 및 할인 혜택 안내에 동의합니다.',
    required: false,
    link: '/nurse/auth/join-membership/event',
  },
];

export default function TermsAgreement() {
  const [checkedItems, setCheckedItems] = useState<number[]>(termsData.map(t => t.id));

  const isAllChecked = checkedItems.length === termsData.length;

  const toggleAll = () => {
    setCheckedItems(isAllChecked ? [] : termsData.map(t => t.id));
  };

  const toggleItem = (id: number) => {
    setCheckedItems(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
  };

  const renderCheckBox = (checked: boolean) => (
    <div
      className={`w-5 h-5 flex items-center justify-center rounded-full border`}
      style={{
        borderColor: '#DADFE9',
        backgroundColor: checked ? '#0054A6' : '#DADFE9',
      }}
    >
      {<Check size={14} color="white" strokeWidth={3} />}
    </div>
  );

  return (
    <div className="space-y-4 p-4">
      {/* Select All */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={toggleAll}>
        {renderCheckBox(isAllChecked)}
        <Label className="font-bold text-[color:var(--aiortho-gray-900)] text-sm">
          약관 전체 동의
        </Label>
      </div>

      {/* Terms List */}
      <div className="border-t pt-4 space-y-4">
        {termsData.map(item => {
          const isChecked = checkedItems.includes(item.id);
          return (
            <div
              key={item.id}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleItem(item.id)}
            >
              <div className="flex items-center gap-2">
                {renderCheckBox(isChecked)}
                <Label className="text-[color:var(--aiortho-gray-900)] text-sm font-medium">
                  {item.label}
                  {item.required ? (
                    <span className="text-[color:var(--aiortho-primary)] text-sm font-medium ml-1">
                      *
                    </span>
                  ) : (
                    <span className="text-[#66798D] font-medium ml-1">(선택)</span>
                  )}
                </Label>
              </div>
              {item.link && (
                <Link href={item.link} target="_blank">
                  <span className="text-sm text-[#8395AC] cursor-pointer font-normal">보기</span>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
