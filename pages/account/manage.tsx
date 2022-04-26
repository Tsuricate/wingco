import { Divider, Text, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import Form from '../../components/Form';
import FormControl from '../../components/FormControl';
import PageLayout from '../../components/layout/PageLayout';
import Link from '../../components/Link';
import Modal from '../../components/Modal';
import { NextPageWithAuth } from '../../models/pageWithAuth';
import { resetPasswordAssistanceInfos } from '../../redux/actions/passwordAssistance';
import { getErrorsMessages, validateFormData } from '../../utils/formUtils';
import { changeAccountInfosSchema } from '../../validations';

const ManageAccount: NextPageWithAuth = () => {
  const { t } = useTranslation(['manageAccount', 'validations', 'common']);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState([]);

  const updateField = (value: string, name: string) => {
    if (name === 'username') setUsername(value);
    if (name === 'email') setEmail(value);
  };

  const handleSave = () => {
    validateFormData(changeAccountInfosSchema, { username, email })
      .then(async () => {
        setFormErrors([]);
      })
      .catch((errorsArray) => {
        setFormErrors(errorsArray);
      });
  };

  return (
    <PageLayout title={t('manageAccount:title')}>
      <Form onSubmit={handleSave}>
        <Text>{t('manageAccount:description')}</Text>
        <Divider />
        <FormControl
          id="username"
          name="username"
          value={username}
          label={t('common:usernameLabel')}
          helperText={t('manageAccount:usernameHelperText')}
          updateField={updateField}
          errors={getErrorsMessages(formErrors, 'username')}
        />
        <FormControl
          id="email"
          name="email"
          value={email}
          label={t('common:emailLabel')}
          helperText={t('manageAccount:emailHelperText')}
          updateField={updateField}
          errors={getErrorsMessages(formErrors, 'email')}
        />
        <Divider />
        <Button type="submit">{t('common:save')}</Button>
        <Divider />
        <Link href="/password-assistance" onClick={() => dispatch(resetPasswordAssistanceInfos())}>
          {t('manageAccount:changePassword')}
        </Link>
        <Divider />
        <Button onClick={onOpen}>{t('manageAccount:delete')}</Button>
        <Modal
          title={t('manageAccount:delete')}
          saveMessage={t('manageAccount:keepAccount')}
          closeMessage={t('manageAccount:delete')}
          isOpen={isOpen}
          onClose={onClose}
          href="/api/user/delete"
        >
          {t('manageAccount:deleteModalDescription')}
        </Modal>
      </Form>
    </PageLayout>
  );
};

export default ManageAccount;

ManageAccount.requireAuth = true;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['manageAccount', 'validations', 'common'])),
  },
});
