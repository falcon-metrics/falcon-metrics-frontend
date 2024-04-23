import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Component } from 'react';

interface PageProps {
  id: string;
  label: string;
  options: any;
  displayValue: string;

  onSelectionChange?(newValue: any): void;
}

export class CoreDropDown extends Component<PageProps> {
  handleChange = (event: any) => {
    const selectedItemValue = event.target.textContent;

    if (this.props.onSelectionChange) {
      this.props.onSelectionChange(selectedItemValue);
    }
  };

  render() {
    return (
      <Autocomplete
        className="autocomplete"
        onChange={this.handleChange}
        id={this.props.id}
        options={this.props.options}
        getOptionLabel={(option: any) => option.ListItem}
        style={{ width: 150 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={this.props.label}
            margin="normal"
            variant="standard"
          />
        )}
      />
    );
  }
}
