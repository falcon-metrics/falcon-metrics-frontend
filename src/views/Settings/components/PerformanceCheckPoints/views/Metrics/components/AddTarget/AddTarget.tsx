import AddIcon from '@material-ui/icons/Add';

const AddTarget = ({ onClick }: { onClick?: () => void }) => {
  return (
    <span
      style={{
        fontSize: 12,
        display: 'flex',
        alignItems: 'center',
        padding: 10,
        color: 'rgb(24, 144, 255)',
        cursor: 'pointer',
      }}
      title="Add Target"
      onClick={() => onClick?.()}
    >
      <AddIcon style={{ fontSize: 12 }} /> {' '} Add Target
    </span>
  );
};

export default AddTarget;
