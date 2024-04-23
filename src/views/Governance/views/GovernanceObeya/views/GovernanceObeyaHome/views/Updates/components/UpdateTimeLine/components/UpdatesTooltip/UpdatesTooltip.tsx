import { Box, Tooltip, Typography } from "@material-ui/core";
import {
  CloseOutlined,
  ChevronLeftRounded,
  ChevronRightRounded,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useStyles } from "./styles";
import { UpdateItem } from "../../../../hooks/useUpdates";
import { styled } from "@material-ui/styles";
import { getInitials } from "../../../Avatar/Avatar";
import DependencyIcon from "views/LeanPortfolio/LinkMap/Icons/Dependency";
import InitiativeIcon from "views/LeanPortfolio/LinkMap/Icons/Initiative";
import KeyResultIcon from "views/LeanPortfolio/LinkMap/Icons/KeyResult";
import ObjectiveIcon from "views/LeanPortfolio/LinkMap/Icons/Objective";
import Risk from "views/LeanPortfolio/LinkMap/Icons/Risk";
import { formatDate } from "utils/dateTime";
import InitiativeUpdateType from "../../../UpdateCard/components/InitiativeUpdateType";
import DependencyUpdateType from "../../../UpdateCard/components/DependencyUpdateType";
import ObjectiveUpdateType from "../../../UpdateCard/components/ObjectiveUpdateType";
import KeyResultUpdateType from "../../../UpdateCard/components/KeyResultUpdateType";
import RiskUpdateType from "../../../UpdateCard/components/RiskUpdateType";

type Props = {
  content?: UpdateItem[];
  maxWidth?: string;
  orientation?: string;
  children: any;
  type: string;
};


const DateWrapper = styled(Box)({
  backgroundColor: "#f0f0f0",
  color: "black",
  padding: 5,
  fontSize: 12,
  marginRight: 20,
});

const TypeLabel = styled(Typography)({
  fontSize: 12,
  fontWeight: "bold",
  marginLeft: 10,
  textTransform: "capitalize",
});

