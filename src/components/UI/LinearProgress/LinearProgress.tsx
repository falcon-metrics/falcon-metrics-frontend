import { Loading } from './LinearProgress.styles';

type Props = {
  isSubmitting: boolean;
};

const NextLoading = ({ isSubmitting }: Props) => {
  if (!isSubmitting) {
    return null;
  }
  return <Loading />;
};

export default NextLoading;
