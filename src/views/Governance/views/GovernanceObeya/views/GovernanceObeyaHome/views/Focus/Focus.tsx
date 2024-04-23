import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { defaultHorizontalBarConfig } from 'views/Governance/views/GovernanceObeya/utils';
import HorizontalBar from './HorizontalBar';
import DashboardCard from 'components/Charts/components/DashboardCard/DashboardCard';
import { ChartSizes } from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';
import { Checkbox, Typography } from '@material-ui/core';
import Legends from './Legends';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { debounce, partition } from 'lodash';
import { Input } from '../Progress/Progress';
import SearchIcon from '@material-ui/icons/Search';
import ZeroState from 'components/ZeroState';
import NoDataPanel from 'views/ValueStreamManagement/components/NoDataPanel';
import { FocusData, FormValues, defaultValues } from './interfaces';
import { useStyles } from './styles';

type Props = {
  focus: FocusData[];
  isLoadingObeyaData: boolean;
}

type ProgressBarsProps = {
  boards: any;
  isIncludeProposed: boolean;
};

const ProgressBars = ({ boards, isIncludeProposed }: ProgressBarsProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.boardContainer}>
      {boards.map((board, index) => {

        const totalItems = isIncludeProposed ? board?.totalWipItems + board?.totalProposedItems : board?.totalWipItems;
        const itemCount = isIncludeProposed ? board?.obeyaWipItems + board?.obeyaProposedItems : board?.obeyaWipItems;

        return (
          <Box key={index}>
            <Grid container className={classes.progressBarContainer}>
              <Grid item xs={10}>
                <Typography className={classes.boardName}>{board.boardName}</Typography>
                <HorizontalBar
                  itemCount={itemCount}
                  totalItems={totalItems}
                  customProps={{
                    ...defaultHorizontalBarConfig,
                    plot: {
                      valueBox: {
                        ...defaultHorizontalBarConfig.plot.valueBox,
                        text: '%npv% ',
                        fontSize: 12,
                        decimals: 0,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={2} className={classes.completedTextContainer}>
                <Box justifyContent="center" display="flex">
                  <span className={classes.completedText}>
                    {`${itemCount}`}
                  </span>
                  {` /${totalItems}`}
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </Box>
  )
}

export const Focus = ({ focus }: Props) => {
  const classes = useStyles();
  const [result, setResult] = useState<Array<{ boardName: string; }>>([]);
  const { control, getValues } = useForm({ defaultValues });
  const [includeProposed, setIncludeProposed] = useState(false);

  useEffect(() => {
    setResult(focus);
  }, [focus]);

  const searchValue = () => {
    const formData: FormValues = getValues() ?? { search: '' };

    if (!formData?.search?.toLowerCase()) {
      setResult(focus);
    }

    const [itemsWithStart, notFound] = partition(focus, (item) => {
      return item.boardName
        .toLowerCase()
        .startsWith(formData.search.toLowerCase());
    });

    const itemsThatIncludes = notFound.filter((item) => {
      return item.boardName
        .toLowerCase()
        .includes(formData.search.toLowerCase());
    });

    const searchItems = [...itemsWithStart, ...itemsThatIncludes];
    setResult(searchItems);
  };

  const onSearch = debounce(searchValue, 600);

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <DashboardCard title={''} size={ChartSizes.full} fullScreen={true} useModalOpenProps={true}>
        {focus.length > 0 ?
          (
            <div>
              <Legends />
              <Box
                className={`${classes.wrapperIndicators} ${classes.wrapperSearch}`}
              >
                <div style={{ marginLeft: 25 }}>
                  <Checkbox
                    checked={includeProposed}
                    onChange={(e) => setIncludeProposed(e.target.checked)}
                    color="primary"
                  /> Include Proposed Items</div>
                <form name="searchIteration" autoComplete="off" noValidate>
                  <Input
                    fullWidth
                    required
                    name="search"
                    control={control}
                    inputProps={{ maxLength: 250 }}
                    style={{ width: 340 }}
                    placeholder={"Search by boards"}
                    afterChange={onSearch}
                    InputProps={{
                      endAdornment: <SearchIcon />,
                      style: { fontFamily: 'Open Sans' },
                    }}
                  />
                </form>
              </Box>
              {!result?.length ? (
                <ZeroState message="No matches founds for your search" />
              ) : (
                <ProgressBars boards={result || []} isIncludeProposed={includeProposed} />
              )}
            </div>
          ) :
          <div style={{ paddingTop: 60 }}><NoDataPanel /></div>
        }
      </DashboardCard>
    </Box>
  );
};

export default Focus;
