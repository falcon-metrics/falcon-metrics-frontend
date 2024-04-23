export const completedWorkTooltip : any = [
  {
    name: "Demand Distribution - Completed Work",
    key: "demand-distribution-completed-work",
    whatIsThisTellingMe: {
      content: [
        {
          content: [
            {
              marks: [
                {
                  type: "bold",
                },
              ],
              value: "What is this telling me?",
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
                "Distribution of completed work by normalisation (as defined on the Normalisation page in the Configuration Wizard).\n\nChange data aggregation (days/weeks/months/quarters/years) via preferences in the filter panel.",
              elementType: "text",
            },
          ],
          elementType: "paragraph",
        },
      ],
      elementType: "document",
    },
    whyIsThisImportant: {
      elementType: "document",
      content: [
        {
          elementType: "heading-3",
          content: [
            {
              elementType: "text",
              value: "Why is this important?",
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
                "\nUnderstand how our investment is being utilised across the different demands.",
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
  },
];

export const upcomingWorkTooltip : any = [
  {
    name: "Demand Distribution - Upcoming Work",
    key: "demand-distribution-upcoming-work",
    whatIsThisTellingMe: {
      elementType: "document",
      content: [
        {
          elementType: "heading-3",
          content: [
            {
              elementType: "text",
              value: "What is this telling me?",
              marks: [
                {
                  type: "bold",
                },
              ],
            },
          ],
        },
        {
          elementType: "paragraph",
          content: [
            {
              elementType: "text",
              value:
                "\nDistribution of upcoming work by normalisation (as defined on the Normalisation page in the Configuration Wizard).\n\nChange data aggregation (days/weeks/months/quarters/years) via preferences in the filter panel.\n",
              marks: [],
            },
          ],
        },
      ],
    },
  },
];

export const workInProcessTooltip : any = [
  {
    name: "Demand Distribution - Work In Process",
    key: "demand-distribution-work-in-process",
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
                "\nDistribution of WIP work by normalisation (as defined on the Normalisation page in the Configuration Wizard). \n\nChange data aggregation (days/weeks/months/quarters/years) via preferences in the filter panel.\n",
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
  },
];
