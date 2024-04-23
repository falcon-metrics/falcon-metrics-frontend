import React from "react";
import { Box, Card, CardHeader, Grid } from "@material-ui/core";

import {
  ColumnCard,
  ColumnContent,
  InitiativeContent,
  DeliveryDateContainer,
  InitiativeDiv,
  Header,
  getColumnHeaderStyle,
  getInitiativeCardStyle,
} from "./styles";
import { Skeleton } from "@material-ui/lab";

const InitiativeBoardLoader: React.FC = () => {
  return (
    <Box
      style={{
        paddingTop: 10,
        display: "flex",
        flexDirection: "row",
        overflowX: "auto",
      }}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Box
          key={index}
          style={{
            flex: "1 1 auto",
          }}
        >
          <Grid item xs={12}>
            <ColumnCard key={index}>
              <CardHeader
                style={getColumnHeaderStyle("#F0F0F0")}
                title={
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Skeleton variant="text" width={"82%"} />
                    <Skeleton
                      variant="circle"
                      width={25}
                      height={25}
                      style={{ borderRadius: 20 }}
                    />
                  </Box>
                }
              />
              <ColumnContent>
                {Array.from({ length: 3 }).map((_, index) => (
                  <InitiativeDiv key={index}>
                    <Card
                      variant="outlined"
                      style={{
                        ...getInitiativeCardStyle("#F0F0F0"),
                      }}
                    >
                      <Header>
                        <Skeleton variant="text" width={"80%"} />
                        <Skeleton
                          variant="circle"
                          width={20}
                          height={20}
                          style={{ borderRadius: 20, marginRight: 10 }}
                        />
                      </Header>

                      <InitiativeContent style={{ paddingTop: 30 }}>
                        {Array.from({ length: 3 }).map((_, index) => (
                          <DeliveryDateContainer key={index}>
                            <Skeleton variant="text" width={"80%"} />
                            &nbsp;
                            <Skeleton variant="text" width={"20%"} />
                          </DeliveryDateContainer>
                        ))}
                      </InitiativeContent>
                    </Card>
                  </InitiativeDiv>
                ))}
              </ColumnContent>
            </ColumnCard>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default InitiativeBoardLoader;
