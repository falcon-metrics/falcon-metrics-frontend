import Paper from '@material-ui/core/Paper';
import useStyles from './DoesNotSupportResolution.styles';

const DoesNotSupportResolution = () => {
  const classes = useStyles();
  return (
    <div className="does-not-support-mobile">
      <Paper elevation={1} classes={classes} className="does-not-support-card">
        <div className="does-not-support-card-container">
          {/* Insert your logo here */}
          <div>
            Falcon Metrics currently does not support resolutions smaller than 992px.
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default DoesNotSupportResolution;
