'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const PATH_SEGMENTS_MAP = {
  home: '홈',
};

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = decodeURIComponent(segment) as keyof typeof PATH_SEGMENTS_MAP;
    const isLast = index === pathSegments.length - 1;

    return (
      <Fragment key={href}>
        {index > 0 && <span className="mx-2 text-[var(--aiortho-gray-400)]">/</span>}

        <Link
          href={href}
          className={cn(
            'text-lg text-[var(--aiortho-gray-400)]',
            isLast && 'text-[var(--aiortho-gray-600)] font-medium'
          )}
        >
          {PATH_SEGMENTS_MAP[label]}
        </Link>
      </Fragment>
    );
  });

  return (
    <nav className="w-full h-12 py-3 mb-8 flex items-center">
      <div className="flex items-center">{breadcrumbs}</div>
    </nav>
  );
};

export default Breadcrumb;
