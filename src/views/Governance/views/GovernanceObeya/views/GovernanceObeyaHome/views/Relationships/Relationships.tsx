import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@material-ui/core";
import { useRelationships } from "components/RelationshipForm/hooks/useRelationships";
import useStyles, { inlineStyles } from '../Dependencies/components/DependenciesList/Dependencies.styles';
import BaseDataGridStaticColumns from "components/UI/BaseDataGrid/BaseDataGridStaticColumns";
import useDataGridStyles from '../../../../../../../../components/UI/BaseDataGrid/BaseDataGrid.styles';
import { HeaderFormatter } from "../Dependencies/components/DependenciesList/utils";
import { GridRenderCellParams } from "@mui/x-data-grid-pro";
import { startCase } from "lodash";
import { entityTypes, linkTypes } from "components/RelationshipForm/utils/constants";
import { useEffect, useState } from "react";
import { RelationshipEntity } from "components/RelationshipForm/interfaces/interfaces";
import useAuthentication from "hooks/useAuthentication";
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Pivot, PivotItem } from "@fluentui/react";
import _ from "lodash";
import RelationshipFormModal from "components/RelationshipFormModal";
import React from "react";
import { TransitionProps } from "@material-ui/core/transitions";
import RelationshipPreviewModal from "components/RelationshipPreviewModal";
import EmptyState from "../EmptyState";
import DashboardCard from "components/Charts/components/DashboardCard/DashboardCard";
import { ChartSizes } from "components/Charts/components/DashboardCard/interfaces/ChartSizes";
import { Skeleton } from "@material-ui/lab";
import CustomGridPanel from "components/UI/CustomGridPanel";

