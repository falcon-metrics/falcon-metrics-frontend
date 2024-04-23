import isEmpty from 'lodash/isEmpty';
import * as yup from 'yup';

import { ErrorList } from '../WorkItemTypes';

export const schema = yup
  .array()
  .of(
    yup.object().shape({
      displayName: yup.string().required(),
      level: yup.string().required(),
      serviceLevelExpectationInDays: yup
        .number()
        .required()
        .positive()
        .integer(),
      arrivalPointOrder: yup.number().required(),
      commitmentPointOrder: yup.number().required(),
      departurePointOrder: yup.number().required(),
      steps: yup.array().of(
        yup.object().shape({
          type: yup.string().required(),
          isUnmapped: yup.boolean().required(),
        }),
      ),
    }),
  )
  .required();

export type Payload = yup.InferType<typeof schema>;

export function isValidPayload(
  arg: unknown[],
  validations: ErrorList,
): arg is Payload {
  return isEmpty(validations);
}
