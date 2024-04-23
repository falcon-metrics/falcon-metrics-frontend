import { Button } from '@material-ui/core';
import { UnfoldLess, UnfoldMore } from '@material-ui/icons';

import { useStyles } from "./ExpandButton.styles";

interface Props {
  isExpanded: boolean;
  onExpand: () => void;
}

const ExpandButton = ({
  isExpanded,
  onExpand
}: Props) => {
  const classes = useStyles();

  return (
    <>
      <Button
        className={classes.button}
        onClick={onExpand}
        onKeyPress={onExpand}
      >
        {
          isExpanded
            ? <UnfoldLess />
            : <UnfoldMore />
        }
      </Button>
    </>
  );
}

export default ExpandButton;
