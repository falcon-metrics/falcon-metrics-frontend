import InfoTile, { InfoTileProps } from 'components/InfoTile';
import {
  Container,
  TilesContainer,
  ShapeText,
  Wrapper,
} from './DistributionInfo.styles';
import { Distribution } from './interfaces/Distribution';
import {
  getReverseLevel,
  PredictabilityLevels,
} from 'utils/statistics/TrendAnalysis';

interface PageProps {
  data: Distribution;
  distributionShape?: string;
  pageTitle: string;
}

const DistributionInfo = ({
  data,
  distributionShape,
  pageTitle,
}: PageProps) => {
  const {
    modes,
    percentile50th,
    average,
    percentile85th,
    percentile98th,
  } = data;
  const level = distributionShape?.split(' ')[0] ?? '';
  const infoTiles: InfoTileProps[] = [
    { value: modes?.[0] ?? '-', label: 'Mode(s)' },
    { value: percentile50th, label: 'Median' },
    { value: average, label: 'Average' },
    { value: percentile85th, label: '85th %ile' },
    { value: percentile98th, label: '98th %ile' },
    {
      value: level,
      label: 'Predictability',
      color: '#8bbcdf',
      tooltip: `The variance in ${pageTitle} is ${
        getReverseLevel(PredictabilityLevels[level])?.toLowerCase() ?? ''
      }, indicating a ${level.toLowerCase()} predicitability.`,
    },
  ];

  return (
    <Container>
      <Wrapper>
        <TilesContainer>
          {infoTiles.map((tileInfo) => (
            <InfoTile key={tileInfo.label} {...tileInfo} />
          ))}
        </TilesContainer>
        <ShapeText>The numeric values above represent days</ShapeText>
      </Wrapper>
    </Container>
  );
};

export default DistributionInfo;
