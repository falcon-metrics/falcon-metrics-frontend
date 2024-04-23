import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import useAuthentication from 'hooks/useAuthentication';
import { OBEYA_ROLES_ALLOW_ACCESS } from 'utils/routes';
import ButtonTooltip from '../../../components/Tooltip/ButtonTooltip';

import styles from './styles';

type Props = {
  hideModal: () => void;
  isSubmitting?: boolean;
  errors?: any;
  isDirty?: boolean;
};

const FormButtons = ({ hideModal, isSubmitting, errors, isDirty }: Props) => {
  const classes = styles();
  const { isInRole } = useAuthentication();
  const allowObeyaAccess = isInRole(...OBEYA_ROLES_ALLOW_ACCESS);

  return (
    <Grid item>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          padding: '10px'
        }}
        pt={3}
      >
        { allowObeyaAccess ?
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            className={classes.saveButton}
            startIcon={
              isSubmitting && <HourglassEmptyIcon />
            }
            disabled={
              !!(
                errors && Object.keys(errors)?.length ||
                isSubmitting ||
                !isDirty
              )
            }
          >
            Save
          </Button> :
          <ButtonTooltip text="save">
            <span>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                className={classes.saveButton}
                startIcon={
                  isSubmitting && <HourglassEmptyIcon />
                }
                disabled={!allowObeyaAccess}
              >
                Save
              </Button>
            </span>
          </ButtonTooltip>
        }
        <Button
          size="large"
          variant="contained"
          color="secondary"
          onClick={hideModal}
        >
          Cancel
        </Button>
      </Box>
    </Grid>
  );
};

export default FormButtons;
