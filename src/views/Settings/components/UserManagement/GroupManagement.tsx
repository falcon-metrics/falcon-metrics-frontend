/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Link,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Theme,
  Typography,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CreateIcon from "@material-ui/icons/Create";
import {
  default as Delete,
  default as DeleteIcon,
} from "@material-ui/icons/Delete";
import { DataGridPro, GridColumns } from "@mui/x-data-grid-pro";
import BaseModal from "components/UI/BaseModal";
import Spinner from "components/UI/MUIFormInput/components/MUIFormInputSpinner/MUIFormInputSpinner";
import fetch from "core/api/fetch";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import { createContext, useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import SkeletonLoader from "./SkeletonLoader";
import {
  LoadingOverlay,
  matchUsersAndGroups,
  mutateUsersAndGroups,
} from "./UserManagement";
import { MultiSelectAutoComplete } from "./UserSearchComponent";
import { Auth0User, UserGroup } from "./types";

import LaunchIcon from "@material-ui/icons/Launch";
import useFilterPanelContext from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext";
import { getFilterUrlSearchParams } from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils";

class GroupManagementStore {
  // Using public variables without getters and setters for simplicity
  // Use setters if this class gets bigger
  createModalOpen = false;
  updateModalOpen = false;
  /**
   * Either the newly created group in the create form
   * or the selected group from the table
   */
  currentGroup: undefined | Record<any, any> = undefined;
  page = 0;
  _selectedUsers: Auth0User[] = [];
  activeStep = 0;

  userIdsToExclude: string[] = [];

  groupUsersPage = 0;

  selectionModel: string[] = [];
  // searchResults: Auth0User[] = [];

  deleteModalOpen = false;

  userIdToDelete: string | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  getGroupsURL() {
    return `/groups?page=${this.page}`;
  }

  getGroupUsersURL() {
    return `/groups/${this.currentGroup?.id}/users?page=${this.page}`;
  }

  resetModal() {
    this.createModalOpen = false;
    this.activeStep = 0;
    this._selectedUsers = [];
    this.updateModalOpen = false;
    this.selectionModel = [];
    this.deleteModalOpen = false;
    this.resetUserDeleteModal();
    this.resetSearch();
  }

  resetSearch() {
    this._selectedUsers = [];
    this.selectedUsers = [];
    this.selectionModel = [];
    // this.searchResults = [];
  }

  resetUserDeleteModal() {
    this.userIdToDelete = undefined;
  }

  selectedUsers: Auth0User[] = [];
}

export const GroupManagementContext = createContext(new GroupManagementStore());

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    groupSubmitButton: {
      minWidth: 145,
      width: 145,
    },
    button: {
      width: "120px",
      height: "35px",
    },
  })
);

export const getUsers = async (searchTerm?: string) => {
  let url = `/users?page=0&per_page=50`;
  if (searchTerm && searchTerm?.length > 0) {
    url = url.concat(`&search=${searchTerm}`);
  }
  const response = await fetch(url);
  const data = await response?.data?.users;
  return data;
};

const AddUsers = observer(
  ({ closeAfterSubmit = false }: { closeAfterSubmit?: boolean }) => {
    const store = useContext(GroupManagementContext);
    const { handleSubmit, formState } = useForm();

    const onSubmitUsers = async () => {
      const body = { userIds: store.selectedUsers?.map((u) => u.user_id) };
      await fetch.post(`/groups/${store.currentGroup?.id}/users`, body);
      await mutateUsersAndGroups();
      // Clear the selection
      store.resetSearch();
      if (closeAfterSubmit) {
        store.resetModal();
      }
    };

    return (
      <Box paddingTop={1}>
        <form onSubmit={handleSubmit(onSubmitUsers)}>
          <Typography
            style={{
              fontFamily: "Open Sans",
              fontSize: 12,
              color: "#4E4E4E",
              paddingBottom: 8,
            }}
          >
            Enter search term to find users
          </Typography>

          <Grid container alignItems="center" direction="row">
            <Grid item style={{ width: "60%" }}>
              <MultiSelectAutoComplete />
            </Grid>

            <Grid item>
              <Button
                style={{ marginLeft: 8 }}
                // size="small"
                type="submit"
                color="primary"
                variant="contained"
                disabled={
                  formState.isSubmitting || store.selectedUsers.length === 0
                }
              >
                <Spinner
                  isVisible={formState.isSubmitting}
                  style={{ paddingLeft: 20 }}
                />{" "}
                Add Users
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    );
  }
);

