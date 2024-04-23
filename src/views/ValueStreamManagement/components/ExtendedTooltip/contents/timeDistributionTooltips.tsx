export const histogramTooltip: any = [
  {
    name: "Lead Time Histogram",
    key: "lead-time-histogram",
    whatIsThisTellingMe: {
      content: [
        {
          content: [
            {
              marks: [],
              value: "What is the Lead Time Histogram telling me?",
              elementType: "text",
            },
          ],
          elementType: "heading-3",
        },
        {
          content: [
            {
              marks: [],
              value:
                "\nFor completed items within the selected date range, their lead time represented by frequency.\n",
              elementType: "text",
            },
            {
              marks: [
                {
                  type: "bold",
                },
              ],
              value: "Y-Axis:",
              elementType: "text",
            },
            {
              marks: [],
              value: " Frequency",
              elementType: "text",
            },
          ],
          elementType: "paragraph",
        },
        {
          content: [
            {
              marks: [
                {
                  type: "bold",
                },
              ],
              value: "X-Axis: ",
              elementType: "text",
            },
            {
              marks: [],
              value: "Lead Time in Days\n",
              elementType: "text",
            },
          ],
          elementType: "paragraph",
        },
      ],
      elementType: "document",
    },
    referenceGuide: {
      elementType: "document",
      content: [
        {
          elementType: "heading-3",
          content: [
            {
              elementType: "text",
              value: "Predictive Target Line",
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
                '\nAnything to the right of the Predictive Target Line represents a "Long Tail" / "Fat Tail" on your histogram, which classifies your team\'s Lead Time predictability as \'',
              marks: [],
            },
            {
              elementType: "text",
              value: "Low",
              marks: [
                {
                  type: "bold",
                },
              ],
            },
            {
              elementType: "text",
              value:
                "'.\nAim to \"trim\" the tail shift your team's Lead Time predictability to '",
              marks: [],
            },
            {
              elementType: "text",
              value: "High",
              marks: [
                {
                  type: "bold",
                },
              ],
            },
            {
              elementType: "text",
              value: "'.\nRead more in the ",
              marks: [],
            },
            {
              elementType: "hyperlink",
              data: {
                uri:
                  "https://www.example.com/insights/lead-time-predictability-is-your-team-predictable",
              },
              content: [
                {
                  elementType: "text",
                  value: "Lead Time Predictability blog",
                  marks: [],
                  data: {},
                },
              ],
            },
            {
              elementType: "text",
              value: ".",
              marks: [],
            },
          ],
        },
      ],
    },
  },
];

export const scatterplotTooltip: any = [
  {
    name: "Lead Time Scatterplot",
    key: "lead-time-scatterplot",
    whatIsThisTellingMe: {
      elementType: "document",
      content: [
        {
          elementType: "heading-3",
          content: [
            {
              elementType: "text",
              value: "What is the Lead Time Scatterplot telling me?",
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
                "\nFor completed items within the selected date range, their lead time represented across a timeline.\n",
              marks: [],
            },
            {
              elementType: "text",
              value: "Y-Axis:",
              marks: [
                {
                  type: "bold",
                },
              ],
            },
            {
              elementType: "text",
              value: " Lead Time ",
              marks: [],
            },
          ],
        },
        {
          elementType: "paragraph",
          content: [
            {
              elementType: "text",
              value: "X-Axis: ",
              marks: [
                {
                  type: "bold",
                },
              ],
            },
            {
              elementType: "text",
              value:
                "Time\nHover over the data points see more information about that work item\n",
              marks: [],
            },
            {
              elementType: "text",
              value: "NB: ",
              marks: [
                {
                  type: "bold",
                },
              ],
            },
            {
              elementType: "text",
              value:
                "They may be multiple flow items within the one data point, in which case the hover over will show how many items.",
              marks: [],
            },
          ],
        },
      ],
    },
  },
];
