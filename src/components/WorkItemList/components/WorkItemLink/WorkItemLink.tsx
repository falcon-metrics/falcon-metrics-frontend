import Link from "@material-ui/core/Link";
import { GridRenderCellParams } from "@mui/x-data-grid-pro";

const WorkItemLink = ({ value }: GridRenderCellParams) => {
  
  return (
    <>
      <Link style={{ cursor: "pointer" }}>
        {value}
      </Link>
    </>
  );
};

export default WorkItemLink;
