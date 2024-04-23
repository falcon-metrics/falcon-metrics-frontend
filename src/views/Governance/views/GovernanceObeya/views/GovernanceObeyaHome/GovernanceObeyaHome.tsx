import { Box } from "@material-ui/core";
import React, { useState } from "react";
import Footer from "views/Dashboard/views/Platform/views/Footer/Footer";
import MetaDataProvider from "./contexts/Metadata";
import {
  ObeyaRoomProvider,
} from "./GovernanceObeyaContext";
import ObeyaStickyTopBar from "./components/ObeyaStickyTopBar";
import SkeletonObeyaRoom from "./components/SkeletonObeyaRoom";

const UpdatesWithSidebar = React.lazy(() => import('./UpdatesWithSidebar'));
const GovernanceObeya = React.lazy(() => import('./GovernanceObeya'));

const FeedTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ObeyaStickyTopBar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab} />
      <React.Suspense fallback={
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <SkeletonObeyaRoom />
        </Box>
      }>
        {selectedTab === 0 ? <UpdatesWithSidebar /> : <GovernanceObeya />}
      </React.Suspense>
    </Box>
  );
};

const TabViewsContextWrapper = () => {
  return (
    <MetaDataProvider>
      <FeedTabs />
    </MetaDataProvider>
  );
};

const GovernanceObeyaWrapper = () => {
  return (
    <ObeyaRoomProvider>
      <Box
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <TabViewsContextWrapper />
        <Footer />
      </Box>
    </ObeyaRoomProvider>
  );
};
export default GovernanceObeyaWrapper;
