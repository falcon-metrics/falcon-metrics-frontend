import Box from '@material-ui/core/Box';
import StrategicDriverCard from '../StrategicDriverCard';
import { styled } from '@material-ui/core/styles';

export const WrapperList = styled(Box)({
  display: 'grid',
  gridColumnGap: 20,
  gridRowGap: 14,
  gridTemplateRows: 'auto',
  gridTemplateColumns: 'repeat(auto-fit, 400px)'
});

type Props = {
  visionId?: string | number;
  data?: any;
  vision?: any;
};

const StrategicDriverList = ({ data, visionId, vision }: Props) => {
  return (
    <WrapperList>
      {data.map((strategicDriverItem, index) => {
        return (
          <StrategicDriverCard
            vision={vision}
            strategicDriverItem={strategicDriverItem}
            uuid={strategicDriverItem?.uuid}
            visionId={visionId}
            iconName={strategicDriverItem?.icon_name}
            key={index}
            title={strategicDriverItem.name}
            colour={strategicDriverItem?.colour}
            oneLineSummary={strategicDriverItem?.oneLineSummary}
          />
        );
      })}
    </WrapperList>
  )
};

export default StrategicDriverList;
