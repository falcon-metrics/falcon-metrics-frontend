import { Controller, useFormContext } from "react-hook-form";
import { OKRKeyResult } from "views/Governance/views/GovernanceObeya/utils";

// import { useState } from "react";
// import { useInitiatives } from "../../../../LeanPortfolio/views/LeanPortfolioBoard/hooks/useInitiatives";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import CheckBoxCompleted from "./CheckBoxCompleted";
import DeleteButton from "./DeleteButton";
import Input from "./Input";
// import { AutoCompleteField } from "./ParentWorkItemOption";

export const useStyles = makeStyles((theme) => ({
  autoComplete: {
    position: "relative",
    width: "100%",
    paddingRight: 4,
    paddingBottom: "0px !important",
  },
  includeChildren: {
    display: "inline-flex",
    alignItems: "center",
    marginRight: 4,
    fontFamily: "Open Sans",
  },
  krTextLabel: {
    fontFamily: "Open Sans",
    marginLeft: 4,
  },
  checkboxIncludeChildren: {
    padding: 0,
    color: "#757575",
  },
  descriptionInput: {
    fontFamily: "Open Sans",
    marginTop: 2,
    paddingRight: 4,
  },
  autoCompleteTextField: {
    marginTop: 0,
    marginLeft: 2,
    paddingBottom: "0px !important",
  },
  ratings: {
    width: "100%",
    fontFamily: "Open Sans",
  },
  parentWorkItemLoad: {
    position: "absolute",
    top: 4,
    right: 26,
  },
  arrow: {
    position: "absolute",
    right: 2,
    width: 14,
    height: 14,
  },
  workItemText: {
    fontWeight: "bold",
    fontSize: 13,
    width: 90,
    fontFamily: "Open Sans",
  },
  paper: {
    width: "68vh",
    height: 240,
    overflowY: "hidden",
    backgroundColor: theme.palette.background.paper,
    borderRadius: 6,
    padding: "40px 38px 60px 42px",
    outline: 0,
    "&:focus": {
      outline: 0,
    },
    overflow: "auto",
  },
  tooltip: {
    fontSize: 14,
  },
  parentWorkItemInput: {
    width: 311,
    marginLeft: 5,
    height: 29,
    border: 0,
    borderBottom: "1px solid #949494",
    fontFamily: "Open Sans",
    fontsize: 15,
    outline: "none",
    "&:focus": {
      outline: "none",
    },
  },
}));

type Props = {
  fields: OKRKeyResult[];
  removeKR: (index: number) => void;
  setValue: any;
  updateFieldsItem: (index: number, obj: OKRKeyResult) => void;
};

