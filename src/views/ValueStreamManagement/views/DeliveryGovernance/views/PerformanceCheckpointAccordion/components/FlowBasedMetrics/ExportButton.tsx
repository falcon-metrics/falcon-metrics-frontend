import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import { Button } from "@material-ui/core";
import SystemUpdateAltRoundedIcon from '@material-ui/icons/SystemUpdateAltRounded';

type Props = {
  columns: any;
  rows: any;
  title: string;
};

const exportToExcel = async (rows, columns, title) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Performance Checkpoint");

  const headers = columns.map((col) => col.headerName);
  worksheet.addRow(headers);

  const headerRow = worksheet.getRow(1);
  headerRow.eachCell((cell) => {
    cell.font = { bold: true };
  });

  rows.forEach((row) => {
    const rowData = columns.map((col) => {
      const columnName = col.field;

      if (columnName === "Comparison") {
        // Render symbol based on trend direction
        const { trendDirection, displayString } = row[columnName];
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
        return row[columnName];
      }
    });

    worksheet.addRow(rowData);
  });

  // Set custom width
  worksheet.columns.forEach((column, index) => {
    const lengths = rows.map(row => (columns[index].field === "Comparison" ? `${row[columns[index].field].displayString}` : `${row[columns[index].field]}`));
    const maxLength = lengths.reduce((max, current) => Math.max(max, current.length), 0);
    column.width = maxLength < 15 ? 30 : maxLength + 10;
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
      <SystemUpdateAltRoundedIcon fontSize="small" />&nbsp; Export
    </Button>
  );
};

export default ExportButton;
