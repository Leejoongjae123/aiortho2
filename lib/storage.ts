type STORAGE_TYPES = 'local' | 'session';

export const getStorage = (storage: STORAGE_TYPES, key: string) => {
  if (storage === 'local') {
    return localStorage.getItem(key);
  }

  return sessionStorage.getItem(key);
};

export const setStorage = (storage: STORAGE_TYPES, key: string, value: any) => {
  if (storage === 'local') {
    localStorage.setItem(key, value);
    return;
  }

  sessionStorage.setItem(key, value);
};

export const removeStorage = (storage: STORAGE_TYPES, key: string) => {
  if (storage === 'local') {
    localStorage.removeItem(key);
    return;
  }

  sessionStorage.removeItem(key);
};
