import { Typography, Box, makeStyles, createStyles } from '@material-ui/core';
import BaseAccordion from 'views/ValueStreamManagement/views/DeliveryManagement/components/BaseAccordion';
import { UserGuideContent } from './UserGuideContent';

type Props = {
    id: string;
}

export const useStyles = makeStyles(() =>
    createStyles({
        accordionTitle: {
            fontSize: '16px',
            fontFamily: 'Open Sans',
            fontWeight: 600,
            fontStyle: 'normal',
            color: 'rgba(0, 0, 0, 0.7)',
        },
        accordionDetails: {
            backgroundColor: '#fbfbfb',
            fontSize: '12px',
            fontFamily: 'Open Sans',
            padding: '10px 35px',
            textAlign: 'justify'
        },
        accordionSummary: {
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25);'
        }
    })
);


const UserGuide = ({ id }: Props) => {
    const classes = useStyles();

    const renderContent = () => {
        return (
            <Typography
                className={classes.accordionDetails}>
                {UserGuideContent[id].content ?? ''}
            </Typography>
        )
    }

    return (
        <Box mb={2}>
            <BaseAccordion title="Instruction Guide" customStyle={classes}>
                <Box display="flex" flexDirection="column">
                    {renderContent()}
                </Box>
            </BaseAccordion>
        </Box>
    );
};

export default UserGuide;
