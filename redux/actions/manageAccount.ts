export const UPDATE_USER_INFOS = 'UPDATE_USER_INFOS';
export const CHANGE_USER_USERNAME = 'CHANGE_USER_USERNAME';
export const CHANGE_USER_EMAIL = 'CHANGE_USER_EMAIL';
export const INIT_MANAGE_ACCOUNT = 'INIT_MANAGE_ACCOUNT';

export const updateUserInfos = (value: string, name: string) => ({
  type: UPDATE_USER_INFOS,
  value,
  name,
});

export const changeUserUsername = () => ({
  type: CHANGE_USER_USERNAME,
});

export const changeUserEmail = () => ({
  type: CHANGE_USER_EMAIL,
});

export const initManageAccount = (id: string, username: string, email: string) => ({
  type: INIT_MANAGE_ACCOUNT,
  id,
  username,
  email,
});
