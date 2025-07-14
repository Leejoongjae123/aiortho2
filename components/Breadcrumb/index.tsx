'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { findRouteByPath } from '@/constants/routes';

// 경로 세그먼트에서 브레드크럼 정보를 생성하는 함수
export const generateBreadcrumbs = (
  pathname: string
): Array<{ key: string; label: string; path: string }> => {
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs: Array<{ key: string; label: string; path: string }> = [];

  for (let i = 0; i < pathSegments.length; i++) {
    const currentPath = '/' + pathSegments.slice(0, i + 1).join('/');
    const routeInfo = findRouteByPath(currentPath);

    if (routeInfo) {
      breadcrumbs.push(routeInfo);
    } else {
      // ROUTES에 없는 경로는 세그먼트를 그대로 사용
      breadcrumbs.push({
        key: pathSegments[i],
        label: decodeURIComponent(pathSegments[i]),
        path: currentPath,
      });
    }
  }

  return breadcrumbs;
};

const Breadcrumb = () => {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <nav className="w-full h-12 py-3 mb-8 flex items-center">
      <div className="flex items-center">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <Fragment key={breadcrumb.path}>
              {index > 0 && (
                <ChevronRight className="w-4 h-4 stroke-3 text-[var(--aiortho-gray-400)] mx-2" />
              )}

              <span
                className={cn(
                  'text-lg text-[var(--aiortho-gray-400)] cursor-default',
                  isLast && 'text-[var(--aiortho-gray-600)] font-medium'
                )}
              >
                {breadcrumb.label}
              </span>
            </Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumb;
