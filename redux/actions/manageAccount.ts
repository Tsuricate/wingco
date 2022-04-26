export const UPDATE_USER_INFOS = 'UPDATE_USER_INFOS';
export const CHANGE_USER_INFOS = 'CHANGE_USER_INFOS';
export const INIT_MANAGE_ACCOUNT = 'INIT_MANAGE_ACCOUNT';

export const updateUserInfos = (value: string, name: string) => ({
  type: UPDATE_USER_INFOS,
  value,
  name,
});

export const changeUserInfos = () => ({
  type: CHANGE_USER_INFOS,
});

export const initManageAccount = (username: string, email: string) => ({
  type: INIT_MANAGE_ACCOUNT,
  username,
  email,
});