const CreateGroupForm = observer(() => {
  const classes = useStyles();
  const { control, handleSubmit, formState } = useForm();
  const store = useContext(GroupManagementContext);
  const onSubmitGroup = async (formData) => {
    const payload = {
      name: formData.groupName,
      description: formData.groupDescription,
    };
    const response = await fetch.post(`/groups`, payload);

    const data: UserGroup = await response.data;
    store.currentGroup = data;
    store.activeStep += 1;

    await mutateUsersAndGroups();
  };

  const steps = ["Create Group", "Add Users"];

  return (
    <Stepper
      activeStep={store.activeStep}
      orientation="vertical"
      style={{
        backgroundColor: "#FCFCFC",
        width: "100%",
        fontFamily: "Open Sans",
        fontSize: 16,
      }}
    >
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
          <StepContent>
            {index === 0 && (
              <form onSubmit={handleSubmit(onSubmitGroup)}>
                <Box display="grid" gridGap={8} paddingTop={3}>
                  <Controller
                    name="groupName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Group Name"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                      />
                    )}
                  />
                  <Controller
                    name="groupDescription"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Group Description"
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    )}
                  />
                  <Button
                    className={classes.groupSubmitButton}
                    type="submit"
                    color="primary"
                    variant="contained"
                  >
                    {formState.isSubmitting ? (
                      <CircularProgress color="secondary" />
                    ) : (
                      <>Create Group</>
                    )}
                  </Button>
                </Box>
              </form>
            )}
            {index === 1 && <AddUsers closeAfterSubmit={true} />}
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
});

