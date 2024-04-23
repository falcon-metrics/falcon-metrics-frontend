import IconButton from '@material-ui/core/IconButton';
import { BoxMessage, BoxButtonClick, CustomAddIcon, Wrapper } from './EmptyState.styles';

export const EmptyState = ({ message, typeText }: any) => {
  return (
    <Wrapper>
      <BoxMessage>
        {message}
      </BoxMessage>
      <BoxButtonClick>
        Click 
        <IconButton aria-label="Add Event" size="small">
          <CustomAddIcon />
        </IconButton>
        button to add {typeText}
      </BoxButtonClick>
    </Wrapper>
  );
};
