import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/organizations/organizationsSlice';
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

const OrganizationsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { organizations } = useAppSelector((state) => state.organizations);

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
        <title>{getPageTitle('View organizations')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View organizations')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{organizations?.name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Users Organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>

                      <th>Last Name</th>

                      <th>Phone Number</th>

                      <th>E-Mail</th>

                      <th>Disabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.users_organization &&
                      Array.isArray(organizations.users_organization) &&
                      organizations.users_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/users/users-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='firstName'>{item.firstName}</td>

                          <td data-label='lastName'>{item.lastName}</td>

                          <td data-label='phoneNumber'>{item.phoneNumber}</td>

                          <td data-label='email'>{item.email}</td>

                          <td data-label='disabled'>
                            {dataFormatter.booleanFormatter(item.disabled)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.users_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Clients organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>

                      <th>ContactEmail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.clients_organization &&
                      Array.isArray(organizations.clients_organization) &&
                      organizations.clients_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/clients/clients-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='contact_email'>
                            {item.contact_email}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.clients_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Invoices organization</p>
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
                    {organizations.invoices_organization &&
                      Array.isArray(organizations.invoices_organization) &&
                      organizations.invoices_organization.map((item: any) => (
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
              {!organizations?.invoices_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Projects organization</p>
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
                    {organizations.projects_organization &&
                      Array.isArray(organizations.projects_organization) &&
                      organizations.projects_organization.map((item: any) => (
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
              {!organizations?.projects_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Tasks organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>

                      <th>DueDate</th>

                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.tasks_organization &&
                      Array.isArray(organizations.tasks_organization) &&
                      organizations.tasks_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/tasks/tasks-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='due_date'>
                            {dataFormatter.dateTimeFormatter(item.due_date)}
                          </td>

                          <td data-label='status'>{item.status}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.tasks_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/organizations/organizations-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

OrganizationsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_ORGANIZATIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default OrganizationsView;
