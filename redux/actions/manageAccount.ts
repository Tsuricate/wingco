export const UPDATE_USER_INFOS = 'UPDATE_USER_INFOS';

export const updateUserInfos = (value: string, name: string) => ({
  type: UPDATE_USER_INFOS,
  value,
  name,
});
