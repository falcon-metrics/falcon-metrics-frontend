import { createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { Controller } from 'react-hook-form';
import { Fragment } from 'react';
import { OrganizationSettings } from 'hooks/fetch/useOrganizationSettings';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    labelGrid: {
      display: 'flex',
      alignItems: 'left',
    },
    caption: {
      // Using Roboto here because thats the font of InputLabel
      fontFamily: 'Roboto',
      width: '250px',
      alignItems: 'left',
      textAlign: 'left',
      justifyContent: 'left',
      paddingTop: '10px'
    }
  }),
);

type InputConfig = {
  label: string;
  name: keyof OrganizationSettings;
  description: string;
};

const inputs: InputConfig[] = [
  {
    label: 'Exclude Weekends',
    name: 'excludeWeekends',
    description: 'Exclude weekends (Saturdays and Sundays) from the calculation of Lead Time, Work In Progress (WIP) Age and Inventory Age'
  },
];

function ItemAgeSettings() {
  const classes = useStyles();

  return (
    <Grid container direction="row" spacing={4}>
      {inputs.map(({ label, name, description }) => (
        <Fragment key={name}>
          <Grid item xs={5} className={classes.labelGrid} direction='column'>
            <Box>
              <InputLabel>{label}</InputLabel>
            </Box>

            <Box className={classes.caption}>
              <Typography variant="caption" display="block" gutterBottom>
                {description}
              </Typography>
            </Box>
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

export default ItemAgeSettings;
