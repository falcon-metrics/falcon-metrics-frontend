import {
  Typography,
  Box,
  Card,
  IconButton,
  Collapse,
  Grid,
  ButtonGroup,
  FormHelperText,
  TableCell,
  TableRow,
  Table,
  TableBody,
} from "@material-ui/core";

import Close from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { useStyles } from "./styles";
import { Skeleton } from "@material-ui/lab";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface CardDetailsProps {
  expanded: boolean;
}
const CardDetails = (props: CardDetailsProps) => {
  const classes = useStyles();
  const ExpandIcon = props.expanded ? ExpandLessIcon : ExpandMoreIcon;

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <Card className={classes.card}>
        <Typography className={classes.cardTitle}>
          <Skeleton width={125} variant="text" />
          <IconButton className={classes.expandIcon}>
            <ExpandIcon />
          </IconButton>
        </Typography>
        <Collapse in={props.expanded}>
          <Box className={classes.cardContent}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Typography key={index} className={classes.cardFields}>
                <Skeleton width={200} variant="text" />
                <span style={{ textAlign: "right" }}>
                  <Skeleton width={300} variant="text" />
                </span>
              </Typography>
            ))}
          </Box>
        </Collapse>
      </Card>
    </Box>
  );
};

const ExtendedCardSkeleton = ({ open, setOpen }: Props) => {
  const classes = useStyles();

  const gridSkeleton = Array.from({ length: 5 }).map((_, index) => (
    <TableRow key={index}>
      <TableCell className={classes.tabCells}>
        <Skeleton width={135} />
      </TableCell>
      <TableCell className={classes.tabCells} width={30}>
        <Skeleton width={30} />
      </TableCell>
      <TableCell className={classes.tabCells} width={135}>
        <Skeleton width={135} />
      </TableCell>
      <TableCell className={classes.tabCells} width={135}>
        <Skeleton width={135} />
      </TableCell>
    </TableRow>
  ));

  return (
    <Box>
      <Box
        className={classes.modal}
        style={{ padding: 10, verticalAlign: "middle" }}
      >
        <Skeleton width={"100%"} height={20} style={{ borderRadius: 5 }} />
        <IconButton
          className={classes.closeButton}
          onClick={() => setOpen(!open)}
        >
          <Close className={classes.closeIcon} />
        </IconButton>
      </Box>
      <Box style={{ overflow: "hidden", marginTop: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CardDetails expanded />
            <CardDetails expanded={false} />
            <CardDetails expanded={false} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                mr: 2,
                mb: 3,
              }}
            >
              <FormHelperText style={{ fontFamily: "Open Sans" }}>
                <Skeleton width={150} variant="text" />
              </FormHelperText>
              <ButtonGroup disableElevation size="small">
                <Skeleton
                  width={50}
                  height={25}
                  variant="rect"
                  style={{ borderRadius: 3, marginLeft: 5 }}
                />
                &nbsp;&nbsp;
                <Skeleton
                  width={50}
                  height={25}
                  variant="rect"
                  style={{ borderRadius: 3, marginLeft: 5 }}
                />
              </ButtonGroup>
            </Box>
            <Table>
              <TableBody>{gridSkeleton}</TableBody>
            </Table>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ExtendedCardSkeleton;
