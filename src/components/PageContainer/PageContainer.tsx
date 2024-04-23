import { ReactNode } from 'react';

import FormContainer, {
  FormContainerProps,
} from 'views/SetupWizard/components/FormContainer';
import { useWizardContext } from 'views/SetupWizard/contexts/useWizardContext';

import MuiContainer, { ContainerProps } from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import useStyles from './PageContainer.styles';
import UserGuide from 'components/UserGuide';
import FQLAuxiliaryTable from 'components/FQLAuxiliaryTable';

type Props = ContainerProps & {
  children: ReactNode;
  title?: string;
  userGuide?: React.ReactNode;
  isCustomDescription?: boolean;
  formContainerProps?: Omit<FormContainerProps, 'children'>;
  customClass?: string;
  userGuideId?: string;
  showFqlGuide?: boolean;
};

const Container = ({
  title,
  children,
  formContainerProps,
  customClass,
  userGuide,
  ...props
}: Props) => {
  const classes = useStyles();
  return (
    <MuiContainer
      component="main"
      maxWidth="lg"
      className={`${customClass} ${classes.main}`}
      {...props}
    >
      {/* <Box mt={2}> */}
        {title && (
          <Typography
            paragraph
            variant="h1"
            align="center"
            className={classes.title}
          >
            {title}
          </Typography>
        )}
      {/* </Box> */}

      {props.userGuideId &&
        <UserGuide id={props.userGuideId ?? ""} />
      }

      <Paper component="section" className={classes.section}>
        {!formContainerProps ? (
          children
        ) : (
          <FormContainer {...formContainerProps}>{children}</FormContainer>
        )}
      </Paper>

      {props.showFqlGuide && <FQLAuxiliaryTable />}

      {userGuide}
    </MuiContainer>
  );
};

const ContainerWizard = (props: Omit<Props, 'formContainerProps'>) => {
  const {
    stepFormId: formId,
    redirectOnSave,
    ...wizardData
  } = useWizardContext();
  const formContainerProps = {
    formId,
    shouldHideNextButton: redirectOnSave,
    ...wizardData,
  };

  return <Container {...props} formContainerProps={formContainerProps} />;
};

Container.Wizard = ContainerWizard;

export default Container;
