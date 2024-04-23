import { LightTypes } from 'views/ValueStreamManagement/components/TrafficLights';

export const getTrafficLightColorByPattern = (pattern?: string): LightTypes => {
  if (pattern === 'good') {
    return LightTypes.GREEN;
  } else if (pattern === 'average') {
    return LightTypes.YELLOW;
  } else if (pattern === 'bad') {
    return LightTypes.RED;
  }
  return LightTypes.GRAY;
};
