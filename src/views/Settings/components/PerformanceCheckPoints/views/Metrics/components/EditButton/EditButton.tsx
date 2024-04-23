                                  
import { styled } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const EditBtn = styled(IconButton)({
  '&': {
    width: 25,
    height: 25,
    fontSize: '14px',
    boder: '1px solid blue'
  },
  '& svg.MuiSvgIcon-root': {
    width: '0.8em',
    height: '0.8em',
    fontSize: 21
  },
});

type Props = {
  title: string;
  label: string;
};

const EditIconButton = ({ title = 'Edit', label = 'edit' }: Props) => {
  return (
    <EditBtn title={title}>
      <EditIcon aria-label={label} />
    </EditBtn>
  );
};

export default EditIconButton;
