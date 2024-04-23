export enum UserGuideKey {
    CREATE_DATASOURCE = 'create-datasource',
    DATASOURCE = 'data source',
    PROJECTS = 'projects',
    WORKSPACES = 'workspaces',
    WORKITEMTYPES = 'work-item-types',
    CONTEXTS = 'boards-and-aggregations',
    CUSTOMFIELDS = 'custom-fields',
    SETTINGS = 'settings',
    CUSTOMVIEWS = 'custom-views',
    ORGANISATION_SETTINGS = 'org-settings',

    // KANBANIZE
    KANBANIZE_DATASOURCE = 'kanbanize-datasource',
    CARDTYPES = 'card-types',
    WORKFLOWS = 'workflows',
}

const listItemStyle = {
    paddingLeft: '1em'
};

const olStyle = {
    marginLeft: '1em'
};

export const UserGuideContent = {
    [UserGuideKey.CREATE_DATASOURCE]: {
        title: "Welcome to Falcon Metrics Wizard!",
        content: (
            <ol style={olStyle}>
                <li style={listItemStyle}>Welcome to Falcon Metrics&apos;s configuration wizard! To get started, select a data source.</li>
                <li style={listItemStyle}>Choose the data source you are currently using and would like to connect to Falcon Metrics by clicking on one of the icons below.</li>
                <li style={listItemStyle}>Falcon Metrics will guide you through a series of steps to help you import your configurations.</li>
            </ol>
        )
    },

    [UserGuideKey.DATASOURCE]: {
        title: "Configure Data source",
        content: (
            <div>
                <ol style={olStyle}>
                    <li style={listItemStyle}>Welcome to Falcon Metrics&apos;s configuration wizard! To get started, we&apos;ll connect your data source.</li>
                    <li style={listItemStyle}>Enter the <b>Data source URL</b>: Provide the URL of your data source where your data is stored. Make sure it&apos;s accurate to establish a connection.</li>
                    <li style={listItemStyle}>Input the <b>Email Address</b>: Enter the email address associated with your data source account. This allows us to identify and link your data properly.</li>
                    <li style={listItemStyle}>Provide the <b>Personal Access Token</b>: Obtain the Personal Access Token from your data source. This token will authorise Falcon Metrics to securely access your data on your behalf.</li>
                    <li style={listItemStyle}>Once you&apos;ve filled in the required information, click <b>Next</b> to proceed to the next step.</li>
                </ol>

                <br />

                <p>Remember to double-check the accuracy of the details you provide to ensure a successful connection to your data source. Let&apos;s move on to the next stage of configuration!</p>
            </div>
        )
    },

    [UserGuideKey.KANBANIZE_DATASOURCE]: {
        title: "Configure Data source",
        content: (
            <div>
                <ol style={olStyle}>
                    <li style={listItemStyle}>Welcome to Falcon Metrics&apos;s configuration wizard! To get started, we&apos;ll connect your data source.</li>
                    <li style={listItemStyle}>Enter the <b>Data source URL</b>: Provide the URL of your data source where your data is stored. Make sure it&apos;s accurate to establish a connection.</li>
                    <li style={listItemStyle}>Provide the <b>Personal Access Token</b>: Obtain the Personal Access Token from your data source. This token will authorise Falcon Metrics to securely access your data on your behalf.</li>
                    <li style={listItemStyle}>Once you&apos;ve filled in the required information, click <b>Next</b> to proceed to the next step.</li>

                    <br />
                </ol>

                <p>Remember to double-check the accuracy of the details you provide to ensure a successful connection to your data source. Let&apos;s move on to the next stage of configuration!</p>
            </div>
        )
    },

    [UserGuideKey.WORKSPACES]: {
        title: "Select Workspaces and Boards for Import",
        content: (
            <div>
                <ol style={olStyle}>
                    <li style={listItemStyle}>Congratulations on successfully connecting your data source! Now, we&apos;ll help you import your boards into Falcon Metrics.</li>
                    <li style={listItemStyle}>On this page, you will see a list of all the boards found in your data source.</li>
                    <li style={listItemStyle}>To bring a board into Falcon Metrics, simply <b>check the checkbox</b> next to the name of the board you want to import.</li>
                    <li style={listItemStyle}>Take a moment to review the list and ensure you&apos;ve selected all the boards you wish to work with in Falcon Metrics.</li>
                    <li style={listItemStyle}>If you change your mind and want to deselect a board, uncheck the corresponding checkbox.</li>
                    <li style={listItemStyle}>Once you&apos;ve made your selections, click <b>Next</b> to proceed to the next step.</li>
                </ol>

                <br />

                <p>Remember, Falcon Metrics will only ingest the boards you&apos;ve selected, making it easy to manage your data efficiently. Let&apos;s move forward with the selected boards!</p>
            </div>
        )
    },

    [UserGuideKey.PROJECTS]: {
        title: "Select Projects for Import",
        content: (
            <div>
                <ol style={olStyle}>
                    <li style={listItemStyle}>Congratulations on successfully connecting your data source! Now, we&apos;ll help you import your projects into Falcon Metrics.</li>
                    <li style={listItemStyle}>On this page, you will see a list of all the projects found in your data source.</li>
                    <li style={listItemStyle}>To bring a project into Falcon Metrics, simply <b>check the checkbox</b> next to the name of the project you want to import.</li>
                    <li style={listItemStyle}>Take a moment to review the list and ensure you&apos;ve selected all the projects you wish to work with in Falcon Metrics.</li>
                    <li style={listItemStyle}>If you change your mind and want to deselect a project, uncheck the corresponding checkbox.</li>
                    <li style={listItemStyle}>Once you&apos;ve made your selections, click <b>Next</b> to proceed to the next step.</li>
                </ol>

                <br />

                <p>Remember, Falcon Metrics will only ingest the projects you&apos;ve selected, making it easy to manage your data efficiently. Let&apos;s move forward with the selected projects!</p>
            </div>
        )
    },


    [UserGuideKey.CARDTYPES]: {
        title: "Card Types",
        content: (
            <div>
                <ol style={olStyle}>
                    <li style={listItemStyle}>Great progress! Now, we&apos;ll help you set up the Card Types in Falcon Metrics based on your selected workspaces.</li>
                    <li style={listItemStyle}>You&apos;ll see a list of Card Types that are present in the workspaces you&apos;ve chosen. Let&apos;s configure each of them step-by-step.</li>
                    <li style={listItemStyle}>For each Card Type, follow these instructions:
                        <ol type="a" style={{ marginLeft: 15 }}>
                            <li style={listItemStyle}><b>Choose the Level</b>: Select the appropriate level for each Card Type – Portfolio, Team, or Individual Contributor.</li>
                            <li style={listItemStyle}><b>Set the SLE (Service Level Expectation)</b>: Enter the desired time frame in days for each Card Type, which represents the service level expectation.</li>
                        </ol>
                    </li>
                </ol>

                <br />

                <p>Now, let&apos;s proceed to the next steps of the configuration wizard!</p>
            </div>
        )
    },


    [UserGuideKey.WORKFLOWS]: {
        title: "Workflows",
        content: (
            <div>
                <ol style={olStyle}>
                    <li style={listItemStyle}>Great progress! Now, we&apos;ll help you set up the workflows for the selected workspaces.</li>
                    <li style={listItemStyle}><b>Rearrange Workflow Steps</b>: Drag and drop the steps to organise them correctly, reflecting the order of the workflow.</li>
                    <li style={listItemStyle}><b>Active/Queue Toggle</b>: Indicate which step is the active one and which one is in the queue, using the toggle. This helps Falcon Metrics understand the workflow process accurately.</li>
                    <li style={listItemStyle}><b>Arrival Point, Commitment Point, and Departure Point</b>: Select these points for each workflow step. This information assists Falcon Metrics in determining Inventory Age, WIP Age, and Lead Time.</li>
                    <li style={listItemStyle}>Continue configuring the workflow you need.</li>
                    <li style={listItemStyle}>To apply the same configuration to other workflows efficiently:
                        <ol type="a" style={{ marginLeft: 15 }}>
                            <li style={listItemStyle}>Click on the <b>three dots</b> located at the far right end of the Flow Item Type row.</li>
                            <li style={listItemStyle}>A menu with options to copy and paste the configuration will appear.</li>
                            <li style={listItemStyle}>Utilise these options to streamline the setup process.</li>
                        </ol>
                    </li>
                </ol>

                <br />

                <p>Completing this stage ensures Falcon Metrics is customised to your workflow needs. Now, let&apos;s proceed to the next steps of the configuration wizard!</p>
            </div>
        )
    },

    [UserGuideKey.WORKITEMTYPES]: {
        title: "Flow Item Types and Workflows",
        content: (
            <div>
                <ol style={olStyle}>
                    <li style={listItemStyle}>Great progress! Now, we&apos;ll help you set up the Flow Item Types and their corresponding workflows in Falcon Metrics based on your selected projects.</li>
                    <li style={listItemStyle}>You&apos;ll see a list of Flow Item Types that are present in the projects you&apos;ve chosen. Let&apos;s configure each of them step-by-step.</li>
                    <li style={listItemStyle}>For each Flow Item Type, follow these instructions:
                        <ol type="a" style={{ marginLeft: 15 }}>
                            <li style={listItemStyle}>Select a <b>Display Name</b>: From the drop-down, choose a name that groups similar Flow Item Types together. For example, you can group &apos;Bug&apos;, &apos;Defects&apos;, and &apos;Fault&apos; under the display name &apos;Bug.&apos;</li>
                            <li style={listItemStyle}><b>Choose the Level</b>: Select the appropriate level for each Flow Item Type – Portfolio, Team, or Individual Contributor.</li>
                            <li style={listItemStyle}><b>Set the SLE (Service Level Expectation)</b>: Enter the desired time frame in days for each Flow Item Type, which represents the service level expectation.</li>
                        </ol>
                    </li>
                    <li style={listItemStyle}>After configuring the above three for a Flow Item Type, it&apos;s time to set up its workflow. Follow these steps:
                        <ol type="a" style={{ marginLeft: 15 }}>
                            <li style={listItemStyle}><b>Rearrange Workflow Steps</b>: Drag and drop the steps to organise them correctly, reflecting the order of the workflow.</li>
                            <li style={listItemStyle}><b>Active/Queue Toggle</b>: Indicate which step is the active one and which one is in the queue, using the toggle. This helps Falcon Metrics understand the workflow process accurately.</li>
                            <li style={listItemStyle}><b>Arrival Point, Commitment Point, and Departure Point</b>: Select these points for each workflow step. This information assists Falcon Metrics in determining Inventory Age, WIP Age, and Lead Time.</li>
                        </ol>
                    </li>

                    <li style={listItemStyle}>Continue configuring the workflow for each Flow Item Type as needed.<br /></li>
                    <li style={listItemStyle}>To apply the same configuration to other Flow Item Types efficiently:
                        <ol type="a" style={{ marginLeft: 15 }}>
                            <li style={listItemStyle}>Click on the <b>three dots</b> located at the far right end of the Flow Item Type row.</li>
                            <li style={listItemStyle}>A menu with options to copy and paste the configuration will appear.</li>
                            <li style={listItemStyle}>Utilise these options to streamline the setup process.</li>
                        </ol>
                    </li>
                </ol>

                <br />

                <p>Completing this stage ensures Falcon Metrics is customised to your workflow needs. Now, let&apos;s proceed to the next steps of the configuration wizard!</p>
            </div>
        )
    },

    [UserGuideKey.CONTEXTS]: {
        title: "Define Boards and Aggregations",
        content: (
            <div>
                <ol style={olStyle}>
                    <li style={listItemStyle}>On this page, you&apos;ll set up the hierarchy through boards and aggregations in Falcon Metrics to match your organisational design and operating model.</li>
                    <li style={listItemStyle}>Falcon Metrics supports a three-level hierarchy system, fully customisable to your needs. Examples include: Nations &gt; Tribes &gt; Squads, Portfolios &gt; Programs &gt; Teams, Business Units &gt; Team of Teams &gt; Teams. Design your structure using the tree component below.</li>
                    <li style={listItemStyle}>To create each line in the hierarchy:
                        <ol type="a" style={{ marginLeft: 15 }}>
                            <li style={listItemStyle}>Enter the name of the level (e.g., Nations, Tribes, Squads) in the <b>Text</b> field.</li>
                            <li style={listItemStyle}>Map the line to a specific <b>Board or Filter</b> in your data source using the drop down to the right of the text field.</li>
                            <li style={listItemStyle}>Alternatively, define the line as an <b>Aggregation</b>, allowing it to aggregate data from the boards at the lower level of hierarchy.</li>
                        </ol>
                    </li>
                    <li style={listItemStyle}>You can add multiple sections to build your customised hierarchy.
                        <ol type="a" style={{ marginLeft: 15 }}>
                            <li style={listItemStyle}>To add a new section, click the <b>Add</b> button on the top left corner</li>
                            <li style={listItemStyle}>To add next level down click on <b>Add</b> button on the far right of the text field</li>
                            <li style={listItemStyle}>Alternatively, define the line as an <b>Aggregation</b>, allowing it to aggregate data from the boards at the lower level of hierarchy.</li>
                        </ol>
                    </li>
                    <li style={listItemStyle}>To remove any line from the hierarchy, use the <b>Delete</b> option associated with that line.</li>
                    <li style={listItemStyle}>Ensure you&apos;ve carefully mapped each level to its appropriate data source board or set up aggregations for a comprehensive process contextual analysis.</li>
                    <li style={listItemStyle}>Once you&apos;ve finished defining your hierarchy and boards, click <b>Next</b> to proceed to the final step.</li>
                </ol >

                <br />

                <p>
                    Designing the hierarchy tailored to your organisation&apos;s structure will enhance your experience of contextual analysis of data. Let&apos;s move to the next steps of the configuration.
                </p>
            </div >
        )
    },

    [UserGuideKey.CUSTOMFIELDS]: {
        title: "Choose Custom Fields",
        content: (
            <div>
                <ol style={olStyle}>
                    <li style={listItemStyle}>Here, you&apos;ll select the custom fields from your data source that you want Falcon Metrics to utilise.</li>
                    <li style={listItemStyle}>Falcon Metrics presents you with a list of all the available custom fields.</li>
                    <li style={listItemStyle}>To include a custom field for Falcon Metrics to ingest, simply <b>check the checkbox</b> next to its name.</li>
                    <li style={listItemStyle}>Review the list carefully and ensure you&apos;ve selected all the custom fields that are relevant to your workflow and analysis requirements.</li>
                    <li style={listItemStyle}>If you later decide to exclude a custom field, you can uncheck the corresponding checkbox.</li>
                    <li style={listItemStyle}>Once you&apos;ve made your selections, click <b>Next</b> to go to then next step.</li>
                </ol>
            </div >
        )
    },

    [UserGuideKey.SETTINGS]: {
        title: "Set Date Boundaries and Conditions",
        content: (
            <div>
                <ol style={olStyle}>
                    <li style={listItemStyle}>Here you can establish essential boundaries and conditions for the data that Falcon Metrics will ingest and present to you.</li>
                    <li style={listItemStyle}><b>Exclude Items Completed Before</b>: Specify a date to limit the ingestion of flow items. Falcon Metrics will consider only those completed after the given date, excluding earlier items.</li>
                    <li style={listItemStyle}><b>Filter Expression for Ingestion</b>: Craft a filter expression to define conditions for matching and excluding items from ingestion. This ensures you work with precisely the data you need.</li>
                    <li style={listItemStyle}><b>Filter Expression for Blocked Items</b>: Compose a filter expression to help Falcon Metrics identify blocked items. These are items that face impediments or obstacles.</li>
                    <li style={listItemStyle}><b>Field for Blocked Item Reason</b>: Indicate which field Falcon Metrics should use to fetch the reason an item is blocked, enhancing your understanding of workflow issues.</li>
                    <li style={listItemStyle}><b>Filter Expression for Discarded Items</b>: Write a filter expression to assist Falcon Metrics in recognising discarded items – those no longer under consideration.</li>
                    <li style={listItemStyle}><b>Field for Discard Reason</b>: Specify the field Falcon Metrics should consider for fetching the reason an item was discarded, promoting informed decision-making.</li>
                    <li style={listItemStyle}><b>Date Field for Desired Delivery</b>: Tell Falcon Metrics which date field to consider for the desired delivery date, enabling accurate delivery timeline insights.</li>
                    <li style={listItemStyle}><b>Field for Class of Service</b>: Define the field to be used for classifying the service level of items. This empowers Falcon Metrics to categorise items effectively.</li>
                </ol >

                <br />

                <p>By configuring these settings, you ensure that Falcon Metrics tailors its analysis to your specific data boundaries and requirements. Once you&apos;re satisfied, click <b>Next</b> to proceed to the final steps of the configuration wizard!</p>
            </div >
        )
    },

    [UserGuideKey.CUSTOMVIEWS]: {
        title: "Work Profiles and Custom Views",
        content: (
            <div>
                <ol style={olStyle}>
                    <li style={listItemStyle}>Here, you&apos;ll unlock the power to shape your insights in a way that resonates with your leadership and decision makers, allowing them to grasp the essence of your teams&apos; work.</li>
                    <li style={listItemStyle}>By encapsulating flow items under archetypical labels, you provide an overarching summary of team-level details that leadership can easily comprehend. This empowers leadership to guide work at various levels, irrespective of diverse work management systems and practices.</li>
                    <li style={listItemStyle}>Creating these custom views contributes to the development of Profiles of Work, vital for comprehensive insights. Two profiles of work are mandatory and need to be set up in Falcon Metrics using filter expressions:
                        <ol type="a" style={{ marginLeft: 15 }}>
                            <li style={listItemStyle}><b>Demand Profile</b>: This profile sheds light on various demand types. Specify the SLE (Service Level Expectation) for each demand type to ensure accurate analysis.</li>
                            <li style={listItemStyle}><b>Class of Value Profile</b>: This profile focuses on the classification of value for different work items.</li>
                        </ol>
                    </li>
                </ol>

                <br />

                <p>Instructions to Create a Custom View:</p>

                <br />

                <ol style={olStyle}>
                    <li style={listItemStyle}>Click the <b>Add Custom View</b> button.</li>
                    <li style={listItemStyle}>Provide a <b>Label</b> that succinctly represents the custom view&apos;s essence.</li>
                    <li style={listItemStyle}>Enter <b>Display Name</b> for each sub-category and choose the colour that represents it.</li>
                    <li style={listItemStyle}>Craft a <b>Filter Expression</b> that encapsulates the specific criteria you wish to highlight.</li>
                    <li style={listItemStyle}>Once you&apos;ve set up your custom views, you&apos;re creating a powerful lens through which to analyse your team&apos;s efforts.</li>

                </ol>
                <br />

                <p>After configuring your custom views and work profiles, click <b>Next</b> to proceed to the final stage of reviewing your configuration summary.</p>
            </div >
        )
    },

    [UserGuideKey.ORGANISATION_SETTINGS]: {
        title: "Organisation Settings",
        content: (
            <ol style={olStyle}>
                <li style={listItemStyle}>Here, you can unlock the potential of your flow analytics where you can tailor your preferences. </li>
                <li style={listItemStyle}><b>Rolling Window (days)</b>: Define the default date range for displaying data in Flow Analytics. You can set it to 30, 60, or 90 days. Regardless of your chosen rolling window, you can always adjust the date range of the data you want to see using the filter panel.</li>
                <li style={listItemStyle}><b>Stale Item Days</b>: Choose the duration during which a work item can remain inactive. Once this period passes, the item will be considered an <b>Abandoned Item</b>.</li>
                <li style={listItemStyle}><b>Context Hierarchy Labels</b>: customise the labels for each level of your board’s hierarchy, aligning them with your organisation&apos;s unique terms. This reflects your organisational design and operating model. For example: Nations &gt; Tribes &gt; Squads | Portfolios &gt; Programs &gt; Teams | Business Units &gt; Team of Teams &gt; Teams.</li>
                <li style={listItemStyle}><b>Timezone</b>: Specify the default timezone for your organisation.</li>
                <li style={listItemStyle}><b>Logo</b>: Upload your organisation’s logo in the following format to be displayed on the top-left corner of the Falcon Metrics screen:
                    <ul style={olStyle}>
                        <li> Dimensions: 85px x 85px </li>
                        <li> File Size: Up to 2MB </li>
                    </ul>
                </li>
            </ol>
        )
    },
};
