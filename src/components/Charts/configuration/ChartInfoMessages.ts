export type InfoKey = keyof typeof infoMap;

export const getMessage = (contentID?: InfoKey) => {
  if (contentID) {
    return infoMap[contentID];
  }
  return '';
};

const infoMap = {
  'contact-us': 'We will contact you on this email address',
  //Info for lead time page
  'lead-time-sle':
    'Are you meeting your Service Level Expectations (SLE) as a percentage across your different work items types. Green if 85% or more, Yellow if 70-85% and Red if below 70%.',
  'lead-time-distribution':
    'A summary of the key stats of your Lead time distribution. ',
  'lead-time-scatterplot':
    'Distribution of lead time the over a period of time. Click and expand on the graph to zoom in.',
  'lead-time-histogram': 'Distribution of the frequency of your lead time.',

  //Info for throughput page
  'throughput-counts': 'Total number of completed work items.',
  'throughput-run-chart': 'Number of work items completed per week.',
  'work-item-type': 'Proportion of work items by work item type.',
  'throughput-demand-analysis':
    'Proportion of work items across Value (new features), Failure (defects) and Non-value (tech-debt) demand. Note only user stories and bugs are considered in this.',
  'throughput-classes-of-service':
    'Proportion of work items by their Classes of Service.',
  'throughput-planned-vs-unplanned':
    'Proportion of work items between Planned and Unplanned (reactive work).',
  'throughput-value-area':
    'Proportion of work items by area: Customer, Business and Architecture.',
  'assigned-to-chart': 'Breakdown of work items by assignee.',

  //Info for WIP page
  'wip-counts': 'Total number of work items currently in progress.',
  'wip-age-distribution':
    'A summary of the key stats of your WIP distribution.',
  'wip-run-chart':
    'The number of work items in WIP. Click and expand on the graph to zoom in.',
  'wip-age-histogram': 'Distribution of the frequency of your WIP age.',
  'wip-age-scatterplot':
    'Distribution of WIP age the over a period of time. Click and expand on the graph to zoom in.',
  'wip-demand-analysis':
    'Proportion of work items across Value (new features), Failure (defects) and Non-value (tech-debt) demand. Note only user stories and bugs are considered in this.',
  'wip-classes-of-service':
    'Proportion of work items by their Classes of Service.',
  'wip-planned-vs-unplanned':
    'Proportion of work items between Planned and Unplanned (reactive work).',
  'wip-value-area':
    'Proportion of work items by area: Customer, Business and Architecture.',
  'dashboard-item-list': 'Basic info about items included in this view.',

  'wip-stage-of-workflow':
    'Proportion of work items by the workflow stage they currently reside in.',

  //Info for Flow of Work page

  'flow-flow-efficiency':
    'Proportion of time spent (as a percentage) in value adding time vs waiting time.',
  'flow-time-in-stage':
    'Proportion of time spent (as a percentage) in each workflow stage.',
  'flow-cumulative-flow':
    'Cumulative Flow Diagram (CFD) shows the number of items in each workflow stage over time. Click and expand on the graph to zoom in.',
  'flow-capacity-vs-demand':
    'Comparative visualisation of amount of work requested (demand) vs delivered (capacity) along with accumulation of both over time.',

  //Info for Inventory page

  'inventory-counts':
    'Total number of work items in backlogs (prior to commencement).',
  'inventory-age-distribution':
    'A summary of the key stats of your Inventory Age distribution. ',
  'inventory-age-histogram':
    'Distribution of the frequency of your time in the inventory',
  'inventory-age-scatterplot':
    'Distribution of time in inventory over a period of time. Click and expand on the graph to zoom in.',
  'inventory-demand-analysis':
    'Proportion of work items across Value (new features), Failure (defects) and Non-value (tech-debt) demand. Note only user stories and bugs are considered in this.',
  'inventory-classes-of-service':
    'Proportion of work items by their Classes of Service.',
  'inventory-planned-vs-unplanned':
    'Proportion of work items between Planned and Unplanned (reactive work).',
  'inventory-value-area':
    'Proportion of work items by area: Customer, Business and Architecture.',
  'inventory-stage-of-workflow':
    'Proportion of work items by the workflow stage they currently reside in.',
  
  // Info for Obeya Main Page
  'scope-burn':
    'Remaining work within your time box over time.',
};
