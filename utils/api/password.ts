import bcrypt from 'bcryptjs';

export const getHashedPassword = (password: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  });
};

export const comparePassword = (password: string, hashedPassword: string) => {
  const isPasswordValid = bcrypt.compareSync(password, hashedPassword);

  if (isPasswordValid) {
    return true;
  } else {
    throw new Error();
  }
};
