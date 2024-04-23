import { styled } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';

export const IconButtonWrapper = styled(IconButton)({
  width: 30,
  height: 30,
  // background: '#0077c8',
  // '&:hover': {
  //   background: '#0077c8'
  // }
});

export const EditIconWrapper = styled(EditIcon)({
  fontSize: 16,
  color: '#646464'
});

export const WrapperCardSkeleton = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  width: 800,
  height: 330
});

export const CardSkeleton = styled(Box)({
  marginRight: 10,
  width: 230,
  height: 280,
  background: '#d0d5d9',
  borderRadius: 5,
});

export const BoxSkeletonStrategicDrivers = styled(Box)({
  marginRight: 10,
});

export const WrapperStrategicDriversList = styled(Box)({
  display: 'grid',
  minHeight: 320
});