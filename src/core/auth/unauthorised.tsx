import { Component } from 'react';
import Footer from 'views/Dashboard/views/Platform/views/Footer';

export class Unauthorised extends Component {
  // TODO: style this page

  render() {
    return (
      <div className="unauthorised">
        <div className="content-main-container">
          <br />
          <p>UNAUTHORISED: User context is not valid.</p>
          <p>
            Contact your Falcon Metrics administrator to check your access levels.
          </p>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Unauthorised;
