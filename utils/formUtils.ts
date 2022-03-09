interface FormError {
  name: string;
  message: string;
}

export const getErrorsMessages = (errorsArray: Array<FormError>, inputName: string) => {
  return errorsArray.filter((error) => error.name === inputName).map((error) => error.message);
};
