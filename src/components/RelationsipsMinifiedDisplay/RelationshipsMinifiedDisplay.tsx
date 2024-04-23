import RelationshipsExtendedDisplay from "components/RelationshipsExtendedDisplay.tsx/RelationshipsExtendedDisplay";
import BaseModal from "components/UI/BaseModal/BaseModal2";
import { useState } from "react";
import RelationshipsIcon from "components/RelationshipForm/components/RelationshipsIcon/RelationshipsIcon";
import { Box, IconButton, Tooltip } from "@material-ui/core";

type RelationshipsMinifiedDisplayProps = {
    elementId: string;
    elementType: string;
    elementName: string;
    color?: string;
};

const RelationshipsMinifiedDisplay = (props: RelationshipsMinifiedDisplayProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    return (
        <>
            <Box onClick={() => setIsModalOpen(!isModalOpen)}>
                <Tooltip title="Links">
                    <IconButton size="small" style={{ padding: 0 }}>
                        <RelationshipsIcon cursor="pointer" color={props.color} fontSize={14} />
                    </IconButton>
                </Tooltip>
            </Box>
            <BaseModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                title={<><Box style={{ marginRight: 10, fontSize: 24 }}><RelationshipsIcon /></Box>Links</>}
                maxWidth="md"
                disableBackdropClick
                disableEscKeyDown
            >
                <RelationshipsExtendedDisplay {...props} />
            </BaseModal>
        </>
    );
};

export default RelationshipsMinifiedDisplay;