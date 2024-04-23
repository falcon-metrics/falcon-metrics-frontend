import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { DataGridPro, GridColumns } from "@mui/x-data-grid-pro";
import fetch, { useCustomSWR } from "core/api/fetch";
import useAuthentication from "hooks/useAuthentication";
import { DateTime } from "luxon";
import Footer from "views/Dashboard/views/Platform/views/Footer";

export const useUser = (userId?: string) => {
  const url = userId ? `/users/${userId}` : null;
  const { data, isValidating, error } = useCustomSWR<any>(url, fetch);
  return { data, isValidating, error };
};

const columns: GridColumns = [
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "addedBy",
    headerName: "Added By",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Added On",
    width: 150,
    renderCell: (params) =>
      DateTime.fromISO(params.row.createdAt).toLocaleString(DateTime.DATE_FULL),
    // .toJSDate().toString()
  },
];

const useStyles = makeStyles(() => {
  const paper = {
    width: "100%",
    height: "85vh",
    padding: "20px",
  };
  return {
    paper,
    paperFull: {
      ...paper,
      height: "100vh",
    },
  };
});

export const UserGroupMemberships = ({
  groups,
}: {
  groups: Record<any, any>[];
}) => {
  return (
    <Box style={{ height: "100%" }}>
      <DataGridPro rows={groups} columns={columns} />
    </Box>
  );
};

export const UserProfile = () => {
  const { user } = useAuthentication();
  const { data, isValidating } = useUser(user?.sub ?? "");
  const classes = useStyles();
  if (isValidating) {
    return (
      <Paper className={classes.paperFull}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </Paper>
    );
  }
  const { name, email, groups } = data?.data ?? {};
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "space-between"
      }}
    >
      <Box padding={10}>
        <Typography
          variant="h6"
          color="textSecondary"
          style={{ paddingBottom: "10px" }}
        >
          Info
        </Typography>
        <Typography variant="h4">{name}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {email}
        </Typography>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                id="is-admin-checkbox"
                checked={true}
                color="primary"
                disabled
              />
            }
            label={
              <InputLabel htmlFor="is-admin-checkbox">Administrator</InputLabel>
            }
          />
        </FormGroup>
        <Box style={{ height: 400, width: "900px", paddingTop: "30px" }}>
          <UserGroupMemberships groups={groups} />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
