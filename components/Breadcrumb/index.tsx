'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const key = decodeURIComponent(segment) as keyof typeof ROUTES;
    const isLast = index === pathSegments.length - 1;

    return (
      <Fragment key={href}>
        {index > 0 && <ChevronRight className="w-4 h-4 text-[var(--aiortho-gray-400)] mx-2" />}

        <Link
          href={href}
          className={cn(
            'text-lg text-[var(--aiortho-gray-400)]',
            isLast && 'text-[var(--aiortho-gray-600)] font-medium'
          )}
        >
          {ROUTES[key].label}
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
