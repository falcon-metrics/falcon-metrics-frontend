import { Box } from '@material-ui/core';
import { RoundImage, TextName, Wrapper } from './Author.styles';
import Avatar from '../Avatar';

type AuthorProps = {
  photo: string;
  name: string;
  daysPost?: string[];
  views?: number;
  listCard?: boolean;
};

export const Author = ({ photo, name }: AuthorProps) => {
  return (
    <Wrapper>
      {
        (photo)
          ? <RoundImage src={photo} />
          : <Avatar name={name} />
      }
      <Box>
        <TextName>{name}</TextName>
      </Box>
      {/* {
        (listCard === true)
        ? <Box style={{ marginTop: 5, marginLeft: 5 }}>
            {
              days || views
              ? <Box style={{ marginTop: 5, marginLeft: 5, display: 'flex' }}>
                  <Box style={{ fontSize: 12 }}>{days ? `${days} days ago` : ''}</Box>
                    <WrapperEllipse>
                      <Ellispe />
                    </WrapperEllipse>
                  <Box style={{ fontSize: 12 }}>{views ? ` Seen by ${views} people`: ''}</Box>
                </Box>
              : ''
            }
          </Box>
        : ''
      } */}
    </Wrapper>
  );
};
