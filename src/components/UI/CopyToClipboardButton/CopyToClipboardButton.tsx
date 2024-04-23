import { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import useStyles from './CopyToClipboardButton.styles';
import { copyToClipboard } from 'utils/string';

type Props = {
  text: string;
};

const CopyToClipboardButton = ({ text }: Props) => {
  const classes = useStyles();
  const [wasCopied, setWasCopied] = useState(false);

  const copy = () => {
    copyToClipboard(text);
    setWasCopied(true);
    setTimeout(() => setWasCopied(false), 1500);
  };

  return (
    <Tooltip
      title={wasCopied ? 'Copied!' : 'Copy To Clipboard'}
      placement="top"
      open={wasCopied || undefined}
    >
      <Button className={classes.button} onClick={copy}>
        <FileCopyOutlinedIcon className={classes.icon} />
      </Button>
    </Tooltip>
  );
};

export default CopyToClipboardButton;