type RelationshipsProps = {
    obeyaRoomId: string;
    obeyaRoomName: string;
};
export const getBaseColumns = (onClick) => [
    {
        field: 'toName',
        headerName: 'Name',
        renderHeader: HeaderFormatter,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <span
                    style={inlineStyles.dependencyName}
                    className="dependency-name"
                    onClick={onClick}
                >
                    {startCase(params?.row?.toName) || '-'}
                </span>
            );
        },
        flex: 2
    },
    {
        field: 'linkType',
        headerName: 'Link type',
        renderCell: (props) => {
            return <span style={inlineStyles.cell}>{linkTypes.find(i => i.value === props.row.linkType)?.label || '-'}</span>;
        },
        renderHeader: HeaderFormatter,
        flex: 1
    }
];
const Relationships = (props: RelationshipsProps) => {
    const classes = useStyles();
    const datagridClasses = useDataGridStyles();
    const { data: relationships, isLoadingRelationships, updateRelationships, mutate: mutateRelationships } = useRelationships("obeyaRoom", props.obeyaRoomId);
    const [currentRelationshipItem, setCurrentRelationshipItem] = useState<RelationshipEntity>();
    const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
    const [showRelationshipForm, setShowRelationshipForm] = useState<boolean>(false);
    const [shouldDelete, setToggleDelete] = useState<boolean>(false);
    const [value, setValue] = useState('');
    const [confirmDeleteAlertOpen, setconfirmDeleteAlertOpen] = useState<boolean>(
        false,
    );

    const { isAdmin, isPowerUser } = useAuthentication();

    useEffect(() => {
        if (!isLoadingRelationships && relationships && relationships.length > 0) {
            setValue(relationships[0].toType);
        }
    }, [relationships]);
    const onSelectToRemove = (ids) => {
        const [relationshipId] = ids;
        const relationshipItem = (relationships || []).find(d => d.id === relationshipId);

        if (relationshipItem) {
            setCurrentRelationshipItem(relationshipItem);
            setToggleDelete(true);
        } else {
            setCurrentRelationshipItem(undefined);
            setToggleDelete(false);
        }
    };
    const onClickName = () => {
        setShowPreviewModal(true);
    };
    const onRemoveRelationship = () => {
        let relationshipCopy = _.cloneDeep(relationships) || [];
        relationshipCopy = relationshipCopy?.filter(i => i.id !== currentRelationshipItem?.id);
        updateRelationships(
            relationshipCopy,
            relationships || []
        );
        mutateRelationships({ data: relationshipCopy }, false);
    };
    const handleChange = (item) => {
        setValue(item.props.itemKey);
    };
    const listedColumns = getBaseColumns(onClickName);
    return (
        <Box display="flex" flexDirection="column" flexGrow={1}>
            {isLoadingRelationships ?
                <Skeleton variant="rect" height={250} /> :
                relationships && relationships.length > 0 ?
                    <DashboardCard
                        title={""}
                        size={ChartSizes.full}
                        fullScreen={false}
                        useModalOpenProps={false}
                    >
                        <Box className={classes.container}>
                            <Pivot
                                aria-label="Relationship tabs"
                                selectedKey={value}
                                onLinkClick={handleChange}
                                headersOnly={true}
                                linkFormat="links"
                                linkSize="normal"
                            >
                                {relationships && _.uniq(relationships.map(i => i.toType)).map((type) => {
                                    const typeLabel = entityTypes.find(i => i.value === type)?.pluralLabel;
                                    return <PivotItem key={type} headerText={typeLabel} itemKey={type} />;
                                }
                                )}
                            </Pivot>
                            <BaseDataGridStaticColumns
                                boxClassName={datagridClasses.box}
                                className={classes.dataGrid}
                                data={(relationships && relationships.filter(i => i.toType === value)) || []}
                                columns={listedColumns}
                                hideFooter
                                onSelectionModelChange={onSelectToRemove}
                                loading={relationships?.length === 0}
                                disableMultipleSelection={true}
                                components={{
                                    Toolbar: () => (
                                        <Box className={classes.actionsContainers}>
                                            {(isAdmin || isPowerUser) && (
                                                <>
                                                    <Button
                                                        aria-label="Add Link"
                                                        onClick={() => { setShowRelationshipForm(true); }}
                                                        disabled={!(isAdmin || isPowerUser)}
                                                    >
                                                        <AddIcon />
                                                        Add new
                                                    </Button>
                                                    <Button
                                                        onClick={onRemoveRelationship}
                                                        disabled={!shouldDelete}
                                                    >
                                                        <DeleteOutlineIcon />
                                                        Delete
                                                    </Button>
                                                </>
                                            )}
                                        </Box>
                                    ),
                                    Panel: CustomGridPanel
                                }}
                            />
                        </Box>
                    </DashboardCard> :
                    <EmptyState
                        message="Seems like there are no links to show"
                        buttonText="Add link"
                        onClickButton={(isAdmin || isPowerUser) ? () => { setShowRelationshipForm(true); } : () => ({})}
                        disabled={!(isAdmin || isPowerUser)}
                    />}
            <RelationshipFormModal
                elementId={props.obeyaRoomId}
                elementType={"obeyaRoom"}
                relationships={relationships || []}
                isLoadingRelationships={isLoadingRelationships}
                mutateRelationships={mutateRelationships}
                updateRelationships={updateRelationships}
                openRelationshipForm={showRelationshipForm}
                setOpenRelationshipForm={setShowRelationshipForm}
                elementName={props.obeyaRoomName}
                mergeAddAndSave={true}
            />
            <RelationshipPreviewModal
                entityId={currentRelationshipItem?.toId || ''}
                entityName={currentRelationshipItem?.toName || ''}
                entityType={currentRelationshipItem?.toType || ''}
                openPreviewModal={showPreviewModal}
                setOpenPreviewModal={setShowPreviewModal}
            />
            <Dialog
                open={confirmDeleteAlertOpen}
                onClose={() => {
                    setconfirmDeleteAlertOpen(false);
                }}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure you want to delete this Risk?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {currentRelationshipItem?.toName}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setconfirmDeleteAlertOpen(false);
                    }} color="primary">
                        No
                    </Button>
                    <Button onClick={onRemoveRelationship} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any>; },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default Relationships;