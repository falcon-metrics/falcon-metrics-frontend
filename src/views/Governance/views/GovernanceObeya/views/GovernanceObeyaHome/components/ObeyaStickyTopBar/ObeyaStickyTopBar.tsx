import { makeStyles } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { BackToLink, Badge, Container, LinkContainer, StickyContainer, Title } from "./styles";
import InitiativeActions from "../../views/Updates/components/InitiativeActions";
import TabSelector from "./TabSelector";
import SkeletonInitiativeActions from "../../views/Updates/components/InitiativeActions/SkeletonInitiativeActions";
import { useObeyaRoom } from "views/Governance/views/GovernanceObeya/hooks/useObeyaRoom";

export const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row'
    },
    content: {
        flexGrow: 1,
        flexDirection: 'column',
        overflowY: 'auto',
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: "#fefefe",
        minWidth: 450,
        maxWidth: 450,
        padding: "0 32px 0 32px",
        marginLeft: theme.spacing(4),
        flexGrow: 0,
        flexShrink: 0,
    }
}));

type ObeyaStickyTopBarProps = {
    selectedTab: number;
    setSelectedTab: any;
};
const ObeyaStickyTopBar = (props: ObeyaStickyTopBarProps) => {
    const { activeRoom, isLoadingObeyaData } = useObeyaRoom();

    const classes = useStyles();

    return (
        <StickyContainer>
            <div className={classes.root}>
                <main className={classes.content}>
                    <Container flexDirection="column">
                        <LinkContainer>
                            <BackToLink to="/vmo">
                                <ArrowBackIcon />
                                {" "} Portfolio Board
                            </BackToLink>
                        </LinkContainer>
                    </Container>
                    <Container flexDirection="row">
                        <Title>{activeRoom.roomName}</Title>
                        {activeRoom?.isFinished && (
                            <Badge
                                size="small"
                                label="Finished"
                                variant="default"
                                color="primary"
                            />
                        )}
                    </Container>
                    <TabSelector tabTitles={["Updates", "Obeya Room"]} selectedTab={props.selectedTab} setSelectedTab={props.setSelectedTab} />
                </main>

                {props.selectedTab === 0 &&
                    <aside className={classes.sidebar}>
                        {isLoadingObeyaData ? <SkeletonInitiativeActions /> : <InitiativeActions />}
                    </aside>
                }

            </div>
        </StickyContainer>
    );
};

export default ObeyaStickyTopBar;
