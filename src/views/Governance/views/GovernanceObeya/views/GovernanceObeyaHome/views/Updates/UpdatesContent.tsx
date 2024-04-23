import { makeStyles } from "@material-ui/core/styles";
import UpdateTimeLine from "./components/UpdateTimeLine/UpdateTimeLine";
import { DateTime } from "luxon";
import { ButtonFilter, ListTitle, Wrapper, WrapperButtonFilter, WrapperCard, WrapperCardList, scrollbarStyle } from "./Updates.styles";
import { useUpdates } from "./hooks/useUpdates";
import SkeletonUpdateCard from "./components/SkeletonUpdateCard";
import Author from "./components/Author";
import useAuthentication from "hooks/useAuthentication";
import useProfile from "hooks/useProfile";
import { useEffect, useState } from "react";
import UpdateForm from "./components/UpdateForm";
import UpdateCard from "./components/UpdateCard/UpdateCard";
import {
  OKRObjective,
  ratingConfig,
} from 'views/Governance/views/GovernanceObeya/utils';
import { Virtuoso } from "react-virtuoso";
import { useObeyaRoom } from "views/Governance/views/GovernanceObeya/hooks/useObeyaRoom";

const filterNames = ['All', 'Initiative', 'Objective', 'Key Result', 'Risk', 'Dependency'];

export type RatingSeries = {
  [ratingId: string]: {
    text: string;
    color?: string;
    backgroundColor?: string;
    values: number[] | [];
  };
};

