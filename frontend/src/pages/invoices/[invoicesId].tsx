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

import { update, fetch } from '../../stores/invoices/invoicesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditInvoices = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    invoice_number: '',

    amount: '',

    issue_date: new Date(),

    due_date: new Date(),

    status: '',

    client: '',

    organization: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { invoices } = useAppSelector((state) => state.invoices);

  const { invoicesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: invoicesId }));
  }, [invoicesId]);

  useEffect(() => {
    if (typeof invoices === 'object') {
      setInitialValues(invoices);
    }
  }, [invoices]);

  useEffect(() => {
    if (typeof invoices === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = invoices[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [invoices]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: invoicesId, data }));
    await router.push('/invoices/invoices-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit invoices')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit invoices'}
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
              <FormField label='InvoiceNumber'>
                <Field name='invoice_number' placeholder='InvoiceNumber' />
              </FormField>

              <FormField label='Amount'>
                <Field type='number' name='amount' placeholder='Amount' />
              </FormField>

              <FormField label='IssueDate'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.issue_date
                      ? new Date(
                          dayjs(initialValues.issue_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, issue_date: date })
                  }
                />
              </FormField>

              <FormField label='DueDate'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.due_date
                      ? new Date(
                          dayjs(initialValues.due_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, due_date: date })
                  }
                />
              </FormField>

              <FormField label='Status' labelFor='status'>
                <Field name='Status' id='Status' component='select'>
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
                  options={initialValues.client}
                  itemRef={'clients'}
                  showField={'name'}
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

EditInvoices.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_INVOICES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditInvoices;
