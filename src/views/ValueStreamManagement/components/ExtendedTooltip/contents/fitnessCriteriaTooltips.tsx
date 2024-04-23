export const fitnessCriteriaTooltips: any = {
  speed: [
    {
      name: "Lead Time",
      key: "lead-time",
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
                  "\n\nLead time at the 85%ile at both:  Portfolio level and Team level",
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
                  "\nYou can hover over the numbers to see a tooltip displaying the Average, Median and Tail.\n",
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
                  "\nUnderstanding typically how long it takes for items take to be completed once they are committed.",
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
                  "\nImportant to differentiate between the two levels of Portfolio (e.g. Epics, Initiatives) and Team (e.g. Stories, Bugs)\n",
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
                value: "How is it calculated",
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
                  "\n85th%ile on the number of calendar days from commitment point to departure point. Applied to COMPLETED Items as specified in the date rage.",
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
                  "\nCalculated at the Portfolio and Team flow item level.",
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
                  "\nThe shortest Lead Time you can have for a single item is 1 day.\n",
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
  serviceLevelExpectation: [
    {
      name: "% of work within SLE",
      key: "service-level",
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
                value: "\nPercentage of items that meet their Fitness Level.",
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
                        content: [
                          {
                            data: {},
                            marks: [],
                            value: "Grade",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-header-cell",
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
                            value: "| Percentage",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-header-cell",
                  },
                ],
                elementType: "table-row",
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
                            value: "A+",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-cell",
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
                            value: "| 90 - 100%",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-cell",
                  },
                ],
                elementType: "table-row",
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
                            value: "A",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-cell",
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
                            value: "| 85 - 89%",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-cell",
                  },
                ],
                elementType: "table-row",
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
                            value: "A-",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-cell",
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
                            value: "| 80 - 84%",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-cell",
                  },
                ],
                elementType: "table-row",
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
                            value: "B+",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-cell",
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
                            value: "| 77 - 79%",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-cell",
                  },
                ],
                elementType: "table-row",
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
                            value: "B",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-cell",
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
                            value: "| 73 - 76%",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-cell",
                  },
                ],
                elementType: "table-row",
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
                              "B-                                                ",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-cell",
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
                            value: "| 70 - 72%",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-cell",
                  },
                ],
                elementType: "table-row",
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
                              "C+                                                ",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-cell",
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
                            value: "| 65 - 69%",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-cell",
                  },
                ],
                elementType: "table-row",
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
                              "C                                                ",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-cell",
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
                            value: "| 60 - 64%",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-cell",
                  },
                ],
                elementType: "table-row",
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
                              "C-                                                ",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-cell",
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
                            value: "| 55 - 59%",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-cell",
                  },
                ],
                elementType: "table-row",
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
                              "D                                                ",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-cell",
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
                            value: "| 50 - 54%",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-cell",
                  },
                ],
                elementType: "table-row",
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
                            value: "F",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-cell",
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
                            value: "| 0 - 49%",
                            elementType: "text",
                          },
                        ],
                        elementType: "paragraph",
                      },
                    ],
                    elementType: "table-cell",
                  },
                ],
                elementType: "table-row",
              },
            ],
            elementType: "table",
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
                    type: "code",
                  },
                  {
                    type: "bold",
                  },
                ],
                value: "Red:",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "code",
                  },
                ],
                value: " 0-70%",
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
                    type: "code",
                  },
                  {
                    type: "bold",
                  },
                ],
                value: "Amber:",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "code",
                  },
                ],
                value: " 70-84%",
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
                    type: "code",
                  },
                  {
                    type: "bold",
                  },
                ],
                value: "Green: ",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "code",
                  },
                ],
                value: "85-100%",
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
                value: "Why it's important?",
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
                value: "\nMake explicit what these fitness level are. \n",
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
                  "To what degree are teams meeting their customer’s fitness level. \n",
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
                value: "Are we setting the right expectations?\n",
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
                  "\nFor each completed flow item within the selected date range, identify how many of them satisfy the SLE for its flow item type. Divided by the total number of completed items in the date range.",
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
  predictability: [
    {
      name: "Delivery Predictability",
      key: "predictability",
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
                marks: [
                  {
                    type: "bold",
                  },
                ],
                value: "High",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " predictability means ",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "italic",
                  },
                ],
                value: "less",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " variance in your distribution. ",
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
                value: "Low",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " predictability means ",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "italic",
                  },
                ],
                value: "high",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " variance in your distribution.\n",
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
                  "\nFor some businesses, predictability can some times be more important than speed itself.\r\n",
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
                  "Meaningful initiatives don’t usually go to market based on the outcome of engineering only.\n",
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
                  "It needs to be integrated with other areas of the business, such as marketing,  sales and operations.\n",
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
                  "So having a highly predictable delivery system can be critical for organisations where cross-departmental coordination is crucial.",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
        ],
        elementType: "document",
      },
      referenceGuide: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "References",
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
                  "\nYou can read more on the blog: ",
                text: "Lead Time Predictability: Is Your Team Predictable?",
                link: "https://www.example.com/insights/lead-time-predictability-is-your-team-predictable",
                elementType: "hyperlink",
              },
            ],
            elementType: "hyperlink",
          },
        ],
        elementType: "document",
      },
      // referenceGuide: {
      //   data: {},
      //   content: [
      //     {
      //       data: {},
      //       content: [
      //         {
      //           data: {},
      //           marks: [],
      //           value: "References",
      //           elementType: "text",
      //         },
      //       ],
      //       elementType: "heading-3",
      //     },
      //     {
      //       data: {},
      //       content: [
      //         {
      //           data: {},
      //           marks: [],
      //           value: "\nYou can read more on the blog: ",
      //           elementType: "text",
      //         },
      //         {
      //           data: {
      //             uri:
      //               "https://www.example.com/insights/lead-time-predictability-is-your-team-predictable",
      //           },
      //           content: [
      //             {
      //               data: {},
      //               marks: [],
      //               value:
      //                 "Lead Time Predictability: Is Your Team Predictable?",
      //               elementType: "text",
      //             },
      //           ],
      //           elementType: "hyperlink",
      //         },
      //         {
      //           data: {},
      //           marks: [],
      //           value: "",
      //           elementType: "text",
      //         },
      //       ],
      //       elementType: "paragraph",
      //     },
      //     {
      //       data: {},
      //       content: [
      //         {
      //           data: {},
      //           marks: [],
      //           value: "",
      //           elementType: "text",
      //         },
      //       ],
      //       elementType: "paragraph",
      //     },
      //   ],
      //   elementType: "document",
      // },
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
                  "\nLead time predictability is calculated based upon a fat or thin tail distribution on their histogram. ",
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
                  "Throughput predictability is calculated based upon a rolling coefficient of variation.",
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
  productivity: [
    {
      name: "Delivery Rate Comparison",
      key: "delivery-rate",
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
                  "\nComparison of current productivity vs recent productivity based upon throughput.\n",
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
                marks: [
                  {
                    type: "bold",
                  },
                ],
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
                  "\nUnderstanding productivity with a word that has meaning. Instead of just a number that requires further analysis to understand if it is good or bad.\n",
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
                marks: [
                  {
                    type: "bold",
                  },
                ],
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
                  "\nOften delivery groups can go through long phases of sub optimal performance unnoticed. \nHow many times have you seen your team’s throughput/velocity data, without actually understanding how well they are performing?\n",
                elementType: "text",
              },
            ],
            elementType: "paragraph",
          },
        ],
        elementType: "document",
      },
      referenceGuide: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: "Traffic Light thresholds:",
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
                value: "\nCalculated based upon standard deviations (std): ",
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
                value: "Red:",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " Terrible - Below 4 std ",
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
                value: "Red:",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " Bad - Below 3 std ",
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
                value: "Red:",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " Poor - Below 2 std ",
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
                value: " Slightly Under - Below 1 std ",
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
                value: "Average - +/- 1 std ",
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
                value: " Good - Above 1 std ",
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
                value: " Great - Above 2 std ",
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
                value: "Excellent - Above 3 std ",
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
                value: "Phenomenal - Above 4 std",
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
                  "\nCurrent productivity calculation is based upon the throughput of the last completed week.\nRecent productivity is calculated based upon the average (mean) of the previous 6 weeks.",
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
  customerValue: [
    {
      name: "Value Delivered",
      key: "value-delivered",
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
                marks: [
                  {
                    type: "bold",
                  },
                ],
                value: "\n",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value:
                  "Percentage of items that can be directly correlated to Process Value. \n",
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
                value: "As defined by the ",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "italic",
                  },
                ],
                value: "Normalisation ",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: "of Class of Value.",
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
                value: "0-29% ",
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
                value: " 30-40% ",
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
                value: " 41-100%",
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
                marks: [
                  {
                    type: "bold",
                  },
                ],
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
                          "Is the percentage of work completed directly results to customer value within a satisfactory range?",
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
                        value: "Are we trending up or down?",
                        elementType: "text",
                      },
                      {
                        data: {},
                        marks: [],
                        value: "\n",
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
                value:
                  "\nOnly a fraction of delivery teams do directly creates value to customers. The rest of it goes towards defects and overhead.\nFlow-aware organisations are significantly increasing their value-creation ratio without increasing their headcount.",
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
                  "\nCount the flow items that belong to the classification of ",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "italic",
                  },
                ],
                value: "Value Demand",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value: " (as defined by ",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "italic",
                  },
                ],
                value: "Class of Value",
                elementType: "text",
              },
              {
                data: {},
                marks: [],
                value:
                  " Normalisation) within the selected date range. Divide by the total number of completed items within the selected date range.",
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
  flowEfficiency: [
    {
      name: "Workflow Efficiency",
      key: "flow-efficiency",
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
                  "\nPercentage of time flow items are being actively worked on versus time spent in queues.\n",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "code",
                  },
                  {
                    type: "bold",
                  },
                ],
                value: "Red:",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "code",
                  },
                ],
                value: " 0-15% ",
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
                    type: "code",
                  },
                  {
                    type: "bold",
                  },
                ],
                value: "Amber:",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "code",
                  },
                ],
                value: " 16-40% ",
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
                    type: "code",
                  },
                  {
                    type: "bold",
                  },
                ],
                value: "Green:",
                elementType: "text",
              },
              {
                data: {},
                marks: [
                  {
                    type: "code",
                  },
                ],
                value: " 41%+\n",
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
                        value: "How is your team’s flow efficiency?",
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
                        value: "What is the trend overtime?",
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
                        value: "In knowledge work, it's rare to have ",
                        elementType: "text",
                      },
                      {
                        data: {},
                        marks: [
                          {
                            type: "italic",
                          },
                        ],
                        value: "extremely",
                        elementType: "text",
                      },
                      {
                        data: {},
                        marks: [],
                        value:
                          " high flow efficiencies. So if you're seeing values in the 70%+ range, it’s likely a sign that you have a number of hidden queues in your workflow.",
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
                value:
                  "\nFlow Efficiency is a measure of global optimisation. You can’t improve flow efficiency by doing local optimisation. In fact, you can make it worse.\n",
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
                  "Meaningful initiatives require collaboration across team of teams. How these teams work together and how the work transition across different areas and teams will determine how efficient and effective you can be responding to market demands.\n",
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
                  "Process Flow Efficiency is that one global metric that will show you this.\n",
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
                  "\nFor each day that an item is spent in progress, we record if it is in an active or queued workflow step.\n",
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
                  "Process Flow efficiency is calculated as a percentage of the days in active vs queued.\n",
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
                value: "Based upon the selected date.",
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
