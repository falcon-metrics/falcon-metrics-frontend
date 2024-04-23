import { Skeleton } from "@material-ui/lab";
import { Box } from '@material-ui/core';
import { 
  Wrapper,
  WrapperAuthorSkeleton,
  AuthorPhotoName,
  AuthorNames,
  AuthorNamesLineOne,
  AuthorNamesLineSecond,
  Card,
  TitleReplyCard,
  WrapperReplyCard,
  WrapperAuthorReply,
  AuthorNameReply,
  AuthorNameReplyLineOne,
  AuthorNameReplyLineTwo
} from './SkeletonUpdateCard.styles';

export const SkeletonUpdateCard = () => {
  return (
    <Wrapper>
      <WrapperAuthorSkeleton>
        <AuthorPhotoName display="flex">
          <Skeleton variant="circle" width={50} height={50} />
          <AuthorNames>
            <AuthorNamesLineOne>
              <Skeleton variant="rect" width={200} height={10} />
            </AuthorNamesLineOne>
            <AuthorNamesLineSecond>
              <Skeleton variant="rect" width={200} height={10} />
            </AuthorNamesLineSecond>
          </AuthorNames>
        </AuthorPhotoName>
        <Card>
          <Skeleton width={800} height={300} variant="rect" />
        </Card>
      </WrapperAuthorSkeleton>
      <TitleReplyCard>
        <Skeleton variant="rect" width={200} height={30} />
      </TitleReplyCard>
      <WrapperReplyCard>
        <WrapperAuthorReply>
          <Skeleton variant="circle" width={50} height={50} />
          <AuthorNameReply>
            <AuthorNameReplyLineOne>
              <Skeleton variant="rect" width={200} height={10} />
            </AuthorNameReplyLineOne>
            <AuthorNameReplyLineTwo>
              <Skeleton variant="rect" width={200} height={10} />
            </AuthorNameReplyLineTwo>
          </AuthorNameReply>
        </WrapperAuthorReply>
        <Box>
          <Skeleton width={800} height={300} variant="rect" />
        </Box>
      </WrapperReplyCard>
    </Wrapper>
  );
};
