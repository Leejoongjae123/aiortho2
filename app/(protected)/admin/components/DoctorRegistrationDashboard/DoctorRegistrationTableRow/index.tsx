import { Admin } from '@/models';
import { TableColumn } from '../types';
import { formatISODate } from '@/lib/utils';

interface DoctorRegistrationTableRowProps {
  admin: Admin;
  columnOrder: TableColumn[];
}

export default function DoctorRegistrationTableRow({
  admin,
  columnOrder,
}: DoctorRegistrationTableRowProps) {
  const renderCellContent = (columnKey: string) => {
    if (columnKey === 'No') {
      return admin.no;
    }

    if (columnKey === '코드 번호') {
      return admin.signupCode;
    }

    if (columnKey === '의사명') {
      return admin.name;
    }

    if (columnKey === '아이디(이메일)') {
      return admin.email;
    }

    if (columnKey === '가입일') {
      return formatISODate(admin.createdAt, true);
    }

    return '-';
  };

  return (
    <div className="flex items-center w-full min-h-[68px] text-sm text-zinc-900 cursor-default transition-colors">
      {columnOrder.map(column => (
        <div
          key={column.id}
          className={`flex justify-center items-center self-stretch px-2.5 py-7 my-auto min-h-[68px] ${column.flex}`}
        >
          <div className="opacity-80 text-zinc-900 truncate text-ellipsis">
            {renderCellContent(column.label)}
          </div>
        </div>
      ))}
    </div>
  );
}
