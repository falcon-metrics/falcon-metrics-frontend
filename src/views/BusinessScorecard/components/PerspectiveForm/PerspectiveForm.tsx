import { Box, TextField, Button } from "@material-ui/core";
import _ from "lodash";
import { Perspective } from "views/BusinessScorecard/interfaces/interfaces";
import { v4 as uuidV4 } from "uuid";
import { useState, useEffect } from "react";

type PerspectiveFormProps = {
  perspectiveModalData: Perspective;
  setPerspectiveModalData: any;
  openPerspectiveModal: boolean;
  setOpenPerspectiveModal: any;
  perspectives: Perspective[];
  setPerspectives: any;
  onSavePerspectives: any;
  isDirty: boolean;
  setFormDirty: (val: boolean) => void;
};

const PerspectiveForm = (props: PerspectiveFormProps) => {
  const [initialFormData, setInitialFormData] = useState<Perspective>(
    props.perspectiveModalData
  );

  useEffect(() => {
    setInitialFormData(props.perspectiveModalData);
  }, [props.perspectiveModalData]);
  
  useEffect(() => {
    const isDirty = !_.isEqual(props.perspectiveModalData, initialFormData);
    props.setFormDirty(isDirty);
  }, [props.perspectiveModalData]);

  return (
    <Box style={{ display: "flex", paddingTop: 25, flexDirection: "column" }}>
      <TextField
        id="perspective-name"
        size="medium"
        fullWidth
        variant="standard"
        label="Perspective name"
        value={props.perspectiveModalData?.name}
        onChange={(event) => {
          props.setPerspectiveModalData({
            ...props.perspectiveModalData,
            ...{ name: event.target.value },
          });
        }}
      />
      <Box
        style={{
          display: "flex",
          alignContent: "flex-end",
          alignSelf: "flex-end",
          marginTop: 20,
        }}
      >
        <Button
          size="large"
          variant="contained"
          color="primary"
          disabled={!props.isDirty}
          onClick={() => {
            if (props.perspectiveModalData.id === undefined) {
              props.perspectiveModalData.id = uuidV4();
            }
            const perspectivesCopy = _.cloneDeep(props.perspectives);
            const idx = perspectivesCopy.findIndex(
              (i) => i.id === props.perspectiveModalData.id
            );
            idx === -1
              ? perspectivesCopy.push(props.perspectiveModalData)
              : (perspectivesCopy[idx] = props.perspectiveModalData);
            props.setPerspectives(perspectivesCopy);
            props.onSavePerspectives(perspectivesCopy);
            props.setOpenPerspectiveModal(!props.openPerspectiveModal);
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};
export default PerspectiveForm;
