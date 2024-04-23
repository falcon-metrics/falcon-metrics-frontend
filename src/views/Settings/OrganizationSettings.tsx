import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import Container from 'components/PageContainer/PageContainer';
import PageHeader from 'components/PageHeader/PageHeader';
import { ApiQueryParameters } from 'core/api/ApiClient/ApiClient';
import { useSendTelemetry } from 'core/api/CustomerTelemetryClient';
import { defaultFetcher } from 'core/api/fetch';
import useAuthentication from 'hooks/useAuthentication';
import merge from 'lodash/merge';
import { DateTime } from 'luxon';
import {
  Path,
  useController,
  useFormContext,
} from 'react-hook-form';
import { useHistory } from 'react-router';
import useSWRImmutable from 'swr/immutable';
import { fromUtcToLocalTimezone } from 'utils/dateTime';
import {
  FilterPanelProvider,
} from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext';
import {
  getAppliedFilters,
  getPanelParams,
} from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';
import TabView from 'views/ValueStreamManagement/components/TabView';

import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import useStyles from './OrganizationSettings.styles';
import OrganizationSettingsForm from './components/OrganizationSettingsForm';
import PerformanceCheckPoints from './components/PerformanceCheckPoints';
import { UserManagement, GroupManagement } from './components/UserManagement';

import { styled } from '@material-ui/core/styles';
import { UserGuideContent, UserGuideKey } from 'components/UserGuide/UserGuideContent';
import { getTimezone } from 'utils/utils';

export const organizationSettingsFormId = 'organization-settings-form';

type InputProps<T> = {
  name: Path<T>;
  defaultValue: any;
} & Omit<TextFieldProps, 'name'>;

type Response = {
  startDate: string;
  finishDate: string;
};

const PageContainer = styled(Box)({
  '& > .organisation-settings > section': {
    width: '121%',
  },
});

export function Input<T>({ name, defaultValue, ...props }: InputProps<T>) {
  const { control } = useFormContext<any>();
  const {
    field: { ref, ...inputProps },
    fieldState: { error, invalid },
    // Adding control as any to fix a type error
  } = useController({ name, defaultValue, control: control as any });

  return (
    <TextField
      {...inputProps}
      inputRef={ref}
      error={invalid}
      helperText={invalid && error}
      {...props}
    />
  );
}

const OrganizationSettings = () => {
  const { isAdmin } = useAuthentication();
  const [currentTab, setTabView] = useState<number>(0);
  const [hideTab, setHideTab] = useState<boolean>(false);
  const classes = useStyles();
  const sendTelemetry = useSendTelemetry();
  const [formState, setFormState] = useState({
    isDirty: false,
    isSubmitting: false,
  });
  const { isDirty, isSubmitting } = formState;

  useEffect(() => {
    if (!isAdmin) {
      setHideTab(true);
    }
  }, [isAdmin]);

  useEffect(() => {
    sendTelemetry(
      'AccessedOrganizationSettings',
      'User accessed organization settings',
      { page: 'org-settings' }
    );
  }, [sendTelemetry]);

  const history = useHistory();

  const initialFilters = useMemo(
    () => getPanelParams(getAppliedFilters(history.location.search)),
    [history],
  );

  const params = new URLSearchParams({
    timezone: initialFilters.timezone || getTimezone(),
  });
  const rollingWindowUrl = `/rolling-window?${params.toString()}`;

  const { data } = useSWRImmutable<Response>(rollingWindowUrl, defaultFetcher, {
    suspense: true,
  });

  if (!data) {
    return null;
  }

  const { startDate, finishDate } = data;
  const dates = [startDate, finishDate]
    .map(fromUtcToLocalTimezone)
    .map((d) => DateTime.fromISO(d).toJSDate());

  const defaultInitialDates: Partial<ApiQueryParameters> = {
    departureDateLowerBoundary: dates[0],
    departureDateUpperBoundary: dates[1],
  };

  // const tabViewTitles = hideTab
  //   ? ['General']
  //   : (
  //     isAlphaUser
  //       ? ['General', 'Performance Checkpoints', 'Users', 'Groups']
  //       : ['General', 'Performance Checkpoints']
  //   );
  const tabViewTitles = hideTab
  ? ['General']
  : ['General', 'Performance Checkpoints', 'Users', 'Groups'];

  return (
    <PageContainer>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <PageHeader shouldRequestConfirmation={isDirty} />
      <Container
        title={UserGuideContent[UserGuideKey.ORGANISATION_SETTINGS].title}
        userGuideId={UserGuideKey.ORGANISATION_SETTINGS}
        formContainerProps={{
          ...formState,
          formId: organizationSettingsFormId,
          previousPath: '/',
          shouldHideNextButton: true,
          shouldShowNavigationButtons: currentTab === 0,
        }}
      >
        <FilterPanelProvider
          initialStateProp={{
            defaultRollingWindowDates: defaultInitialDates,
            selectedFilters: merge(defaultInitialDates, initialFilters),
          }}
        >
          <TabView
            tabTitles={tabViewTitles}
            tabContents={[
              OrganizationSettingsForm,
              PerformanceCheckPoints,
              UserManagement,
              GroupManagement
            ]}
            customProps={{
              setFormStateOnParent: setFormState,
            }}
            watchActiveTab={(activeTab: number) => {
              setTabView(activeTab);
            }}
          />
        </FilterPanelProvider>
      </Container>
    </PageContainer>
  );
};

export default OrganizationSettings;
