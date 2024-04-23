import {
  DatePicker,
  DayOfWeek,
  IDatePickerStrings,
  mergeStyleSets,
} from '@fluentui/react';
import { Component } from 'react';

interface Props {
  placeholder: string;
  label: string;
  value?: Date;
  onDateSelected?(selctedDate: Date | undefined): void;
  customClass?: string;
  maxDate?: Date;
  disabled?: boolean;
}

interface State {
  firstDayOfWeek: any;
}

class FluentUIDatePicker extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      firstDayOfWeek: DayOfWeek.Sunday,
    };

    this.onSelectDate = this.onSelectDate.bind(this);
  }

  onSelectDate(date: Date | null | undefined) {
    if (this.props.onDateSelected)
      this.props.onDateSelected(date === null ? undefined : date);
  }

  render() {
    const DayPickerStrings: IDatePickerStrings = {
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],

      shortMonths: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],

      days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],

      shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

      goToToday: 'Go to today',
      prevMonthAriaLabel: 'Go to previous month',
      nextMonthAriaLabel: 'Go to next month',
      prevYearAriaLabel: 'Go to previous year',
      nextYearAriaLabel: 'Go to next year',
      closeButtonAriaLabel: 'Close date picker',
    };

    const controlClass = mergeStyleSets({
      control: {
        margin: '0 0 15px 0',
        width: '270px',
      },
    });

    if (this.props.maxDate) {
      return (
        <DatePicker
          className={`${controlClass.control} ${this.props?.customClass}`}
          firstDayOfWeek={this.state.firstDayOfWeek}
          strings={DayPickerStrings}
          placeholder={this.props.placeholder}
          ariaLabel={this.props.label}
          label={this.props.label}
          onSelectDate={this.onSelectDate}
          value={this.props.value}
          allowTextInput={true}
          maxDate={this.props.maxDate}
          disabled={this.props.disabled}
        />
      );
    }
    return (
      <DatePicker
        className={`${controlClass.control} ${this.props?.customClass}`}
        firstDayOfWeek={this.state.firstDayOfWeek}
        strings={DayPickerStrings}
        placeholder={this.props.placeholder}
        ariaLabel={this.props.label}
        label={this.props.label}
        onSelectDate={this.onSelectDate}
        value={this.props.value}
        allowTextInput={true}
        disabled={this.props.disabled}
      />
    );
  }
}

export default FluentUIDatePicker;