const AvatarRound = styled(Box)({
  width: 30,
  height: 30,
  borderRadius: "50%",
  background: "#D5D7D8",
  fontFamily: "Open Sans",
  fontSize: 12,
  color: "#fff",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const TextName = styled(Box)({
  fontSize: 12,
  fontFamily: "Open Sans",
  fontWeight: "bold",
  marginLeft: 10,
  color: "#2B353B",
});

export const UpdatesTooltip = (props: Props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<UpdateItem>();
  const [selectedPage, setSelectedPage] = useState<number>(0);

  const toggleClose = () => {
    setIsOpen(false);
    setSelectedPage(0);
  };

  const goToNextPage = (currentPage: number) => {
    if (props.content && currentPage + 1 < props.content.length) {
      setSelectedPage(currentPage + 1);
    }
  };

  const goToPreviousPage = (currentPage: number) => {
    if (currentPage > 0) {
      setSelectedPage(currentPage - 1);
    }
  };

  const handleKeyDown = (key: string, currentPage: number) => {
    if (key === "ArrowLeft") goToPreviousPage(currentPage);
    else if (key === "ArrowRight") goToNextPage(currentPage);
  };

  const firstLetter = getInitials(
    (props.content && props.content[selectedPage].name) || ""
  );

  // Set content
  useEffect(() => {
    let changesContent;
    if (props.content && props.content.length > 0) {
      const update = props.content[selectedPage];
      const metaData = props.content[selectedPage].updateMetadata;
      if (metaData) {
        if (update.updateType === "initiative") {
          changesContent = <InitiativeUpdateType metaData={metaData} isSmall={true} />;
        } else if (update.updateType === "dependency") {
          changesContent = <DependencyUpdateType metaData={metaData} isSmall={true} />;
        } else if (update.updateType === "objective") {
          changesContent = <ObjectiveUpdateType metaData={metaData} isSmall={true} />;
        } else if (update.updateType === "key result") {
          changesContent = <KeyResultUpdateType metaData={metaData} isSmall={true} />;
        } else if (update.updateType === "risk") {
          changesContent = <RiskUpdateType metaData={metaData} isSmall={true} />;
        }
      }
    }
    setContent(changesContent);
  }, [selectedPage]);

  let iconToRender;
  switch (props.type) {
    case "objective":
      iconToRender = <ObjectiveIcon color="black" fontSize={18} />;
      break;
    case "key result":
      iconToRender = <KeyResultIcon color="black" fontSize={18} />;
      break;
    case "risk":
      iconToRender = <Risk color="black" fontSize={18} />;
      break;
    case "dependency":
      iconToRender = <DependencyIcon color="black" fontSize={18} />;
      break;
    default:
      iconToRender = <InitiativeIcon color="black" fontSize={18} />;
  }
  return (
    <Tooltip
      interactive={true}
      tabIndex={-1}
      open={isOpen}
      placement="bottom"
      classes={{ tooltip: classes.tooltip, popper: classes.popper }}
      onKeyDown={(e) => handleKeyDown(e.key, selectedPage)}
      title={
        <div className={classes.tooltipWrapper}>
          <div className="d-flex flex-column mb-3">
            {/* TOOLTIP HEADER */}
            <div className={classes.tooltipHeader}>
              {props.content && (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                >
                  <Box style={{ display: "flex", color: "black" }}>
                    {iconToRender}
                    <TypeLabel>{props.type}</TypeLabel>
                  </Box>
                  <DateWrapper>
                    {formatDate(props.content[selectedPage].updatedAt)}
                  </DateWrapper>
                </Box>
              )}
              <span>
                <CloseOutlined
                  className={classes.closeIcon}
                  onClick={toggleClose}
                />
              </span>
            </div>
            {/* END TOOLTIP HEADER */}

            {/* TOOLTIP BODY */}
            <div
              className={classes.contentWrapper}
              tabIndex={-1}
              onKeyDown={(e) => handleKeyDown(e.key, selectedPage)}
            >
              <div className={classes.buttonWrapper}>
                {props.content && props.content.length > 1 ? (
                  <div onClick={() => goToPreviousPage(selectedPage)}>
                    <ChevronLeftRounded
                      className={
                        selectedPage === 0
                          ? classes.buttonLeftDisabled
                          : classes.buttonLeft
                      }
                    />
                  </div>
                ) : (
                  <div
                    className={classes.buttonLeft}
                    style={{ marginRight: 30 }}
                  >
                    &nbsp;
                  </div>
                )}
              </div>

              <div className={classes.descriptions}>
                {props.content && (
                  <Box display="flex">
                    <AvatarRound>{firstLetter}</AvatarRound>
                    <TextName>
                      {(props.content && props.content[selectedPage].name) ||
                        ""}
                    </TextName>
                  </Box>
                )}
                <div className={classes.addTopMargin}>{content}</div>
              </div>

              <div className={classes.buttonWrapper}>
                {props.content && props.content.length > 1 ? (
                  <div onClick={() => goToNextPage(selectedPage)}>
                    <ChevronRightRounded
                      className={
                        selectedPage === props.content.length - 1
                          ? classes.buttonRightDisabled
                          : classes.buttonRight
                      }
                    />
                  </div>
                ) : (
                  <div
                    className={classes.buttonRight}
                    style={{ marginLeft: 30 }}
                  >
                    &nbsp;
                  </div>
                )}
              </div>
            </div>
            {/* END TOOLTIP BODY */}

            {/* TOOLTIP FOOTER */}
            <div className={classes.tooltipFooter}>
              <div
                style={{ bottom: 25, display: "flex", alignItems: "center" }}
              >
                {props.content && props.content.length > 0 && (
                  <Pages
                    selectedPage={selectedPage}
                    totalPages={props.content?.length || 0}
                  />
                )}
              </div>
            </div>
            {/* END TOOLTIP FOOTER */}
          </div>
        </div>
      }
    >
      <div
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {" "}
        {props.children}
      </div>
    </Tooltip>
  );
};

type PageProps = {
  selectedPage: number;
  totalPages: number;
};

// PAGES
function Pages({ selectedPage, totalPages }: PageProps) {
  const classes = useStyles();

  return (
    <>
      <div style={{ display: "flex", marginLeft: 23 }}>
        <span className={classes.pageNumber}>
          &nbsp; {selectedPage ? selectedPage + 1 : 1}/{totalPages}
        </span>
      </div>
    </>
  );
}
