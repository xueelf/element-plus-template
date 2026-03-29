import { defineStore } from 'pinia';
import { PATH_LOGIN, router, whiteList } from '@/router';
import { useStorage } from '@/hooks/useStorage';

const tokenStorage = useStorage('token');

export const useAppStore = defineStore('app', () => {
  const token = ref<string | null>(tokenStorage.get());

  const isLoggedIn = computed(() => !!token.value);

  watch(
    token,
    (value) => {
      if (value) {
        tokenStorage.set(value);
      } else {
        tokenStorage.remove();
      }
    },
    { flush: 'sync' },
  );

  function $reset() {
    token.value = null;
  }

  function setToken(value: string) {
    token.value = value;
  }

  function logout() {
    if (whiteList.includes(router.currentRoute.value.path)) {
      return;
    }
    $reset();
    router.replace(PATH_LOGIN);
  }

  return {
    token,
    isLoggedIn,
    $reset,
    setToken,
    logout,
  };
});
