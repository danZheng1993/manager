export const isVisibleRoute = (route) => {
  const permissions = JSON.parse(localStorage.getItem('permissions'));
  console.log(permissions);
  if (permissions[0] === 'all') {
    return true;
  }
  console.log({permissions, route})
  return permissions.findIndex(perm => route.includes(permissions)) >= 0;
}