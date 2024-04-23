import { Element } from "react-scroll";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

import Tooltip from "@material-ui/core/Tooltip";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { DataGridPro, GridCellParams, GridColumns } from "@mui/x-data-grid-pro";

import FieldCell from "./components/FieldCell";
import { SystemField } from "./interfaces/SystemFields";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { useState } from "react";
import { copyToClipboardObeya } from "utils/string";
import { IconButton } from "@material-ui/core";
import CustomGridPanel from "components/UI/CustomGridPanel";

const ObeyaFieldCell = ({ formattedValue }: GridCellParams) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      height: "100%",
    }}
  >
    <span style={{ flex: "0 0" }}>{formattedValue}</span>
    <CopyToClipboardButtonForObeya text={String(formattedValue)} />
  </div>
);

const columns: GridColumns = [
  { field: "displayName", headerName: "Display Name", width: 250 },
  { field: "description", headerName: "Description", width: 350 },
  {
    field: "inputTypeOrAcceptedValues",
    headerName: "Accepted Values",
    width: 250,
  },
  {
    field: "datasourceFieldName",
    headerName: "Query Expression",
    width: 250,
    renderCell: FieldCell,
  },
  { field: "type", headerName: "Type", width: 250 },
];

const columnsObeya: GridColumns = [
  { field: "displayName", headerName: "Display Name", width: 250 },
  {
    field: "inputTypeOrAcceptedValues",
    headerName: "Accepted Values",
    width: 250,
  },
  {
    field: "datasourceFieldName",
    headerName: "Query Expression",
    width: 250,
    renderCell: ObeyaFieldCell,
  },
];

type CopyToClipboardButtonProps = {
  text: string;
};

const CopyToClipboardButtonForObeya = ({ text }: CopyToClipboardButtonProps) => {
  const [wasCopied, setWasCopied] = useState(false);

  const copy = () => {
    copyToClipboardObeya(text);
    setWasCopied(true);
    setTimeout(() => setWasCopied(false), 1500);
  };

  return (
    <Tooltip
      title={wasCopied ? "Copied!" : "Copy To Clipboard"}
      placement="top"
      open={wasCopied || undefined}
    >
      <IconButton size="small" onClick={copy} style={{ width: 22, height: 22, marginTop: 16 }}>
        <FileCopyOutlinedIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );
};
const totalWidth = columns.reduce((res, c) => res + (c.width ?? 0), 0) + 2;

export const useStyles = makeStyles((theme) =>
  createStyles({
    userGuideTitle: {
      fontFamily: "Open Sans",
      fontSize: 22,
      fontWeight: 700,
    },
    defaultParagraph: {
      fontFamily: "Open Sans",
    },
    systemFieldContainer: {
      border: "1px solid #707070",
      width: 300,
      fontFamily: "Open Sans",
      color: "#707070",
    },
    systemFieldCell: {
      border: "1px solid #707070",
      padding: 4,
    },
    section: {
      width: "100%",
      padding: theme.spacing(4),
      fontFamily: "Open Sans",
    },
    dataGridContainer: {
      overflow: "auto",
      maxWidth: "80vw",
      maxHeight: "80vh",
    },
    dataGrid: {
      width: totalWidth,
    },
  })
);

export type FieldTypes = "Custom" | "Falcon Metrics";

export type SystemFieldWithType = {
  type: FieldTypes;
  id: string;
} & SystemField;

interface Props {
  fields: SystemFieldWithType[];
  isValidating: boolean;
  isLoadFromObeya?: boolean;
}

function FQLAuxiliaryTable({ fields, isValidating, isLoadFromObeya }: Props) {
  const classes = useStyles();

  if (!fields?.length) {
    return null;
  }

  return (
    <>
      {fields.length > 0 && (
        <Element name="user-guide" tabIndex={1}>
          {!isLoadFromObeya && (
            <Box mt={6}>
              <Typography
                paragraph
                variant="h6"
                align="center"
                className={classes.userGuideTitle}
              >
                Reference Table for Filter Expression
              </Typography>
            </Box>
          )}
          <Box mb={4}>
            {isLoadFromObeya ? (
              <DataGridPro
                loading={isValidating}
                columns={columnsObeya}
                rows={fields}
                autoHeight
                hideFooter
                components={{ Panel: CustomGridPanel }}
              />
            ) : (
              <Paper component="section" className={classes.section}>
                <Box className={classes.dataGridContainer}>
                  <DataGridPro
                    className={classes.dataGrid}
                    loading={isValidating}
                    columns={columns}
                    rows={fields}
                    autoHeight
                    hideFooter
                    components={{ Panel: CustomGridPanel }}
                  />
                </Box>
              </Paper>
            )}
          </Box>
        </Element>
      )}
    </>
  );
}

export default FQLAuxiliaryTable;
