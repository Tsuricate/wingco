export const UPDATE_SIGN_IN_INFOS = 'UPDATE_SIGN_IN_INFOS';

export const updateSignInInfos = (value: string, name: string) => ({
  type: UPDATE_SIGN_IN_INFOS,
  value,
  name,
});