export const getRatingSeriesAndKeyResultsCount = (obeyaOKRs: any = []) => {
  return obeyaOKRs.reduce((
    acc: { ratingSeries: RatingSeries; keyResultsCount: number; },
    okr: OKRObjective,
  ) => {
    const { ratingId } = okr;
    if (ratingId && !acc.ratingSeries?.[ratingId]?.values?.length) {
      acc.ratingSeries[ratingId].values = [1];
    } else if (ratingId && acc.ratingSeries?.[ratingId]?.values?.length) {
      acc.ratingSeries[ratingId].values = [
        acc.ratingSeries[ratingId].values[0] + 1,
      ];
    } else if (
      ratingId &&
      acc.ratingSeries?.[ratingId]?.values.length === 0
    ) {
      acc.ratingSeries[ratingId].values = [0];
    }
    acc.keyResultsCount =
      acc?.keyResultsCount + (okr.keyResults?.length || 0);
    return acc;
  },
    {
      ratingSeries: {
        '1': {
          ...ratingConfig['1'],
          backgroundColor: ratingConfig['1'].color,
          values: [0],
        },
        '2': {
          values: [0],
          ...ratingConfig['2'],
          backgroundColor: ratingConfig['2'].color,
        },
        '3': {
          values: [0],
          ...ratingConfig['3'],
          backgroundColor: ratingConfig['3'].color,
        },
        '4': {
          values: [0],
          ...ratingConfig['4'],
          backgroundColor: ratingConfig['4'].color,
        },
      },
      keyResultsCount: 0,
    },
  );
};

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "row",
  },
  content: {
    flexGrow: 1,
    overflowY: "auto",
    flexDirection: "column",
    marginLeft: theme.spacing(3),
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#fefefe",
    minWidth: 450,
    maxWidth: 450,
    padding: theme.spacing(4),
  },
  progressText: {
    fontFamily: "Open Sans",
    fontSize: 14,
    color: "#323130",
    alignItems: "center",
    paddingTop: theme.spacing(1),
  },
  boardsText: {
    fontFamily: "Open Sans",
    fontSize: 14,
    color: "#323130",
    alignItems: "center",
    width: "50%",
    whiteSpace: "break-spaces",
    paddingLeft: theme.spacing(1),
  },
  sidebarSection: {
    paddingBottom: theme.spacing(1),
    flexDirection: "column",
    alignItems: "center",
  },
  outcomesSection: {
    height: 332,
  },
  boardsProgress: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  sectionHeader: {
    fontFamily: "Open Sans",
    fontSize: 14,
    color: "#323130",
    fontWeight: 600,
    paddingBottom: theme.spacing(1),
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  chartHeader: {
    fontFamily: "Open Sans",
    fontSize: 14,
    color: "#323130",
    paddingBottom: theme.spacing(1),
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  scrollableSection: {
    maxHeight: "300px",
    overflowY: "auto",
    paddingRight: 14,
    ...scrollbarStyle,
  },
  graphs: {
    justifyContent: "center",
    padding: 20,
  },
  divider: {
    display: "flex",
    flexGrow: 1,
    border: "1px solid #e8e8e8",
    height: "1px",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  card: {
    flexShrink: 1,
    marginRight: theme.spacing(3),
    overflow: "hidden",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
type UpdatesContentProps = {
  children?: any;
};

const UpdatesContent = (props: UpdatesContentProps) => {
  const classes = useStyles();
  const { userInfo } = useAuthentication();
  const { data: profile } = useProfile();

  const {
    activeRoom,
  } = useObeyaRoom();

  const [updateType, setUpdateType] = useState<string>('all');
  const { data, isLoading: isLoadingUpdates } = useUpdates(
    "updates",
    updateType
  );

  useEffect(() => {
    // The virtualizer component causes this error because the component 
    // that is subscribed to the event may have been scrolled out of view and unmounted , 
    // resulting in the event trying to bubble to an unavailable location.
    // This causes no real errors , and will not show up on prod. But on local , 
    // react scripts (webpacker) treats this as a runtime error and blocks the UI ,
    //  hence this code will stop the local instance from suspending.
    // https://github.com/petyosi/react-virtuoso/issues/875
    window.addEventListener('error', e => {
      if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        );
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    });
  }, []);

  const renderRow = (index) => {
    let startIndex = 3;
    let thisWeekStartIndex, thisWeekEndIndex, lastweekStartIndex, lastWeekEndIndex, prevStartIndex;
    if (data && data.thisWeek.length) {
      const endIndex = startIndex + data.thisWeek.length - 1;
      thisWeekStartIndex = startIndex;
      thisWeekEndIndex = endIndex;
      startIndex = endIndex + 1;
    }
    if (data && data.lastWeek.length) {
      const endIndex = startIndex + data.lastWeek.length - 1;
      lastweekStartIndex = startIndex;
      lastWeekEndIndex = endIndex;
      startIndex = endIndex + 1;
    }
    if (data && data.previous.length) {
      prevStartIndex = startIndex;
    }
    return (
      <div>
        {
          index === 0 &&
          <WrapperButtonFilter key="filters">
            {filterNames.map((name, index) => {
              return (
                <ButtonFilter
                  key={index}
                  value={name.toLowerCase()}
                  onClick={() => filterPost(name.toLocaleLowerCase())}
                  style={{
                    textTransform: 'capitalize',
                    background: name.toLowerCase() === updateType ? '#0077C8' : '#E0E0E0',
                    color: name.toLowerCase() === updateType ? '#fff' : '#2B353B'
                  }}
                >
                  {name}
                </ButtonFilter>
              );
            })}
          </WrapperButtonFilter>
        }
        {
          index === 1 &&
          <UpdateTimeLine
            key="timeline"
            data={data}
            isLoadingUpdates={isLoadingUpdates}
            startDate={
              activeRoom?.beginDate
                ? DateTime.fromISO(activeRoom?.beginDate)
                : undefined
            }
            endDate={
              activeRoom?.endDate
                ? DateTime.fromISO(activeRoom?.endDate)
                : undefined
            }
          />
        }
        {
          index === 2 && <div key="updateForm">
            <Author
              photo={profile?.picture}
              name={userInfo?.name || ''}
              daysPost={[]}
              views={12}
              listCard={false}
            />
            <WrapperCard>
              <UpdateForm
                placeholder="Write a post"
                activePlaceholder="Post your update. You've got 280 characters, so keep it concise. You can include more details with a note."
              />
            </WrapperCard>
          </div>
        }
        {
          data && data.thisWeek.length !== 0 && index >= thisWeekStartIndex && index <= thisWeekEndIndex && (
            index === thisWeekStartIndex ?
              <div key="this-week-first-item">
                <ListTitle key={"this"}>This Week</ListTitle>
                <WrapperCardList
                  key={`updatecardlist-${data.thisWeek[index - thisWeekStartIndex].id}`}>
                  <UpdateCard
                    key={`updatecardlist-${data.thisWeek[index - thisWeekStartIndex].id}`}
                    updateInfo={data.thisWeek[index - thisWeekStartIndex]} />
                </WrapperCardList>
              </div>
              :
              <WrapperCardList
                key={`updatecardlist-${data.thisWeek[index - thisWeekStartIndex].id}`}>
                <UpdateCard
                  key={`updatecardlist-${data.thisWeek[index - thisWeekStartIndex].id}`}
                  updateInfo={data.thisWeek[index - thisWeekStartIndex]} />
              </WrapperCardList>
          )
        }
        {
          data && data.lastWeek.length !== 0 && index >= lastweekStartIndex && index <= lastWeekEndIndex && (
            index === lastweekStartIndex ?
              <div key="last-week-first-item">
                <ListTitle>Last Week</ListTitle>
                <WrapperCardList
                  key={`updatecardlist-${data.lastWeek[index - lastweekStartIndex].id}`}>
                  <UpdateCard
                    key={`updatecardlist-${data.lastWeek[index - lastweekStartIndex].id}`}
                    updateInfo={data.lastWeek[index - lastweekStartIndex]} />
                </WrapperCardList>
              </div>
              :
              <WrapperCardList
                key={`updatecardlist-${data.lastWeek[index - lastweekStartIndex].id}`}>
                <UpdateCard
                  key={`updatecardlist-${data.lastWeek[index - lastweekStartIndex].id}`}
                  updateInfo={data.lastWeek[index - lastweekStartIndex]} />
              </WrapperCardList>
          )
        }
        {
          data && data.previous.length !== 0 && index >= prevStartIndex && (
            index === prevStartIndex ?
              <div key="previous-first-item">
                <ListTitle>Previous</ListTitle>
                <WrapperCardList
                  key={`updatecardlist-${data.previous[index - prevStartIndex].id}`}>
                  <UpdateCard
                    key={`updatecardlist-${data.previous[index - prevStartIndex].id}`}
                    updateInfo={data.previous[index - prevStartIndex]} />
                </WrapperCardList>
              </div>
              :
              <WrapperCardList
                key={`updatecardlist-${data.previous[index - prevStartIndex].id}`}>
                <UpdateCard
                  key={`updatecardlist-${data.previous[index - prevStartIndex].id}`}
                  updateInfo={data.previous[index - prevStartIndex]} />
              </WrapperCardList>
          )
        }
      </div>
    );
  };

  const filterPost = (filterName) => {
    setUpdateType(filterName);
  };

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        {isLoadingUpdates
          ?
          <SkeletonUpdateCard />
          :
          <Wrapper>
            <Virtuoso
              // useWindowScroll
              // data={data}
              defaultItemHeight={400}
              totalCount={(data?.thisWeek.length || 0) + (data?.lastWeek.length || 0) + (data?.previous.length || 0) + 3}
              itemContent={renderRow}
            />
          </Wrapper>
        }
      </main>
      <aside className={classes.sidebar}>
        {props.children}
      </aside>
    </div>
  );
};

export default UpdatesContent;
