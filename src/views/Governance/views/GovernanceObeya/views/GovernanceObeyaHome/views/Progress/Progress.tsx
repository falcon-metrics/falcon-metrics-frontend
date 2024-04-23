import { useEffect, useState, useMemo } from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import debounce from 'lodash/debounce';
import partition from 'lodash/partition';
import { ProgressBars } from './ProgressBars';
import Legends from './Legends';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useController, useForm } from 'react-hook-form';
import ZeroState from 'components/ZeroState';
import ObeyaTabs from '../../components/ObeyaTabs';
import { TABS } from './';
import { BoardItem } from 'hooks/fetch/useProgress';
import { ObeyaColors } from 'views/Governance/utils/constants';
import DashboardCard from 'components/Charts/components/DashboardCard/DashboardCard';
import { ChartSizes } from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1,
    },
    wrapperIndicators: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      height: 25,
    },
    wrapperSearch: {
      marginRight: 14,
      marginTop: 8,
      height: 35,
    },
  }),
);

export type FormValues = {
  search: string;
};

const defaultValues: FormValues = {
  search: '',
};

interface Props {
  modalOpen?: boolean;
  boards?: BoardItem[];
  onChangeTab: (boardType) => void;
  activeTab: TABS;
  loading?: boolean;
}

const Progress = ({
  boards = [],
  onChangeTab,
  activeTab,
  loading,
}: Props) => {
  const classes = useStyles();
  const [resultSearch, setResultSearch] = useState<Array<BoardItem>>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { control, getValues } = useForm({ defaultValues });

  const boardKey = activeTab === TABS.PROGRESS ? 'boardName' : 'assignedTo';
  const sarchPlacedholderText =
    activeTab === TABS.PROGRESS ? 'Search by boards' : 'Search by individuals';

  const tabConfig = useMemo(
    () => [
      {
        value: TABS.PROGRESS,
        label: 'Boards',
        selected: true,
      },
      {
        value: TABS.PEOPLE,
        label: 'Individuals',
        selected: false,
      },
    ],
    [],
  );

  useEffect(() => {
    setResultSearch(boards);
  }, [boards]);

  const searchValue = () => {
    const formData: FormValues = getValues() ?? { search: '' };

    if (!formData?.search?.toLowerCase()) {
      setResultSearch(boards);
    }

    const [itemsWithStart, notFound] = partition(boards, (item) => {
      return item[boardKey]
        .toLowerCase()
        .startsWith(formData.search.toLowerCase());
    });

    const itemsThatIncludes = notFound.filter((item) => {
      return item[boardKey]
        .toLowerCase()
        .includes(formData.search.toLowerCase());
    });

    const searchItems = [...itemsWithStart, ...itemsThatIncludes];
    setResultSearch(searchItems);
  };

  const onSearch = debounce(searchValue, 600);

  return (

    <Box display="flex" flexDirection="column" flexGrow={1}>
      <DashboardCard title={''} size={ChartSizes.full} fullScreen={true} useModalOpenProps={true} isModalOpenProps={isModalOpen} setIsModalOpenProps={setIsModalOpen}>

        <Box className="widget-title">

          <Box
            className={classes.wrapperIndicators}
            display="flex"
            justifyContent="flex-end"
          >
            <Legends title="Completed" color={ObeyaColors.COMPLETED} />
            <Legends title="In Progress" color={ObeyaColors.IN_PROGRESS} />
            <Legends title="Not Started" color={ObeyaColors.NOT_STARTED} />
          </Box>
          {/* {!modalOpen && (
            <FluentUIModal widgetType={Progress} widgetProps={props} /> // TODO: We stopped using FluentUIModal. use BaseModal
          )} */}
        </Box>
        <Box>
          <Grid container alignItems="flex-start" justifyContent="flex-start">
            <Grid item xs={6}>
              <Box ml={2}>
                <ObeyaTabs
                  activeTab={activeTab}
                  onChangeTab={onChangeTab}
                  tabs={tabConfig}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                className={`${classes.wrapperIndicators} ${classes.wrapperSearch}`}
              >
                <form name="searchIteration" autoComplete="off" noValidate>
                  <Input
                    fullWidth
                    required
                    name="search"
                    control={control}
                    inputProps={{ maxLength: 250 }}
                    style={{ width: 340 }}
                    placeholder={sarchPlacedholderText}
                    afterChange={onSearch}
                    InputProps={{
                      endAdornment: <SearchIcon />,
                      style: { fontFamily: 'Open Sans' },
                    }}
                  />
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {!resultSearch?.length && !loading ? (
          <ZeroState message="No matches founds for your search" />
        ) : (
          <ProgressBars
            boards={resultSearch || []}
            activeTab={activeTab}
            loading={loading}
            boardKey={boardKey}
            isModalOpen={isModalOpen}
          />
        )}
      </DashboardCard>
    </Box>
  );
};

export const Input = ({
  name,
  afterChange,
  control,
  errors,
  style,
  ...props
}: any) => {
  const {
    field: { ref, ...inputProps },
  } = useController({ name, control });
  return (
    <TextField
      style={{ margin: 8, ...style }}
      {...props}
      {...inputProps}
      margin="normal"
      onChange={(e) => {
        inputProps.onChange(e);
        afterChange?.(e);
      }}
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      inputRef={ref}
      error={errors?.[name]}
      helperText={errors?.[name] && errors?.[name].message}
    />
  );
};

export default Progress;
