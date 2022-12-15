import router from '@/router/index';

export const redirectToLogin = () => {
  const currentRoute = router.currentRoute.value;
  const { fullPath, query } = currentRoute;
  let redirectFrom = query.redirectFrom;
  if (!redirectFrom) {
    redirectFrom = fullPath.includes('/auth') ? '/' : fullPath;
  }
  return router.push({
    path: '/auth/login',
    query: { redirectFrom },
  });
};
