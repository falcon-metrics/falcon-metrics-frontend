import _ from "lodash";
import { generateColumns } from "../config/generateColumns";
import { reorderColumns } from "./utils";

describe('Test the reorder function', () => {
    test('Test if reorder works correctly', () => {
        const columns = generateColumns(workItems as any, 'past');
        const reordered = reorderColumns(columns, _.reverse(storedOrder));
        expect(columns.map(c => c.field))
            .toMatchObject(_.reverse(reordered.map(c => c.field)));
    });
    test('If the saved order array has unknown column the original columns array is unchanged', () => {
        const columns = generateColumns(workItems as any, 'past');
        const arrCopy = _.reverse(storedOrder);
        arrCopy.push('test');
        const reordered = reorderColumns(columns, arrCopy);
        expect(columns).toMatchObject(reordered);
    });
});

const storedOrder = ['workItemId', 'title', 'flomatikaWorkItemTypeName', 'flomatikaWorkItemTypeLevel', 'serviceLevelExpectationInDays', 'itemAge', 'age%OfSLE', 'flowEfficiency', 'isDelayed', 'isAboveSle', 'isStale', 'state', 'assignedTo', 'arrivalDate', 'commitmentDate', 'departureDate', 'projectName', 'datasourceType', 'desiredDeliveryDate', 'startStatus', 'optimalStartDateRange', 'Class of Service', 'Falcon Metrics Team', 'Falcon Metrics Product', 'expectedDeliveryDate', 'suggestedClassOfService'];

const workItems = [
    {
        "workItemId": "FLO-1929",
        "title": "Just a container",
        "assignedTo": "",
        "flomatikaWorkItemTypeName": "Initiative",
        "state": "Done",
        "arrivalDate": "2023-03-27T07:35:59.741+05:30",
        "commitmentDate": "2023-03-27T07:35:59.741+05:30",
        "departureDate": "2023-03-27T07:35:59.741+05:30",
        "serviceLevelExpectationInDays": 90,
        "itemAge": 1,
        "age%OfSLE": 0.011111111111111112,
        "projectName": "Falcon Metrics",
        "projectId": "10000",
        "datasourceId": "daee8f2934d43dc1c3175036ef1d1c54",
        "datasourceType": "jira-cloud",
        "namespace": "falcon-metrics",
        "serviceUrl": "https://example.atlassian.net/rest/api/3",
        "customFields": {
            "Class of Service": "Standard",
            "Falcon Metrics Team": "Growth",
            "Falcon Metrics Product": "SaaS",
            "workItemId": "FLO-1929",
            "title": "Just a container",
            "assignedTo": "",
            "flomatikaWorkItemTypeName": "Initiative",
            "state": "Done",
            "arrivalDate": "2023-03-27T07:35:59.741+05:30",
            "commitmentDate": "2023-03-27T07:35:59.741+05:30",
            "departureDate": "2023-03-27T07:35:59.741+05:30",
            "serviceLevelExpectationInDays": 90,
            "itemAge": 1,
            "age%OfSLE": 0.011111111111111112,
            "projectName": "Falcon Metrics",
            "projectId": "10000",
            "datasourceId": "daee8f2934d43dc1c3175036ef1d1c54",
            "datasourceType": "jira-cloud",
            "namespace": "falcon-metrics",
            "serviceUrl": "https://example.atlassian.net/rest/api/3",
            "flomatikaWorkItemTypeLevel": "Portfolio",
            "isDelayed": false,
            "isAboveSle": false,
            "isStale": false,
            "flagged": false,
            "desiredDeliveryDate": "",
            "startStatus": "",
            "optimalStartDateRange": "",
            "expectedDeliveryDate": "",
            "suggestedClassOfService": ""
        },
        "flomatikaWorkItemTypeLevel": "Portfolio",
        "isDelayed": false,
        "isAboveSle": false,
        "isStale": false,
        "flagged": false,
        "desiredDeliveryDate": "",
        "startStatus": "",
        "optimalStartDateRange": "",
        "expectedDeliveryDate": "",
        "suggestedClassOfService": ""
    }
];
export { };