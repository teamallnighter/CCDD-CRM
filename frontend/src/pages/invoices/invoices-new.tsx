import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
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
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/invoices/invoicesSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  invoice_number: '',

  amount: '',

  issue_date: '',

  due_date: '',

  status: 'pending',

  client: '',

  organization: '',
};

const InvoicesNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/invoices/invoices-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='InvoiceNumber'>
                <Field name='invoice_number' placeholder='InvoiceNumber' />
              </FormField>

              <FormField label='Amount'>
                <Field type='number' name='amount' placeholder='Amount' />
              </FormField>

              <FormField label='IssueDate'>
                <Field
                  type='datetime-local'
                  name='issue_date'
                  placeholder='IssueDate'
                />
              </FormField>

              <FormField label='DueDate'>
                <Field
                  type='datetime-local'
                  name='due_date'
                  placeholder='DueDate'
                />
              </FormField>

              <FormField label='Status' labelFor='status'>
                <Field name='status' id='status' component='select'>
                  <option value='pending'>pending</option>

                  <option value='paid'>paid</option>

                  <option value='overdue'>overdue</option>
                </Field>
              </FormField>

              <FormField label='Client' labelFor='client'>
                <Field
                  name='client'
                  id='client'
                  component={SelectField}
                  options={[]}
                  itemRef={'clients'}
                ></Field>
              </FormField>

              <FormField label='organization' labelFor='organization'>
                <Field
                  name='organization'
                  id='organization'
                  component={SelectField}
                  options={[]}
                  itemRef={'organizations'}
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
                  onClick={() => router.push('/invoices/invoices-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

InvoicesNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_INVOICES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default InvoicesNew;
