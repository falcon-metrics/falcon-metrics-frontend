import { Box } from '@material-ui/core';
import { DateTime } from "luxon";
import { daysToIntervalString } from "utils/daysToIntervalString";
import { RoundImage, TextName, Wrapper } from './Author.styles';
import Avatar from '../Avatar';

type AuthorProps = {
  photo: string;
  name: string;
  daysPost?: string[];
  views?: number;
  listCard?: boolean;
};

const normalizedDays = (daysPost) => {
  const endDate = DateTime.fromJSDate(new Date());
  const startDate = daysPost
      ? DateTime.fromISO(daysPost) : DateTime.fromJSDate(new Date());
  const { days } = endDate.diff(startDate, ['days']).toObject();
  const diff = daysToIntervalString(days || 0);
  return diff;
}

export const Author = ({ photo, name, daysPost, views, listCard }: AuthorProps) => {
  const timeAgo = Array.isArray(daysPost)
  ? daysPost.map((item: any) => normalizedDays(item?.updatedAt))
  : normalizedDays(daysPost);

  return (
    <Wrapper>
      {
        (photo)
          ? <RoundImage src={photo} />
          : <Avatar name={name} />
      }
      <Box>
        <TextName>{name}</TextName>
        {
          (listCard === true)
          ? <Box style={{ marginLeft: 5, fontFamily: 'Open Sans' }}>
              {
                timeAgo || views 
                ? <Box style={{ marginLeft: 5, display: 'flex' }}>
                    <Box style={{ fontSize: 10 }}>{timeAgo ? `${timeAgo} ago` : ''}</Box>
                      {/* <WrapperEllipse>
                        <Ellipse />
                      </WrapperEllipse> */}
                    {/* <Box style={{ fontSize: 12 }}>{views ? ` Seen by ${views} people`: ''}</Box> */}
                  </Box>
                : ''  
              }
            </Box>
          : ''
        }
      </Box>
      {/* {
        (listCard === true)
        ? <Box style={{ marginTop: 5, marginLeft: 5 }}>
            {
              days || views
              ? <Box style={{ marginTop: 5, marginLeft: 5, display: 'flex' }}>
                  <Box style={{ fontSize: 12 }}>{days ? `${days} days ago` : ''}</Box>
                    <WrapperEllipse>
                      <Ellipse />
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
