import Grid from '@material-ui/core/Grid';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { Fragment, useState } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import { Input } from '../Input';
import startCase from 'lodash/startCase';
import useStyles from './DashboardSettings.styles';
import { OrganizationSettings } from 'hooks/fetch/useOrganizationSettings';

type Props = {
  setLogo: React.Dispatch<React.SetStateAction<File | undefined>>;
  defaultLogoUrl: string;
};

const contextHierarchyLabels: {
  key: keyof OrganizationSettings;
  order: string;
}[] = [
    { key: 'portfolioDisplayName', order: 'First' },
    { key: 'initiativeDisplayName', order: 'Second' },
    { key: 'teamDisplayName', order: 'Third' },
  ];

const DashboardSettings = ({ setLogo, defaultLogoUrl }: Props) => {
  const classes = useStyles();

  const [previewImage, setPreviewImage] = useState(defaultLogoUrl ?? '');

  const handleUploadClick = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setLogo(file);
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <InputLabel>Context Hierarchy Labels</InputLabel>
      </Grid>
      {contextHierarchyLabels.map(({ key, order }) => (
        <Fragment key={key}>
          <Grid item xs={4}>
            <Grid container justifyContent="flex-start">
              <Typography>{order} Level *</Typography>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Input<OrganizationSettings>
              fullWidth
              required
              name={key}
              defaultValue={startCase(key.replace('DisplayName', ''))}
            />
          </Grid>
        </Fragment>
      ))}
      <Grid item xs={6} >
        <Grid container justifyContent="flex-start" alignItems="stretch">
          {/* 28px here to vertically center the label relative to the add logo icon  */}
          <Typography style={{ paddingTop: '28px' }}>Logo:</Typography>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleUploadClick}
          />
          <label htmlFor="contained-button-file">
            <Fab component="span" className={classes.button}>
              <AddPhotoAlternateIcon />
            </Fab>
          </label>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <CardContent>
          <Grid container justifyContent="flex-start" alignItems="flex-start">
            {previewImage && (
              <div className={classes.image}>
                <img className={classes.img} src={previewImage} alt="" />
              </div>
            )}
          </Grid>
        </CardContent>
      </Grid>
    </Grid>
  );
};

export default DashboardSettings;
