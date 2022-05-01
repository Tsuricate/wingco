import { useToast, UseToastOptions } from '@chakra-ui/react';
import { useEffect } from 'react';

interface ToastMessageProps {
  id: string;
  title: string;
  description: string;
  status: UseToastOptions['status'];
  trigger: boolean;
}

const ToastMessage: React.FC<ToastMessageProps> = ({ id, title, description, status, trigger }) => {
  const toast = useToast();

  useEffect(() => {
    if (!toast.isActive(id))
      toast({
        id: id,
        title: title,
        description: description,
        status: status,
        duration: 5000,
        isClosable: true,
      });
  }, [description, id, status, title, toast, trigger]);

  return <></>;
};

export default ToastMessage;
