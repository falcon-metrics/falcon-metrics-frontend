import ZingChart from 'zingchart-react';
import { Box, Typography } from '@material-ui/core';

type Props = {
    series: any[];
    label?: string;
    countItems: string;
    graphLabel?: string;
};

export const CircularProgress = ({
    series,
    label = '',
    countItems,
    graphLabel
}: Props) => {
    const config = setupConfig(
        series,
        countItems,
        label,
    );
    console.log(graphLabel);
    console.log(config);
    return (
        <Box style={{ width: '20%', backgroundColor: '#FEFEFE', borderRadius: 16, padding: 10 }}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography style={{ color: '#2B353B', fontSize: 16 }}>{graphLabel}</Typography>
            </Box>
            <ZingChart data={config} width={'100%'} height={220} />
        </Box>
    );
};

const setupConfig = (
    series: any[],
    countItems?: string | number,
    label?: string,
) => {
    const returnValue = {
        offsetY: 0,
        height: 220,
        type: 'ring',
        globals: {
            fontFamily: 'Open Sans',
            fontWeight: '100',
        },
        gui: {
            contextMenu: {
                button: {
                    visible: false,
                },
            },
        },
        plot: {
            backgroundColor: '#41B6E6',
            fontSize: '14px',
            slice: '80%',
            refAngle: 270,
            valueBox: [
                {
                    text: countItems ? countItems : '',
                    fontSize: '28px',
                    fontFamily: 'Open Sans',
                    color: '#787470',
                    placement: 'center',
                    offsetY: '-1300%',
                }
            ],
            tooltip: {
                visible: false,
            },
            detach: false,
            hoverState: {
                visible: false,
            },
        },
        series,
    };

    if (label && countItems) {
        returnValue.plot.valueBox = [
            {
                text: countItems ? countItems : '',
                fontSize: '28px',
                fontFamily: 'Open Sans',
                color: '#787470',
                placement: 'center',
                offsetY: '-1300%',
            },
            {
                text: label ? label : '',
                fontSize: '12px',
                fontFamily: 'Open Sans',
                color: '#787470',
                placement: 'center',
                offsetY: '1700%',
            },
        ];
    }

    return returnValue;
};
