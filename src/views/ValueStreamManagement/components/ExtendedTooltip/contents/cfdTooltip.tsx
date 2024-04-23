export const cfdTooltip: any = [
  {
    name: "Cumulative Flow Diagram",
    key: "cumulative-flow-diagram",
    whatIsThisTellingMe: {
      elementType: "document",
      content: [
        {
          elementType: "heading-3",
          content: [
            {
              elementType: "text",
              value: "What is this telling me?",
              marks: [],
            },
          ],
        },
        {
          elementType: "paragraph",
          content: [
            {
              elementType: "text",
              value:
                "\nCumulative Flow Diagram (CFD) is a data tool that visually presents the “flow” of tasks from one state to another. \n",
              marks: [],
            },
            {
              elementType: "text",
              value: "Y-axis",
              marks: [
                {
                  type: "bold",
                },
              ],
            },
            {
              elementType: "text",
              value:
                " represents the number of work items by their workflow state",
              marks: [],
            },
          ],
        },
        {
          elementType: "paragraph",
          content: [
            {
              elementType: "text",
              value: "X-axis",
              marks: [
                {
                  type: "bold",
                },
              ],
            },
            {
              elementType: "text",
              value: " is time ",
              marks: [],
            },
          ],
        },
        {
          elementType: "paragraph",
          content: [
            {
              elementType: "text",
              value:
                "The coloured bands represent different workflow stages and their size indicates the number of items moving through various states before being completed.\nYou can obtain key number by hovering over the different points in the CFD.",
              marks: [],
            },
          ],
        },
        {
          elementType: "paragraph",
          content: [
            {
              elementType: "text",
              value: "",
              marks: [],
            },
          ],
        },
      ],
    },
    referenceGuide: {
      content: [
        {
          content: [
            {
              marks: [],
              value: "Reference Guide",
              elementType: "text",
            },
          ],
          elementType: "heading-3",
        },
        {
          content: [
            {
              marks: [],
              value: "\n",
              elementType: "text",
            },
            {
              data: {
                uri:
                  "https://www.example.com/insights/extracting-insights-from-cfd-at-scale",
              },
              content: [
                {
                  data: {},
                  marks: [],
                  value: "Extracting Insights from CFD",
                  elementType: "text",
                },
              ],
              elementType: "hyperlink",
            },
            {
              marks: [],
              value: "",
              elementType: "text",
            },
          ],
          elementType: "paragraph",
        },
        {
          content: [
            {
              marks: [],
              value: "",
              elementType: "text",
            },
            {
              data: {
                uri:
                  "https://www.example.com/insights/can-your-cumulative-flow-diagram-cfd-show-you-what-you-need-to-see",
              },
              content: [
                {
                  data: {},
                  marks: [],
                  value: "Falcon Metrics's approach to CFD",
                  elementType: "text",
                },
              ],
              elementType: "hyperlink",
            },
            {
              marks: [],
              value: "",
              elementType: "text",
            },
          ],
          elementType: "paragraph",
        },
        {
          content: [
            {
              marks: [],
              value: "",
              elementType: "text",
            },
          ],
          elementType: "paragraph",
        },
      ],
      elementType: "document",
    },
  },
];
