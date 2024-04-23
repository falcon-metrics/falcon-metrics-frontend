import { TimeInStateToggles } from '../../../../../FlowEfficiency.data';
import { OptionKeys } from '../../ChoiceGroupStarted/interfaces/OptionKeys';
import { mapOptions } from '../interfaces/StateFilters';

const toggleKeys = Object.keys(
  mapOptions.proposedFilterToggle,
) as (keyof TimeInStateToggles)[];

export const getTimeInStateStartedToggles = (option: OptionKeys) =>
  mapOptions[option];
export const getOptionFromToggles = (toggles?: TimeInStateToggles) => {
  if (toggles) {
    const optionKeys = Object.keys(mapOptions) as OptionKeys[];
    const selectedOptions = optionKeys.filter((o) => {
      for (const t of toggleKeys) {
        if (!!mapOptions[o][t] !== !!toggles[t]) {
          return false;
        }
      }
      return true;
    });
    if (selectedOptions.length) {
      return selectedOptions[0];
    }
  }
  return OptionKeys.inProgressFilterToggle;
};