const DeleteModal = observer(
  ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const store = useContext(GroupManagementContext);

    const deleteGroup = async (groupId: string) => {
      await mutate(matchUsersAndGroups, async (data) => {
        const { groups } = data.data;
        const filtered = groups.filter((g) => g.id !== groupId);
        return {
          data: {
            groups: filtered,
            totals: filtered.length,
          },
        };
      });
      store.resetModal();
      return fetch.delete(`/groups/${groupId}`);
    };

    return (
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the group{" "}
            <b>{store.currentGroup?.name}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => deleteGroup(store.currentGroup?.id)}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

const useGroupUsers = () => {
  const store = useContext(GroupManagementContext);
  const url = store.getGroupUsersURL();
  const { data: data1, isValidating: isValidating1, mutate } = useSWR<any>(
    url,
    fetch
  );
  const { data: data2, isValidating: isValidating2 } = useSWR<any>(
    `/groups/${store.currentGroup?.id}/users?get_all_ids=true`,
    fetch
  );

  return {
    isValidating: isValidating1 || isValidating2,
    firstLoad: !data1?.data?.users && isValidating1,
    groupUsers: {
      users: (data1?.data?.users ?? []).map((u) => ({
        ...u,
        ...u.user,
      })) as Array<Auth0User & { userId: string; groupId: string }>,
      totals: data1?.data?.totals ?? 0,
    },
    groupUserIds: new Set(data2?.data?.users ?? []) as Set<string>,
    mutateGroupUsers: mutate,
  };
};

const UpdateGroupForm = observer(() => {
  const { apiQueryParameters } = useFilterPanelContext();
  const queryParamString = getFilterUrlSearchParams(apiQueryParameters);

  const store = useContext(GroupManagementContext);
  const {
    groupUsers: { users, totals },
    groupUserIds,
    firstLoad,
  } = useGroupUsers();

  useEffect(() => {
    if (groupUserIds.size > 0) {
      store.userIdsToExclude = Array.from(groupUserIds);
    }
  }, [groupUserIds]);

  const initialValues = store.currentGroup;
  const dashboardId = initialValues?.dashboardId;

  const { handleSubmit, control, formState } = useForm({
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
    },
  });

  const handleUpdate = async (data) => {
    const payload = {
      name: data.name,
      description: data.description,
    };
    await fetch.patch(`/groups/${store?.currentGroup?.id}`, payload);

    await mutateUsersAndGroups();
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <Grid container style={{ paddingBottom: 20 }}>
          <Box
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box width="65%">
              <Grid item xs={12} style={{ paddingTop: 3 }}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Name" fullWidth />
                  )}
                />
              </Grid>
              <Grid item xs={12} style={{ paddingBottom: 1 }}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Description"
                      multiline
                      fullWidth
                      minRows={1}
                      maxRows={3}
                      margin="normal"
                      inputProps={{
                        style: {
                          resize: "vertical",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
            </Box>

            {dashboardId ? (
              <ViewDashboardLink
                dashboardId={dashboardId}
                queryParamString={queryParamString}
              />
            ) : (
              <></>
            )}
          </Box>

          <Grid item xs={12} style={{ paddingBottom: 3, paddingTop: 5 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!formState.isDirty || formState.isSubmitting}
              //   size="medium"
            >
              <Spinner
                isVisible={formState.isSubmitting}
                style={{ paddingLeft: 20 }}
              />{" "}
              Update
            </Button>
          </Grid>
        </Grid>
      </form>

      <Divider />

      <AddUsers />

      <Box minHeight={280} paddingTop={2}>
        {firstLoad ? (
          <SkeletonLoader />
        ) : (
          <DataGridPro
            rows={users}
            columns={usersTableColumns}
            style={{
              minHeight: 280,
            }}
            getRowId={(row) => row.user_id}
            // Show loading only on first load
            // loading={firstLoad}
            components={{
              LoadingOverlay,
            }}
            rowCount={totals}
            page={store.page}
            onPageChange={(page) => (store.page = page)}
            pageSize={10}
            pagination
            paginationMode="server"
            onError={(args) => console.log("DataGridPro error: ", args)}
          />
        )}
      </Box>
      <DeleteUserModal />
    </>
  );
});

const ViewDashboardLink = ({
  dashboardId,
  queryParamString,
}: {
  dashboardId: string;
  queryParamString: string;
}) => {
  const launchIcon = {
    color: "#707070",
    fontFamily: "Open Sans",
    paddingLeft: 3,
  };

  const linkText = {
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    fontFamily: "Open Sans",
  };

  const url = `/value-stream-management/dashboard?dashboardId=${dashboardId}&${queryParamString}`;

  return (
    <Box
      width={"30%"}
      p={7}
      style={{ border: "1px solid rgba(0, 0, 0, 0.12)", borderRadius: 8 }}
      justifyContent="center"
      textAlign="center"
      alignContent="center"
    >
      <Typography style={linkText}>
        <Link href={url} target="_blank">
          View Dashboard
        </Link>
        <LaunchIcon style={launchIcon} fontSize="small" />
      </Typography>
    </Box>
  );
};

export const useUnassignedGroups = () => {
  const store = useContext(GroupManagementContext);
  const { isValidating, data, error } = useSWR<any>(store.getGroupsURL(), () =>
    fetch(store.getGroupsURL())
  );
  return {
    isValidating,
    data: data?.data?.groups.filter((g) => !g.dashboardId),
    error,
  };
};

export const useGroups = () => {
  const store = useContext(GroupManagementContext);
  const { isValidating, data, error } = useSWR<any>(
    // Add a prefix here to make it easy to mutate this
    store.getGroupsURL(),
    () => fetch(store.getGroupsURL())
  );
  return {
    isValidating,
    data,
    error,
  };
};

const groupsTableColumns: GridColumns = [
  {
    field: "name",
    headerName: "Name",
    width: 350,
  },
  {
    field: "description",
    headerName: "Description",
    width: 300,
  },
  {
    field: "createdBy",
    headerName: "Created By",
    width: 200,
  },
  {
    field: "userCount",
    headerName: "Users",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "edit",
    headerName: "Actions",
    width: 150,
    filterable: false,
    sortable: false,
    headerAlign: "center",
    renderCell: (params) => {
      const store = useContext(GroupManagementContext);
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
              store.currentGroup = params.row;
              store.updateModalOpen = true;
            }}
          >
            <CreateIcon />
          </IconButton>

          <IconButton
            size="small"
            aria-label="delete"
            onClick={() => {
              store.currentGroup = params.row;
              store.deleteModalOpen = true;
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      );
    },
  },
];

const usersTableColumns: GridColumns = [
  {
    field: "email",
    headerName: "Email",
    width: 300,
  },
  {
    field: "name",
    headerName: "Name",
    width: 300,
  },
  {
    field: "remove",
    headerName: "Remove",
    width: 75,
    renderCell: (params) => {
      const store = useContext(GroupManagementContext);
      return (
        <IconButton
          size="small"
          aria-label="delete"
          onClick={() => {
            store.userIdToDelete = params.row.user_id;
          }}
        >
          <Delete />
        </IconButton>
      );
    },
  },
];

const CreateFormModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: Record<any, any>;
}) => {
  return (
    <BaseModal maxWidth="sm" open={isOpen} setOpen={onClose}>
      <CreateGroupForm />
    </BaseModal>
  );
};

