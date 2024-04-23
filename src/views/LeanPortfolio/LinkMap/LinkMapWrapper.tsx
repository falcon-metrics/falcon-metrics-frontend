import { Box, Grid } from '@material-ui/core';
import 'reactflow/dist/style.css';
import { useState } from 'react';
import RelationshipPreviewModal from 'components/RelationshipPreviewModal';
import LinkMapContextWrapper from './components/LinkMapContextWrapper';
import TopBar from '../components/TopBar';

const LinkMapWrapper = () => {
    const [entityId, setEntityId] = useState<string>();
    const [entityName, setEntityName] = useState<string>();
    const [entityType, setEntityType] = useState<string>();
    const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
    const [showChildren, setShowChildren] = useState<boolean>(true);
    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <TopBar showContext={true} showIncludeChildren={true} setShowChildren={setShowChildren} showChildren={showChildren} />

                <Box height={'790px'} width={'100%'}>
                    <LinkMapContextWrapper
                        entityId={entityId || ''}
                        setEntityId={setEntityId}
                        entityName={entityName || ''}
                        setEntityName={setEntityName}
                        entityType={entityType || ''}
                        setEntityType={setEntityType}
                        setShowPreviewModal={setShowPreviewModal}
                        showChildren={showChildren}
                    />
                </Box>
                <RelationshipPreviewModal
                    entityId={entityId || ''}
                    entityName={entityName || ''}
                    entityType={entityType || ''}
                    openPreviewModal={showPreviewModal}
                    setOpenPreviewModal={setShowPreviewModal}
                />
            </Grid>
        </>
    );
};

export default LinkMapWrapper;