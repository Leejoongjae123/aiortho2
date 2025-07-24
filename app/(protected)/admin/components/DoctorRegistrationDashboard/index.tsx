'use client';

import { Search } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import DoctorRegistrationTable from './DoctorRegistrationTable';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useAdmins } from './hooks';
import Pagination from '@/components/Pagination';
import { useDebounce } from '@/hooks/useDebounce';
import { TableColumn } from './types';
import { loadColumnOrder, saveColumnOrder } from './utils';
import Divider from '@/components/Divider';

const PER_PAGE_SIZE = 10;

export default function DoctorRegistrationDashboard() {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState<TableColumn['id']>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 1000);
  const [columns, setColumns] = useState<TableColumn[]>([]);

  const queryParams = useMemo(
    () => ({
      page: pageNumber,
      limit: PER_PAGE_SIZE,
      sort: `${sortBy}:${sortDirection}`,
      keyword: debouncedSearch,
    }),
    [pageNumber, sortBy, sortDirection, debouncedSearch]
  );

  const adminsQuery = useAdmins(queryParams);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleColumnSortChange = (newSortBy: TableColumn['id']) => {
    if (newSortBy === sortBy) {
      if (sortDirection === null) {
        setSortDirection('asc');
      } else if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortBy(newSortBy);
      setSortDirection('asc');
    }
  };

  const handleColumnOrderChange = (newColumns: TableColumn[]) => {
    setColumns(newColumns);
    saveColumnOrder(newColumns);
  };

  useEffect(() => {
    const savedColumns = loadColumnOrder();
    setColumns(savedColumns);
  }, []);

  if (!adminsQuery.data) {
    return null;
  }

  const { adminListItems, adminCounts } = adminsQuery.data;

  return (
    <div className="flex flex-col gap-6">
      <div
        className={cn(
          'flex relative flex-col items-start px-8 py-9 bg-white rounded-2xl shadow-[6px_6px_54px_rgba(0,0,0,0.05)] max-md:px-5 w-full'
        )}
      >
        <div className="flex w-full flex-col lg:flex-row lg:justify-between lg:items-center gap-5 lg:gap-0">
          <div className="flex flex-row gap-5">
            <div className="flex gap-2 items-center self-start text-2xl font-bold leading-none whitespace-nowrap">
              <h1 className="self-stretch my-auto text-zinc-900">가입 내역</h1>
              <div className="flex items-center self-stretch my-auto">
                <span className="self-stretch my-auto text-sky-700">{adminCounts ?? 0}</span>
                <span className="self-stretch my-auto text-zinc-900">건</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center px-3 py-2.5 rounded-2xl bg-slate-100 fill-slate-100 border border-transparent focus-within:border-[#0054A6] focus-within:border-2 focus-within:bg-white transition-colors">
            <div className="flex gap-2 items-center">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="검색"
                value={search}
                onChange={handleSearchChange}
                className="flex-1 bg-transparent border-none outline-none text-slate-400 placeholder:text-slate-400 focus:text-[#161621]"
                aria-label="의사 검색"
              />
            </div>
          </div>
        </div>

        <DoctorRegistrationTable
          admins={adminListItems}
          columns={columns}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onColumnOrderChange={handleColumnOrderChange}
          onColumnSortChange={handleColumnSortChange}
        />
      </div>

      {adminCounts > 0 && (
        <>
          <Pagination
            currentPage={pageNumber}
            totalPages={Math.ceil(adminCounts / PER_PAGE_SIZE)}
            onPageChange={setPageNumber}
          />

          <Divider className="mt-3 bg-transparent" />
        </>
      )}
    </div>
  );
}
