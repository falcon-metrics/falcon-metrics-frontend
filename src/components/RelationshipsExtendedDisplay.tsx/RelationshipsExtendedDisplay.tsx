import { Box, Typography } from "@material-ui/core";
import { useRelationships } from "components/RelationshipForm/hooks/useRelationships";
import _ from "lodash";
import { useEffect, useState } from "react";
import { entityTypes, linkTypes } from "components/RelationshipForm/utils/constants";
import { Pivot, PivotItem } from "@fluentui/react";
import RelationshipFormModal from "components/RelationshipFormModal";
import { Skeleton } from "@material-ui/lab";
import RelationshipPreviewModal from "components/RelationshipPreviewModal";
import { RelationshipEntity } from "components/RelationshipForm/interfaces/interfaces";
import useAuthentication from "hooks/useAuthentication";
import AddIcon from '@material-ui/icons/Add';
import { EditIcon, IconButtonWrapper } from "views/Strategies/views/StrategiesPage/StrategiesPage.styles";

type RelationshipsExtendedDisplayProps = {
    elementId: string;
    elementType: string;
    elementName: string;
};
interface TabPanelProps {
    children?: React.ReactNode;
    index: string;
    value: string;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box style={{ marginTop: 25, backgroundColor: '#F6F6F6' }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const RelationshipsExtendedDisplay = (props: RelationshipsExtendedDisplayProps) => {
    const [value, setValue] = useState('');
    const [openRelationshipForm, setOpenRelationshipForm] = useState<boolean>(false);
    const [selectedRelationship, setSelectedRelationship] = useState<RelationshipEntity>();
    const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
    const { isAdmin, isPowerUser } = useAuthentication();
    const { data: relationships, isLoadingRelationships, updateRelationships, mutate: mutateRelationships } = useRelationships(props.elementType, props.elementId || '');
    const handleChange = (item) => {
        setValue(item.props.itemKey);
    };
    useEffect(() => {
        if (relationships && relationships.length) {
            setValue(_.uniq(relationships.map(i => i.toType))[0]);
        }
    }, [relationships]);

    return (
        <>
            {!isLoadingRelationships ?
                relationships && relationships.length > 0 ?
                    <Box sx={{ width: '100%', marginTop: 25 }}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                            <Box
                                style={{ height: 30 }}>
                                {(isAdmin || isPowerUser) &&
                                    <IconButtonWrapper aria-label="edit" onClick={() => { setOpenRelationshipForm(true); }}>
                                        <EditIcon />
                                    </IconButtonWrapper>
                                }
                            </Box>
                        </Box>
                        {relationships && _.uniq(relationships.map(i => i.toType)).map((type, index) => {
                            const relationshipsFiltered = relationships.filter(i => i.toType === type);
                            return <TabPanel value={value} index={type} key={index}>
                                {relationshipsFiltered.map((i, idx) =>
                                    <Typography
                                        style={{ marginLeft: 20, color: '#0077C8', borderBottom: '1px solid #F0F0F0', padding: 8, cursor: 'pointer' }} key={idx}
                                        onClick={() => { setSelectedRelationship(relationshipsFiltered[idx]); setShowPreviewModal(true); }}>
                                        {linkTypes.find(x => x.value === i.linkType)?.label + ' : ' + i.toName}
                                    </Typography>
                                )}
                            </TabPanel>;
                        })}
                    </Box> : <>
                        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Box
                                style={{ height: 30 }}>
                                {(isAdmin || isPowerUser) &&
                                    <IconButtonWrapper aria-label="edit" onClick={() => { setOpenRelationshipForm(true); }}>
                                        <AddIcon />
                                    </IconButtonWrapper>
                                }
                            </Box>
                        </Box>
                        <Box style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 50, backgroundColor: '#F6F6F6', padding: 10, fontSize: 14, marginBottom: 50 }}>No links to show</Box>
                    </>
                : <Skeleton width={'100%'} height={400} variant="rect" style={{ marginBottom: '20px' }} />
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
        </>
    );
};
export default RelationshipsExtendedDisplay;