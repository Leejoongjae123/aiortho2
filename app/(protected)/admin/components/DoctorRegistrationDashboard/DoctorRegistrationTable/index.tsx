import { cn } from '@/lib/utils';
import { Fragment } from 'react';
import DoctorRegistrationTableHeader from '../DoctorRegistrationTableHeader';
import { TableColumn } from '../types';
import { Admin } from '@/models';
import DoctorRegistrationTableRow from '../DoctorRegistrationTableRow';

interface DoctorRegistrationTableProps {
  columns: TableColumn[];
  sortBy: TableColumn['id'];
  sortDirection: 'asc' | 'desc' | null;
  onColumnOrderChange: (newColumns: TableColumn[]) => void;
  onColumnSortChange: (newSortBy: TableColumn['id']) => void;
  admins: Admin[];
}

export default function DoctorRegistrationTable({
  columns,
  sortBy,
  sortDirection,
  onColumnOrderChange,
  onColumnSortChange,
  admins,
}: DoctorRegistrationTableProps) {
  console.log(columns);
  return (
    <div className="w-full overflow-x-auto mt-7">
      {/* 드래그 가능한 헤더 */}
      <DoctorRegistrationTableHeader
        columns={columns}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onColumnSortChange={onColumnSortChange}
        onColumnOrderChange={onColumnOrderChange}
      />

      {/* 테이블 본문 */}
      <div className="w-full">
        <div className={cn('transition-all duration-700 ease-in-out')}>
          {admins.map((admin, index) => (
            <Fragment key={`${admin.adminId}-${index}`}>
              <DoctorRegistrationTableRow admin={admin} columnOrder={columns} />
              {index < admins.length - 1 && (
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/304aa4871c104446b0f8164e96d049f4/c914df031f0a54b8061f5d8235a95b70eec4cdf0?placeholderIfAbsent=true"
                  className="object-contain w-full stroke-[0.4px] stroke-slate-400"
                  alt="divider"
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
