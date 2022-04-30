import { Divider, Text, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AlertMessage from '../../components/AlertMessage';
import Button from '../../components/Button';
import Form from '../../components/Form';
import FormControl from '../../components/FormControl';
import PageLayout from '../../components/layout/PageLayout';
import Link from '../../components/Link';
import Modal from '../../components/Modal';
import { NextPageWithAuth } from '../../models/pageWithAuth';
import {
  changeUserUsername,
  initManageAccount,
  updateUserInfos,
} from '../../redux/actions/manageAccount';
import { resetPasswordAssistanceInfos } from '../../redux/actions/passwordAssistance';
import { RootState } from '../../redux/reducers';
import { getErrorsMessages, validateFormData } from '../../utils/formUtils';
import { usernameValidationSchema } from '../../validations';

const ManageAccount: NextPageWithAuth = () => {
  const { t } = useTranslation(['manageAccount', 'validations', 'common']);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    id,
    name: currentName,
    email: currentEmail,
  } = useSelector((state: RootState) => state.auth);
  const { username, email, hasChangedUsername } = useSelector(
    (state: RootState) => state.manageAccount
  );
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    dispatch(initManageAccount(id, currentName, currentEmail));
  }, [currentEmail, dispatch, currentName, id]);

  const updateField = (value: string, name: string) => {
    dispatch(updateUserInfos(value, name));
  };

  const handleChangeUsername = () => {
    validateFormData(usernameValidationSchema, { username })
      .then(async () => {
        setFormErrors([]);
        dispatch(changeUserUsername());
      })
      .catch((errorsArray) => {
        setFormErrors(errorsArray);
      });
  };

  const handleChangeEmail = () => {
    console.log('changed email !');
  };

  return (
    <PageLayout title={t('manageAccount:title')}>
      <Text>{t('manageAccount:description')}</Text>
      {hasChangedUsername && (
        <AlertMessage status="success">{t('manageAccount:usernameChanged')}</AlertMessage>
      )}

      <Divider />
      <Form onSubmit={handleChangeUsername}>
        <FormControl
          id="username"
          name="username"
          value={username}
          label={t('common:usernameLabel')}
          helperText={t('manageAccount:usernameHelperText')}
          updateField={updateField}
          errors={getErrorsMessages(formErrors, 'username')}
        />
        <Button type="submit">{t('common:save')}</Button>
        <Divider />
      </Form>
      <Form onSubmit={handleChangeEmail}>
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
