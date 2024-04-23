export const flowOfDemandsTooltips: any = {
  demandVsCapacity: [
    {
      name: "Demand vs. Capacity",
      key: "demand-vs-capacity",
      whatIsThisTellingMe: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "What is this telling me?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value:
                  "\nThe ratio of work coming into the system (as defined by Arrival Point) vs leaving the system (as defined by Departure Point).",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "\n",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "bold",
                  },
                ],
                value: "Red:",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " Demand is 4X larger than Capacity ",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [
                  {
                    type: "bold",
                  },
                ],
                value: "Amber: ",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: "Demand is between 0 and 4X Capacity ",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [
                  {
                    type: "bold",
                  },
                ],
                value: "Green: ",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: "Demand is equal or less than Capacity\n",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
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
      howDoIReadThis: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "Questions to Ask\n",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "Is your Demand outpacing your Capacity, causing your inventory to outgrow your ability to deliver?",
                        elementType: "text",
                      },
                    ],
                    elementType: "paragraph",
                  },
                ],
                elementType: "list-item",
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "Is your Capacity outpacing your Demand, potentially putting your team at risk of starving?",
                        elementType: "text",
                      },
                    ],
                    elementType: "paragraph",
                  },
                ],
                elementType: "list-item",
              },
            ],
            elementType: "unordered-list",
          },
          {
            data: {},
            content: [
              {
                data: {},
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
      whyIsThisImportant: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "Why is this important?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "\n",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value:
                  "Often the demand going to delivery groups far exceeds their capacity to deliver, and even though everyone can feel it, they can’t really quantify it.\nNow you have the data to act upon, be it:",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: "Constrain the demand?",
                        elementType: "text",
                      },
                    ],
                    elementType: "paragraph",
                  },
                ],
                elementType: "list-item",
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: "Increase capacity?",
                        elementType: "text",
                      },
                    ],
                    elementType: "paragraph",
                  },
                ],
                elementType: "list-item",
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: "Realign expectations?",
                        elementType: "text",
                      },
                    ],
                    elementType: "paragraph",
                  },
                ],
                elementType: "list-item",
              },
            ],
            elementType: "unordered-list",
          },
          {
            data: {},
            content: [
              {
                data: {},
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
      howIsItCalculated: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "How is it calculated?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "\n",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "bold",
                  },
                ],
                value: "Demand:",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " Number of items that have an",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "italic",
                  },
                ],
                value: " arrival date",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " during the selected date range.\n",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "bold",
                  },
                ],
                value: "Capacity:",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " Number of items that have a ",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "italic",
                  },
                ],
                value: "departure date",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " during the selected date range (throughput).",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
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
  ],
  inFlowVsOutFlow: [
    {
      name: "Work Started vs Work Completed",
      key: "work-started-completed",
      whatIsThisTellingMe: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "What is this telling me?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value:
                  "\nThe ratio of work committed by the teams (as defined by Commitment Point) vs leaving the system (as defined by Departure Point).",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "\n",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "bold",
                  },
                ],
                value: "Red: ",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: "Inflow is 4X larger than Outflow ",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [
                  {
                    type: "bold",
                  },
                ],
                value: "Amber: ",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: "Inflow is between 0 and 4X Outflow ",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [
                  {
                    type: "bold",
                  },
                ],
                value: "Green: ",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: "Inflow is equal or less than Outflow",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
        ],
        elementType: "document",
      },
      howDoIReadThis: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "Questions to Ask\n",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "Is your Inflow outpacing your Outflow, resulting in increase WIP?",
                        elementType: "text",
                      },
                    ],
                    elementType: "paragraph",
                  },
                ],
                elementType: "list-item",
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          "Is your Outflow outpacing your Inflow? Which typically is a good thing, but could eventually put your team at risk of not being fully utilising.",
                        elementType: "text",
                      },
                    ],
                    elementType: "paragraph",
                  },
                ],
                elementType: "list-item",
              },
            ],
            elementType: "unordered-list",
          },
          {
            data: {},
            content: [
              {
                data: {},
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
      whyIsThisImportant: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "Why is this important?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "\n",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value:
                  "Often teams commit to more work than they can deliver— resulting in increased WIP,  longer lead times, frequent context switching, higher defect rates, more expedites and fewer feedback loops.\nFor delivery groups operating with high WIP, often the only way of getting something done is by expediting it. ",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
        ],
        elementType: "document",
      },
      howIsItCalculated: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "How is it calculated?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "\n\n",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "bold",
                  },
                ],
                value: "Inflow:",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " Number of items that have a ",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "italic",
                  },
                ],
                value: "commitment date",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " during the selected date range.\n",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "bold",
                  },
                ],
                value: "Outflow:",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " Number of items that have a ",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "italic",
                  },
                ],
                value: "departure date",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " during the selected date range (throughput).",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
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
  ],
  inventorySize: [
    {
      name: "Total Upcoming Work",
      key: "total-upcoming-work",
      whatIsThisTellingMe: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "What is this telling me?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "\n",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value:
                  "Total number of items that have entered the system (as defined by the Arrival Point) but have not been started (as defined by the Commitment Point).",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
        ],
        elementType: "document",
      },
      howDoIReadThis: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "How do I read this?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value:
                  "\nShows the current Inventory regardless of date range selection.\n",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value:
                  "How many weeks of inventory do you have? Does that seem excessive?",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
        ],
        elementType: "document",
      },
      whyIsThisImportant: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "Why is this important?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value:
                  "\nProduct backlogs represent opportunities but can also be a liability. ",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value:
                  "They are not free and there is a cost to maintain them.",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value:
                  "\nProduct backlogs, being an intangible form of inventory, often gets neglected. Mismanaging it can put the Value Stream in a disadvantageous position.",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
        ],
        elementType: "document",
      },
      howIsItCalculated: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "How is it calculated?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "\nCount all items with an ",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "italic",
                  },
                ],
                value: "arrival date",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: ", but no commitment or departure dates.",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
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
  ],
  commitmentRate: [
    {
      name: "Committed Work Rate",
      key: "committed-work-rate",
      whatIsThisTellingMe: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "What is this telling me?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value:
                  "\nOf the items entering the system (as defined by the Arrival Point) the percentage of these that are worked on (has entered the Commitment Point) within the selected date range.",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "\n",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "bold",
                  },
                ],
                value: "Red:",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " 0-64% ",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [
                  {
                    type: "bold",
                  },
                ],
                value: "Amber: ",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: "65-84% ",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [
                  {
                    type: "bold",
                  },
                ],
                value: "Green:",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " 85-100%",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
        ],
        elementType: "document",
      },
      whyIsThisImportant: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "Why is this important?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value:
                  "\nThere’s a point where a demand is considered as a real option. There’s another where it moves across to being considered as committed.\nCommitment rate is the ratio between options and commitment. \nHow much of your backlogs actually get to be worked on?",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
        ],
        elementType: "document",
      },
      howIsItCalculated: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "How is it calculated?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value:
                  "\nCount the number of items that have a commitment date within the selected date range. Divided by total number of items with arrival date within the selected date range.\n",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
        ],
        elementType: "document",
      },
    },
  ],
  timeToCommit: [
    {
      name: "Time to Start",
      key: "time-to-start",
      whatIsThisTellingMe: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "What is this telling me?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value:
                  "\nOf those items that get started (entered the Commitment Point), how long do they typically wait (85%ile) in Inventory.\n",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "bold",
                  },
                ],
                value: "Red:",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " 5X+ Average Lead Time ",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [
                  {
                    type: "bold",
                  },
                ],
                value: "Amber: ",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " Between 3X and 5X Average Lead Time ",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [
                  {
                    type: "bold",
                  },
                ],
                value: "Green:",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " ≤ 3X Average Lead Time",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
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
      whyIsThisImportant: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "Why is this important?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value:
                  "\nKnowing the time to commit provides customers and stakeholders with a more realistic expectation so that they can make better, informed decisions.\nRemember the last request that took 100 days to start? What would you do differently if you knew that upfront?",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
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
      howIsItCalculated: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "How is it calculated?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value:
                  "\nOf the items that were committed during the selected date range, calculate the 85th%ile of the time between arrival date and commitment date.",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
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
  ],
  wipCount: [
    {
      name: "Work In Progress Count",
      key: "wip-count",
      whatIsThisTellingMe: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "What is this telling me?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value:
                  "\nNumber of items currently in WIP (regardless of selected date range).",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
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
      whyIsThisImportant: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "Why is this important?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "\n",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value:
                  "WIP: ‘Work in Process’ rather than ‘Work in Progress’, as more often than not, the work is in process, meaning it has entered your delivery system but is not actually progressing.\nOut of balance WIP is usually the cause of most flow problems as it directly correlates with longer lead time, decreased throughput and lower flow efficiency.",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
        ],
        elementType: "document",
      },
      howIsItCalculated: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "How is it calculated?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "\nCount all work items that currently have a ",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "italic",
                  },
                ],
                value: "commitment date",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: ", but no ",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "italic",
                  },
                ],
                value: "departure date",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: ". Regardless of date range.",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
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
  ],
  avgWipAge: [
    {
      name: "Work In Progress Age",
      key: "wip-age",
      whatIsThisTellingMe: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "What is this telling me?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value:
                  "\nOf the items currently in WIP, what is the average they have been in WIP?",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "\n",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "bold",
                  },
                ],
                value: "Red:",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " Avg WIP Age is more than 5X Avg Lead Time",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [
                  {
                    type: "bold",
                  },
                ],
                value: "Yellow:",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " Avg WIP Age is between 3X and 5X Avg Lead Time",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [
                  {
                    type: "bold",
                  },
                ],
                value: "Green:",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " Avg WIP Age is ≤ 3X Avg Lead Time",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
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
      whyIsThisImportant: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "Why is this important?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value:
                  "\nWIP Age: The elapsed time for items that have started but not yet finished.\nFocusing only on lead time, can easily make your delivery system fall into a silent state of entropy - gradual decline into disorder.\nA deteriorating system causes demands to be systematically expedited, jeopardising the system as whole.",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
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
      howIsItCalculated: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "How is it calculated?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value:
                  "For all the items currently in WIP, calculate the average of the elapsed time they have been in WIP.",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
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
  ],
  throughput: [
    {
      name: "Total Work Completed",
      key: "total-work-completed",
      whatIsThisTellingMe: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "What is this telling me?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value:
                  "\nNumber of items completed during the selected date range (as defined by Departure Point).",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
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
      whyIsThisImportant: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "Why is this important?",
                elementType: "text",
              },
            ],
            elementType: "heading-3",
          },
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value:
                  "\nThroughput is the ultimate measure of productivity.\nIt shows the ability of your delivery system to get things done and transform customers’ requests into value delivered.",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
          {
            data: {},
            content: [
              {
                data: {},
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
  ],
};
