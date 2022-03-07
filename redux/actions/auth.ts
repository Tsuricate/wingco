export const UPDATE_EMAIL = 'UPDATE_EMAIL';

export const updateEmail = (email: string) => ({
  type: UPDATE_EMAIL,
  email,
});
