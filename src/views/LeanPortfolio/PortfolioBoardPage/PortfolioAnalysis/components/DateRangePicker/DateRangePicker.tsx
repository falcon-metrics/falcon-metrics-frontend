import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatePickerContainer, datePickerAdornment, datePickerStyle } from './styles';
import { Button } from '@material-ui/core';
import { PORTFOLIO_ANALYSIS_DATERANGE_FILTER_KEY, useDateRangeContext } from 'views/LeanPortfolio/contexts/DateRangeContext';
import { usePortfolioBoardPageContext } from 'views/LeanPortfolio/contexts/PortfolioBoardPageContext';
import { memo } from 'react';
import Spinner from 'components/UI/MUIFormInput/components/MUIFormInputSpinner/MUIFormInputSpinner';
import { DEFAULT_DATE_FORMAT } from 'utils/dateTime';

const PortfolioAnalysisDatePicker = () => {

    const context = usePortfolioBoardPageContext();

    const { defaultStartDate, defaultEndDate, selectedDateRange, setDateRange, setAppliedDateRange } = useDateRangeContext();

    const handleDateChange = (date, index) => {
        const updatedDateRange = [...selectedDateRange];
        updatedDateRange[index] = date;
        setDateRange(updatedDateRange);
    };

    const handleApplyDate = async () => {

        const params = {
            contextId: context.contextId,
            filterStartDate: selectedDateRange[0],
            filterEndDate: selectedDateRange[1],
            includeChildren: context.showChildren
        }

        if (selectedDateRange[0] <= selectedDateRange[1]) {
            setAppliedDateRange(selectedDateRange);

            localStorage.setItem(PORTFOLIO_ANALYSIS_DATERANGE_FILTER_KEY, JSON.stringify(selectedDateRange));
            await context.repopulatePortfolioAnalysis(params);
        }
    };

    const isValid = selectedDateRange[0] <= selectedDateRange[1];

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePickerContainer>
                <DatePicker
                    disableToolbar
                    color="primary"
                    variant="inline"
                    format={DEFAULT_DATE_FORMAT}
                    margin="dense"
                    label="Start Date"
                    value={selectedDateRange[0] ?? defaultStartDate}
                    onChange={(date) => handleDateChange(date?.toISOString(), 0)}
                    InputProps={{
                        endAdornment: datePickerAdornment,
                        style: datePickerStyle
                    }}
                    error={!isValid}
                />

                <span style={{ margin: '35px 10px 10px 10px', fontSize: 16 }}> &ndash; </span>
                <DatePicker
                    disableToolbar
                    color="primary"
                    variant="inline"
                    format={DEFAULT_DATE_FORMAT}
                    margin="dense"
                    label="End Date"
                    value={selectedDateRange[1] ?? defaultEndDate}
                    onChange={(date) => handleDateChange(date?.toISOString(), 1)}
                    InputProps={{
                        endAdornment: datePickerAdornment,
                        style: datePickerStyle
                    }}
                    error={!isValid}
                />

                <Button
                    color="primary"
                    variant="outlined"
                    onClick={handleApplyDate}
                    style={{ marginTop: 12, marginLeft: 10 }}
                    disabled={!isValid || context.isPortfolioAnalysisLoading}
                    startIcon={<Spinner
                        style={{ marginLeft: 42, marginBottom: 2 }}
                        isVisible={context.isPortfolioAnalysisLoading} />}>
                    { context.isPortfolioAnalysisLoading ?
                        <span>&nbsp;</span> :
                        <span>Apply</span>
                    }
                </Button>
            </DatePickerContainer>
        </MuiPickersUtilsProvider>
    );
}

export default memo(PortfolioAnalysisDatePicker);
