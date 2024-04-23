/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tooltip } from "@material-ui/core";
import {
  CloseOutlined,
  HelpOutline,
  ChevronLeftRounded,
  ChevronRightRounded,
} from "@material-ui/icons";
import { useEffect, useState } from "react";

/* This component is licensed. For licensing information, visit bryntum/gantt-react.
  * import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
*/

import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import { useStyles } from "./styles";
import _ from "lodash";
import { renderTooltipByElementType } from "./renderer";

type Props = {
  name?: string;
  content?: WidgetInformation[];
  maxWidth?: string;
  orientation?: string;
};

export const ExtendedTooltip = (props: Props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<any>();
  const [defaultPage, setDefaultPage] = useState<number>(0);
  const [selectedPage, setSelectedPage] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [widgetName, setWidgetName] = useState("");

  const [pages, setPages] = useState<number[]>([]);

  // Event handlers
  const toggleTooltip = () => {
    setIsOpen(!isOpen);
    setTimeout(function () {
      setIsOpen(false);
    }, 20000);
  };

  const toggleClose = () => {
    setIsOpen(false);
    setSelectedPage(defaultPage);
  };

  const handleClick = (page, index?: number) => {
    setSelectedPage(page);
    setSelectedIndex(index || 0);
  };

  const goToNextPage = (currentPage: number) => {
    const position = pages.indexOf(currentPage);

    if (position + 1 < pages.length) {
      const newPage = pages[position + 1];
      setSelectedPage(newPage);
      setSelectedIndex(pages.indexOf(newPage));
    }
  };

  const goToPreviousPage = (currentPage: number) => {
    const position = pages.indexOf(currentPage);

    if (position > 0) {
      const newPage = pages[position - 1];
      setSelectedPage(newPage);
      setSelectedIndex(pages.indexOf(newPage));
    }
  };

  const handleKeyDown = (key: string, currentPage: number) => {
    if (key === "ArrowLeft") goToPreviousPage(currentPage);
    else if (key === "ArrowRight") goToNextPage(currentPage);
  };

  // Add line breaks to content
  const options = {
    renderText: (text) =>
      text
        .split("\n")
        .flatMap((text, i) => [
          i > 0 && <div style={{ padding: "2px" }}>&nbsp;</div>,
          text,
        ]),
  };

  // Set pages
  useEffect(() => {
    if (props.content?.length === undefined) return;

    if (pages.length === 0) {
      props.content?.map((item: any) => {
        setWidgetName(props.name ? props.name : item.name);
        if (item.whatIsThisTellingMe) setPages((page) => [...page, 0]);
        if (item.howDoIReadThis) setPages((page) => [...page, 1]);
        if (item.whyIsThisImportant) setPages((page) => [...page, 2]);
        if (item.referenceGuide) setPages((page) => [...page, 3]);
        if (item.howIsItCalculated) setPages((page) => [...page, 4]);
      });
    }
  }, [props.content, props.name]);

  // Set default page
  useEffect(() => {
    if (pages !== undefined) {
      setDefaultPage(pages[0]);
      setSelectedPage(pages[0]);
    }
  }, [pages]);

  // Set content
  useEffect(() => {
    if (props.content?.length === undefined) return;

    if (selectedPage === undefined) setSelectedPage(defaultPage);
    if (pages?.length !== 0) {
      props.content?.map((item: any) => {
        if (selectedPage === 0) setContent(item.whatIsThisTellingMe);
        if (selectedPage === 1 && item.howDoIReadThis)
          setContent(item.howDoIReadThis);
        if (selectedPage === 2 && item.whyIsThisImportant)
          setContent(item.whyIsThisImportant);
        if (selectedPage === 3 && item.referenceGuide)
          setContent(item.referenceGuide);
        if (selectedPage === 4 && item.howIsItCalculated)
          setContent(item.howIsItCalculated);
      });
    }
  }, [selectedPage, defaultPage, props.content]);

  const [wrapperStyle, setWrapperStyle] = useState("");
  useEffect(() => {
    if (props.maxWidth === "sm") setWrapperStyle(classes.sm);
    if (props.maxWidth === "md") setWrapperStyle(classes.md);
    if (props.maxWidth === "lg") setWrapperStyle(classes.lg);
    if (props.maxWidth === "xl") setWrapperStyle(classes.xl);
  }, [props.maxWidth]);

  const truncatedText = _.truncate(widgetName, {
    length: 35,
    omission: "...",
  });

  return (
    <div
      className={wrapperStyle}
      style={props.orientation === "left" ? { left: 10 } : { right: 10 }}
    >
      <Tooltip
        interactive={true}
        tabIndex={-1}
        open={isOpen}
        placement="right"
        classes={{ tooltip: classes.tooltip, popper: classes.popper }}
        onKeyDown={(e) => handleKeyDown(e.key, selectedPage)}
        title={
          <div className={classes.tooltipWrapper}>
            <div className="d-flex flex-column mb-3">
              {/* TOOLTIP HEADER */}
              <div className={classes.tooltipHeader}>
                <span className={classes.widgetName}>{truncatedText}</span>
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
                  {pages.length > 1 &&
                  selectedPage !== undefined &&
                  selectedIndex !== undefined ? (
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

                {/* <div className={classes.descriptions}>
                  {" "}
                  {documentToReactComponents(content, options)}{" "}
                </div> */}
                {content && content.content && (
                  <div className={classes.descriptions}>
                    {content.content.map((item, index) => (
                      <div key={index}>{renderTooltipByElementType(item)}</div>
                    ))}
                  </div>
                )}

                <div className={classes.buttonWrapper}>
                  {pages.length > 1 &&
                  selectedPage !== undefined &&
                  selectedIndex !== undefined ? (
                    <div onClick={() => goToNextPage(selectedPage)}>
                      <ChevronRightRounded
                        className={
                          selectedPage === pages.length + 1
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
                  {pages !== undefined && pages?.length > 1 && (
                    <Pages
                      handleClick={handleClick}
                      selectedPage={selectedPage}
                      pages={pages}
                      selectedIndex={selectedIndex}
                      onKeyDown={(e) => handleKeyDown(e.key, selectedPage)}
                    />
                  )}
                </div>
              </div>
              {/* END TOOLTIP FOOTER */}
            </div>
          </div>
        }
      >
        <HelpOutline className={classes.helpIcon} onClick={toggleTooltip} />
      </Tooltip>
    </div>
  );
};

type PageProps = {
  handleClick;
  selectedPage;
  pages;
  selectedIndex?: number;
  onKeyDown?: (e: any) => void;
};

// PAGES
function Pages({
  handleClick,
  selectedPage,
  pages,
  selectedIndex,
  onKeyDown,
}: PageProps) {
  const classes = useStyles();

  return (
    <>
      <div style={{ display: "flex", marginLeft: 23 }}>
        {pages.map((item, index) => (
          <>
            <span
              key={index}
              className={classes.indicator}
              style={{
                color: `${selectedPage === item ? "#005FA0" : "#AAAEB1"}`,
              }}
              onClick={() => handleClick(item, index)}
              tabIndex={-1}
              onKeyDown={onKeyDown}
            >
              &bull;
            </span>
          </>
        ))}
        <span className={classes.pageNumber}>
          &nbsp; {selectedIndex ? selectedIndex + 1 : 1}/{pages.length}
        </span>
      </div>
    </>
  );
}
