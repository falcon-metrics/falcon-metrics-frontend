import { PortfolioBoardData } from "../../../interfaces/PortfolioBoard";
// Initialize default columns
export const initialData: PortfolioBoardData = {
  initiatives: [],
  columns: {},
    // Think: {
    //   columnId: uuidV4(),
    //   columnName: "Think",
    //   roomIds: [],
    //   colour: "#D5D7D8",
    //   order: 0,
    // },
    // Prioritise: {
    //   columnId: uuidV4(),
    //   columnName: "Prioritise",
    //   roomIds: [],
    //   colour: "#2AD2C9",
    //   order: 1,
    // },
    // Build: {
    //   columnId: uuidV4(),
    //   columnName: "Build",
    //   roomIds: [],
    //   colour: "#005FA0",
    //   order: 2,
    // },
    // Measure: {
    //   columnId: uuidV4(),
    //   columnName: "Measure",
    //   roomIds: [],
    //   colour: "#2AD2C9",
    //   order: 3,
    // },
    // Learn: {
    //   columnId: uuidV4(),
    //   columnName: "Learn",
    //   roomIds: [],
    //   colour: "#005FA0",
    //   order: 4,
    // },
  // },
  columnOrder: []
  // columnOrder: ["Think", "Prioritise", "Build", "Measure", "Learn"],
};
