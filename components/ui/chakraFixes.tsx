import { Avatar, Checkbox, Dialog, Field, NumberInput, Switch, Toast, Toaster } from '@chakra-ui/react';
import React from 'react';

export const SafeFieldLabel: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = (props) => {
  return <Field.Label {...props} />;
};

export const SafeFieldHelperText: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return <Field.HelperText {...props} />;
};

export const SafeFieldErrorText: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return <Field.ErrorText {...props} />;
};

export const SafeSwitchLabel = ({ children, ...props }: any) => {
  return <Switch.Label {...props}>{children}</Switch.Label>;
};

export const SafeDialogContent = ({ children, ...props }: any) => {
  return <Dialog.Content {...props}>{children}</Dialog.Content>;
};

export const SafeDialogPositioner = ({ children, ...props }: any) => {
  return <Dialog.Positioner {...props}>{children}</Dialog.Positioner>;
};

export const SafeChakraToaster = ({ children, ...props }: any) => {
  return <Toaster {...props}>{children}</Toaster>;
};

export const SafeToasterTitle = ({ children, ...props }: any) => {
  return <Toast.Title {...props}>{children}</Toast.Title>;
};

export const SafeToasterDescription = ({ children, ...props }: any) => {
  return <Toast.Description {...props}>{children}</Toast.Description>;
};

export const SafeToasterActionTrigger = ({ children, ...props }: any) => {
  return <Toast.ActionTrigger {...props}>{children}</Toast.ActionTrigger>;
};

export const SafeCheckboxLabel = ({ children, ...props }: any) => {
  return <Checkbox.Label {...props}>{children}</Checkbox.Label>;
};

export const SafeAvatarImage = ({ src, alt }: { src?: string; alt?: string }) => {
  return <Avatar.Image {...({ src, alt } as any)} />;
};

export const SafeIncrementTrigger = ({ children, ...props }: any) => {
  return <NumberInput.IncrementTrigger {...props}>{children}</NumberInput.IncrementTrigger>;
};

export const SafeDecrementTrigger = ({ children, ...props }: any) => {
  return <NumberInput.DecrementTrigger {...props}>{children}</NumberInput.DecrementTrigger>;
};
