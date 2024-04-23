import { useEffect, useState, useMemo, useRef } from "react";
import { Index } from "flexsearch/dist/flexsearch.bundle";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import Typography from "@material-ui/core/Typography";
/*eslint import/namespace: [2, { allowComputed: true }] */
import debounce from "lodash/debounce";
import * as mui from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import BaseModal from "../../../../../../../../../components/UI/BaseModal/BaseModal2";
import { WrapperContent, useStyles } from "./ModalSearchIcons.styles";
import { synonyms } from "./synonyms";

const CustomTextField = styled(TextField)({
  "&": {
    color: "#1890ff",
    fontFamily: "Open Sans",
  },
  "& .MuiFormLabel-root": {
    fontFamily: "Open Sans",
  },
});

const ModalSearchIcons = ({
  isOpenModalSearchIcon,
  setOpenModalSearchIcon,
  onSubmitSearchIcon,
  control,
  handleShowSelectedIcon,
}: any) => {
  return (
    <BaseModal
      maxWidth="md"
      open={isOpenModalSearchIcon}
      setOpen={setOpenModalSearchIcon}
      title="Search Icon"
    >
      <WrapperContent>
        <FormSearchIcon
          ontrol={control}
          onSubmitSearchIcon={onSubmitSearchIcon}
          setOpenModalSearchIcon={setOpenModalSearchIcon}
          handleShowSelectedIcon={handleShowSelectedIcon}
        />
      </WrapperContent>
    </BaseModal>
  );
};

export const WrapperIconsList = styled(Box)({
  display: "grid",
  gridColumnGap: 35,
  gridRowGap: 25,
  gridTemplateRows: "auto",
  gridTemplateColumns: "repeat(auto-fit, 170px)",
  cursor: "pointer",
  color: "rgba(0, 0, 0, 0.54)",
  marginTop: 28,
  overflow: "hidden",
});

export const WrapperIcon = styled(Box)({
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});

export const WrapperSelectedIcon = styled(Box)({
  border: "1px solid #ebebeb",
  borderRadius: 6,
  background: "#f3f3f3",
  justifyContent: "center",
  paddingTop: 4,
  paddingBottom: 4,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});

const Icons = ({ icons, classes, handleSelectIcon, selectedIcon }: any) => {
  return (
    <WrapperIconsList>
      {icons.map((icon) => {
        const CustomIcon =
          selectedIcon === icon.key ? WrapperSelectedIcon : WrapperIcon;
        return (
          <CustomIcon key={icon.key} onClick={() => handleSelectIcon(icon)}>
            <icon.Icon
              tabIndex={-1}
              onClick={() => handleSelectIcon(icon)}
              title={icon.key}
              className={classes.iconSvg}
              data-ga-event-category="material-icons"
              data-ga-event-action="click"
              data-ga-event-label={icon.key}
            />
            <Typography noWrap style={{ maxWidth: 160 }}>
              <span onClick={() => handleSelectIcon(icon)}>
                {icon.key.replace("Outlined", "")}
              </span>
            </Typography>
          </CustomIcon>
        );
      })}
    </WrapperIconsList>
  );
};

export const WrapperSearchIconForm = styled(Box)({
  width: "100%",
});

const FormSearchIcon = ({
  onSubmitSearchIcon,
  setOpenModalSearchIcon,
  handleShowSelectedIcon,
}: any) => {
  const classes = useStyles();
  const [tag] = useState("Outlined");
  const [keys, setKeys] = useState<[] | undefined | string[]>();
  const [selectedIcon, setSelectedIcon] = useState(null);

  const formMethods = useForm<any>({
    defaultValues: {
      icon: "",
    },
  });

  const { control, setValue } = formMethods;

  const onSubmitIcon = (icon) => {
    setSelectedIcon(icon.key);
    setValue("icon", icon.key);
    onSubmitSearchIcon(icon.key);
    setOpenModalSearchIcon(false);
  };

  const searchIndex = new Index({
    async: true,
    tokenize: "full",
  });

  const allIconsMap = {};
  const allIcons = Object.keys(mui)
    .sort((a, b) => a.localeCompare(b))
    .map((key) => {
      let tag;
      if (key.indexOf("Outlined") !== -1) {
        tag = "Outlined";
      } else if (key.indexOf("TwoTone") !== -1) {
        tag = "Two tone";
      } else if (key.indexOf("Rounded") !== -1) {
        tag = "Rounded";
      } else if (key.indexOf("Sharp") !== -1) {
        tag = "Sharp";
      } else {
        tag = "Filled";
      }

      let searchable = key.replace(/(Outlined|TwoTone|Rounded|Sharp)$/, "");
      if (synonyms[searchable]) {
        searchable = ` ${synonyms[searchable]}`;
      }
      searchIndex.add(key, searchable);

      const icon = {
        key,
        tag,
        Icon: mui[key],
      };
      allIconsMap[key] = icon;
      return icon;
    });

  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onSearch = (value) => {
    if (!isMounted.current) {
      return;
    }

    if (value === "") {
      setKeys([]);
    } else {
      const result = searchIndex?.search(value);
      setKeys(result);
    }
  };

  const handleChange = debounce(onSearch, 300);

  const icons = useMemo(
    () =>
      (!keys?.length
        ? allIcons
        : (keys || []).map((key) => allIconsMap[key])
      ).filter((icon) => tag === icon.tag),
    [tag, keys]
  );

  return (
    <WrapperSearchIconForm>
      <form className={classes.form}>
        <Controller
          render={({ field }) => {
            return (
              <FormControl className={classes.inputSize}>
                <CustomTextField
                  fullWidth
                  {...field}
                  size="medium"
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange(e.target.value);
                  }}
                  value={field.value}
                  InputLabelProps={{ shrink: true }}
                  label="Find Icon"
                  inputProps={{ style: { fontFamily: "Open Sans" } }}
                />
              </FormControl>
            );
          }}
          name="icon"
          control={control}
        />
      </form>
      <Icons
        icons={icons}
        classes={classes}
        handleSelectIcon={onSubmitIcon}
        selectedIcon={selectedIcon}
        handleShowSelectedIcon={handleShowSelectedIcon(selectedIcon)}
      />
    </WrapperSearchIconForm>
  );
};
export default ModalSearchIcons;
