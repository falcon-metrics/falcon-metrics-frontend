import { Skeleton } from "@material-ui/lab";
import { 
  Wrapper,
  WrapperAuthorSkeleton,
  AuthorPhotoName,
  AuthorNames,
  AuthorNamesLineOne,
  AuthorNamesLineSecond,
  Card,
} from './SkeletonRepliesList.styles';

export const SkeletonRepliesList = () => {
  return (
    <Wrapper>
      <WrapperAuthorSkeleton>
        <AuthorPhotoName display="flex">
          <Skeleton variant="circle" width={40} height={40} />
          <AuthorNames>
            <AuthorNamesLineOne>
              <Skeleton variant="rect" width={120} height={8} />
            </AuthorNamesLineOne>
            <AuthorNamesLineSecond>
              <Skeleton variant="rect" width={120} height={8} />
            </AuthorNamesLineSecond>
          </AuthorNames>
        </AuthorPhotoName>
        <Card>
          <Skeleton width={340} height={50} variant="rect" />
        </Card>
      </WrapperAuthorSkeleton>
      <WrapperAuthorSkeleton>
        <AuthorPhotoName display="flex">
          <Skeleton variant="circle" width={40} height={40} />
          <AuthorNames>
            <AuthorNamesLineOne>
              <Skeleton variant="rect" width={120} height={8} />
            </AuthorNamesLineOne>
            <AuthorNamesLineSecond>
              <Skeleton variant="rect" width={120} height={8} />
            </AuthorNamesLineSecond>
          </AuthorNames>
        </AuthorPhotoName>
        <Card>
          <Skeleton width={340} height={50} variant="rect" />
        </Card>
      </WrapperAuthorSkeleton>
    </Wrapper>
  );
};
