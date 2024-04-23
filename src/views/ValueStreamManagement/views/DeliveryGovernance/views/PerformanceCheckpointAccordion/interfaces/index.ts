import {
  CheckpointItem,
} from '../../../../../../../views/Settings/components/PerformanceCheckPoints/interfaces';
import { WidgetInformation } from '../../../interfaces/common';

export type CheckpointOption = Pick<CheckpointItem, 'name' | 'id'> & { checked?: boolean; };

export type CheckpointWithUnit = {
  value: number | string;
  unit: string;
  colour?: string;
};

export type ComparisionWithArrowDirection = {
  value: string | number;
  arrow: {
    direction: string;
    colour: string;
  };
};

type DefaultListValue = {
  [key: string]: CheckpointWithUnit | ComparisionWithArrowDirection;
};

export type CheckpointsListResponse = {
  lead_time_portfolio_85?: DefaultListValue;
  lead_time_team_85?: DefaultListValue;
  lead_time_target_met?: DefaultListValue;
  wip_age_85?: DefaultListValue;
  total_throughput?: DefaultListValue;
  value_demand?: DefaultListValue;
  expedite_pcnt?: DefaultListValue;
  flow_efficiency?: DefaultListValue;
  flow_debt?: DefaultListValue;
};

export const mockedResponse = {
  lead_time_85: {
    checkpoint1: {
      value: 123,
      unit: 'days',
      colour: '#000',
      name: 'FY22 Q1', // is necessary only has more than 2 checkpoints
    },
    checkpoint2: {
      value: 72,
      unit: 'days',
      colour: '#000',
      name: 'FY22 Q2',
    },
    comparision: {   // only add this to the response if only two (checkpoints) selected
      value: `-41% (10 days)`,
      arrow: {
        direction: 'down',
        colour: 'green'
      },
    },
  },
  wip_age_85: {
    checkpoint1: {
      value: 30,
      unit: 'days',
      colour: '#000',
      name: 'FY22 Q1',
    },
    checkpoint2: {
      value: 20,
      unit: 'days',
      colour: '#000',
      name: 'FY22 Q2',
    },
    comparision: {
      value: '10%',
      arrow: {
        direction: 'down',
        colour: 'red'
      },
    },
  },
  fitness_level: {
    checkpoint1: {
      value: 42,
      unit: '%',
      colour: '#000',
      name: 'FY22 Q1', // is necessary only has more than 2 checkpoints
    },
    checkpoint2: {
      value: 57,
      unit: '%',
      colour: '#000',
      name: 'FY22 Q2',
    },
    comparision: {
      value: '+15 percentage points',
      arrow: {
        direction: 'up',
        colour: 'green'
      },
    },
  },
  lead_time_predictability: {
    checkpoint1: {
      value: 'Low',
      unit: '',
      colour: '#000',
      name: 'FY22 Q1', // is necessary only has more than 2 checkpoints
    },
    checkpoint2: {
      value: 'High',
      unit: '',
      colour: '#000',
      name: 'FY22 Q2',
    },
    comparision: {   // only add this to the response if only two (checkpoints) selected
      value: 'Improved predictability',
      arrow: {
        direction: 'up',
        colour: 'green'
      },
    },
  },
  flow_efficiency: {
    checkpoint1: {
      value: 30,
      unit: 'days',
      colour: '#000',
      name: 'FY22 Q1', // is necessary only has more than 2 checkpoints
    },
    checkpoint2: {
      value: 20,
      unit: 'days',
      colour: '#000',
      name: 'FY22 Q2',
    },
    comparision: {   // only add this to the response if only two (checkpoints) selected
      value: '1%',
      arrow: {
        direction: 'down',
        colour: 'green'
      },
    },
  },
  value_demand: {
    checkpoint1: {
      value: 30,
      unit: 'days',
      colour: '#000',
      name: 'FY22 Q1', // is necessary only has more than 2 checkpoints
    },
    checkpoint2: {
      value: 20,
      unit: 'days',
      colour: '#000',
      name: 'FY22 Q2',
    },
    comparision: {   // only add this to the response if only two (checkpoints) selected
      value: '5%',
      arrow: {
        direction: 'down',
        colour: 'green'
      },
    },
  },
  current_productivity: {
    checkpoint1: {
      value: 30,
      unit: 'days',
      colour: '#000', // is necessary only has more than 2 checkpoints
      name: 'FY22 Q1',
    },
    checkpoint2: {
      value: 20,
      unit: 'days',
      colour: '#000',
      name: 'FY22 Q2',
    },
    comparision: {   // only add this to the response if only two (checkpoints) selected
      value: '8%',
      arrow: {
        direction: 'down',
        colour: 'green'
      },
    },
  },
  stale_work: {
    checkpoint1: {
      value: 30,
      unit: 'days',
      colour: '#000', // is necessary only has more than 2 checkpoints
      name: 'FY22 Q1',
    },
    checkpoint2: {
      value: 20,
      unit: 'days',
      colour: '#000',
      name: 'FY22 Q2',
    },
    comparision: {
      value: '12%',
      arrow: {
        direction: 'down',
        colour: 'green'
      },
    },
  },
  blockers: {
    checkpoint1: {
      value: 2,
      unit: '',
      colour: '#000', // is necessary only has more than 2 checkpoints
      name: 'FY22 Q1',
    },
    checkpoint2: {
      value: 4,
      unit: '',
      colour: '#000',
      name: 'FY22 Q2',
    },
    comparision: {   // only add this to the response if only two (checkpoints) selected
      value: '+2',
      arrow: {
        direction: 'up',
        colour: 'green',
      },
    },
  },
  average_throughput: {
    checkpoint1: {
      value: 30,
      unit: 'days',
      colour: '#000', // is necessary only has more than 2 checkpoints
      name: 'FY22 Q1',
    },
    checkpoint2: {
      value: 20,
      unit: 'days',
      colour: '#000',
      name: 'FY22 Q2',
    },
    comparision: {
      value: '18%',
      arrow: {
        direction: 'down',
        colour: 'green'
      },
    },
  },
  delayed_items_count: {
    checkpoint1: {
      value: 30,
      unit: 'days',
      colour: '#000', // is necessary only has more than 2 checkpoints
      name: 'FY22 Q1',
    },
    checkpoint2: {
      value: 20,
      unit: 'days',
      colour: '#000',
      name: 'FY22 Q2',
    },
    comparision: {
      value: '32%',
      arrow: {
        direction: 'down',
        colour: 'green'
      },
    },
  },
  expedite_pcnt: {
    checkpoint1: {
      value: 30,
      unit: 'days',
      colour: '#000', // is necessary only has more than 2 checkpoints
      name: 'FY22 Q1',
    },
    checkpoint2: {
      value: 20,
      unit: 'days',
      colour: '#000',
      name: 'FY22 Q2',
    },
    comparision: {
      value: '31%',
      arrow: {
        direction: 'down',
        colour: 'green'
      },
    },
  },
};