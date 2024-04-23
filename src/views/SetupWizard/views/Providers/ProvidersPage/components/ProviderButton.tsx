import { createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Providers from '../../../../interfaces/Providers';
import { useHistory } from 'react-router-dom';
import { useWizardContext } from 'views/SetupWizard/contexts/useWizardContext';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      cursor: 'pointer',
    },
  }),
);

export interface Props {
  imageSrc: string;
  displayName: string;
  provider: Providers;
}

function ProviderButton({ imageSrc, displayName, provider }: Props) {
  const classes = useStyles();
  const history = useHistory();
  const { generateWizardPath, nextStep } = useWizardContext();
  const path = generateWizardPath({ provider, step: nextStep });

  return (
    <Grid item xs={6}>
      <Paper className={classes.paper} onClick={() => history.push(path)}>
        <img width="48" height="48" src={imageSrc} alt={displayName} />
        <Typography>{displayName}</Typography>
      </Paper>
    </Grid>
  );
}

export default ProviderButton;
