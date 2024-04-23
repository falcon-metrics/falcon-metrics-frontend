import {
  DialogTitle as MuiDialogTitle,
  Link,
  Typography,
} from "@material-ui/core";

import _, { isString } from "lodash";
import { useState, useEffect } from "react";
import Providers from "views/SetupWizard/interfaces/Providers";
import { getProviderConnection } from "views/SetupWizard/views/Providers/ProviderConnections/interfaces/providers";

import LaunchIcon from "@material-ui/icons/Launch";
import { useStyles } from "./styles";

interface Props {
  data: any;
  workItemId: string;
}

const DialogTitle = ({ data, workItemId }: Props) => {
  const classes = useStyles();

  const { extendedDetails } = data;

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!data) return;

    const _title = `${workItemId} : ${extendedDetails.title}`;
    const truncated = _.truncate(_title, {
      length: 125,
      omission: "...",
    });

    setTitle(truncated);
  }, [extendedDetails]);

  useEffect(() => {
    if (!data) return;

    const providerConnection = getProviderConnection(extendedDetails.datasourceType);

    if (!providerConnection || !isString(workItemId)) {
      setUrl(workItemId);
    } else {
      const _url = providerConnection.getWorkItemUrl(
        workItemId,
        extendedDetails.datasourceType === Providers.JIRA_SERVER
          ? extendedDetails.serviceUrl
          : extendedDetails.namespace,
        extendedDetails.projectName
      );
      setUrl(_url);
    }
  }, [extendedDetails]);

  return (
    <MuiDialogTitle>
      <Typography className={classes.modalTitle}>
        <Link href={url} target="_blank">
          {title}
        </Link>
        <LaunchIcon className={classes.modalIcon} />
      </Typography>
    </MuiDialogTitle>
  );
};

export default DialogTitle;
