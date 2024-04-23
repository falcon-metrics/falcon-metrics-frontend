// import { useConfirm } from "material-ui-confirm";
import { ActionText, ContainerCard, Ellipse, TitleEdit, WrapperActions, WrapperContent, WrapperEllipse, WrapperStatusCard, WrapperText, WrapperTitleReplies, useStyles } from "./UpdateCard.styles";
import useProfile from "hooks/useProfile";
import { UpdateItem, removeUpdate, removeUpdateFromCache } from "../../hooks/useUpdates";
import { useState } from "react";
import { useRepliesUpdates } from "../../hooks/useRepliesUpdates";
import { AccordionDetails, AccordionSummary, Box, Typography } from "@material-ui/core";
import Author from "../Author";
import { StyledAccordion } from "../UpdateForm/UpdateForm.styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NotesIcon from "@material-ui/icons/Notes";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import InitiativeUpdateType from "./components/InitiativeUpdateType";
import DependencyUpdateType from "./components/DependencyUpdateType";
import ObjectiveUpdateType from "./components/ObjectiveUpdateType";
import KeyResultUpdateType from "./components/KeyResultUpdateType";
import RiskUpdateType from "./components/RiskUpdateType";
import EmojiReactions from "../EmojiReactions/EmojiReactions";
import ReplyForm from "./components/ReplyForm/ReplyForm";
import GeneralForm from "../UpdateForm/components/GeneralForm/GeneralForm";
import SkeletonRepliesList from "../SkeletonRepliesList";
import ReplyCard from "./components/ReplyCard";
import { useConfirm } from "material-ui-confirm";
import { useSWRConfig } from "swr";
import { noop } from "lodash";


