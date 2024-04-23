import Button from '@material-ui/core/Button';
import { Component } from 'react';

interface ButtonProps {
  text: string;
  onClickEventHandler?(): void;
}

export class CoreButton extends Component<ButtonProps> {
  render() {
    return (
      <div>
        <Button onClick={this.props.onClickEventHandler} variant="contained">
          {this.props.text}
        </Button>
      </div>
    );
  }
}
