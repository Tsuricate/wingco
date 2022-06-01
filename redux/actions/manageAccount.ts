export const UPDATE_USER_INFOS = 'UPDATE_USER_INFOS';
export const SAVE_USER_NEW_INFOS = 'SAVE_USER_NEW_INFOS';
export const INIT_MANAGE_ACCOUNT = 'INIT_MANAGE_ACCOUNT';
export const HAS_UPDATED_INFOS = 'HAS_UPDATED_INFOS';
export const HAS_UPDATED_EMAIL = 'HAS_UPDATED_EMAIL';

export const updateUserInfos = (value: string, name: string) => ({
  type: UPDATE_USER_INFOS,
  value,
  name,
});

export const saveUserNewInfos = () => ({
  type: SAVE_USER_NEW_INFOS,
});

export const initManageAccount = (id: string, username: string, email: string) => ({
  type: INIT_MANAGE_ACCOUNT,
  id,
  username,
  email,
});

export const hasUpdatedInfos = (value: boolean) => ({
  type: HAS_UPDATED_INFOS,
  value,
});

export const hasUpdatedEmail = (value: boolean) => ({
  type: HAS_UPDATED_EMAIL,
  value,
});
