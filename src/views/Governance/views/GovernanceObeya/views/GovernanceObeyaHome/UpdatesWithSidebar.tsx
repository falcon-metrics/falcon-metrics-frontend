import { useObeyaGoals } from "views/Governance/views/GovernanceObeya/hooks/useObeyaGoals";
import SideBar from "./views/Updates/SideBar";
import SkeletonSideBar from "./views/Updates/SkeletonSideBar";
import UpdatesContent from "./views/Updates/UpdatesContent";
import { useObeyaRoom } from "../../hooks/useObeyaRoom";

const UpdatesWithSidebar = () => {
    const {
        activeObeyaRoomId,
        isLoadingObeyaData,
    } = useObeyaRoom();
    const { loading: isLoadingObjectives } = useObeyaGoals(activeObeyaRoomId);

    const isLoadingRoom =
        isLoadingObeyaData || isLoadingObjectives;

    return <UpdatesContent>
        {isLoadingRoom ? <SkeletonSideBar /> : <SideBar />}
    </UpdatesContent>;
};
export default UpdatesWithSidebar;