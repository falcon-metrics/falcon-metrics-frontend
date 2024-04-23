import useMediaQuery from '@material-ui/core/useMediaQuery';

const useMediaQueryMinWidth = (widthInPixels: number) => {
  return useMediaQuery(`(min-width:${widthInPixels}px)`);
};

export default useMediaQueryMinWidth;
