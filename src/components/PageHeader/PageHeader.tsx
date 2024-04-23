import { styled } from '@material-ui/styles';

import NavigateButton, {
  NavigateButtonProps,
} from 'components/NavigationButtons/components/NavigateButton';
import { SelectedLeftNavContext } from 'components/UserStateProvider/UserStateProvider';
import { useContext } from 'react';
import { BaseRoutes } from 'utils/routes';

const Header = styled('header')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 32px',
});

const PageHeader = (props: Omit<NavigateButtonProps, 'path'>) => {
  const { tab } = useContext(SelectedLeftNavContext);
  let path = '/';
  let content = "DASHBOARD";
  if (tab === BaseRoutes.LeanPortfolio) {
    path = '/vmo';
    content = "VMO";
  }
  return (
    <Header>
      {/* Insert your logo here */}
      <NavigateButton color="primary" content={content} path={path} {...props} />
    </Header>
  );
};

export default PageHeader;
