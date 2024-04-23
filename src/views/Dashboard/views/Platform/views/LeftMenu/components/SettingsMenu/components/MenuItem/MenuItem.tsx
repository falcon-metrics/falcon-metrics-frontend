import MUIMenuItem from '@material-ui/core/MenuItem';
import { forwardRef } from 'react';
import { useHistory } from 'react-router-dom';

type PathOrOnClick = { path: string } | { onClick: () => void };

type Props = {
  text: string;
  shouldBeHidden?: boolean;
} & PathOrOnClick;

const MenuItem = forwardRef(
  // forwardRef is required because of MUI implementation, otherwise console shows a warning.
  ({ text, shouldBeHidden = false, ...props }: Props, _ref) => {
    const history = useHistory();
    const onClick =
      'path' in props ? () => history.push(props.path) : props.onClick;

    if (shouldBeHidden) {
      return null;
    }

    return <MUIMenuItem onClick={onClick}>{text}</MUIMenuItem>;
  },
);

export default MenuItem;
