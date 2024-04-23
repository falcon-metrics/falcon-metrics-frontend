import FluentUIDatePicker from 'components/UI/FluentUI/BaseDatePicker';
import { Component } from 'react';

interface Props {
  lowerBoundarySelectedValue?: Date;
  upperBoundarySelectedValue?: Date;
  onLowerBoundaryDateChange(newDate: Date | undefined): void;
  onUpperBoundaryDateChange(newDate: Date | undefined): void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {
  //    rangeLowerBoundary?: Date;
  //    rangeUpperBoundary?: Date;
}

class FilterDateRange extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div data-cy="filter_date_range">
        <FluentUIDatePicker
          placeholder="Select..."
          label="Start date"
          value={this.props.lowerBoundarySelectedValue}
          onDateSelected={this.props.onLowerBoundaryDateChange}
        />
        <FluentUIDatePicker
          placeholder="Select..."
          label="Finish date"
          value={this.props.upperBoundarySelectedValue}
          onDateSelected={this.props.onUpperBoundaryDateChange}
        />
      </div>
    );
  }
}

export default FilterDateRange;
