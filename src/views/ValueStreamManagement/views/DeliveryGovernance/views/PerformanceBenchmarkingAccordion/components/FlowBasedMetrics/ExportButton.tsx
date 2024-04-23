import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import { Button } from "@material-ui/core";
import SystemUpdateAltRoundedIcon from "@material-ui/icons/SystemUpdateAltRounded";

type Props = {
  columns: any;
  rows: any;
  title: string;
};

const exportToExcel = async (rows, columns, title) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data");

  const headers = columns.map((col) => col.headerName);
  worksheet.addRow(headers);

  const headerRow = worksheet.getRow(1);
  headerRow.eachCell((cell) => {
    cell.font = { bold: true };
  });

  rows.forEach((row) => {
    // Add metric row
    const metricRowData = columns.map((col) => {
      const columnName = col.field;

      if (columnName in row) {
        if (columnName === "contextName") {
          return row[columnName];
        } else {
          return row[columnName].metric;
        }
      } else {
        return "";
      }
    });
    worksheet.addRow(metricRowData);

    // Add comparison row
    const comparisonRowData = columns.map((col) => {
      const columnName = col.field;

      if (columnName in row && columnName !== "contextName" && row[columnName].comparision) {
        const { trendDirection, displayString } = row[columnName].comparision;
        let symbol = "";
        switch (trendDirection) {
          case "Up":
            symbol = "▲";
            break;
          case "Down":
            symbol = "▼";
            break;
          case "Stable":
            symbol = "—";
            break;
          default:
            symbol = "";
            break;
        }

        return `${symbol} ${displayString}`;
      } else {
        return "";
      }
    });
    worksheet.addRow(comparisonRowData);
  });

  // Set custom width
  worksheet.columns.forEach((column) => {
    column.width = 30;
  });

  // Generate Excel file
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), `${title}.xlsx`);
};

const ExportButton = ({ columns, rows, title }: Props) => {
  const handleExport = () => {
    exportToExcel(rows, columns, title);
  };

  return (
    <Button onClick={handleExport} color="primary">
      <SystemUpdateAltRoundedIcon fontSize="small" />
      &nbsp; Export
    </Button>
  );
};

export default ExportButton;
