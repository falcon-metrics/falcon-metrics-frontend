export const sourcesOfDelayTooltips: any = {
  wipExcess: [
    {
      name: "WIP Excess",
      key: "wip-excess",
      whatIsThisTellingMe: {
        elementType: "document",
        data: {},
        content: [
          {
            elementType: "heading-3",
            data: {},
            content: [
              {
                elementType: "text",
                value: "What is this telling me?",
                marks: [],
                data: {},
              },
            ],
          },
          {
            elementType: "paragraph",
            data: {},
            content: [
              {
                elementType: "text",
                value:
                  "\nThe number of items in Current WIP that is above the Target WIP. \n",
                marks: [],
                data: {},
              },
            ],
          },
          {
            elementType: "paragraph",
            data: {},
            content: [
              {
                elementType: "text",
                value: "Target WIP is calculated on throughput.",
                marks: [],
                data: {},
              },
            ],
          },
          {
            elementType: "paragraph",
            data: {},
            content: [
              {
                elementType: "text",
                value: "\n",
                marks: [],
                data: {},
              },
              {
                elementType: "text",
                value: "Red: ",
                marks: [
                  {
                    type: "bold",
                  },
                ],
                data: {},
              },
              {
                elementType: "text",
                value: "4+ items above Target WIP ",
                marks: [],
                data: {},
              },
            ],
          },
          {
            elementType: "paragraph",
            data: {},
            content: [
              {
                elementType: "text",
                value: "Amber:",
                marks: [
                  {
                    type: "bold",
                  },
                ],
                data: {},
              },
              {
                elementType: "text",
                value: " 1-3 items above Target WIP ",
                marks: [],
                data: {},
              },
            ],
          },
          {
            elementType: "paragraph",
            data: {},
            content: [
              {
                elementType: "text",
                value: "Green:",
                marks: [
                  {
                    type: "bold",
                  },
                ],
                data: {},
              },
              {
                elementType: "text",
                value: " Current WIP <= Target WIP\n",
                marks: [],
                data: {},
              },
            ],
          },
        ],
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
                  "\nOut-of-control WIP is one of the most common causes affecting delivery systems. \nThis is felt exponentially at an enterprise scale as teams and team-of-teams start to chase their tail, burn themselves out, and their customers' trust.\nLearning to control WIP is vital, but what is the right WIP level?",
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
                value: "WIP Excess = Current WIP - Target WIP",
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
                value: "Target WIP is the average weekly throughput ",
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
  staleWork: [
    {
      name: "Stale Work",
      key: "stale-work",
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
                  "\nPercentage of items in WIP that have had no activity beyond the defined threshold (as defined in Organisational Settings).\n",
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
                value: " 40-100% ",
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
                value: "Amber:",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " 20-40% ",
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
                value: " 0-20%",
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
                  "\nStale items are those that have started but haven’t had any activity for a long time. \nE.g. User Stories that have started but no one touched for over 30 days.\nHaving a high percentage of stale items in your system means the process is dysfunctional or heading that way.\nTeams in that situation are consistently:",
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
                        value: "Frequently context switching",
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
                        value: "Compromising on quality",
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
                        value: "Burning team members out",
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
                        value: "Burning customer’s trust",
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
        elementType: "document",
        data: {},
        content: [
          {
            elementType: "heading-3",
            data: {},
            content: [
              {
                elementType: "text",
                value: "How is it calculated?",
                marks: [],
                data: {},
              },
            ],
          },
          {
            elementType: "paragraph",
            data: {},
            content: [
              {
                elementType: "text",
                value:
                  "\nIdentify a flow item in WIP as stale if there has been no interaction for at least the threshold value (as defined in Organisation Settings). Count number of Stale Items, divided by total number of flow items in WIP.",
                marks: [],
                data: {},
              },
            ],
          },
        ],
      },
    },
  ],
  blockers: [
    {
      name: "Impediments",
      key: "impediments",
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
                  "\nNumbers of items that are in a 'blocked' state. As defined in configuration wizard (on the Settings page).",
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
                value: "40-100% of WIP is blocked ",
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
                value: "20-40% of WIP is blocked ",
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
                value: " 0-20% of WIP is blocked",
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
                  "\nHaving a large number of blocked items disrupts the flow of work and impacts flow efficiency.",
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
                  "\nNumber of items that meet the criteria 'blocked' (as defined on the Setting page in Configuration Wizard).",
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
  discardedBeforeStart: [],
  discardedAfterStart: [
    {
      name: "Aborted Items",
      key: "aborted-items",
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
                  "\nNumber of items discarded after the Commitment Point. Discard state as defined in configuration wizard (on the Settings page).",
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
                  "\nAs part of any triage process, it’s common to discard items from your system.\nDiscards, before they are worked on, indicate a healthy refinement process. Aborted, however, is a form of waste in your system, potentially leading to wasted effort. \nFalcon Metrics provides visibility on discarded items, both before and after the commitment point, to help you understand the health of your triage.\nHave you been tracking your discards? Are they occurring before or after the work has started?",
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
                  "\nCount of items within the selected date range that have been moved to the categorisation of ‘discarded’, that have a commitment date.",
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
  flowDebt: [
    {
      name: "Productivity Debt",
      key: "productivity-debt",
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
                  "\nProportion of WIP Age (85%ile) vs Lead Time (85%ile).",
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
                value: "\nRed:",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " 20X or larger ",
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
                value: "Amber:",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " 1-20X ",
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
                value: "1 or less",
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
                  "\nThis is a leading indicator. If your WIP Age (what you are working on right now) exceeds your Lead Time (what you have been able to do recently), it means the items currently worked on, if they were to be completed now, would push your Lead Time to a higher value. You're already in a position worst than you were previously.",
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
                value:
                  "The good news is you can still influence your WIP Age. For completed items, you can no longer influence the Lead Time.",
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
                value: " How is it calculated?",
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
                  "\nProportion of WIP Age (85th%ile) over Lead Time (85th%ile).",
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
  delayedItems: [],
  keySourcesOfDelay: [
    {
      name: "Top Wait Steps",
      key: "top-wait-steps",
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
                  "Top 3 queue WIP workflow steps that items are spending most of their time.",
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
                  "\nUnderstanding your biggest queues to identify ways to reduce them is the best way to reduce your lead time and increase flow efficiency.",
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
                  "\nIdentify all your queue workflow steps that are in WIP. Calculate the days spent in those workflow steps. Rank them from highest to lowest, showing only the top 3. Calculate the time spent in each of those workflow steps divided by the total time spent across all the queue WIP workflow steps. Calculate the average time spent in each of the top 3 wait steps.",
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
