import { WrapperEmptyState, Title, TitleNumber } from './EmptyStateCircularProgress.styles';

export const EmptyStateCircularProgress = ({ title }: any) => {  
  return (
    <WrapperEmptyState>
      <TitleNumber>0</TitleNumber>
      <Title>{title}</Title>
    </WrapperEmptyState>
  );
};
