import { Box, Typography } from "@material-ui/core";
import SkeletonRelationships from "components/RelationshipForm/components/SkeletonRelationships";
import { useRelationships } from "components/RelationshipForm/hooks/useRelationships";
import { entityTypes, linkTypes } from "components/RelationshipForm/utils/constants";
import _ from "lodash";
import RelationshipFormModal from "components/RelationshipFormModal";
import { useState } from "react";
import RelationshipsIcon from "components/RelationshipForm/components/RelationshipsIcon/RelationshipsIcon";
import AddIcon from '@material-ui/icons/Add';
import RelationshipPreviewModal from "components/RelationshipPreviewModal";
import { RelationshipEntity } from "components/RelationshipForm/interfaces/interfaces";
import useAuthentication from "hooks/useAuthentication";
import { AddButtonWrapper, EditIcon } from "views/Strategies/views/StrategiesPage/StrategiesPage.styles";

type RelationshipsExtendedDisplayVerticalProps = {
    elementId: string;
    elementType: string;
    elementName: string;
    customStyle?: any;
    isLoading?: boolean;
    customLabel?: any;
};

const RelationshipsExtendedDisplayVertical = (props: RelationshipsExtendedDisplayVerticalProps) => {
    const { data: relationships, isLoadingRelationships, mutate: mutateRelationships, updateRelationships } = useRelationships(props.elementType, props.elementId || '');
    const [openRelationshipForm, setOpenRelationshipForm] = useState<boolean>(false);
    const [selectedRelationship, setSelectedRelationship] = useState<RelationshipEntity>();
    const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
    const { isAdmin, isPowerUser } = useAuthentication();

    return (
        <Box style={{ width: 350, backgroundColor: '#FEFEFE', height: '100%', padding: 24, fontFamily: 'Open Sans', ...(props.customStyle?.general || {}) }}>
            {isLoadingRelationships || props.isLoading ? <SkeletonRelationships /> :
                relationships && relationships.length > 0 ?
                    <Box>
                        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography style={{ marginBottom: 15, fontSize: 24, fontWeight: 'bold' }}>
                                {!props?.customLabel ? <div style={{ marginRight: 10, float: 'left' }}>
                                    <RelationshipsIcon />
                                </div> : null}
                                {props?.customLabel ? props?.customLabel : entityTypes.find(i => i.value === props.elementType)?.label + ' Links'}
                            </Typography>
                            <Box
                                style={{ height: 30 }}>
                                {(isAdmin || isPowerUser) &&
                                    <AddButtonWrapper aria-label="edit" style={{ ...(props?.customStyle?.editIcon || {}) }} onClick={() => { setOpenRelationshipForm(true); }}>
                                        <EditIcon />
                                    </AddButtonWrapper>
                                }
                            </Box>
                        </Box>
                        {relationships && _.uniq(relationships.map(i => i.toType)).map((type) => {
                            const typeLabel = entityTypes.find(i => i.value === type)?.pluralLabel;
                            const relationshipsFiltered = _.chain(relationships)
                                .filter(i => i.toType === type)
                                .sortBy(i => i.toName)
                                .value();
                            return <Box key={type} style={{ backgroundColor: '#F6F6F6', marginTop: 25, borderRadius: 10 }}>
                                <Typography style={{ marginLeft: 20, borderBottom: '1px solid #F0F0F0', padding: 8, fontSize: 18 }}>{typeLabel}</Typography>
                                {relationshipsFiltered.map((i, idx) =>
                                    <Typography
                                        style={{ marginLeft: 20, color: '#0077C8', borderBottom: '1px solid #F0F0F0', padding: 8, fontSize: 14, cursor: 'pointer' }} key={idx}
                                        onClick={() => { setSelectedRelationship(relationshipsFiltered[idx]); setShowPreviewModal(true); }}>
                                        {linkTypes.find(x => x.value === i.linkType)?.label + ' : ' + i.toName}
                                    </Typography>)}
                            </Box>;
                        })}
                    </Box> :
                    <>
                        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box style={{ display: 'inline-flex' }}>
                                <Typography style={{ marginBottom: 15, fontSize: 24, fontWeight: 'bold' }}>
                                    <div style={{ marginRight: 10, float: 'left' }}><RelationshipsIcon /></div>
                                    Links
                                </Typography>
                            </Box>
                            <Box style={{ display: 'inline-flex', justifyContent: 'end', height: 30 }}>
                                {(isAdmin || isPowerUser) &&
                                    <AddButtonWrapper style={{ ...(props?.customStyle?.editIcon || {}) }} aria-label="edit" onClick={() => { setOpenRelationshipForm(true); }}>
                                        <AddIcon />
                                    </AddButtonWrapper>
                                }
                            </Box>
                        </Box>
                        <Box style={{ fontFamily: 'Open Sans', width: '100%', display: 'flex', justifyContent: 'center', marginTop: 50, backgroundColor: '#F6F6F6', padding: 10, fontSize: 14, color: '#AAAEB1' }}>No links to show</Box>
                    </>
            }
            <RelationshipFormModal
                elementId={props.elementId}
                elementType={props.elementType}
                relationships={relationships || []}
                isLoadingRelationships={isLoadingRelationships}
                mutateRelationships={mutateRelationships}
                updateRelationships={updateRelationships}
                openRelationshipForm={openRelationshipForm}
                setOpenRelationshipForm={setOpenRelationshipForm}
                elementName={props.elementName}
            />
            <RelationshipPreviewModal
                entityId={selectedRelationship?.toId || ''}
                entityName={selectedRelationship?.toName || ''}
                entityType={selectedRelationship?.toType || ''}
                openPreviewModal={showPreviewModal}
                setOpenPreviewModal={setShowPreviewModal}
            />
        </Box>
    );
};
export default RelationshipsExtendedDisplayVertical;