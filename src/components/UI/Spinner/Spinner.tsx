import './Spinner.css';
import { Component } from 'react';

class Spinner extends Component<{ className?: string }> {
  render() {
    return (
      <div className="spinner-container">
        <img
          alt="loading index"
          className={`spinner-img ${this.props.className}`}
          src="img/loading_circles.gif"
        />
      </div>
    );
  }
}

export default Spinner;
