import {
  Typography,
  Box,
  Card,
  IconButton,
  Collapse,
  Grid,
  Button,
  ButtonGroup,
  FormHelperText,
} from "@material-ui/core";

import Close from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import RemoveIcon from "@material-ui/icons/Remove";
import { useState } from "react";
import { useStyles } from "./styles";
import { issueDetails, customFields } from "./columns";
import FormattedSLE from "./HeatCell";
import TransitionTabs from "./TransitionTab";
import { formatDate } from "utils/dateTime";

interface Props {
  data: any;
  open: boolean;
  setOpen: (open: boolean) => void;
  perspective: string;
}

interface CardDetailsProps {
  title: string;
  row: any;
  defaultExpanded: boolean;
  fields?: any;
  perspective?: string;
}

const CardDetails = ({
  title,
  fields,
  row,
  defaultExpanded,
}: CardDetailsProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const ExpandIcon = expanded ? ExpandLessIcon : ExpandMoreIcon;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const classes = useStyles();

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <Card className={classes.card}>
        <Typography className={classes.cardTitle}>
          {title}
          <IconButton
            className={classes.expandIcon}
            onClick={handleExpandClick}
          >
            <ExpandIcon />
          </IconButton>
        </Typography>
        <Collapse in={expanded}>
          <Box className={classes.cardContent}>
            {fields.map((item, index) => (
              <Typography key={index} className={classes.cardFields}>
                <span>{item.text}</span>
                {item.getValue ? (
                  <span style={{ textAlign: "right" }}>
                    {item.getValue(row)}
                  </span>
                ) : row[item.field] ? (
                  <span style={{ textAlign: "right" }}>{row[item.field]}</span>
                ) : (
                  <RemoveIcon className={classes.noValueIcon} />
                )}
              </Typography>
            ))}
          </Box>
        </Collapse>
      </Card>
    </Box>
  );
};

const SLEDetails = ({
  title,
  perspective,
  row,
  defaultExpanded,
}: CardDetailsProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const ExpandIcon = expanded ? ExpandLessIcon : ExpandMoreIcon;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const classes = useStyles();

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <Card className={classes.card}>
        <Typography className={classes.cardTitle}>
          {title}
          <IconButton
            className={classes.expandIcon}
            onClick={handleExpandClick}
          >
            <ExpandIcon />
          </IconButton>
        </Typography>
        <Collapse in={expanded}>
          <Box className={classes.cardContent}>
            <Typography className={classes.cardFields}>
              <span>
                {perspective === "past"
                  ? "Lead Time"
                  : perspective === "present"
                  ? "WIP Age"
                  : "Inventory Age"}
              </span>
              <span style={{ textAlign: "right" }}>
                {`${row.itemAge} ${row.itemAge > 1 ? "days" : "day"}`}
              </span>
            </Typography>

            <Typography className={classes.cardFields}>&nbsp;</Typography>

            {row.serviceLevelExpectationInDays && (
              <Typography className={classes.cardFields}>
                <span>Service Level Expectation (SLE)</span>
                <span style={{ textAlign: "right" }}>
                  {`${row.serviceLevelExpectationInDays} ${
                    row.serviceLevelExpectationInDays > 1
                      ? "days or less"
                      : "day or less"
                  }`}
                </span>
              </Typography>
            )}

            {perspective !== "future" && (
              <Typography className={classes.cardFields}>
                <span>
                  {perspective === "past" ? "Lead Time" : "WIP Age"} % of SLE
                </span>

                <FormattedSLE value={row["age%OfSLE"]} />
              </Typography>
            )}

            <Typography className={classes.cardFields}>&nbsp;</Typography>

            {perspective !== "future" && (
              <Typography className={classes.cardFields}>
                <span>Flow Efficiency</span>
                <span style={{ textAlign: "right" }}>
                  {`${
                    row.flowEfficiency ? Math.round(row.flowEfficiency) : 0
                  }%`}
                </span>
              </Typography>
            )}
          </Box>
        </Collapse>
      </Card>
    </Box>
  );
};

