import { getServiceLevelPastColumns } from './pastColumns';
import { getServiceLeveLPresentColumns } from './presentColumns';
import { getServiceLevelFutureColumns } from './futureColumns';
import { GridColDef } from "@mui/x-data-grid-pro";

export const getServiceLevelColumns = (
    perspective: string,
    mainColumnLabel = 'Type',
): GridColDef[] => {
    switch(perspective) {
        case 'past':
            return getServiceLevelPastColumns(mainColumnLabel);
        case 'present':
            return getServiceLeveLPresentColumns(mainColumnLabel);
        case 'future':
            return getServiceLevelFutureColumns(mainColumnLabel);
        default:
           return getServiceLevelPastColumns(mainColumnLabel);
    }
}
