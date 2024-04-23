import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { Skeleton } from "@material-ui/lab";
import { DataGridPro, GridColumns } from "@mui/x-data-grid-pro";
import BaseModal from "components/UI/BaseModal";
import Spinner from "components/UI/MUIFormInput/components/MUIFormInputSpinner/MUIFormInputSpinner";
import {
  UserGroupMemberships,
  useUser,
} from "components/UserProfile/UserProfile";
import fetch from "core/api/fetch";
import useAuthentication from "hooks/useAuthentication";
import _ from "lodash";
import { makeAutoObservable, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { createContext, useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import { DialogCloseButton } from "./GroupManagement";
import SkeletonLoader from "./SkeletonLoader";
import { useStyles } from "./styles";

class UserManagementStore {
  // Using public variables without getters and setters for simplicity
  // Use setters if this class gets bigger
  modalOpen = false;
  formValues: undefined | Record<any, any> = undefined;
  page = 0;

  // Delete modal
  deleteModalOpen = false;

  // Filters
  searchTerm: string | undefined = undefined;
  adminsOnly = false;

  USERS_PER_PAGE = 50;

  constructor() {
    makeAutoObservable(this);
  }

  getUsersURL() {
    let url = `/users?page=${this.page}&per_page=${this.USERS_PER_PAGE}`;
    if (this.searchTerm) {
      url = url.concat(`&search=${this.searchTerm}`);
    }
    if (this.adminsOnly) {
      url = url.concat(`&admins_only=${this.adminsOnly}`);
    }
    return url;
  }

  resetFilters() {
    this.searchTerm = undefined;
    this.adminsOnly = false;
  }

  resetDeleteModal() {
    this.deleteModalOpen = false;
    this.formValues = undefined;
  }

  resetFormModal() {
    this.modalOpen = false;
    this.formValues = undefined;
  }
}

const store = new UserManagementStore();
const UserManagementContext = createContext(store);

// Utilities
export const matchUsersAndGroups = (key: string) => key.startsWith('/users') || key.startsWith('/groups');
export const mutateUsersAndGroups = () => mutate(matchUsersAndGroups, undefined, { revalidate: true });
const mutateUsers = () =>
  mutate((key: string) => key.startsWith("/users"), undefined);

const checkIsAdmin = (user: undefined | Record<any, any>) => {
  return user?.app_metadata?.roles?.includes("user_admin") ?? false;
};

const FilterPanel = observer(() => {
  const store = useContext(UserManagementContext);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const classes = useStyles();

  const handleFilter = () => {
    store.searchTerm = searchTerm;
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        width={450}
        alignItems="center"
      >
        <TextField
          label="Search users"
          variant="outlined"
          margin="dense"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
        &nbsp;
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilter}
          size="small"
          className={classes.button}
        >
          Search
        </Button>
      </Box>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={store.adminsOnly}
              onChange={(e) => (store.adminsOnly = e.target.checked)}
              color="primary"
              size="small"
            />
          }
          label="Show only admins"
          style={{ fontFamily: "Open Sans" }}
        />
      </Box>
    </Box>
  );
});

const UserForm = () => {
  const store = useContext(UserManagementContext);
  let initialValues;
  if (store.formValues) {
    initialValues = {
      userId: store.formValues.user_id,
      name: store.formValues?.name,
      email: store.formValues?.email,
      isAdmin: checkIsAdmin(store.formValues),
    };
  }
  const defaultValues = initialValues ?? { isAdmin: false };
  const { handleSubmit, reset, formState, control } = useForm({
    defaultValues,
  });

  const {
    data: userGroupsData,
    isValidating: isValidatingUserGroups,
  } = useUser(store.formValues?.user_id);

  const onSubmit = async (payload: any) => {
    try {
      let method = fetch.post;
      let url = "users";
      if (store.formValues) {
        method = fetch.patch;
        url = `users/${store.formValues.user_id}`;
      }
      await method(url, payload);

      await mutateUsers();
      store.modalOpen = false;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ overflowY: "hidden" }}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container>
          <Grid item xs={12} style={{ paddingBottom: 3, paddingTop: 8 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  disabled={initialValues?.userId?.includes("google-oauth")}
                />
              )}
              rules={{ required: "Name is required" }}
            />
          </Grid>
          <Grid item xs={12} style={{ paddingBottom: 3, paddingTop: 5 }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  multiline
                  fullWidth
                  disabled={initialValues?.email}
                />
              )}
              rules={{ required: "Email is required" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Controller
                  name={"isAdmin"}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      value={field.value}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      color="primary"
                    />
                  )}
                />
              }
              label={"Is Admin"}
            />
          </Grid>
          <Box
            display="flex"
            justifyContent="flex-end"
            width={"100%"}
            padding={1}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              //   fullWidth
              disabled={formState.isSubmitting}
            >
              <Spinner
                isVisible={formState.isSubmitting}
                style={{ paddingLeft: 20 }}
              />{" "}
              Submit
            </Button>
          </Box>

          {store.formValues ? (
            <Grid style={{ height: 400, width: "100%" }}>
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ padding: 10 }}
              >
                Group Memberships
              </Typography>
              <Box style={{ height: 320, width: "100%" }}>
                {isValidatingUserGroups ? (
                  <SkeletonLoader />
                ) : (
                  <UserGroupMemberships
                    groups={userGroupsData?.data?.groups ?? []}
                  />
                )}
              </Box>
            </Grid>
          ) : null}
        </Grid>
      </form>
    </Container>
  );
};

