import { ChangeEvent } from 'react';

import OutlineWithLabel from 'components/UI/OutlineWithLabel';
import {
  KeyWorkflowEvents,
  TransformedDatabaseWorkItemType,
} from 'views/SetupWizard/views/WorkItemTypes/interfaces/interfaces';
import { Payload } from 'views/SetupWizard/views/WorkItemTypes/interfaces/schema';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import PointSelector, { StepOption } from './components/EventPointSelector';

const keyEvents: Array<{
  key: keyof KeyWorkflowEvents;
  payloadErrorKey: keyof Payload[number];
  presentationName: string;
  color: string;
}> = [
  {
    key: 'arrivalId',
    presentationName: 'Arrival',
    payloadErrorKey: 'arrivalPointOrder',
    color: '#C5C8C9'
  },
  {
    key: 'commitmentId',
    presentationName: 'Commitment',
    payloadErrorKey: 'commitmentPointOrder',
    color: '#D5E8F4'
  },
  {
    key: 'departureId',
    presentationName: 'Departure',
    payloadErrorKey: 'departurePointOrder',
    color: '#D8F6F5'
  },
];

type Props = {
  errors: string[];
  workItemType: TransformedDatabaseWorkItemType;
  handleChange: (
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => void;
  stepOptions: StepOption[];
};

export function EventSelectors({
  errors,
  workItemType,
  handleChange,
  stepOptions,
}: Props) {

  return (
    <Grid item xs={12}>
      <Box ml={1} mr={1} mb={1}>
        <br />
        <OutlineWithLabel label={'Key Workflow Events'}>
          <Grid container spacing={2}>
            {keyEvents.map((point) => (
              <PointSelector
                key={point.key}
                point={point}
                isInvalid={errors.includes(point.payloadErrorKey)}
                workItemType={workItemType}
                handleChange={handleChange}
                stepOptions={stepOptions}
              />
            ))}
          </Grid>
        </OutlineWithLabel>
      </Box>
    </Grid>
  );
}
