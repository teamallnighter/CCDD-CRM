import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/projects/projectsSlice';
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

const ProjectsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.projects);

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
        <title>{getPageTitle('View projects')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View projects')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Title</p>
            <p>{projects?.title}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Description</p>
            {projects.description ? (
              <p dangerouslySetInnerHTML={{ __html: projects.description }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <FormField label='StartDate'>
            {projects.start_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  projects.start_date
                    ? new Date(
                        dayjs(projects.start_date).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No StartDate</p>
            )}
          </FormField>

          <FormField label='EndDate'>
            {projects.end_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  projects.end_date
                    ? new Date(
                        dayjs(projects.end_date).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No EndDate</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Client</p>

            <p>{projects?.client?.name ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>organization</p>

            <p>{projects?.organization?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Tasks Project</p>
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
                    {projects.tasks_project &&
                      Array.isArray(projects.tasks_project) &&
                      projects.tasks_project.map((item: any) => (
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
              {!projects?.tasks_project?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/projects/projects-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

ProjectsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_PROJECTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default ProjectsView;
