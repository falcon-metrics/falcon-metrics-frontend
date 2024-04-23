/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useMemo, useContext } from "react";
import { useHistory } from "react-router-dom";
import omit from "lodash/omit";
import { SelectedContextIdContext } from "components/UserStateProvider/UserStateProvider";
import useUserInfo from "hooks/fetch/useUserInfo";
import { fromUtcToLocalTimezone } from "utils/dateTime";
import { BaseRoutes, ValueStreamManagementIndexes } from "utils/routes";
import memo from "utils/typescript/memo";
import { getClearedFilters, getAppliedFilters, nonPanelKeys } from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils";
import { defaultIndex } from "views/ValueStreamManagement/hooks/useValueStreamManagementTab";
import { useFitnessCriteria } from "views/ValueStreamManagement/views/DeliveryGovernance/hooks/useFitnessCriteria";
import FitnessCriteriaAccordion from "views/ValueStreamManagement/views/DeliveryGovernance/views/FitnessCriteriaAccordion/FitnessCriteriaAccordion";

import { DateTime } from "luxon";
import { getTimezone } from "utils/utils";

interface Props {
    isLoadingObeyaData: boolean;
    flowMetrics: any;
}

export const FitnessCriteria = memo(({ flowMetrics, isLoadingObeyaData }: Props) => {
    const [apiQueryParameters, setApiQueryParameters] = useState(
        getClearedFilters()
    );
    const history = useHistory();
    const { userInfo } = useUserInfo();
    const isOldDashboard =
        userInfo?.analyticsDashboardUrl === BaseRoutes.AnalyticsDashboard;
    const useIndex = isOldDashboard
        ? defaultIndex
        : ValueStreamManagementIndexes.ValueStreamManagementDeliveryGovernance;
    const { setContextId: setGlobalContextId } = useContext(
        SelectedContextIdContext
    );
    const [disableFitnessCriteria, setDisableFitnessCriteria] = useState(true);

    const [searchString, setSearchString] = useState("");
    
    const urlParamsObject = useMemo(
        () => getAppliedFilters(history.location.search),
        [history.location.search]
    );
    const appliedFilters = useMemo(() => omit(urlParamsObject, nonPanelKeys), [
        history.location.search,
    ]);
    
    const {
        data: fitnessCriteriaData,
        error: fitnessCriteriaError,
        isLoading: isLoadingFitnessCriteria,
        isEmptyData: fitnessCriteriaEmpty,
    } = useFitnessCriteria(apiQueryParameters, disableFitnessCriteria);

    useEffect(() => {
        if (!isLoadingObeyaData) {
            const dates = [
                flowMetrics.lowerBoundaryDate,
                flowMetrics.upperBoundaryDate,
            ]
                .map(fromUtcToLocalTimezone)
                .map((d) => DateTime.fromISO(d).toJSDate());
            setApiQueryParameters({
                ...apiQueryParameters,
                ...{
                    contextId:
                        flowMetrics.contexts.find(
                            (context) => !context.positionInHierarchy.includes(".")
                        )?.contextId || "",
                    departureDateLowerBoundary: dates[0],
                    departureDateUpperBoundary: dates[1],
                    timezone: getTimezone(),
                },
            });
            setDisableFitnessCriteria(false);
            setSearchString(
                "?contextId=" +
                flowMetrics.contexts
                    .find((context) => !context.positionInHierarchy.includes("."))
                    ?.contextId.toString() +
                "&departureDateLowerBoundary=" +
                fromUtcToLocalTimezone(
                    flowMetrics.lowerBoundaryDate
                ) +
                "&departureDateUpperBoundary=" +
                fromUtcToLocalTimezone(flowMetrics.upperBoundaryDate)
            );
        }
    }, [isLoadingObeyaData]);

    return (
        <FitnessCriteriaAccordion
            data={fitnessCriteriaData || undefined}
            error={fitnessCriteriaError || undefined}
            isLoading={isLoadingFitnessCriteria || isLoadingObeyaData}
            isEmpty={fitnessCriteriaEmpty}
            appliedFilters={appliedFilters}
            apiQueryParameters={apiQueryParameters}
            isObeya={true}
        ></FitnessCriteriaAccordion>
    );
});

export default FitnessCriteria;