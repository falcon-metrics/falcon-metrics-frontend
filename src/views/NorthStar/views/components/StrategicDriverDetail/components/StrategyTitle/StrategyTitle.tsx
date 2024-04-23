import { styled } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { LeanPortfolioIndices } from 'utils/routes';
import { useHistory } from "react-router-dom";
import { SkeletonSmallTitle, SkeletonShortDescription, SkeletonLastModified, SkeletonObjectives } from './SkeletonTitle';
import { Button } from '@material-ui/core';
import useAuthentication from 'hooks/useAuthentication';
import ButtonTooltip from 'views/Strategies/components/Tooltip/ButtonTooltip';

const WrapperEditIcon = styled(Box)({
  position: 'absolute',
  top: 10,
  right: 890,
});

export const WrapperTitle = styled(Box)({
  fontFamily: 'Open Sans',
});

export const Title = styled(Box)({
  fontSize: 16,
  fontFamily: 'Open Sans',
  color: '#112C2A',
  fontWeight: 'bold',
  margingTop: 10,
});

export const DividerLine = styled(Divider)({
  width: 30,
  marginTop: 6,
  color: '#2AD2C9',
  backgroundColor: '#2AD2C9',
  height: 3,
});

const ShortDescription = styled('span')({
  marginTop: 16,
  fontSize: 24,
  fontFamily: 'Open Sans',
  color: '#2B353B',
  fontWeight: 'bold',
});

const ReadStrategyButton = styled(Button)({
  marginTop: 16,
  color: '#0077C8',
  borderRadius: 4,
  fontSize: 14,
  padding: '4px 10px',
  fontWeight: 'bold',
  borderColor: '#0077C8',
  textTransform: 'capitalize',
  fontFamily: 'Open Sans',
});

const PresentButton = styled(Button)({
  marginTop: 16,
  fontFamily: 'Open Sans',
  borderRadius: 4,
  fontSize: 14,
  fontWeight: 'bold',
  textTransform: 'capitalize',
  padding: '8px 22px',
});

const LastModified = styled(Box)({
  fontSize: 14,
  fontFamily: 'Open Sans',
  marginTop: 5,
  textDecoration: 'underline',
  color: '#646464'
});

type Props = {
  description?: string;
  lastEditStatement?: string;
  title?: any;
  handleOpenModal?: () => void;
  isLoading?: boolean;
  children?: any;
  hideReadMore?: boolean;
  colour?: string;
  isEmpty?: boolean;
  openEditModal?: () => void;
};

const StrategyTitle = ({
  description,
  lastEditStatement,
  title,
  handleOpenModal,
  children,
  isLoading,
  hideReadMore,
  colour,
  isEmpty,
  openEditModal,
}: Props) => {
  const { isAdminOrPowerUser } = useAuthentication();
  const history = useHistory();

  const shouldShowReadMore = hideReadMore ? hideReadMore : false;
  if (isLoading) {
    return (
      <>
        <WrapperTitle>

          <Box>
            <SkeletonSmallTitle />
            <SkeletonLastModified />
            <SkeletonShortDescription />
            <SkeletonObjectives />
          </Box>
        </WrapperTitle >
      </>
    );
  }

  return (
    <WrapperTitle>
      <>
        {!isEmpty
          ? (
            <>
              <Box style={{ position: 'relative' }}>
                <Title>{title}</Title>
                <WrapperEditIcon>
                  {children}
                </WrapperEditIcon>
                <DividerLine style={{ backgroundColor: colour }} />
              </Box>
            </>
          )
          : <></>
        }
        {
          isEmpty
            ? (
              <>
                {/* <Box style={{
                  fontFamily: 'Open Sans',
                  color: '#000',
                  marginTop: 18,
                }}
                >
                  Seems like there is no strategy added
                </Box> */}
                <Title>
                  You have not added a strategy for the current Context and Strategy Horizon
                </Title>
              </>
            )
            : <></>
        }

        <Box style={{ marginTop: 10 }}></Box>

        <Box style={{ marginTop: 10 }}>
          <ShortDescription>{description}</ShortDescription>
          <LastModified>{lastEditStatement}</LastModified>
        </Box>

        {isEmpty ? (
          <ButtonTooltip text="add new Strategy">
            <PresentButton
              variant="contained"
              color="primary"
              onClick={openEditModal}
              disabled={!isAdminOrPowerUser}
            >
              Add Strategy
            </PresentButton>
          </ButtonTooltip>
        ) : null}

        {(!isLoading || !shouldShowReadMore) && isEmpty || hideReadMore
          ? ''
          : (
            <ReadStrategyButton
              variant="outlined"
              onClick={() => {
                handleOpenModal ? handleOpenModal() : history.push(LeanPortfolioIndices.Strategies);
              }}
            >
              Read Strategy brief
            </ReadStrategyButton>
          )
        }
      </>

    </WrapperTitle>

  );
};

export default StrategyTitle;
