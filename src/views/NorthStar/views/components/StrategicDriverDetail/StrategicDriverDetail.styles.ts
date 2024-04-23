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
  color: '#fff',
  fontSize: 15
});

export const WrapperCardSkeleton = styled(Box)({
  marginTop: 30,
  display: 'flex',
  justifyContent: 'space-between',
  width: 800,
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