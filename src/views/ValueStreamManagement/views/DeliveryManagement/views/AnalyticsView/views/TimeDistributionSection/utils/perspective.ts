import { ScatterplotDatumWithDates } from '../../../interfaces/timeDistribution';

export interface PerspectiveProfile {
  ageField: keyof ScatterplotDatumWithDates;
  ageFieldLabel: string;
  joinDateField: keyof ScatterplotDatumWithDates;
  joinDateFieldLabel: string;
  chartId: string;
  tooltipDescription: string;
}

export const getPerspectiveProfile = (
    perspective: string,
): PerspectiveProfile => {
    switch (perspective) {
        case 'past':
            return {
                ageField: 'leadTimeInWholeDays',
                ageFieldLabel: 'Lead Time',
                joinDateField: 'departureDate',
                joinDateFieldLabel: 'Departure Date',
                chartId: 'lead-time',
                tooltipDescription: '<p>%vt work items took %kt days</p>',
            };
        case 'present':
            return {
                ageField: 'wipAgeInWholeDays',
                ageFieldLabel: 'WIP Age',
                joinDateField: 'commitmentDate',
                joinDateFieldLabel: 'Commitment Date',
                chartId: 'wip-age',
                tooltipDescription: '<p>%vt work items have been in process %kt days</p>',
            };
        case 'future':
            return {
                ageField: 'inventoryAgeInWholeDays',
                ageFieldLabel: 'Inventory Age',
                joinDateField: 'arrivalDate',
                joinDateFieldLabel: 'Arrival Date',
                chartId: 'inventory-age',
                tooltipDescription: '<p>%vt work items have been in\nthe inventory for %kt days</p>',
            };
        default:
            return {
                ageField: 'leadTimeInWholeDays',
                ageFieldLabel: 'Leadtime',
                joinDateField: 'departureDate',
                joinDateFieldLabel: 'Departure Date',
                chartId: 'lead-time',
                tooltipDescription: '<p>%vt work items took %kt days</p>',
            };
    }
};

