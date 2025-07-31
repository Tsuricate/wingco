import { Dialog, Field, Switch } from '@chakra-ui/react';
import React, { ComponentProps } from 'react';

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
