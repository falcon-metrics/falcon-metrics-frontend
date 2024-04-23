import { Box } from "@material-ui/core";
import BaseModal from "components/UI/BaseModal/BaseModal2";
import CommentPreview from "./components/CommentPreview/CommentPreview";
import EventPreview from "./components/EventPreview/EventPreview";
import MetricPreview from "./components/MetricPreview/MetricPreview";
import StrategicDriverPreview from "./components/StrategicDriverPreview/StrategicDriverPreview";
import StrategyKeyResultPreview from "./components/StrategyKeyResultPreview/StrategyKeyResultPreview";
import StrategyObjectivePreview from "./components/StrategyObjectivePreview/StrategyObjectivePreview";
import StrategyPreview from "./components/StrategyPreview/StrategyPreview";
import ObeyaRoomPreview from "./components/ObeyaRoomPreview/ObeyaRoomPreview";
export type PreviewComponentProps = {
    entityType: string;
    entityName: string;
    entityId: string;
};
type RelationshipPreviewModalProps = PreviewComponentProps & {
    openPreviewModal: boolean;
    setOpenPreviewModal: any;
};

const RelationshipPreviewModal = (props: RelationshipPreviewModalProps) => {
    let componentToRender;
    switch (props.entityType) {
        case 'comment':
            componentToRender = <CommentPreview entityId={props.entityId} entityName={props.entityName} entityType={props.entityType} />;
            break;
        case 'event':
            componentToRender = <EventPreview entityId={props.entityId} entityName={props.entityName} entityType={props.entityType} />;
            break;
        case 'metric':
            componentToRender = <MetricPreview entityId={props.entityId} entityName={props.entityName} entityType={props.entityType} />;
            break;
        case 'strategy':
            componentToRender = <StrategyPreview entityId={props.entityId} entityName={props.entityName} entityType={props.entityType} />;
            break;
        case 'strategicDriver':
            componentToRender = <StrategicDriverPreview entityId={props.entityId} entityName={props.entityName} entityType={props.entityType} />;
            break;
        case 'obeyaRoom':
            componentToRender = <ObeyaRoomPreview entityId={props.entityId} entityName={props.entityName} entityType={props.entityType} />;
            break;
        case 'strategicObjective':
            componentToRender = <StrategyObjectivePreview entityId={props.entityId} entityName={props.entityName} entityType={props.entityType} />;
            break;
        case 'strategyKeyResult':
            componentToRender = <StrategyKeyResultPreview entityId={props.entityId} entityName={props.entityName} entityType={props.entityType} />;
            break;
        default:
            componentToRender = <Box>Invalid entity type</Box>;
            break;
    }
    return (
        <BaseModal
            open={props.openPreviewModal}
            setOpen={props.setOpenPreviewModal}
            maxWidth="lg"
            title=''
            disableBackdropClick
            disableEscKeyDown
        >
            {componentToRender}
        </BaseModal>
    );
};
export default RelationshipPreviewModal;