import { Tooltip } from '@material-ui/core';
import { useStyles } from './styles';
import ErrorIcon from '@material-ui/icons/Error';
import { ReactNode } from 'react';
import useAuthentication from 'hooks/useAuthentication';
import { OBEYA_ROLES_ALLOW_ACCESS } from 'utils/routes';

export type Props = {
    children: ReactNode;
    text: string;
};
   
const ButtonTooltip = ({
    children,
    text
  }: Props) => {
    const classes = useStyles();
    const { isInRole } = useAuthentication();

    return (
        (isInRole(...OBEYA_ROLES_ALLOW_ACCESS)) ? 

        <span>
            { children }
        </span> :

        <Tooltip
            classes={{ tooltip: classes.tooltip }}
            title={
            <div>
                <span className={classes.header}>
                    <ErrorIcon className={classes.icon} />
                    <span className={classes.text}>You have restricted access</span>
                </span>
                <span className={classes.body}>
                    <span className={classes.text}>
                        Please contact your Falcon Metrics admin or User admin to {text}
                    </span>
                </span>
            </div>
            }>
            <span>
                { children }
            </span>
        </Tooltip>
      );

};

export default ButtonTooltip;
