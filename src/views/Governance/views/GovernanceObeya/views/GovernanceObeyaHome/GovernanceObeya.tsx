import { Box, IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import { useSendTelemetry } from "core/api/CustomerTelemetryClient";
import { useEffect, useState } from "react";
import SkeletonObeyaRoom from "./components/SkeletonObeyaRoom";
import { MoreVert } from "@material-ui/icons";
import { noop } from "lodash";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { renderInitiativeDialog } from "views/LeanPortfolio/PortfolioBoardPage/PortfolioBoard/PortfolioBoard";
import { useInitiatives } from "views/LeanPortfolio/hooks/useInitiatives";
import { useStyles } from "./styles";
import ObeyaMainPage from "./GovernanceObeyaMain";
import useAuthentication from "hooks/useAuthentication";
import { useObeyaRoom } from "../../hooks/useObeyaRoom";

type ObeyaRoomPageProps = {
    title: string;
    activeObeyaRoomId: string;
    activeRoom: any;
};
const ObeyaRoomsPage = ({
    title,
    activeObeyaRoomId,
    activeRoom,
}: ObeyaRoomPageProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const { isAdminOrPowerUser } = useAuthentication();
    const { update, remove } = useInitiatives();

    const classes = useStyles();
    const confirm = useConfirm();

    const history = useHistory();
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const handleMenuOpen = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleEdit = () => {
        // Handle edit action
        setIsEdit(true);
        handleMenuClose();
    };

    const handleDelete = () => {
        // Handle delete action
        renderConfirmDelete(activeObeyaRoomId, title);
        handleMenuClose();
    };

    const handleArchive = async () => {
        const archive = {
            ...activeRoom,
            isArchived: true,
        };

        await update(archive)
            .then(() => {
                enqueueSnackbar("Initiative has been archived.", {
                    variant: "success",
                    persist: false,
                });

                history.push("/vmo");
            })
            .catch((e) => {
                console.log("error : ", e);
            });
    };

    const renderConfirmDelete = (roomId, roomName) =>
        confirm({
            title: "Warning: This action cannot be undone!",
            description: (
                <Typography>Are you sure you want to delete {roomName}?</Typography>
            ),
            cancellationText: "No",
            confirmationText: "Yes",
        })
            .then(() => onDelete?.(roomId))
            .catch(noop);

    const onDelete = async (roomId: string) => {
        try {
            await remove(roomId).then(() => {
                enqueueSnackbar("Initiative has been deleted.", {
                    variant: "success",
                    persist: false,
                });

                history.push("/vmo");
            });
        } catch (error) {
            enqueueSnackbar("Error during delete. Please try again.", {
                variant: "error",
                persist: false,
            });

            console.log(`Error on delete : `, error);
        }
    };

    return (
        <>
            {isAdminOrPowerUser &&
                <Box className={classes.navigation}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        style={{
                            position: "absolute",
                            top: 84,
                            right: 29,
                            zIndex: 801,
                        }}
                    >
                        <IconButton
                            onClick={handleMenuOpen}
                            size="small"
                            style={{ width: 25, height: 25, marginRight: 25 }}
                        >
                            <MoreVert />
                        </IconButton>
                    </Box>
                </Box>
            }

            <ObeyaMainPage />

            <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                <MenuItem onClick={handleArchive}>Archive</MenuItem>
            </Menu>

            {isEdit &&
                activeRoom &&
                renderInitiativeDialog({
                    contextId: activeRoom.contextId,
                    open: isEdit,
                    setOpen: setIsEdit,
                    defaultValue: activeRoom,
                    isLoadFromObeya: true,
                })}
        </>
    );
};

const GovernanceObeya = () => {
    const sendTelemetry = useSendTelemetry();

    const {
        data,
        isLoadingObeyaData,
        activeObeyaRoomId,
        activeRoom,
        isValidating
    } = useObeyaRoom();

    useEffect(() => {
        sendTelemetry("AccessObeyaHomePage", `Access Obeya Home page:`, {
            page: "obeya",
        });
    }, []);

    return (
        <Box>
            {
                isLoadingObeyaData || isValidating ||
                    !data ||
                    !activeObeyaRoomId ? (
                    <Box style={{ display: "flex", justifyContent: "center" }}>
                        <SkeletonObeyaRoom />
                    </Box>
                ) : (
                    <Box
                        style={{
                            minHeight: "100vh",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <ObeyaRoomsPage
                            title={activeRoom.roomName}
                            activeObeyaRoomId={activeObeyaRoomId}
                            activeRoom={activeRoom}
                        />
                    </Box>
                )}
        </Box>
    );
};

export default GovernanceObeya;
