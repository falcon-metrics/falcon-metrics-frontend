import { useState } from "react";

import debounce from "lodash/debounce";
import uniqBy from "lodash/uniqBy";
import { Controller, useFormContext } from "react-hook-form";
import { useParentWorkItem } from "views/Governance/views/GovernanceObeya/hooks/useParentWorkItem";
import { OKRKeyResult } from "views/Governance/views/GovernanceObeya/utils";
import { RelatedAndChildrenOfRelated } from "views/Governance/views/GovernanceObeya/views/GovernanceObeyaRoom/RelatedAndChildrenOfRelated";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

import { useObeyaLinkTypes } from "views/Governance/views/GovernanceObeya/hooks/useObeyaLinkTypes";
import CheckBoxCompleted from "./components/CheckBoxCompleted";
import DeleteButton from "./components/DeleteButton";
import { AutoCompleteField } from "./components/ParentWorkItemOption";
import Input from "./components/Input";

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
  obeyaRoomId?: string;
  removeKR: (index: number) => void;
  setValue: any;
  updateFieldsItem: (index: number, obj: OKRKeyResult) => void;
};

const KeyResultsGrid = ({
  fields,
  obeyaRoomId,
  removeKR,
  setValue,
  updateFieldsItem,
}: Props) => {
  const classes = useStyles();
  const [keyResultIndex, setKeyResultIndex] = useState<number | undefined>();
  const {
    searchParentWorkItem,
    data: parentWorkitemOptions,
    loading: loadingParentWorkItems,
  } = useParentWorkItem(obeyaRoomId);

  const onSearch = debounce(searchParentWorkItem, 600);

  const parentWorkItemsOptions = uniqBy(
    [...(parentWorkitemOptions || []), ...[]].filter((keyResult) => {
      return keyResult?.parentWorkItemId && keyResult.parentWorkItemTitle;
    }),
    (keyResult) => keyResult.parentWorkItemId
  );

  const { control, getValues, register } = useFormContext();

  const {
    data: { obeyaLinkTypes },
    isLoading,
  } = useObeyaLinkTypes(obeyaRoomId);

  return (
    <>
      {fields.map((keyResultField, index) => {
        return (
          <div key={keyResultField.keyResultId} style={{ height: 160 }}>
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
              <Grid item xs={4} container direction="column">
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
              <Grid item xs={3} direction="column" justifyContent="center">
                <Box className={classes.autoComplete}>
                  <AutoCompleteField
                    loadingParentWorkItems={loadingParentWorkItems}
                    parentWorkItemsOptions={parentWorkItemsOptions}
                    field={keyResultField}
                    updateIdAndTitle={(
                      parentWorkItemId: string,
                      parentWorkItemTitle: string
                    ) =>
                      updateFieldsItem(index, {
                        ...keyResultField,
                        parentWorkItemId,
                        parentWorkItemTitle,
                      })
                    }
                    currentIndex={index}
                    setKeyResultIndex={setKeyResultIndex}
                    onSearch={onSearch}
                    keyResultIndex={keyResultIndex}
                  />
                  <Box
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
                      defaultRelatedValue={keyResultField.parentWorkItemId !== "" &&
                        keyResultField.includeRelated}
                      defaultChildrenOfRelatedValue={keyResultField.includeChildren}
                      shouldReset={!!getValues()?.[index]?.includeRelated}
                      setValue={setValue}
                      wrapperRelated={(children) => (
                        <Box display="flex" alignItems="center" mt={1}>
                          {children}
                        </Box>
                      )}
                      disabled={keyResultField.parentWorkItemId === ""}
                      customWidth={295}
                      hidden={true}
                      name={`keyResults.${index}.linkTypes`}
                      defaultValue={fields[index]?.linkTypes}
                      register={register} />
                  </Box>
                </Box>
              </Grid>
              <Grid
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
              </Grid>
              <Grid
                item
                xs={2}
                direction="column"
                justify="center"
                style={{ paddingRight: "25px" }}
              >
                <Controller
                  render={({ field }) => {
                    return (
                      <Select className={classes.ratings} required {...field}>
                        <MenuItem value="4" disabled style={{ display: "none" }}>
                          Not Rated
                        </MenuItem>
                        <MenuItem value="1">On Track</MenuItem>
                        <MenuItem value="2">Behind</MenuItem>
                        <MenuItem value="3">At Risk</MenuItem>
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
                <div style={{ width: "250px" }}>
                  <CheckBoxCompleted
                    name={`keyResults.${index}.completed`}
                    defaultValue={keyResultField.completed}
                    control={control}
                  />
                  <DeleteButton
                    ariaLabel="Delete Key Result"
                    onClick={() => removeKR(index)}
                  />
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

export default KeyResultsGrid;
