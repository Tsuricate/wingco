export const setRedirection = (redirectKey: string, route: string) => {
  return window.sessionStorage.setItem(redirectKey, route);
};

export const getRedirection = (redirectKey: string) => {
  return window.sessionStorage.getItem(redirectKey);
};

export const removeRedirection = (redirectKey: string) => {
  return window.sessionStorage.removeItem(redirectKey);
};