const useUsers = () => {
  const store = useContext(UserManagementContext);
  const { isValidating, data, error } = useSWR<any>(
    store.getUsersURL(),
    fetch
  );
  return {
    isValidating,
    data,
    error,
  };
};

export const LoadingOverlay = ({ numRows = 10 }: { numRows: number; }) => {
  return (
    <Box paddingTop={"70px"} alignContent={"center"} justifyContent={"center"}>
      {_.range(0, numRows).map((i) => (
        <Skeleton key={i} width={"100%"} height={"40px"} />
      ))}
    </Box>
  );
};

const columns: GridColumns = [
  {
    field: "email",
    headerName: "Email",
    width: 500,
  },
  {
    field: "name",
    headerName: "Name",
    width: 350,
  },
  {
    field: "isAdmin",
    headerName: "Is Admin",
    width: 150,
    headerAlign: "center",
    renderCell: (params) => {
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          textAlign={"center"}
          width={"100%"}
        >
          <Checkbox checked={!!params?.row?.isAdmin} disabled />
        </Box>
      );
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    headerAlign: "center",
    filterable: false,
    sortable: false,
    renderCell: (params) => {
      const store = useContext(UserManagementContext);
      const { user } = useAuthentication();
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          textAlign={"center"}
          width={"100%"}
        >
          <IconButton
            size="small"
            aria-label="edit"
            onClick={() => {
              store.formValues = params.row;
              store.modalOpen = true;
            }}
          >
            <CreateIcon />
          </IconButton>

          <IconButton
            size="small"
            aria-label="delete"
            onClick={() => {
              store.formValues = params.row;
              store.deleteModalOpen = true;
            }}
            // Dont allow the user to delete themselves
            disabled={user?.sub === params.row.user_id}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      );
    },
  },
];

const FormModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: Record<any, any>;
}) => {
  const store = useContext(UserManagementContext);

  return (
    <BaseModal
      maxWidth="sm"
      open={isOpen}
      setOpen={onClose}
      title={(store.formValues ? "Edit" : "Add") + " User"}
    >
      <UserForm />
    </BaseModal>
  );
};

const DeleteModal = observer(
  ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
    const store = useContext(UserManagementContext);

    const deleteUser = async (userId: string) => {
      await mutate(
        matchUsersAndGroups,
        async (data) => {
          const users = data?.data?.users ?? [];
          const filtered = (users).filter((u) => u.user_id !== userId);
          return {
            data: {
              users: filtered,
              totals: filtered.length,
            },
          };
        },
        { revalidate: true }
      );
      store.resetDeleteModal();
      return fetch.delete(`/users/${userId}`);
    };

    return (
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogCloseButton onClose={onClose} />
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the user{" "}
            <b>{store.formValues?.name}</b> with email{" "}
            <b>{store.formValues?.email}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => deleteUser(store.formValues?.user_id)}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export const UserManagement = observer(() => {
  const store = useContext(UserManagementContext);
  const { data, isValidating } = useUsers();
  const users = (data?.data?.users ?? []).map((u) => ({
    ...u,
    isAdmin: checkIsAdmin(u),
  }));
  const total: number | undefined = data?.data?.total;

  const classes = useStyles();

  return (
    <>
      <Grid spacing={10}>
        <Grid item>
          <Box className={classes.gridBox}>
            <FilterPanel />
          </Box>
        </Grid>
        <Grid item>
          <Box className={classes.gridBox}>
            <DataGridPro
              rows={users}
              columns={columns}
              style={{
                minHeight: 400,
              }}
              getRowId={(row) => row.user_id}
              loading={isValidating && users.length === 0}
              components={{
                LoadingOverlay: () => <LoadingOverlay numRows={6} />,
              }}
              rowCount={total}
              page={store.page}
              onPageChange={(page) => (store.page = page)}
              pageSize={toJS(store.USERS_PER_PAGE)}
              pagination
              rowsPerPageOptions={undefined}
              paginationMode="server"
            />
          </Box>
        </Grid>
        <Grid item>
          <Box className={classes.gridBox}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                store.formValues = undefined;
                store.modalOpen = true;
              }}
              className={classes.button}
            >
              Add User
            </Button>
          </Box>
        </Grid>
      </Grid>
      <FormModal
        isOpen={store.modalOpen}
        onClose={() => (store.modalOpen = false)}
      />
      <DeleteModal
        isOpen={store.deleteModalOpen}
        onClose={() => (store.deleteModalOpen = false)}
      />
    </>
  );
});
