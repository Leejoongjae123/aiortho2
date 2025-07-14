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
        },
      },
    },
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

// 경로에서 route 정보를 찾는 유틸리티 함수 (key 포함)
export const findRouteByPath = (
  path: string
): { key: string; label: string; path: string } | null => {
  const searchInRoutes = (
    routes: Record<string, RouteConfig>
  ): { key: string; label: string; path: string } | null => {
    for (const [routeKey, route] of Object.entries(routes)) {
      if (route.path === path) {
        return { key: route.key, label: route.label, path: route.path };
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
