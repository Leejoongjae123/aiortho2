type RouteConfig = {
  key: string;
  path: string;
  label: string;
  children?: Record<string, RouteConfig>;
};

export const ROUTES: Record<string, RouteConfig> = {
  home: {
    key: 'home',
    path: '/home',
    label: '홈',
    children: {
      quickMenu: {
        key: 'quickMenu',
        path: '/home/quick',
        label: '퀵 메뉴 (처방하기)',
      },
    },
  },

  prescriptions: {
    key: 'prescriptions',
    path: '/prescriptions',
    label: '처방 관리',
    children: {
      patients: {
        key: 'patients',
        path: '/prescriptions/patients',
        label: '환자 명단',
        children: {
          register: {
            key: 'patientsRegister',
            path: '/prescriptions/patients/register',
            label: '환자 등록',
          },
          detail: {
            key: 'patientsDetail',
            path: '/prescriptions/patients/[id]',
            label: '환자 상세 정보',
            children: {
              edit: {
                key: 'patientsEdit',
                path: '/prescriptions/patients/[id]/edit',
                label: '환자 정보 수정',
              },

              prescribe: {
                key: 'patientsPrescription',
                path: '/prescriptions/patients/[id]/prescribe',
                label: '처방하기',
              },
            },
          },
        },
      },
      standardTreatmentProgram: {
        key: 'standardTreatmentProgram',
        path: '/prescriptions/standard-treatment-program',
        label: '표준 치료 프로그램',
      },
    },
  },

  admin: {
    key: 'admin',
    path: '/admin',
    label: '의사 관리',
  },
} as const;

// key로 route를 찾는 유틸리티 함수
export const findRouteByKey = (targetKey: string): RouteConfig | null => {
  const searchInRoutes = (routes: Record<string, RouteConfig>): RouteConfig | null => {
    for (const [routeKey, route] of Object.entries(routes)) {
      if (route.key === targetKey) {
        return route;
      }
      if (route.children) {
        const found = searchInRoutes(route.children);
        if (found) return found;
      }
    }
    return null;
  };

  return searchInRoutes(ROUTES);
};

// 동적 라우트에서 기본 label을 반환하는 함수
export const generateDynamicLabel = (path: string): string => {
  const routeInfo = findRouteByPath(path);

  if (!routeInfo) {
    // 라우트 정보가 없으면 경로의 마지막 세그먼트를 사용
    const segments = path.split('/').filter(Boolean);
    return segments[segments.length - 1] || '';
  }

  // 기본 label 반환 (동적 라우트도 기본 label 사용)
  return routeInfo.label;
};

// 경로에서 route 정보를 찾는 유틸리티 함수 (key 포함)
export const findRouteByPath = (
  path: string
): { key: string; label: string; path: string } | null => {
  const searchInRoutes = (
    routes: Record<string, RouteConfig>
  ): { key: string; label: string; path: string } | null => {
    for (const [routeKey, route] of Object.entries(routes)) {
      // 정확한 경로 매칭
      if (route.path === path) {
        return { key: route.key, label: route.label, path: route.path };
      }

      // 동적 라우트 패턴 매칭
      if (route.path.includes('[') && route.path.includes(']')) {
        const pattern = route.path.replace(/\[.*?\]/g, '[^/]+');
        const regex = new RegExp(`^${pattern}$`);

        if (regex.test(path)) {
          return { key: route.key, label: route.label, path: route.path };
        }
      }

      if (route.children) {
        const found = searchInRoutes(route.children);
        if (found) return found;
      }
    }
    return null;
  };

  return searchInRoutes(ROUTES);
};
