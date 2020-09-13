import get from 'lodash/get';

export const isVisibleRoute = (route) => {
  const permissions = JSON.parse(localStorage.getItem('permissions'));
  if (get(permissions, '[0]', 'all') === 'all') {
    return true;
  }
  console.log({permissions, route})
  return permissions.findIndex(perm => route.includes(permissions)) >= 0;
}