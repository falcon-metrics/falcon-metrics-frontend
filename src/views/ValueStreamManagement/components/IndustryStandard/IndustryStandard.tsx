import { createSvgIcon, Tooltip } from "@material-ui/core";
import { CloseOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import { useStyles } from '../ExtendedTooltip/styles';
const QueryStatsIcon = createSvgIcon(
    <path xmlns="http://www.w3.org/2000/svg" d="M19.88 18.47C20.32 17.77 20.58 16.96 20.58 16.08C20.58 13.59 18.57 11.58 16.08 11.58C13.59 11.58 11.58 13.59 11.58 16.08C11.58 18.57 13.59 20.58 16.07 20.58C16.95 20.58 17.77 20.32 18.46 19.88L21.58 23L23 21.58L19.88 18.47ZM16.08 18.58C14.7 18.58 13.58 17.46 13.58 16.08C13.58 14.7 14.7 13.58 16.08 13.58C17.46 13.58 18.58 14.7 18.58 16.08C18.58 17.46 17.46 18.58 16.08 18.58ZM15.72 10.08C14.98 10.1 14.27 10.26 13.62 10.53L13.07 9.7L9.27 15.88L6.26 12.36L2.63 18.17L1 17L6 9L9 12.5L13 6L15.72 10.08ZM18.31 10.58C17.67 10.3 16.98 10.13 16.26 10.09L21.38 2L23 3.18L18.31 10.58Z" />, 'Query Stats');
const useStylesIcon = makeStyles(() => ({
    // icon wrapper
    sm: {
        right: 50,
        display: 'flex',
        position: 'absolute',
        bottom: 10,
    },
    removeMargin: {
        marginLeft: '0px !important'
    },
    defaultColor: {
        color: "#555D62"
    }
}));
type Props = {
    content: string;
};
export const IndustryStandard = ({ content }: Props) => {
    const classes = useStylesIcon();
    const toolTipClasses = useStyles();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleTooltip = () => {
        setIsOpen(!isOpen);
        setTimeout(function () { setIsOpen(false); }, 20000);
    };
    const toggleClose = () => {
        setIsOpen(false);
    };
    return (
        <div className={classes.sm}>
            <Tooltip
                interactive={true}
                open={isOpen}
                placement="right"
                classes={{ tooltip: toolTipClasses.tooltip, popper: toolTipClasses.popper }}
                title={
                    <div className={toolTipClasses.tooltipWrapper}>
                        <div className={toolTipClasses.tooltipHeader}>
                            <span className={toolTipClasses.widgetName + ' ' + classes.removeMargin}>
                                Industry Benchmark
                            </span>
                            <span><CloseOutlined className={toolTipClasses.closeIcon} onClick={toggleClose} /></span>
                        </div>
                        <div className={toolTipClasses.tooltipHeader}>
                            <div className={toolTipClasses.descriptions}>
                                {content ? <p dangerouslySetInnerHTML={{ __html: content || '' }}></p> : <p>No data to compare.</p>}
                            </div>
                        </div>
                    </div>
                }
            >
                <QueryStatsIcon className={toolTipClasses.helpIcon + " " + classes.defaultColor} onClick={toggleTooltip} />
            </Tooltip>
        </div>
    );
};;