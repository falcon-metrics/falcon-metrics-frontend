# 👋 Welcome to Falcon Metrics UI Repository

Thank you for exploring our UI repository! This hub is the cornerstone of our front-end endeavors, embodying a robust architecture tailored for intuitive user experiences.

This documentation is our best effort to provide insight into the architecture and workflow of our repository. Given the complexity and extensive history of our work, creating comprehensive documentation is challenging, but we've strived to offer the best possible guidance.

Moreover, sections of the codebase have been tactfully modified during its transition to an open-source project to address security, data, legal, and privacy concerns. While these adjustments may momentarily impact functionality, we extend our apologies for any inconvenience they may cause.

Familiarity with front-end technologies like React, Material-UI, FluentUI, Contentful, Bryntum Gantt, and ZingChart is beneficial, as your expertise in these realms can prove invaluable in navigating any hiccups that arise. In the event of challenges, we encourage you to leverage this readme file as a self-service resource for troubleshooting and debugging.

Feel free to explore the codebase at your own pace to deepen your understanding of its inner workings, particularly if you encounter unexpected behavior. We recommend familiarizing yourself with the various components and libraries utilized, taking a step-by-step approach to fully grasp their functionalities.

Happy Coding! 🦅

## Coding standards

We prioritize clean and maintainable code. Please adhere to the [Google Javascript Style Guide](https://google.github.io/styleguide/jsguide.html) whenever possible. Stay tuned for updates on TypeScript coding standards.

## Doco generated by create react app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), ensuring a smooth development experience.

## Third-party Packages and Services

This project utilizes the following third-party packages and services:

1. **MUI (Material-UI):** For UI components, we leverage MUI, a popular React UI framework. Please refer to the [Material-UI documentation](https://mui.com/) for usage guidelines and licensing information.

2. **FluentUI:** Although earlier versions of components utilize FluentUI for certain aspects of the user interface, we recommend migrating to a single framework for consistency and maintainability. More information about FluentUI can be found in the [FluentUI documentation](https://developer.microsoft.com/en-us/fluentui).

3. **Contentful for CMS:** In the tooltips section, we utilize Contentful for content management. If there's a need to move the tooltip information, Contentful serves as a viable alternative. Note that it also requires a license.

4. **Bryntum Gantt:** We use Bryntum Gantt package within this project. Please refer to the [Bryntum documentation](https://bryntum.com/docs/) for licensing information.

5. **ZingChart:** This project incorporates ZingChart for data visualization. Please consult the [ZingChart website](https://www.zingchart.com/) for licensing details and terms of use.

## Setting up Bryntum Gantt

### Requirements

An active license and account are required to access Bryntum's customer zone.

#### Single-Dev Account Credentials

- **Username:** your_username
- **Password:** your_password

### Accessing Bryntum's Resources and Documentation

- [Customer Zone](https://customerzone.bryntum.com/): Access releases and demo projects.
- [Gantt Documentation](https://bryntum.com/products/gantt/docs/): Guides and tutorials for different frameworks. We specifically use their guide for React.

### Setup Instructions

a. **Accessing npm Registry:**

    ```bash
    npm config set "@bryntum:registry=https://npm.bryntum.com"
    npm login --registry=https://npm.bryntum.com
    ```

    - **Credentials:**
      - **Username:** your_username
      - **Password:** your_password
      - **Email (public):** your_email

b. **Create a Token:**

    ```bash
    npm token create --registry=https://npm.bryntum.com
    ```

    - Copy the generated token and use it to set up your local environment variable.

    **For Windows:**

    ```bash
    setx NPM_BRYNTUM_TOKEN your-token-here
    ```

    **For Linux/MacOS:**
    - See the provided documentation for further steps.

c. **Copy themes/font to the Public Folder:**

    Bryntum packages require the resources to have a copy in the public folder. Follow the instructions provided in the documentation.

d. **Installing @bryntum/gantt Packages:**

    Once the postinstall script has been added and the environment variable is properly set up, simply install the packages:

    ```bash
    npm i @bryntum/gantt @bryntum/gantt-react
    ```

e. **Using .npmrc in CI/CD:**

    Ensure that the .npmrc file contains the following:

    ```bash
    @bryntum:registry="https://npm.bryntum.com"
    //npm.bryntum.com/:_authToken=${NPM_BRYNTUM_TOKEN}
    ```

## Setting up ZingChart

### Installing ZingChart via npm

To install ZingChart via npm, run the following command:

```bash
npm install zingchart --save
```

### Adding ZingChart configuration

In `App.tsx` file, include the following lines of code:

```
import zingchart from 'zingchart';

// Enable asynchronous loading
zingchart.ASYNC = true;

// Set your ZingChart license key
zingchart.LICENSE = ["your_license_key"];
```

## Dev env setup

- Clone repo
- Install [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
  - `brew install nvm`
  - check install logs for further instructions re `~/.nvm` and `.bash_profile`
  - Note: you might need to open a new terminal session before it will work
  - Use: Run `nvm use` when you change dir to switch to the node version specified in `.nvmrc`
    - nvm will let you know if dont have required node version installed
    - You can set the default version e.g. `nvm alias default v15.2.0`
- Setup Environment Variables
- Install Node packages `npm install`
  - You might need to install the nan module locally if you get an error like: `Error: Cannot find module 'nan'`. To install nan locally run the following `npm i -g nan && export NODE_PATH=$(npm root -g)`
- Config connection to API backend service
  - The `REACT_APP_API_BASE_URL` environment variable configures the API instance to connect to.
  - Check your current setting `env | grep REACT_APP_API_BASE_URL`
  - Check [API README](https://gitlab.com) for a guide on API env details and managing API instances
  - Set your default env var `export REACT_APP_API_BASE_URL=<API_URL>`
    - Update your `.bash_profile` to default to the `dev` environment
  - Start your local server `npm start`

> :bulb: **NOTE:** You can run Jest directly from the CLI, if it's globally available in your PATH `npm install jest --global`

> :bulb: **NOTE:** To point your local server to a different API endpoint for a single server run:

> `REACT_APP_API_BASE_URL=<MY-AWS-API-SANDBOX-BASE-URL> npm start`
>
> OR
>
> `REACT_APP_API_BASE_URL=<MY-AWS-API-SANDBOX-BASE-URL> npm run integrationtests`
>
> This will override the env var value for this command only

### Build Pipeline

[GitLab CI](https://gitlab.com)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Runs `npm run unittest`
We use Jest for unit testing.

### `npm unittest`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

This excludes integration tests. See jest run arguments in [package.json](./packages.json)

### `npm run integrationtest`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

This includes integration tests. See jest run arguments in [package.json](./packages.json)

To run integration tests

- Set the `REACT_APP_API_BASE_URL` environment variable to point to your API instance.
  - See [API README](https://gitlab.com) for details on managing API instances.
- Cut and paste a current API token (eg, from debug output of an interactive session) into the `REACT_APP_API_TEST_TOKEN` environment variable for the API and in .env.test for the front-end
  (TODO: this horrible hack should be replaced by scripting the loging and capturing a new token)
- run `npm run integrationtest`

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Authentication Components

### AuthAction

sign in / sign out button

### AuthContent

render content if user is authenticated

### RoleContent

Render content based on Auth0 user metadata

Via Auth0 web console add `app_metadata` to user

```
{
  "user_roles": ["1", "2.3"]
}
```

example usage:

```
<RoleContent requiredRoles={['10', '2.3']}>
    render only if user role in required list
</RoleContent>
<RoleContent excludedRoles={['10', '2.3']}>
    render if user role not in exclude list
</RoleContent>
```

## Authorisation

### Auth0 User Roles

User roles can be created and assigned to users via Auth web admin console.
Requirements to include user roles in Auth0 login token:

- [Enable RBAC & Role inclusion in tokens on API settings](https://auth0.com/docs/authorization/rbac/enable-role-based-access-control-for-apis)
- [Add Auth0 rule to include user role in tokens](https://auth0.com/docs/authorization/sample-use-cases-rules-with-authorization?_ga=2.58109673.2144601834.1598226750-112670944.1592524603#add-user-roles-to-tokens)

### User context levels

User context levels are restricted based user metadata in Auth0.
User profile in Auth0 can manage app_metadata

[Context Level Definitions](./src/core/api/ApiClient/JsonData/03_config_contexts.json)

### example Auth0 context level config

User app_metadata can be configured via Auth0 web console per [user profile](https://manage.auth0.com)

```
{
  "user_context_levels": [
		"1.1"
  ]
}
```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