export const DialogCloseButton = ({ onClose }: { onClose: () => void }) => {
  return (
    <IconButton
      // aria-label="close"
      onClick={onClose}
      style={{
        position: "absolute",
        right: 8,
        top: 8,
      }}
    >
      <CloseIcon />
    </IconButton>
  );
};

const UpdateGroupModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: Record<any, any>;
}) => {
  return (
    <BaseModal
      title="Edit Group"
      open={isOpen}
      setOpen={onClose}
      maxWidth={"md"}
    >
      <DialogContent>
        <UpdateGroupForm />
      </DialogContent>
    </BaseModal>
  );
};

const DeleteUserModal = observer(() => {
  const store = useContext(GroupManagementContext);
  const isOpen = store.userIdToDelete !== undefined;
  const onClose = () => (store.userIdToDelete = undefined);

  const {
    mutateGroupUsers,
    groupUsers: { users },
  } = useGroupUsers();

  // TODO: temporarily added userIdToDelete param because store.userIdToDelete is undefined thus causing the function to fail.
  // there may be a better approach to fix this
  const deleteUser = async (userIdToDelete?: string) => {
    const filtered = users.filter((u) => u.user_id !== store.userIdToDelete);
    await mutateGroupUsers(
      { data: { users: filtered, totals: filtered.length } },
      false
    );
    // Close modal
    store.resetUserDeleteModal();
    // const userId = store.userIdToDelete;
    const groupId = store.currentGroup?.id;
    await fetch.delete(`/groups/${groupId}/users/${userIdToDelete}`);
    await mutateUsersAndGroups();
  };

  // Before the modal closes, the modal displays an undefined user name
  // for a split second. This is to prevent that
  if (store.userIdToDelete === undefined) return <></>;

  const user = users.find((u) => u.user_id === store.userIdToDelete);
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <IconButton
        // aria-label="close"
        onClick={onClose}
        style={{
          position: "absolute",
          right: 8,
          top: 8,
          // color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove <b>{user?.name}</b> ({user?.email})
          from the group?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => deleteUser(user?.userId)} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export const GroupManagement = observer(() => {
  const store = useContext(GroupManagementContext);
  const { data, isValidating } = useGroups();
  const groups = data?.data?.groups ?? [];
  const total: number | undefined = data?.data?.total;
  const classes = useStyles();
  return (
    <Box minHeight={500} paddingTop={"30px"}>
      <DataGridPro
        rows={groups}
        columns={groupsTableColumns}
        style={{
          minHeight: 500,
        }}
        loading={isValidating && groups.length === 0}
        components={{
          LoadingOverlay,
        }}
        rowCount={total}
        page={store.page}
        onPageChange={(page) => (store.page = page)}
        pageSize={10}
        pagination
        paginationMode="server"
      />
      <Box paddingTop={"30px"}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => {
            store.currentGroup = undefined;
            store.createModalOpen = true;
          }}
          className={classes.button}
        >
          Create Group
        </Button>
      </Box>
      <CreateFormModal
        isOpen={store.createModalOpen}
        onClose={() => store.resetModal()}
      />
      <UpdateGroupModal
        isOpen={store.updateModalOpen}
        onClose={() => store.resetModal()}
      />
      <DeleteModal
        isOpen={store.deleteModalOpen}
        onClose={() => (store.deleteModalOpen = false)}
      />
    </Box>
  );
});
