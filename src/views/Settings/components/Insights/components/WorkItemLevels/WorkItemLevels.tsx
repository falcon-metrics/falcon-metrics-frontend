import {
  useEffect,
  useState,
} from 'react';

import { Checkbox } from '@fluentui/react';

import useStyles from './workItemLevels.styles';

const workItemLevels: string[] = [
  'Portfolio',
  'Team',
  'Individual Contributor',
];

type Props = {
  onAfterChange: (checkedItems: string[]) => void;
  defaultChecked: string[],
};

export const WorkItemLevels = ({ onAfterChange, defaultChecked }: Props) => {
  const [portfolioValue, setPortfolio] = useState<boolean>(false);
  const [teamValue, setTeam] = useState<boolean>(false);
  const [individualContributorValue, setIndividualContributor] = useState<boolean>(false);
  const classes = useStyles();

  useEffect(() => {
    const defaultPortfolioValue = defaultChecked.includes(workItemLevels[0]);
    setPortfolio(!!defaultPortfolioValue);
  
    const defaultTeamValue = defaultChecked.includes(workItemLevels[1]);
    setTeam(!!defaultTeamValue);
    
    const defaultIndividualContributor = defaultChecked.includes(workItemLevels[2]);
    setIndividualContributor(!!defaultIndividualContributor);
  }, [defaultChecked]);

  useEffect(() => {
    const checkedItems: string[] = [];
    [portfolioValue, teamValue, individualContributorValue].forEach((currentCheckbox: boolean, index: number) => {
      if (currentCheckbox) {
        checkedItems.push(workItemLevels[index]);
      }
    });
    onAfterChange?.(checkedItems);

  }, [portfolioValue, teamValue, individualContributorValue]);

  const handleChange = (setterFunction) => (event) => {
    const value = event.target.checked;
    setterFunction(value);
  };

  return (
    <>
      <Checkbox
        className={classes.checkbox}
        label="Portfolio"
        onChange={handleChange(setPortfolio)}
        checked={portfolioValue}
      />
      <Checkbox
        className={classes.checkbox}
        label="Team"
        onChange={handleChange(setTeam)}
        checked={teamValue}
      />
      <Checkbox
        className={classes.checkbox}
        label="IndividualContributor"
        onChange={handleChange(setIndividualContributor)}
        checked={individualContributorValue}
      />
    </>
  );
};