type UpdateCardProps = {
    updateInfo: UpdateItem;
};
type RepliesListProps = {
    isOpenRepĺies: boolean;
    isLoadingReplies: boolean;
    updateWithReplies: UpdateItem[];
    updateInfo: UpdateItem;
};
const UpdateCard = (props: UpdateCardProps) => {
    const classes = useStyles();
    const { data: profile } = useProfile();
    const [isOpenRepĺies, setIsOpenReplies] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
    const currentPicture = props.updateInfo?.userId === profile?.user_id ? profile?.picture : "";
    const {
        data: updateWithReplies,
        isLoadingReplies,
        // removeUpdate: removeUpdateReply,
        // mutate: mutateReplies
    } = useRepliesUpdates(isOpenRepĺies ? props.updateInfo?.id : undefined);
    const metaData = props.updateInfo?.updateMetadata && props.updateInfo?.updateMetadata !== null
        ? props.updateInfo?.updateMetadata
        : undefined;

    const onToggleReplies = () => {
        setIsOpenReplies((currentToggleReplies) => !currentToggleReplies);
    };

    const confirm = useConfirm();
    const { mutate, cache } = useSWRConfig();
    const queryParams = new URLSearchParams(window.location.search);
    const obeyaRoomId = queryParams.get("roomId");
    const deleteUpdate = () => {
        confirm({
            title: "Are you sure you want to delete this update?",
            description: (
                <Typography>This update and its replies will be deleted.</Typography>
            ),
            cancellationText: "Cancel",
            confirmationText: "Delete"
        }).then(() => {
            const relevantKeysWithData: string[] = [];
            if (cache.get(`updates?initiativeId=${obeyaRoomId}&updateType=all`)) {
                console.log("All cache found");
                relevantKeysWithData.push(`updates?initiativeId=${obeyaRoomId}&updateType=all`);
            }
            if (props.updateInfo && cache.get(`updates?initiativeId=${obeyaRoomId}&updateType=${props.updateInfo.updateType}`)) {
                console.log(`${props.updateInfo.updateType} cache found`);
                relevantKeysWithData.push(`updates?initiativeId=${obeyaRoomId}&updateType=${props.updateInfo.updateType}`);
            }
            relevantKeysWithData.forEach(key => {
                removeUpdateFromCache(
                    props.updateInfo,
                    cache.get(key),
                    mutate,
                    key);
            });
            removeUpdate(props.updateInfo.id);
        }).catch(noop);
    };
    return (
        <Box className={classes.wrapperCard}>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>

                <Author
                    photo={currentPicture}
                    name={props.updateInfo?.name || ""}
                    daysPost={props.updateInfo.updatedAt as any}
                    views={12}
                    listCard={true}
                />
                <Box display="flex">
                    { metaData?.action && (
                        <>
                            {metaData?.action === 'create' && <ActionText>Created</ActionText>}
                            {metaData?.action === 'edit' && <ActionText>Edited</ActionText>}
                            {metaData?.action === 'delete' && <ActionText>Deleted</ActionText>}
                        </>
                    )}
                    <Typography
                        style={{
                            fontSize: 12,
                            backgroundColor: "#D5D7D8",
                            color: "#2B353B",
                            padding: "2px 6px",
                            marginLeft: 5,
                            textTransform: "capitalize",
                            fontWeight: 400,
                            lineHeight: 1.5,
                            borderRadius: 8,
                            height: 24,
                            letterSpacing: "0.00938em",
                            fontFamily: "Open Sans",
                        }}
                    >
                        {props.updateInfo?.updateType || "General"}
                    </Typography>
                </Box>
            </Box>
            <WrapperContent>
                {isReadOnly ?
                    <>
                        {props.updateInfo.updateText && <WrapperText>
                            <div dangerouslySetInnerHTML={{
                                __html: props.updateInfo.updateText
                            }} />
                        </WrapperText>}

                        {props.updateInfo?.updateNotes && (
                            <Box style={{ marginTop: 16, marginBottom: 16 }}>
                                <StyledAccordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <NotesIcon fontSize='small' />
                                        <Typography style={{ marginLeft: 10, fontFamily: 'Open Sans', fontSize: 14 }}>Notes</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ContainerCard>
                                            <div dangerouslySetInnerHTML={{
                                                __html: props.updateInfo?.updateNotes
                                            }} />
                                        </ContainerCard>
                                    </AccordionDetails>
                                </StyledAccordion>
                            </Box>
                        )}
                    </>
                    :
                    <GeneralForm
                        placeholder=""
                        activePlaceholder=""
                        updateTextDefaultValue={props.updateInfo.updateText || ''}
                        updateNotesDefaultValue={props.updateInfo.updateNotes || ''}
                        submitButtonText="Save"
                        update={props.updateInfo}
                        afterSave={() => setIsReadOnly(true)}
                    />
                }
                {props.updateInfo?.updateType !== "general" && metaData && metaData.fields && metaData.fields.length > 0 ? (
                    <WrapperStatusCard>
                        {props.updateInfo?.updateType === "initiative" && (
                            <InitiativeUpdateType metaData={metaData} />
                        )}
                        {props.updateInfo?.updateType === "dependency" && (
                            <DependencyUpdateType metaData={metaData} />
                        )}
                        {props.updateInfo?.updateType === "objective" && (
                            <ObjectiveUpdateType
                                metaData={metaData}
                            />
                        )}
                        {props.updateInfo?.updateType === "key result" && (
                            // <Box>
                            //     <div><pre>{JSON.stringify(metaData, null, 2)}</pre></div>;
                            // </Box>
                            <KeyResultUpdateType
                                metaData={metaData}
                            />
                        )}
                        {props.updateInfo?.updateType === "risk" && (
                            <RiskUpdateType metaData={metaData} />
                        )}
                    </WrapperStatusCard>
                ) : null}
                <WrapperActions>
                    {props.updateInfo?.userId === profile?.user_id ? (
                        isReadOnly && (
                            <>
                                <Box style={{ display: "flex", justifyContent: 'space-between', width: '100%' }}>
                                    <Box display="flex">
                                        <TitleEdit
                                            style={{
                                                color: !props.updateInfo?.id ? "#808689" : "#2B353B",
                                                cursor: !props.updateInfo?.id ? "auto" : "pointer",
                                            }}
                                            onClick={() => { setIsReadOnly(false); }}
                                        >
                                            Edit
                                        </TitleEdit>
                                        <WrapperEllipse>
                                            <Ellipse />
                                        </WrapperEllipse>
                                        {props.updateInfo?.updateType === "general" && (
                                            <>
                                                <TitleEdit
                                                    style={{
                                                        color: !props.updateInfo?.id ? "#808689" : "#2B353B",
                                                        cursor: !props.updateInfo?.id ? "auto" : "pointer",
                                                        marginRight: 20,
                                                    }}
                                                    onClick={deleteUpdate}
                                                >
                                                    Delete
                                                </TitleEdit>
                                            </>
                                        )}
                                        <EmojiReactions
                                            reactions={props.updateInfo.reactions || []}
                                            update={props.updateInfo}
                                        />
                                    </Box>
                                    {props.updateInfo && props.updateInfo?.replies_count ? (
                                        <Box
                                            onClick={onToggleReplies}
                                            style={{
                                                paddingTop: 16,
                                                cursor: "pointer",
                                                display: "flex",
                                                fontFamily: "Open Sans",
                                                alignItems: "center",
                                            }}
                                        >
                                            <WrapperTitleReplies>
                                                <Box style={{ margin: "10px 5px 0px 0px" }}>
                                                    <ChatBubbleOutlineIcon
                                                        style={{ color: "#b0b4b6", width: 16, height: 16 }}
                                                    />
                                                </Box>
                                                <Box>
                                                    {isOpenRepĺies
                                                        ? `Hide`
                                                        : props.updateInfo?.replies_count === "1"
                                                            ? `${props.updateInfo?.replies_count} reply`
                                                            : `${props.updateInfo?.replies_count} replies`}
                                                </Box>
                                            </WrapperTitleReplies>
                                        </Box>
                                    ) : null}
                                </Box>
                            </>)
                    )
                        : (
                            <Box style={{ display: "flex", justifyContent: 'space-between', width: '100%' }}>
                                <EmojiReactions
                                    reactions={props.updateInfo.reactions || []}
                                    update={props.updateInfo}
                                />
                                {props.updateInfo && props.updateInfo?.replies_count ? (
                                    <Box
                                        onClick={onToggleReplies}
                                        style={{
                                            paddingTop: 16,
                                            cursor: "pointer",
                                            display: "flex",
                                            fontFamily: "Open Sans",
                                            alignItems: "center",
                                        }}
                                    >
                                        <WrapperTitleReplies>
                                            <Box style={{ margin: "10px 5px 0px 0px" }}>
                                                <ChatBubbleOutlineIcon
                                                    style={{ color: "#b0b4b6", width: 16, height: 16 }}
                                                />
                                            </Box>
                                            <Box>
                                                {isOpenRepĺies
                                                    ? `Hide`
                                                    : props.updateInfo?.replies_count === "1"
                                                        ? `${props.updateInfo?.replies_count} reply`
                                                        : `${props.updateInfo?.replies_count} replies`}
                                            </Box>
                                        </WrapperTitleReplies>
                                    </Box>
                                ) : null}
                            </Box>
                        )}
                </WrapperActions>
                <RepliesList
                    isLoadingReplies={isLoadingReplies}
                    isOpenRepĺies={isOpenRepĺies}
                    updateWithReplies={updateWithReplies}
                    updateInfo={props.updateInfo}
                />
            </WrapperContent>
            <ReplyForm
                updateInfo={props.updateInfo}
            />
        </Box >
    );
};

const RepliesList = ({
    isOpenRepĺies,
    isLoadingReplies,
    updateWithReplies,
    updateInfo,
}: RepliesListProps) => {
    return (
        <Box
            style={{
                marginTop: 30,
                display: isOpenRepĺies ? "flex" : "none",
                height: "auto",
                border: "1px solid none",
            }}
        >
            {!isLoadingReplies ? (
                <Box
                    style={{
                        background: "#fcfcfc",
                        height: "auto",
                        width: '50%',
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        marginLeft: 25,
                        marginTop: 0,
                        boxShadow: "none",
                    }}
                >
                    {((updateWithReplies && updateWithReplies?.[0]?.replies) || []).map(
                        (reply: any) => {
                            return (
                                <ReplyCard
                                    key={reply.id}
                                    reply={reply}
                                    updateInfo={updateInfo}
                                />
                            );
                        }
                    )}
                </Box>
            ) : (
                <SkeletonRepliesList />
            )}
        </Box>
    );
};

export default UpdateCard;