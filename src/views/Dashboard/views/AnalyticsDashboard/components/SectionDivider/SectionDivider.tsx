import Divider from '@material-ui/core/Divider';

import { useStyles } from './SectionDivider.styles';

interface SectionDividerProps {
  title: string;
}

export const SectionDivider = ({
  title
}: SectionDividerProps) => {
  const classes = useStyles();

  return (
    <div className={classes.dividerContainer}>
      <Divider className={classes.dividerLeftUnit}/>
      <div className={classes.dividerText}>{title}</div>
      <Divider className={classes.dividerRightUnit}/>
    </div>
  );
};
