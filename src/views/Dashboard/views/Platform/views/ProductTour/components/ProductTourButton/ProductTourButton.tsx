import Tooltip from '@material-ui/core/Tooltip';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import useSharedState from 'hooks/useSharedState';

function ProductTourButton() {
  const [, setTourIsOpen] = useSharedState('PRODUCT_TOUR_IS_OPEN');

  return (
    <Tooltip title="Product Tour" arrow placement="top">
      <PlayCircleFilledIcon
        onClick={() => setTourIsOpen(true)}
        style={{
          color: 'white',
          width: 44,
          height: 44,
          cursor: 'pointer',
        }}
      />
    </Tooltip>
  );
}

export default ProductTourButton;
