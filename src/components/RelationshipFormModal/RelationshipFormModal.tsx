import { Box, Button, styled } from "@material-ui/core";
import RelationshipForm from "components/RelationshipForm/RelationshipForm";
import RelationshipsIcon from "components/RelationshipForm/components/RelationshipsIcon/RelationshipsIcon";
import { RelationshipEntity } from "components/RelationshipForm/interfaces/interfaces";
import { entityTypes } from "components/RelationshipForm/utils/constants";
import BaseModal from "components/UI/BaseModal/BaseModal2";
import _ from "lodash";
import { useState, useEffect } from "react";

type RelationshipFormModalProps = {
  relationships: RelationshipEntity[];
  updateRelationships: any;
  mutateRelationships: any;
  elementId: string;
  elementType: string;
  elementName: string;
  isLoadingRelationships: boolean;
  openRelationshipForm: boolean;
  setOpenRelationshipForm: any;
  mergeAddAndSave?: boolean;
};

const SaveButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  position: "absolute",
  bottom: 25,
  right: 30,
  width: "100%",
  background: "#fcfcfc",
  paddingTop: 10,
});

const RelationshipFormModal = (props: RelationshipFormModalProps) => {
  const [currentRelationshipsData, setCurrentRelationshipsData] = useState<
    RelationshipEntity[]
  >([]);

  useEffect(() => {
    if (props.relationships) {
      setCurrentRelationshipsData(props.relationships);
    }
  }, [props.relationships]);

  const saveRelationships = (currentRelationshipsDataParam = undefined) => {
    const updatedData = currentRelationshipsDataParam
      ? currentRelationshipsDataParam
      : currentRelationshipsData;
    props.setOpenRelationshipForm(false);
    props.updateRelationships(updatedData, props.relationships || []);
    props.mutateRelationships({ data: updatedData }, false);
  };

  const [isFormDirty, setIsFormDirty] = useState(false);
  
  useEffect(() => {
    const isDirty = !_.isEqual(currentRelationshipsData, props.relationships);
    setIsFormDirty(isDirty);
  }, [currentRelationshipsData, props.relationships]);

  return (
    <BaseModal
      open={props.openRelationshipForm}
      setOpen={(val) => {
        // On modal close, reset the table state to the initial state
        if (val === false) {
          setCurrentRelationshipsData([...props.relationships]);
        }
        props.setOpenRelationshipForm(val);
      }}
      maxWidth="lg"
      disableBackdropClick
      disableEscKeyDown={!isFormDirty}
      isFormDirty={isFormDirty}
      title={
        <>
          <Box style={{ marginRight: 10 }}>
            <RelationshipsIcon />
          </Box>
          {"Links for " +
            entityTypes.find((i) => i.value === props.elementType)?.label}
        </>
      }
    >
      <RelationshipForm
        elementId={props.elementId || ""}
        elementType={props.elementType}
        elementName={props.elementName}
        isLoading={props.isLoadingRelationships}
        currentRelationshipsData={currentRelationshipsData}
        setCurrentRelationshipsData={setCurrentRelationshipsData}
        afterAddHook={props.mergeAddAndSave ? saveRelationships : undefined}
      />
      {!props.mergeAddAndSave && (
        <SaveButtonContainer>
          <Button
            onClick={() => {
              saveRelationships();
            }}
            size="large"
            variant="contained"
            color="primary"
            type="submit"
            disabled={!isFormDirty}
          >
            Save
          </Button>
        </SaveButtonContainer>
      )}
    </BaseModal>
  );
};

export default RelationshipFormModal;
