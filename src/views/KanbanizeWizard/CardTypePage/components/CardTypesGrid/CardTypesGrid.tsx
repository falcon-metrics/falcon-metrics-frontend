import { TextField, MenuItem } from "@material-ui/core";
import { GridSelectionModel, DataGridPro } from "@mui/x-data-grid-pro";
import _ from "lodash";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Level } from "../../validation_schema";
import { BoardsAndCardTypesProps } from "../BoardsAccordion/BoardsAccordion";
import React from "react";
import CustomGridPanel from "components/UI/CustomGridPanel";

const CardTypesGrid = ({ boards, methods, setIsDirty }: BoardsAndCardTypesProps) => {

  const { getValues, setValue } = methods;
  const { boardId } = boards;

  const initialSelected = Object.values(boards.cardTypes)
    .filter((ct: any) => ct.checked === true)
    .map((ct: any) => ct.cardTypeId);

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridSelectionModel>(initialSelected);

  // Consider dirtiness only if row is selected
  const handleSleChange = (boardId: string, cardTypeId: string, value: string) => {
    const path = `boards.boardId-${boardId}.cardTypes.cardTypeId-${cardTypeId}.sle`;
    setValue(path, value);

    const checked = _.get(getValues(), `boards.boardId-${boardId}.cardTypes.cardTypeId-${cardTypeId}.checked`);
    if (checked) {
      setIsDirty(true);
    }
  };

  const handleLevelChange = (boardId: string, cardTypeId: string, value: string) => {
    const path = `boards.boardId-${boardId}.cardTypes.cardTypeId-${cardTypeId}.level`;
    setValue(path, value);

    const checked = _.get(getValues(), `boards.boardId-${boardId}.cardTypes.cardTypeId-${cardTypeId}.checked`);
    if (checked) {
      setIsDirty(true);
    }
  };

  const columns = [
    {
      field: 'name', headerName: 'Name', width: 250,
    },
    {
      field: 'level', headerName: 'Level', width: 220,
      renderCell: (params: any) => {
        const cardTypeId = params.row.cardTypeId;
        const boardId = params.row.boardId;
        const level = params.row.level;
        const name = `boards.boardId-${boardId}.cardTypes.cardTypeId-${cardTypeId}.level`;
        return (<Controller
          name={name}
          {...methods}
          defaultValue={level}
          render={({ field, fieldState }) => {
            const error = !!fieldState.error;
            let helperText;
            if (error) helperText = 'Required';
            return (
              <TextField
                select
                {...field}
                error={error}
                helperText={helperText}
                onChange={(e) => handleLevelChange(boardId, cardTypeId, e.target.value)}
                fullWidth
              >
                <MenuItem key={Level.INDIVIDUAL_CONTRIBUTOR} value={Level.INDIVIDUAL_CONTRIBUTOR}>{Level.INDIVIDUAL_CONTRIBUTOR}</MenuItem>
                <MenuItem key={Level.TEAM} value={Level.TEAM}>{Level.TEAM}</MenuItem>
                <MenuItem key={Level.PORTFOLIO} value={Level.PORTFOLIO}>{Level.PORTFOLIO}</MenuItem>
              </TextField>
            );
          }}
        />);

      }
    },
    {
      field: 'sle',
      headerName: 'Service Level Expectation (days) ',
      width: 220,
      renderCell: (params: any) => {
        const cardTypeId = params.row.cardTypeId;
        const boardId = params.row.boardId;
        const sle = params.row.sle;
        return (<Controller
          name={`boards.boardId-${boardId}.cardTypes.cardTypeId-${cardTypeId}.sle`}
          // name={`${board.boardId}.cardTypes.${cardType.cardTypeId}.sle` as string}
          {...methods}
          defaultValue={sle}
          render={({ field, fieldState }) => {
            const error = !!fieldState.error;
            let helperText;
            if (error) helperText = 'Required'; // Must be positive number
            return (
              <TextField
                type="number"
                {...field}
                error={error}
                helperText={helperText}
                onChange={(e) => handleSleChange(boardId, cardTypeId, e.target.value)}
                fullWidth
              />
            );
          }}
        />);

      }
    },
  ];

  const rows: any[] = [];
  Object.keys(boards.cardTypes).forEach((cardTypeId: any) => {
    const cardType = boards.cardTypes[cardTypeId];
    const checked = _.get(getValues(), `boards.boardId-${boardId}.cardTypes.cardTypeId-${cardTypeId}.checked`) === true;
    rows.push({
      ...cardType,
      id: cardType.cardTypeId,
      boardId: boards.boardId,
      checked,
      name: cardType.cardTypeName,
      level: cardType.level,
      sle: cardType.sle
    });
  });

  return (
    <DataGridPro
      rows={rows}
      columns={columns}
      checkboxSelection
      onSelectionModelChange={(selection) => {
        // console.log("🚀 ~ file: CardTypePage.tsx:267 ~ CardTypesGrid ~ selection:", getValues());
        // TODO: Add comment here explaining the cardTypeKey
        Object.keys(boards.cardTypes).forEach((cardTypeKey: any) => {
          const { cardTypeId } = boards.cardTypes[cardTypeKey];
          let value = false;
          if (selection.includes(cardTypeId)) {
            value = true;
          }
          const path = `boards.boardId-${boards.boardId}.cardTypes.cardTypeId-${cardTypeId}.checked`;
          setValue(path, value);
          setRowSelectionModel(selection);
          setIsDirty(true);
        });
      }}
      selectionModel={rowSelectionModel}
      hideFooter={true}
      autoHeight
      disableSelectionOnClick
      components={{ Panel: CustomGridPanel }}
    />
  );

};

export default React.memo(CardTypesGrid);  