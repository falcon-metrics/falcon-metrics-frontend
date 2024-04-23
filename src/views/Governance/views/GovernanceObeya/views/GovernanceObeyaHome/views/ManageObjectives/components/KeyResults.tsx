/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @deprecated
 * 
 * Not in use. Looks like a duplicate of KeyResultsGrid. 
 * Leaving this here just in case we decided to delete
 */

import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import debounce from "lodash/debounce";
import uniqBy from "lodash/uniqBy";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { AutoCompleteField } from "./ParentWorkItemOption";
import { useParentWorkItem } from "views/Governance/views/GovernanceObeya/hooks/useParentWorkItem";
import { useObeyaLinkTypes } from "views/Governance/views/GovernanceObeya/hooks/useObeyaLinkTypes";
import { useObjectivesFormContext } from "../FormContext";
import CheckBoxCompleted from "./CheckBoxCompleted";
import DeleteButton from "./DeleteButton";
import Input from "./Input";
import { OKRKeyResult } from "views/Governance/views/GovernanceObeya/utils";
import { RelatedAndChildrenOfRelated } from "../../../../GovernanceObeyaRoom/RelatedAndChildrenOfRelated";
import { useParentWorkItemStyles } from "./styles";

type Props = {
  fields: OKRKeyResult[] | undefined;
  obeyaRoomId?: string;
  removeKR: (index: number) => void;
  setValue: any;
  updateFieldsItem: (index: number, obj: OKRKeyResult) => void;
  existingData: OKRKeyResult[] | undefined;
};

const KeyResults = ({
  fields,
  obeyaRoomId,
  removeKR,
  existingData,
  setValue,
  updateFieldsItem,
}: Props) => {
  // const classes = useParentWorkItemStyles();
  // const { methods } = useObjectivesFormContext();
  // const [keyResultIndex, setKeyResultIndex] = useState(null); // Using null instead of undefined
  // const {
  //   searchParentWorkItem,
  //   data: parentWorkitemOptions,
  //   loading: loadingParentWorkItems,
  // } = useParentWorkItem(obeyaRoomId);
  // const {
  //   data: { obeyaLinkTypes },
  //   isLoading,
  // } = useObeyaLinkTypes(obeyaRoomId);
  // const { control, getValues } = methods;

  // const onSearch = debounce(searchParentWorkItem, 600);

  // const parentWorkItemsOptions = uniqBy(
  //   [...(parentWorkitemOptions || []), ...[]].filter((keyResult) => {
  //     return keyResult?.parentWorkItemId && keyResult.parentWorkItemTitle;
  //   }),
  //   (keyResult) => keyResult.parentWorkItemId
  // );

  // useEffect(() => {
  //   if (existingData) {
  //     existingData.forEach((keyResult, index) => {
  //       setValue(`keyResults.${index}.keyResultId`, keyResult.keyResultId);
  //       setValue(`keyResults.${index}.keyResultDescription`, keyResult.keyResultDescription);
  //       setValue(`keyResults.${index}.includeRelated`, keyResult.includeRelated);
  //       setValue(`keyResults.${index}.includeChildren`, keyResult.includeChildren);
  //       setValue(`keyResults.${index}.childItemLevel`, keyResult.childItemLevel);
  //       setValue(`keyResults.${index}.linkTypes`, keyResult.linkTypes);
  //       setValue(`keyResults.${index}.ratingId`, keyResult.ratingId);
  //       setValue(`keyResults.${index}.ratingDescription`, keyResult.ratingDescription);
  //       setValue(`keyResults.${index}.parentWorkItemId`, keyResult.parentWorkItemId);
  //       setValue(`keyResults.${index}.parentWorkItemTitle`, keyResult.parentWorkItemTitle);
  //     });
  //   }
  // }, [existingData, setValue]);

  return (
    <>
      {/* {fields?.map((keyResultField, index) => (
        <div
          key={keyResultField.keyResultId}
          style={{ flex: 1, height: 160 }}
        >
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
                    defaultRelatedValue={
                      keyResultField.parentWorkItemId !== "" &&
                      keyResultField.includeRelated
                    }
                    defaultChildrenOfRelatedValue={
                      keyResultField.includeChildren
                    }
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
                  />
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              direction="column"
              justifyContent="center"
              style={{ paddingRight: "5px" }}
            >
              <Controller
                render={({ field }) => (
                  <Select className={classes.ratings} required {...field}>
                    <MenuItem value="1" selected>
                      Level 1
                    </MenuItem>
                    <MenuItem value="2">Level 2</MenuItem>
                    <MenuItem value="3">Level 3</MenuItem>
                    <MenuItem value="4">Level 4</MenuItem>
                    <MenuItem value="5">Level 5</MenuItem>
                  </Select>
                )}
                name={`keyResults.${index}.childItemLevel`}
                control={control}
                defaultValue={keyResultField.childItemLevel}
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
                render={({ field }) => (
                  <Select className={classes.ratings} required {...field}>
                    <MenuItem value="4" disabled style={{ display: "none" }}>
                      Not Rated
                    </MenuItem>
                    <MenuItem value="1">On Track</MenuItem>
                    <MenuItem value="2">Behind</MenuItem>
                    <MenuItem value="3">At Risk</MenuItem>
                  </Select>
                )}
                name={`keyResults.${index}.ratingId`}
                control={control}
                defaultValue={keyResultField.ratingId}
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
      ))} */}
    </>
  );
};

export default KeyResults;
