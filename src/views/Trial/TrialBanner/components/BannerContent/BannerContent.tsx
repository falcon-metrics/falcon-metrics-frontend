import { useState, ComponentType } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Props as BannerProps } from '../../../TrialModal';
import { Props as LockProps } from 'components/LockTrialModal';
import useStyles from './BannerContent.styles';

const BannerContent = ({
  BannerComponent,
  LockComponent,
  buttonText,
  blockAccess,
  text,
}: {
  BannerComponent: ComponentType<BannerProps>;
  LockComponent: ComponentType<LockProps>;
  text?: string;
  buttonText?: string;
  blockAccess?: boolean;
}) => {
  const classes = useStyles();
  const [modalIsVisible, setModalIsVisible] = useState(!!blockAccess);

  const hideModal = () => setModalIsVisible(false);
  const showModal = () => setModalIsVisible(true);

  return (
    <Grid container>
      {blockAccess ? (
        <LockComponent hideModal={hideModal} modalIsOpen={modalIsVisible} />
      ) : (
        <>
          <BannerComponent hideModal={hideModal} modalIsOpen={modalIsVisible} />
          <Grid item xs={12}>
            <Paper className={classes.container}>
              <Typography
                variant="body1"
                align="center"
                className={classes.banner}
              >
                {text}
                {'  '}
                <Button
                  className={classes.contactUs}
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={showModal}
                  onKeyPress={hideModal}
                >
                  {buttonText}
                </Button>
              </Typography>
            </Paper>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default BannerContent;
