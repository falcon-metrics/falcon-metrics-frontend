import { Box, Divider, Typography } from "@material-ui/core";
import { PreviewComponentProps } from "components/RelationshipPreviewModal/RelationshipPreviewModal";
import useSWR from "swr";
import fetch from "../../../../core/api/fetch";
import { Skeleton } from "@material-ui/lab";
import {
  Title,
  DividerLine,
} from "../../../../views/NorthStar/views/components/StrategicDriverDetail/components/StrategyTitle/StrategyTitle";
import {
  CommentInfo,
  CommentInfoBase,
} from "views/ValueStreamManagement/components/Comments/hooks/useReplies";
import { DateTime } from "luxon";
import ChatBubbleIcon from "@material-ui/icons/ChatBubbleOutline";
import { useState } from "react";
import { DEFAULT_DATE_FORMAT } from "utils/dateTime";

const fetchComment = (url: string) => {
  return fetch
    .get(`${url}`)
    .then((response) => response.data.comment[0] as CommentInfo);
};

const CommentPreview = (props: PreviewComponentProps) => {
  const { data: response, isValidating } = useSWR(
    `/comments/${props.entityId}`,
    fetchComment,
    { revalidateOnFocus: false }
  );
  const [showReplies, setShowReplies] = useState<boolean>(true);
  return (
    <Box style={{ paddingTop: 20 }}>
      {isValidating ? (
        <Skeleton height={400} variant="rect" />
      ) : response ? (
        <>
          <Box
            style={{
              backgroundColor: "#FEFEFE",
              borderRadius: 16,
              padding: 30,
            }}
          >
            <Title>Comment</Title>
            <DividerLine style={{ marginBottom: 20 }} />
            <Typography style={{ color: "#555D62", fontSize: 10 }}>
              {DateTime.fromISO(response.createdAt || "")
                .setLocale("en-gb")
                .toFormat(DEFAULT_DATE_FORMAT)}
            </Typography>
            <Box style={{ marginTop: 20 }}>
              <Typography
                style={{ fontSize: 16, fontWeight: "bold", color: "#2B353B" }}
              >
                {response.title}
              </Typography>
              <Typography style={{ fontSize: 14, color: "#2B353B" }}>
                {response.comment}
              </Typography>
              <Divider
                style={{
                  backgroundColor: "#000000",
                  marginTop: 12,
                  marginBottom: 12,
                }}
              />
              <Box
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                onClick={() => setShowReplies(!showReplies)}
              >
                <Box style={{ display: "flex" }}>
                  <ChatBubbleIcon style={{ color: "#808689" }} />
                  <Typography
                    style={{ fontSize: 10, color: "#808689", marginLeft: 5 }}
                  >
                    {showReplies ? "Hide replies" : "Show replies"}
                  </Typography>
                </Box>
                <Box>
                  <Typography style={{ fontSize: 10, color: "#808689" }}>
                    by {response.username}
                  </Typography>
                </Box>
              </Box>
              {response.replies && response.replies.length > 0 && showReplies && (
                <Box
                  style={{
                    marginTop: 12,
                    backgroundColor: "#F0F0F0",
                    padding: 8,
                  }}
                >
                  {response.replies.map((reply: CommentInfoBase) => {
                    return (
                      <Box key={reply.id} style={{ paddingBottom: 20 }}>
                        <Typography style={{ color: "#555D62", fontSize: 10 }}>
                          {DateTime.fromISO(reply.createdAt || "")
                            .setLocale("en-gb")
                            .toFormat(DEFAULT_DATE_FORMAT)}
                        </Typography>
                        <Typography
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "#2B353B",
                            marginTop: 10,
                          }}
                        >
                          {response.title}
                        </Typography>
                        <Typography style={{ fontSize: 14, color: "#2B353B" }}>
                          {response.comment}
                        </Typography>
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: 10,
                              color: "#808689",
                              float: "right",
                            }}
                          >
                            by {response.username}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
          </Box>
        </>
      ) : (
        <Typography>Data not found</Typography>
      )}
    </Box>
  );
};

export default CommentPreview;
