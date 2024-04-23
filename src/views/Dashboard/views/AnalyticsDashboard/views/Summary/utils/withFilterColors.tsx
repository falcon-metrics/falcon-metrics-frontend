import { ComponentType } from 'react';
import useNormalizationColors, {
  FilterColor,
} from 'hooks/fetch/useNormalizationColors';
import find from 'lodash/find';

export interface WithFilterColorsProps {
  filterColors: FilterColor[];
  getColorByDisplayName: (displayName: string) => string | undefined;
}

function withFilterColors<Props extends WithFilterColorsProps>(
  Widget: ComponentType<Props>,
) {
  return (props: Omit<Props, keyof WithFilterColorsProps>) => {
    const { filterColors } = useNormalizationColors();
    const getColorByDisplayName = (displayName: string) =>
      find(filterColors, { displayName })?.colorHex;
    return (
      <Widget
        {...(props as Props)}
        filterColors={filterColors}
        getColorByDisplayName={getColorByDisplayName}
      />
    );
  };
}

export default withFilterColors;