const KeyResults = ({
  fields,
  removeKR,
}: // updateFieldsItem,
Props) => {
  // const [keyResultIndex, setKeyResultIndex] = useState<number | undefined>();

  // const { obeyaRoomData } = useInitiatives();

  // const initiatives = obeyaRoomData.map(item => {
  //   return {
  //     initiativeId: item.roomId,
  //     initiativeTitle: item.roomName
  //   }
  // });

  const classes = useStyles();

  const { control } = useFormContext();

  return (
    <>
      {fields.map((keyResultField, index) => {
        // const defaultAutoCompleteValue = initiatives.find(initiative => initiative?.initiativeId === keyResultField?.initiativeId);
        return (
          <div key={keyResultField.keyResultId}>
            <input
              type="hidden"
              id="keyResultId"
              key={keyResultField.keyResultId}
              name={`keyResults.${index}.keyResultId`}
              defaultValue={keyResultField.keyResultId}
            />
            <input
              type="hidden"
              id="datasourceId"
              name={`keyResults.${index}.datasourceId`}
            />
            <Grid container>
              <Grid item xs={7} container direction="column">
                <Input
                  fullWidth
                  required
                  inputProps={{
                    style: {
                      fontSize: 14,
                      fontFamily: "Open Sans",
                    },
                    maxLength: 250,
                  }}
                  className={classes.descriptionInput}
                  control={control}
                  name={`keyResults.${index}.keyResultDescription`}
                  defaultValue={keyResultField.keyResultDescription}
                />
              </Grid>
              {/* <Grid item xs={4} direction="column" justifyContent="center"> */}
              {/* <Box className={classes.autoComplete}>
                  <AutoCompleteField
                    defaultAutoCompleteValue={defaultAutoCompleteValue}
                    loadingParentWorkItems={false}
                    parentWorkItemsOptions={initiatives}
                    loading={loading}
                    updateIdAndTitle={(
                      initiativeId: string,
                      initiativeTitle: string
                    ) =>
                      updateFieldsItem(index, {
                        ...keyResultField,
                        initiativeId,
                        initiativeTitle
                      })
                    }
                    currentIndex={index}
                    setKeyResultIndex={setKeyResultIndex}
                    keyResultIndex={keyResultIndex}
                  /> */}
              {/* <Box
                    className={classes.includeChildren}
                    style={{ width: "800px" }}
                  >
                    <RelatedAndChildrenOfRelated
                      values={!isLoading ? obeyaLinkTypes : []}
                      control={control}
                      inputRelatedName={`keyResults.${index}.includeRelated`}
                      inputChildrenOfRelatedName={`keyResults.${index}.includeChildren`}
                      multiselectLinkTypeName={`keyResults.${index}.linkTypes`}
                      defaultLinkTypeValue={fields[index]?.linkTypes || []}
                      defaultRelatedValue={keyResultField.initiativeId !== "" &&
                        keyResultField.includeRelated}
                      defaultChildrenOfRelatedValue={keyResultField.includeChildren}
                      shouldReset={!!getValues()?.[index]?.includeRelated}
                      setValue={setValue}
                      wrapperRelated={(children) => (
                        <Box display="flex" alignItems="center" mt={1}>
                          {children}
                        </Box>
                      )}
                      disabled={keyResultField.initiativeId === ""}
                      customWidth={295}
                      hidden={true}
                      name={`keyResults.${index}.linkTypes`}
                      defaultValue={fields[index]?.linkTypes} />
                  </Box> */}
              {/* </Box> */}
              {/* </Grid> */}
              {/* <Grid
                item
                xs={2}
                direction="column"
                justify="center"
                style={{ paddingRight: "5px" }}
              >
                <Controller
                  render={({ field }) => {
                    return (
                      <Select className={classes.ratings} required {...field}>
                        <MenuItem value="1" selected>
                          Level 1
                        </MenuItem>
                        <MenuItem value="2">Level 2</MenuItem>
                        <MenuItem value="3">Level 3</MenuItem>
                        <MenuItem value="4">Level 4</MenuItem>
                        <MenuItem value="5">Level 5</MenuItem>
                      </Select>
                    );
                  }}
                  name={`keyResults.${index}.childItemLevel`}
                  control={control}
                  defaultValue={fields[index]?.childItemLevel}
                />
              </Grid> */}
              <Grid
                item
                xs={3}
                direction="column"
                // style={{ paddingRight: "25px" }}
                style={{ marginLeft: 10 }}
              >
                <Controller
                  render={({ field }) => {
                    return (
                      <Select className={classes.ratings} required {...field}>
                        <MenuItem value="1">On Track</MenuItem>
                        <MenuItem value="2">Behind</MenuItem>
                        <MenuItem value="3">At Risk</MenuItem>
                        <MenuItem
                          value="4"
                          disabled
                          style={{ display: "none" }}
                        >
                          Not Rated
                        </MenuItem>
                      </Select>
                    );
                  }}
                  name={`keyResults.${index}.ratingId`}
                  control={control}
                  defaultValue={fields[index]?.ratingId}
                />
              </Grid>
              <Grid
                item
                xs={1}
                container
                direction="column"
                justifyContent="flex-start"
                alignContent="flex-start"
              >
                <div
                  style={{
                    width: "250px",
                    marginLeft: 28,
                    display: "flex",
                    alignItems: "baseline",
                    position: "relative",
                  }}
                >
                  <CheckBoxCompleted
                    name={`keyResults.${index}.completed`}
                    defaultValue={keyResultField.completed}
                    control={control}
                  />
                  <Box
                    style={{
                      alignItems: "baseline",
                      marginLeft: 14,
                      marginBottom: 2,
                    }}
                  >
                    <Box style={{ position: "absolute", top: 0, left: 58 }}>
                      <DeleteButton
                        ariaLabel="Delete Key Result"
                        onClick={() => removeKR(index)}
                      />
                    </Box>
                  </Box>
                </div>
              </Grid>
            </Grid>
            <br />
          </div>
        );
      })}
    </>
  );
};

export default KeyResults;
