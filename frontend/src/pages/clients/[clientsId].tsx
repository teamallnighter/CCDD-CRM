import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/clients/clientsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditClients = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    contact_email: '',

    user_account: '',

    organization: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { clients } = useAppSelector((state) => state.clients);

  const { clientsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: clientsId }));
  }, [clientsId]);

  useEffect(() => {
    if (typeof clients === 'object') {
      setInitialValues(clients);
    }
  }, [clients]);

  useEffect(() => {
    if (typeof clients === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = clients[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [clients]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: clientsId, data }));
    await router.push('/clients/clients-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit clients')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit clients'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Name'>
                <Field name='name' placeholder='Name' />
              </FormField>

              <FormField label='ContactEmail'>
                <Field name='contact_email' placeholder='ContactEmail' />
              </FormField>

              <FormField label='UserAccount' labelFor='user_account'>
                <Field
                  name='user_account'
                  id='user_account'
                  component={SelectField}
                  options={initialValues.user_account}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='organization' labelFor='organization'>
                <Field
                  name='organization'
                  id='organization'
                  component={SelectField}
                  options={initialValues.organization}
                  itemRef={'organizations'}
                  showField={'name'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/clients/clients-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditClients.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_CLIENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditClients;
