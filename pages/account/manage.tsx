import { Text, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Form from '../../components/Form';
import FormControl from '../../components/FormControl';
import PageLayout from '../../components/layout/PageLayout';
import Link from '../../components/Link';
import Dialog from '../../components/Dialog';
import ToastMessage from '../../components/ToastMessage';
import { NextPageWithAuth } from '../../models/pageWithAuth';
import { initManageAccount, saveUserNewInfos, updateUserInfos } from '../../redux/actions/manageAccount';
import { resetPasswordAssistanceInfos } from '../../redux/actions/passwordAssistance';
import { RootState } from '../../redux/reducers';
import { getErrorsMessages, validateFormData } from '../../utils/formUtils';
import { manageAccountValidationSchema } from '../../validations';
import uniqid from 'uniqid';

const ManageAccount: NextPageWithAuth = () => {
  const { t } = useTranslation(['manageAccount', 'validations', 'common']);
  const { open, onOpen, onClose } = useDisclosure();
  const { id, name: currentName, email: currentEmail } = useSelector((state: RootState) => state.auth);
  const { username, email, hasUpdatedInfos, hasUpdatedEmail } = useSelector(
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

  const handleSubmit = () => {
    validateFormData(manageAccountValidationSchema, { username, email })
      .then(async () => {
        setFormErrors([]);
        dispatch(saveUserNewInfos());
      })
      .catch((errorsArray) => {
        setFormErrors(errorsArray);
      });
  };

  return (
    <PageLayout title={t('manageAccount:title')}>
      <Text>{t('manageAccount:description')}</Text>
      <Form onSubmit={handleSubmit}>
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
        <Button type="submit">{t('common:save')}</Button>
        <Link href="/password-assistance" onClick={() => dispatch(resetPasswordAssistanceInfos())}>
          {t('manageAccount:changePassword')}
        </Link>
        <Button onClick={onOpen}>{t('manageAccount:delete')}</Button>
        <Dialog
          title={t('manageAccount:delete')}
          firstActionButton={t('manageAccount:keepAccount')}
          handleFirstAction={onClose}
          secondActionButton={t('manageAccount:delete')}
          isOpen={open}
          handleClose={onClose}
          href="/api/user/delete"
        >
          {t('manageAccount:deleteModalDescription')}
        </Dialog>
        {hasUpdatedInfos && (
          <ToastMessage
            id={uniqid()}
            description={t('manageAccount:infosChanged')}
            status="success"
            duration={5000}
            trigger={hasUpdatedInfos}
          ></ToastMessage>
        )}
        {hasUpdatedEmail && (
          <ToastMessage
            id={uniqid()}
            title={t('manageAccount:emailChangedTitle')}
            description={t('manageAccount:emailChanged')}
            status="info"
            duration={null}
            trigger={hasUpdatedEmail}
          />
        )}
      </Form>
    </PageLayout>
  );
};

export default ManageAccount;

ManageAccount.requireAuth = true;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['manageAccount', 'validations', 'email', 'common'])),
  },
});