const KeyDatesDetails = ({ title, row, defaultExpanded }: CardDetailsProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const ExpandIcon = expanded ? ExpandLessIcon : ExpandMoreIcon;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const classes = useStyles();

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <Card className={classes.card}>
        <Typography className={classes.cardTitle}>
          {title}
          <IconButton
            className={classes.expandIcon}
            onClick={handleExpandClick}
          >
            <ExpandIcon />
          </IconButton>
        </Typography>
        <Collapse in={expanded}>
          <Box className={classes.cardContent}>
            <Typography className={classes.cardFields}>
              <span>Arrival Date</span>
              <span style={{ textAlign: "right" }}>
                {formatDate(row.arrivalDate)}
              </span>
            </Typography>

            <Typography className={classes.cardFields}>&nbsp;</Typography>

            {row.optimalStartDateRange && (
              <Typography className={classes.cardFields}>
                <span>Optimal Start Date Range</span>
                <span style={{ textAlign: "right" }}>
                  {row.optimalStartDateRange}
                </span>
              </Typography>
            )}

            {row.commitmentDate && (
              <Typography className={classes.cardFields}>
                <span>Commitment Date</span>
                <span style={{ textAlign: "right" }}>
                  {formatDate(row.commitmentDate)}
                </span>
              </Typography>
            )}

            {row.startStatus && (
              <Typography className={classes.cardFields}>
                <span>Start Status</span>
                <span style={{ textAlign: "right" }}>{row.startStatus}</span>
              </Typography>
            )}

            {row.suggestedClassOfService && (
              <Typography className={classes.cardFields}>
                <span>Suggested Class of Service</span>
                <span style={{ textAlign: "right" }}>
                  {row.suggestedClassOfService}
                </span>
              </Typography>
            )}

            <Typography className={classes.cardFields}>&nbsp;</Typography>

            {row.desiredDeliveryDate && (
              <Typography className={classes.cardFields}>
                <span>Desired Delivery Date</span>
                <span style={{ textAlign: "right" }}>
                  {formatDate(row.desiredDeliveryDate)}
                </span>
              </Typography>
            )}

            {row.expectedDeliveryDate && (
              <Typography className={classes.cardFields}>
                <span>Expected Delivery Date</span>
                <span style={{ textAlign: "right" }}>
                  {formatDate(row.expectedDeliveryDate)}
                </span>
              </Typography>
            )}

            {row.departureDate && (
              <Typography className={classes.cardFields}>
                <span>Departure Date</span>
                <span style={{ textAlign: "right" }}>
                  {formatDate(row.departureDate)}
                </span>
              </Typography>
            )}
          </Box>
        </Collapse>
      </Card>
    </Box>
  );
};

const ExtendedCardContent = ({ data, open, setOpen, perspective }: Props) => {
  const classes = useStyles();
  const { extendedDetails, assigneeTransitions, stateTransitions } = data;

  const [isDescActive, setIsDescActive] = useState(true);
  const [sort, setSort] = useState("desc");

  const handleDescClick = () => {
    setIsDescActive(true);
    setSort("desc");
  };

  const handleAscClick = () => {
    setIsDescActive(false);
    setSort("asc");
  };

  return (
    <Box>
      <Box className={classes.modal}>
        <IconButton
          className={classes.closeButton}
          onClick={() => setOpen(!open)}
        >
          <Close className={classes.closeIcon} />
        </IconButton>
      </Box>
      <Box style={{ overflow: "hidden" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CardDetails
              title="Details"
              fields={issueDetails}
              row={extendedDetails}
              defaultExpanded={true}
            />
            {perspective === "past" ? (
              <SLEDetails
                title="Lead Time and Service Level"
                row={extendedDetails}
                defaultExpanded={false}
                perspective={perspective}
              />
            ) : perspective === "present" ? (
              <SLEDetails
                title="WIP Age and Service Level"
                row={extendedDetails}
                defaultExpanded={false}
                perspective={perspective}
              />
            ) : (
              <SLEDetails
                title="Inventory Age and Service Level"
                row={extendedDetails}
                defaultExpanded={false}
                perspective={perspective}
              />
            )}
            <KeyDatesDetails
              title="Key Dates"
              row={extendedDetails}
              defaultExpanded={false}
            />
            <CardDetails
              title="Custom Fields"
              fields={customFields(extendedDetails) || []}
              row={extendedDetails}
              defaultExpanded={false}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                mr: 2,
              }}
            >
              <FormHelperText style={{ fontFamily: "Open Sans" }}>
                Sort transition by
              </FormHelperText>{" "}
              &nbsp;
              <ButtonGroup disableElevation size="small">
                <Button
                  variant={isDescActive ? "contained" : "outlined"}
                  color="primary"
                  onClick={handleDescClick}
                  style={{ fontFamily: "Open Sans" }}
                >
                  Desc
                </Button>
                <Button
                  variant={!isDescActive ? "contained" : "outlined"}
                  color="primary"
                  onClick={handleAscClick}
                  style={{ fontFamily: "Open Sans" }}
                >
                  Asc
                </Button>
              </ButtonGroup>
            </Box>
            <div>
              <TransitionTabs
                stateTransitions={stateTransitions}
                assigneeTransitions={assigneeTransitions}
                sort={sort === "desc" ? "desc" : "asc"}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ExtendedCardContent;
