import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/clients/clientsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const ClientsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { clients } = useAppSelector((state) => state.clients);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View clients')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View clients')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{clients?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>ContactEmail</p>
            <p>{clients?.contact_email}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>UserAccount</p>

            <p>{clients?.user_account?.firstName ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>organization</p>

            <p>{clients?.organization?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Invoices Client</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>InvoiceNumber</th>

                      <th>Amount</th>

                      <th>IssueDate</th>

                      <th>DueDate</th>

                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.invoices_client &&
                      Array.isArray(clients.invoices_client) &&
                      clients.invoices_client.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/invoices/invoices-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='invoice_number'>
                            {item.invoice_number}
                          </td>

                          <td data-label='amount'>{item.amount}</td>

                          <td data-label='issue_date'>
                            {dataFormatter.dateTimeFormatter(item.issue_date)}
                          </td>

                          <td data-label='due_date'>
                            {dataFormatter.dateTimeFormatter(item.due_date)}
                          </td>

                          <td data-label='status'>{item.status}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!clients?.invoices_client?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Projects Client</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>

                      <th>StartDate</th>

                      <th>EndDate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.projects_client &&
                      Array.isArray(clients.projects_client) &&
                      clients.projects_client.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/projects/projects-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='title'>{item.title}</td>

                          <td data-label='start_date'>
                            {dataFormatter.dateTimeFormatter(item.start_date)}
                          </td>

                          <td data-label='end_date'>
                            {dataFormatter.dateTimeFormatter(item.end_date)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!clients?.projects_client?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/clients/clients-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

ClientsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_CLIENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default ClientsView;
