import useAuthentication from 'hooks/useAuthentication';
import renderNothing from 'react-recompose/renderNothing';

type Props = {
  roles: string[];
  fallback?: React.ReactNode;
  children?: React.ReactNode;
};

const Authorization = ({
  roles,
  fallback = renderNothing,
  children,
}: Props): JSX.Element => {
  const { isInRole } = useAuthentication();
  return <>{isInRole(...roles) ? children : fallback}</>;
};

export default Authorization;
