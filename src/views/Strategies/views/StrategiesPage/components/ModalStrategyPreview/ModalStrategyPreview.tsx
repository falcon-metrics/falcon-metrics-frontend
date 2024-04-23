import BaseModal from 'components/UI/BaseModal/BaseModal2';
import { useStyles } from './ModalStrategyPreview.styles';
import { styled } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import TextEditor from '../../components/TextEditor';

export const Title = styled(Box)({
  color: '#333',
  fontSize: 15
});

const WrapperContent = styled(Box)({
  padding: '1rem',
});

const ModalStrategyPreview = ({
  isOpen,
  setOpenModal,
  title,
  content,
}: {
  isOpen: boolean;
  title?: string;
  content: string;
  setOpenModal?: any;
}) => {
  const classes = useStyles();

  return (
    <div className={classes.sm}>
      <BaseModal
        maxWidth='md'
        open={isOpen}
        setOpen={setOpenModal}
        title={title}
        disableBackdropClick
        disableEscKeyDown
      >
        <WrapperContent>
          <TextEditor
            maxLength={2000}
            readOnly
            hideToolbar
            defaultContent={content}
            hideCharacters
          />
        </WrapperContent>
      </BaseModal>   
    </div>
  );
}

export default ModalStrategyPreview;
