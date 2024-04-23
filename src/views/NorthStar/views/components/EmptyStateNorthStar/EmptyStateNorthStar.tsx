import { 
  BoxMessage,
  BoxButtonClick,
  Wrapper,
  WrapperMessage,
  WrapperTitles,
  ContentTitle,
  WrapperTitleAndContent,
  VisionTitle,
  MissionTitle,
  StrategicDriversTitle,
  DividerLine
} from './EmptyStateNorthStar.styles';

const EmptyNorthStar = ({ openCreateVision }: { openCreateVision: () => void}) => {
  return (
    <Wrapper>
      <WrapperTitles>
        <WrapperTitleAndContent>
          <VisionTitle>
            Vision
          <DividerLine />
          </VisionTitle>
          <ContentTitle>You have no Vision statement yet. </ContentTitle>
        </WrapperTitleAndContent>
        <br/>
        <WrapperTitleAndContent>
          <MissionTitle>
            Mission
            <DividerLine />
          </MissionTitle>
          <ContentTitle>You have no Mission statement yet. </ContentTitle>
        </WrapperTitleAndContent>
        <br/>
        <WrapperTitleAndContent>
          <StrategicDriversTitle>
            Strategic Drivers
            <DividerLine />
          </StrategicDriversTitle>
          <ContentTitle>You have no Strategic Drivers yet. </ContentTitle>
        </WrapperTitleAndContent>  
      </WrapperTitles>
      <WrapperMessage>
        <BoxMessage>
          Having a clear a vision is crucial for a business as it serves as the guiding light,<br/>
          inspiring purpose, and driving success, by aligning teams, setting goals, and <br/>
          paving the way for meaningful innovation.
        </BoxMessage>
        <BoxButtonClick onClick={openCreateVision}>
          Add Vision
        </BoxButtonClick>
      </WrapperMessage>      
    </Wrapper>
  );
};

export default EmptyNorthStar;
