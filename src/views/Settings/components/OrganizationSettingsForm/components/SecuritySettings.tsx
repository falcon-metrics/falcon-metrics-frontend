import { createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { Controller } from 'react-hook-form';
import { Fragment } from 'react';
import { OrganizationSettings } from 'hooks/fetch/useOrganizationSettings';

const useStyles = makeStyles(() =>
  createStyles({
    labelGrid: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
);

type InputConfig = {
  label: string;
  name: keyof OrganizationSettings;
};

const inputs: InputConfig[] = [
  { label: 'Show assignee names on widgets', name: 'ingestAssignee' },
  { label: 'Show work item summary on widgets', name: 'ingestTitle' },
];

function SecuritySettings() {
  const classes = useStyles();

  return (
    <Grid container direction="row" spacing={4}>
      {inputs.map(({ label, name }) => (
        <Fragment key={name}>
          <Grid item xs={5} className={classes.labelGrid}>
            <InputLabel>{label}</InputLabel>
          </Grid>
          <Grid item xs={6}>
            <Controller
              name={name}
              render={({ field }) => (
                <Switch
                  color="primary"
                  {...field}
                  checked={field.value ?? false}
                />
              )}
            />
          </Grid>
        </Fragment>
      ))}
    </Grid>
  );
}

export default SecuritySettings;
