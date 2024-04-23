import { useState } from 'react';

import { OrganizationSettings } from 'hooks/fetch/useOrganizationSettings';
import { useFormContext } from 'react-hook-form';

import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';

import Dropdown, { SelectOptions } from '../../Dropdown';
import { Input } from './Input';

type Props = {
  defaultPortfolioNumberOfDays: string;
  defaultIndividualContributorNumberOfDays: string;
  defaultTeamNumberOfDays: string;
};

const WorkItemSettings = ({
  defaultPortfolioNumberOfDays,
  defaultIndividualContributorNumberOfDays,
  defaultTeamNumberOfDays,
}: Props) => {
  const { setValue } = useFormContext<OrganizationSettings>();

  const [numberOfDaysPortfolioLevel, setNumberOfDaysPortfolioLevel] = useState(defaultPortfolioNumberOfDays);
  const [numberOfDaysIndividualContributorLevel, setNumberOfDaysIndividualContributorLevel] = useState(defaultIndividualContributorNumberOfDays);
  const [numberOfDaysTeamLevel, setNumberOfDaysTeamLevel] = useState(defaultTeamNumberOfDays);

  const rollingWindowOptionsArray: Array<SelectOptions> = [
    { key: '7', value: '7' },
    { key: '14', value: '14' },
    { key: '30', value: '30' },
    { key: '60', value: '60' },
    { key: '90', value: '90' },
  ];

  const handleNumberChangePortfolioLevel = (event) => {
    let positiveNumber = event.target.value
      ? event.target.value.replace('-', '')
      : event.target.value;
    if (event.target.value === '-1') positiveNumber = '0';

    setNumberOfDaysPortfolioLevel(positiveNumber);
    setValue('staledItemPortfolioLevelNumberOfDays', positiveNumber);
  };

  const handleNumberChangeIndividualContributorLevel = (event) => {
    let positiveNumber = event.target.value
      ? event.target.value.replace('-', '')
      : event.target.value;
    if (event.target.value === '-1') positiveNumber = '0';

    setNumberOfDaysIndividualContributorLevel(positiveNumber);
    setValue('staledItemIndividualContributorNumberOfDays', positiveNumber);
  };

  const handleNumberChangeTeamLevel = (event) => {
    let positiveNumber = event.target.value
      ? event.target.value.replace('-', '')
      : event.target.value;
    if (event.target.value === '-1') positiveNumber = '0';

    setNumberOfDaysTeamLevel(positiveNumber);
    setValue('staledItemTeamLevelNumberOfDays', positiveNumber);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <InputLabel>Rolling Window *</InputLabel>
        <Dropdown
          fullWidth
          required
          name="rollingWindowPeriodInDays"
          label="Rolling Window"
          defaultValue="30"
          itemsList={rollingWindowOptionsArray}
        />
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Portfolio Staled Item (Number of Days) *</InputLabel>
        <Input<OrganizationSettings>
          fullWidth
          required
          type="number"
          name="staledItemPortfolioLevelNumberOfDays"
          defaultValue="30"
          onChange={handleNumberChangePortfolioLevel}
          value={numberOfDaysPortfolioLevel}
        />
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Team Staled Item (Number of Days) *</InputLabel>
        <Input<OrganizationSettings>
          fullWidth
          required
          type="number"
          name="staledItemTeamLevelNumberOfDays"
          defaultValue="3"
          onChange={handleNumberChangeTeamLevel}
          value={numberOfDaysTeamLevel}
        />
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Individual Contributor Staled Item (Number of Days) *</InputLabel>
        <Input<OrganizationSettings>
          fullWidth
          required
          type="number"
          name="staledItemIndividualContributorNumberOfDays"
          defaultValue="7"
          onChange={handleNumberChangeIndividualContributorLevel}
          value={numberOfDaysIndividualContributorLevel}
        />
      </Grid>
    </Grid>
  );
};

export default WorkItemSettings;
