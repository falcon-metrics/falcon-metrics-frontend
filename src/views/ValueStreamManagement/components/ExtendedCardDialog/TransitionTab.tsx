import {
  Tab,
  Tabs,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core";
import AssigneeTransitionTab from "./TransitionTabAssignee";
import StateTransitionTab from "./TransitionTabState";
import { useState } from "react";

interface Props {
  stateTransitions: any;
  assigneeTransitions: any;
  sort: "desc" | "asc";
}

interface StyledTabProps {
  label: string;
}

export const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
    // marginRight: 5,
    padding: 0,
  },
  indicator: {
    backgroundColor: "#1890ff",
  },
})(Tabs);

export const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      // minWidth: 50,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      fontFamily: "Open Sans",
      fontSize: 12,
      "&:hover": {
        color: "#40a9ff",
        opacity: 1,
      },
      "&$selected": {
        color: "#1890ff",
        fontWeight: theme.typography.fontWeightMedium,
      },
      "&:focus": {
        color: "#40a9ff",
      },
    },
    selected: {},
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const TransitionTabs = ({
  stateTransitions,
  assigneeTransitions,
  sort,
}: Props) => {
  const descStateTransitions = [...stateTransitions].sort(
    (a, b) => b.id - a.id
  );
  const descAssigneeTransitions = [...assigneeTransitions].sort(
    (a, b) => b.id - a.id
  );

  const ascStateTransitions = [...stateTransitions].sort((a, b) => a.id - b.id);
  const ascAssigneeTransitions = [...assigneeTransitions].sort(
    (a, b) => a.id - b.id
  );

  const initState = descStateTransitions.find((item) => item.id === 0);
  const initAssignee = descAssigneeTransitions.find((item) => item.id === 0);

  const sortedStateTransitions =
    sort === "desc" ? descStateTransitions : ascStateTransitions;
  const sortedAssigneeTransitions =
    sort === "desc" ? descAssigneeTransitions : ascAssigneeTransitions;

  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div style={{ margin: 20 }}>
      <AntTabs value={activeTab} onChange={handleChange}>
        <AntTab key={"state"} label={"State Transitions"} />
        <AntTab key={"assignee"} label={"Assignee Transitions"} />
      </AntTabs>

      {activeTab === 0 ? (
        <StateTransitionTab
          descStateTransitions={sortedStateTransitions}
          initState={initState}
          sort={sort}
        />
      ) : (
        <AssigneeTransitionTab
          descAssigneeTransitions={sortedAssigneeTransitions}
          initAssignee={initAssignee}
          sort={sort}
        />
      )}
    </div>
  );
};

export default TransitionTabs;
