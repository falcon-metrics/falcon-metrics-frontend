import './Footer.styles.css';
import { AboutClient } from 'core/api/ApiClient/AboutClient';
import AuthAction from 'core/auth/auth_action';
import { NotificationsClient } from 'core/api/ApiClient/NotificationsClient';
import { Component } from 'react';

class Footer extends Component<
  unknown,
  {
    apiVersion: string;
    notifications: Array<string>;
  }
> {
  private _isMounted = false;

  constructor(props: any) {
    super(props);

    this.state = {
      apiVersion: 'unknown',
      notifications: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;

    const fetchAsync = async () => {
      const [apiVersion, notifications] = await Promise.all([
        await new AboutClient().getVersion(),
        await new NotificationsClient().get()
      ]);

      if (this._isMounted) {
        this.setState({ apiVersion, notifications });
      }
    };

    fetchAsync();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="footerContainer">
      <div className="footerLeft" key="footerLeft">
        {/* Insert your logo here */}
      </div>
        <div className="footerRight" key="footerRight">
          {/* <ThemeSelector /> */}
          <div>
            <AuthAction /> |{' '}
            <a
              key="Release Notes"
              href="https://example.releasenotes.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Release Notes
            </a>{' '}
            |{' '}
            <a
              key="Status Page"
              href="https://status.example.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Status Page
            </a>{' '}
            |{' '}
            <a
              key="Terms of Service"
              href="https://example.com/terms-of-use"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>{' '}
            |{' '}
            <a
              key="Privacy Policy"
              href="https://example.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>{' '}
          </div>
          <div className="footerSmallPrint" key="All Rights Reserved">
            {/* Insert your copyright notice here */}
            All Rights Reserved
          </div>
        </div>
        <div className="footerSmallPrint" key="footerSmallPrint">
          {this.state.notifications.map((notificationString, index) => (
            <div key={index.toString() + notificationString}>{notificationString}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default Footer;
