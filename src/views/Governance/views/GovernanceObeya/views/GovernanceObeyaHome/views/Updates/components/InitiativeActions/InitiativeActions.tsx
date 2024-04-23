import { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { DateTime } from "luxon";
import BaseModal from "components/UI/BaseModal/BaseModal2";
import { styled } from "@material-ui/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { CalendarTodayRounded } from "@material-ui/icons";
import { getStatusStyles } from "../UpdateCard/utils";
import { RatingOptionsConstant } from "views/Governance/utils/constants";
import { DEFAULT_DATE_FORMAT, formatDate } from "utils/dateTime";
import { useObeyaRoom } from "views/Governance/views/GovernanceObeya/hooks/useObeyaRoom";
import InitiativeForm from "../UpdateForm/components/InitiativeForm/InitiativeForm";
import useAuthentication from "hooks/useAuthentication";

const ProgressText = styled(Typography)({
  display: "flex",
  fontFamily: "Open Sans",
  color: "#555D62",
  fontSize: 14,
});

export const CustomSelect = styled(Select)({
  padding: "4px 8px",
  borderRadius: 6,
});

const UpdateWrapper = styled(Box)({
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  padding: 0,
});

const WrapperDatapicker = styled(Box)({
  position: "relative",
  "& .MuiInputBase-adornedStart, & .MuiInputBase-root": {
    opacity: 0,
  },
  "& > .MuiInputBase-input": {
    opacity: 0,
  },
});

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    "& .MuiInput-underline:before": {
      borderBottom: "0px !important",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "0px !important",
    },
  },
  divider: {
    border: "1px solid #e8e8e8",
    height: "1px",
    marginTop: theme.spacing(2),
  },
}));

const InitiativeActions = () => {
  const classes = useStyles();
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const [isOpenDatePicker, setIsOpenDatePicker] = useState<boolean>();
  const [endDate, setEndDate] = useState<Date>();
  const [status, setStatus] = useState<string>('');
  const { activeRoom } = useObeyaRoom();

  const { isAdminOrPowerUser } = useAuthentication();

  const defaultEndDate = activeRoom.endDate ? DateTime.fromISO(activeRoom.endDate) : undefined;

  const diff = defaultEndDate ? defaultEndDate.diff(DateTime.now()) : undefined;
  const remainingDays = diff ? Math.ceil(diff.as("days")) : 0;

  const handleOpenDatePicker = () => {
    if (!isAdminOrPowerUser) return;
    setIsOpenDatePicker(!isOpenDatePicker);
  };

  const closeAndResetState = () => {
    setIsOpenUpdateModal(false);
    setStatus('');
    setEndDate(undefined);
  };

  return (
    <>
      <BaseModal
        title="New Update"
        open={isOpenUpdateModal}
        setOpen={() => {
          closeAndResetState();
        }}
        customStyle={{
          width: 840,
        }}
      >
        <UpdateWrapper>
          <InitiativeForm
            defaultDate={endDate ?
              endDate :
              (activeRoom.endDate ? DateTime.fromISO(activeRoom.endDate).toJSDate() : undefined)}
            defaultStatus={status === '' ? activeRoom.ratingId : status}
            placeholder="Write a post"
            activePlaceholder="Post your update. You’ve got 280 characters, so keep it concise. You can include more details with a note."
            afterSave={closeAndResetState}
          />
        </UpdateWrapper>
      </BaseModal>
      {/* <Wrapper> */}
      <div className={classes.wrapper}>
        <CustomSelect
          disabled={!isAdminOrPowerUser}
          labelId="status"
          id="status"
          value={activeRoom.ratingId || '4'}
          renderValue={(value: any) => {
            const item = RatingOptionsConstant.find((x) => x.value === value);
            if (item) return <p>{item.label}</p>;
            else return <p>Not Rated</p>;
          }}
          style={{
            width: 120,
            height: 28,
            marginRight: 10,
            background: getStatusStyles(activeRoom.ratingId).background,
            color: getStatusStyles(activeRoom.ratingId).color,
            fontSize: 14,
            fontFamily: "Open Sans",
          }}
          onChange={(event) => {
            setStatus(event?.target?.value as string);
            setIsOpenUpdateModal(true);
          }}
        >
          {RatingOptionsConstant.map((option) => {
            return (
              <MenuItem
                dense
                key={option.label}
                value={option.value}
              >
                <Box>{option.label}</Box>
              </MenuItem>
            );
          })}
        </CustomSelect>
        <Typography
          style={{ fontSize: 10, fontFamily: "Open Sans", color: "#323130" }}
        >
          for
        </Typography>
        <Box
          style={{
            color: "#2B353B",
            background: "#F0F0F0",
            margin: 6,
            borderRadius: 6,
            padding: "4px 6px",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            height: 28,
            fontFamily: "Open Sans",
            fontSize: 14,
          }}
        >
          <Box
            onClick={handleOpenDatePicker}
            style={{
              position: "relative",
              cursor: isAdminOrPowerUser ? "pointer" : "default",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <CalendarTodayRounded fontSize="inherit" color="disabled" /> &nbsp;
            {defaultEndDate ? formatDate(defaultEndDate) : ""}
          </Box>
          <WrapperDatapicker>
            <Box
              style={{
                display: `${isOpenDatePicker ? "block" : "none"}`,
                position: "absolute",
                top: "bottom",
                left: 28,
                fontSize: 14,
              }}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  onChange={(date) => {
                    if (date) {
                      // The date here is a JS date, at the start of the day, in the local timezone
                      // Change the timestamp to the end of the day
                      // console.log("date", DateTime.fromJSDate(date).toISO());
                      setEndDate(
                        DateTime.fromJSDate(date).endOf("day").toJSDate()
                      );
                    }
                    setIsOpenUpdateModal(true);
                    setIsOpenDatePicker(false);
                  }}
                  emptyLabel=""
                  format={DEFAULT_DATE_FORMAT}
                  variant="inline"
                  views={["year", "month", "date"]}
                  open={isOpenDatePicker ? isOpenDatePicker : false}
                  onOpen={() => setIsOpenDatePicker(true)}
                  onClose={() => setIsOpenDatePicker(false)}
                  label=""
                  InputAdornmentProps={{
                    position: "start",
                    style: { display: "none" },
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  disableToolbar
                  value={activeRoom.endDate ? DateTime.fromISO(activeRoom.endDate).toJSDate() : undefined}
                />
              </MuiPickersUtilsProvider>
            </Box>
          </WrapperDatapicker>
        </Box>
        <ProgressText
          style={{
            color: "#808689",
            justifyContent: "flex-end",
            fontSize: 10,
          }}
        >
          {remainingDays >= 0 ? remainingDays : 0} days left
        </ProgressText>
      </div>

      <div className={classes.divider} />
    </>
  );
};

export default InitiativeActions;
