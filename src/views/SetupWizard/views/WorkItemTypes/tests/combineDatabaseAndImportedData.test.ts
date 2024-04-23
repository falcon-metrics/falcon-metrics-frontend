import {
  DatabaseWorkItemType,
  ImportedWorkItemType,
  QueueActive,
} from '../interfaces/interfaces';
import {
  combineDatabaseAndImportedData,
  combineDatabaseAndImportedSteps,
} from '../WorkItemTypes.data';

const importedDataMock: ImportedWorkItemType[] = [
  {
    id: '10000',
    name: 'Epic',
    steps: [
      { id: '10000', name: 'Backlog', category: 'proposed' },
      { id: '10001', name: 'Selected for Development', category: 'proposed' },
      { id: '3', name: 'Em andamento', category: 'inprogress' },
      { id: '10002', name: 'Concluído', category: 'completed' },
    ],
    projects: ['10000'],
    projectNames: ['Falcon Metrics'],
  },
  {
    id: '10001',
    name: 'Story',
    steps: [
      { id: '10000', name: 'Backlog', category: 'proposed' },
      { id: '10001', name: 'Selected for Development', category: 'proposed' },
      { id: '3', name: 'Em andamento', category: 'inprogress' },
      { id: '10002', name: 'Concluído', category: 'completed' },
    ],
    projects: ['10000'],
    projectNames: ['Falcon Metrics'],
  },
  {
    id: '10002',
    name: 'Task',
    steps: [
      { id: '10000', name: 'Backlog', category: 'proposed' },
      { id: '10001', name: 'Selected for Development', category: 'proposed' },
      { id: '3', name: 'Em andamento', category: 'inprogress' },
      { id: '10002', name: 'Concluído', category: 'completed' },
    ],
    projects: ['10000'],
    projectNames: ['Falcon Metrics'],
  },
  {
    id: '10003',
    name: 'Sub-task',
    steps: [
      { id: '10000', name: 'Backlog', category: 'proposed' },
      { id: '10001', name: 'Selected for Development', category: 'proposed' },
      { id: '3', name: 'Em andamento', category: 'inprogress' },
      { id: '10002', name: 'Concluído', category: 'completed' },
    ],
    projects: ['10000'],
    projectNames: ['Falcon Metrics'],
  },
  {
    id: '10004',
    name: 'Bug',
    steps: [
      { id: '10000', name: 'Backlog', category: 'proposed' },
      { id: '10001', name: 'Selected for Development', category: 'proposed' },
      { id: '3', name: 'Em andamento', category: 'inprogress' },
      { id: '10002', name: 'Concluído', category: 'completed' },
    ],
    projects: ['10000'],
    projectNames: ['Falcon Metrics'],
  },
];

const databaseDataMock: Required<DatabaseWorkItemType>[] = [
  {
    workItemTypeId: 'falcon-metrics-quality-department.bug',
    datasourceWorkItemId: '10004',
    workflowId: 'falcon-metrics-quality-department.10000.bug',
    projectId: '10000',
    arrivalPointOrder: 2,
    commitmentPointOrder: 0,
    departurePointOrder: 3,
    steps: [
      {
        id: '3',
        workflowId: 'falcon-metrics-quality-department.10000.bug',
        type: QueueActive.active,
        category: 'inprogress',
        name: 'Em andamento',
        order: '0',
      },
      {
        id: '10000',
        workflowId: 'falcon-metrics-quality-department.10000.bug',
        type: QueueActive.active,
        category: 'proposed',
        name: 'Backlog',
        order: '1',
      },
      {
        id: '10001',
        workflowId: 'falcon-metrics-quality-department.10000.bug',
        type: QueueActive.active,
        category: 'proposed',
        name: 'Selected for Development',
        order: '2',
      },
      {
        id: '10002',
        workflowId: 'falcon-metrics-quality-department.10000.bug',
        type: QueueActive.active,
        category: 'completed',
        name: 'Concluído',
        order: '3',
      },
    ],
    orgId: 'falcon-metrics-quality-department',
    displayName: 'Bug',
    level: 'Team',
    serviceLevelExpectationInDays: 4,
    isDistinct: false
  },
  {
    workItemTypeId: 'falcon-metrics-quality-department.epic',
    datasourceWorkItemId: '10000',
    workflowId: 'falcon-metrics-quality-department.10000.epic',
    projectId: '10000',
    arrivalPointOrder: 2,
    commitmentPointOrder: 0,
    departurePointOrder: 1,
    steps: [
      {
        id: '3',
        workflowId: 'falcon-metrics-quality-department.10000.epic',
        type: QueueActive.queue,
        category: 'inprogress',
        name: 'Em andamento',
        order: '0',
      },
      {
        id: '10002',
        workflowId: 'falcon-metrics-quality-department.10000.epic',
        type: QueueActive.active,
        category: 'completed',
        name: 'Concluído',
        order: '1',
      },
      {
        id: '10001',
        workflowId: 'falcon-metrics-quality-department.10000.epic',
        type: QueueActive.queue,
        category: 'proposed',
        name: 'Selected for Development',
        order: '2',
      },
      {
        id: '10000',
        workflowId: 'falcon-metrics-quality-department.10000.epic',
        type: QueueActive.active,
        category: 'proposed',
        name: 'Backlog',
        order: '3',
      },
    ],
    orgId: 'falcon-metrics-quality-department',
    displayName: 'Epic',
    level: 'Team',
    serviceLevelExpectationInDays: 6,
    isDistinct: false
  },
];

const expectedResult = [
  {
    arrivalId: '10001#Selected for Development',
    commitmentId: '3#Em andamento',
    departureId: '10002#Concluído',
    id: '10004',
    name: 'Bug',
    steps: [
      {
        id: '3',
        workflowId: 'falcon-metrics-quality-department.10000.bug',
        type: QueueActive.active,
        category: 'inprogress',
        name: 'Em andamento',
        isUnmapped: false,
      },
      {
        id: '10000',
        workflowId: 'falcon-metrics-quality-department.10000.bug',
        type: QueueActive.active,
        category: 'proposed',
        name: 'Backlog',
        isUnmapped: false,
      },
      {
        id: '10001',
        workflowId: 'falcon-metrics-quality-department.10000.bug',
        type: QueueActive.active,
        category: 'proposed',
        name: 'Selected for Development',
        isUnmapped: false,
      },
      {
        id: '10002',
        workflowId: 'falcon-metrics-quality-department.10000.bug',
        type: QueueActive.active,
        category: 'completed',
        name: 'Concluído',
        order: '3',
        isUnmapped: false,
      },
    ],
    projects: [{ id: '10000', isUnmapped: false, name: 'Falcon Metrics' }],
    projectNames: ['Falcon Metrics'],
    serviceLevelExpectationInDays: 4,
    displayName: 'Bug',
    workItemTypeId: 'falcon-metrics-quality-department.bug',
    workflowId: 'falcon-metrics-quality-department.10000.bug',
    projectId: '10000',
    orgId: 'falcon-metrics-quality-department',
    level: 'Team',
  },
  {
    "arrivalId": "10001#Selected for Development",
    "commitmentId": "3#Em andamento",
    "departureId": "10002#Concluído",

    id: '10000',
    name: 'Epic',
    steps: [
      {
        id: '3',
        workflowId: 'falcon-metrics-quality-department.10000.epic',
        type: QueueActive.queue,
        category: 'inprogress',
        name: 'Em andamento',
        isUnmapped: false,
      },
      {
        id: '10002',
        workflowId: 'falcon-metrics-quality-department.10000.epic',
        type: QueueActive.active,
        category: 'completed',
        name: 'Concluído',
        isUnmapped: false,
      },
      {
        id: '10001',
        workflowId: 'falcon-metrics-quality-department.10000.epic',
        type: QueueActive.queue,
        category: 'proposed',
        name: 'Selected for Development',
        isUnmapped: false,
      },
      {
        id: '10000',
        workflowId: 'falcon-metrics-quality-department.10000.epic',
        type: QueueActive.active,
        category: 'proposed',
        name: 'Backlog',
        isUnmapped: false,
      },
    ],
    projects: [{ id: '10000', isUnmapped: false, name: 'Falcon Metrics' }],
    projectNames: ['Falcon Metrics'],
    serviceLevelExpectationInDays: 6,
    displayName: 'Epic',
    workItemTypeId: 'falcon-metrics-quality-department.epic',
    workflowId: 'falcon-metrics-quality-department.10000.epic',
    projectId: '10000',
    orgId: 'falcon-metrics-quality-department',
    level: 'Team',
  },
  {
    arrivalId: '',
    commitmentId: '',
    departureId: '',
    id: '10001',
    name: 'Story',
    steps: [
      {
        id: '10000',
        name: 'Backlog',
        category: 'proposed',
        isUnmapped: false,
        type: QueueActive.active,
      },
      {
        id: '10001',
        name: 'Selected for Development',
        category: 'proposed',
        isUnmapped: false,
        type: QueueActive.active,
      },
      {
        id: '3',
        name: 'Em andamento',
        category: 'inprogress',
        isUnmapped: false,
        type: QueueActive.active,
      },
      {
        id: '10002',
        name: 'Concluído',
        category: 'completed',
        isUnmapped: false,
        type: QueueActive.active,
      },
    ],
    projects: [{ id: '10000', isUnmapped: true, name: 'Falcon Metrics' }],
    projectNames: ['Falcon Metrics'],
    displayName: 'Story',
    serviceLevelExpectationInDays: 0,
  },
  {
    arrivalId: '',
    commitmentId: '',
    departureId: '',
    id: '10003',
    name: 'Sub-task',
    steps: [
      {
        id: '10000',
        name: 'Backlog',
        category: 'proposed',
        isUnmapped: false,
        type: QueueActive.active,
      },
      {
        id: '10001',
        name: 'Selected for Development',
        category: 'proposed',
        isUnmapped: false,
        type: QueueActive.active,
      },
      {
        id: '3',
        name: 'Em andamento',
        category: 'inprogress',
        isUnmapped: false,
        type: QueueActive.active,
      },
      {
        id: '10002',
        name: 'Concluído',
        category: 'completed',
        isUnmapped: false,
        type: QueueActive.active,
      },
    ],
    projects: [{ id: '10000', isUnmapped: true, name: 'Falcon Metrics' }],
    projectNames: ['Falcon Metrics'],
    displayName: 'Sub-task',
    serviceLevelExpectationInDays: 0,
  },
  {
    arrivalId: '',
    commitmentId: '',
    departureId: '',
    id: '10002',
    name: 'Task',
    steps: [
      {
        id: '10000',
        name: 'Backlog',
        category: 'proposed',
        isUnmapped: false,
        type: QueueActive.active,
      },
      {
        id: '10001',
        name: 'Selected for Development',
        category: 'proposed',
        isUnmapped: false,
        type: QueueActive.active,
      },
      {
        id: '3',
        name: 'Em andamento',
        category: 'inprogress',
        isUnmapped: false,
        type: QueueActive.active,
      },
      {
        id: '10002',
        name: 'Concluído',
        category: 'completed',
        isUnmapped: false,
        type: QueueActive.active,
      },
    ],
    projects: [{ id: '10000', isUnmapped: true, name: 'Falcon Metrics' }],
    projectNames: ['Falcon Metrics'],
    displayName: 'Task',
    serviceLevelExpectationInDays: 0,
  },
];

describe('Data should be formatted correctly', () => {
  test('Expect global result to be correct', () => {
    expect(
      combineDatabaseAndImportedData(databaseDataMock, importedDataMock),
    ).toMatchObject(expectedResult);
  });
  test('Expect steps to be formatted correctly', () => {
    combineDatabaseAndImportedSteps(
      databaseDataMock[0].steps,
      importedDataMock[0].steps,
    );
  });
  test('Expect combined with empty array', () => {
    const importedData = [
      {
        "id": "10023",
        "name": "Task",
        "steps": [
          {
            "id": "10025",
            "name": "To Do",
            "category": "proposed"
          },
          {
            "id": "10026",
            "name": "In Progress",
            "category": "inprogress"
          },
          {
            "id": "10027",
            "name": "Done",
            "category": "completed"
          },
          {
            "id": "10028",
            "name": "Design",
            "category": "inprogress"
          },
          {
            "id": "10029",
            "name": "Ready for Review",
            "category": "proposed"
          },
          {
            "id": "10030",
            "name": "Ready to Build",
            "category": "proposed"
          }
        ],
        "projects": [
          "10006"
        ],
        "projectNames": [
          "Creative"
        ]
      },
      {
        "id": "10024",
        "name": "Epic",
        "steps": [
          {
            "id": "10025",
            "name": "To Do",
            "category": "proposed"
          },
          {
            "id": "10026",
            "name": "In Progress",
            "category": "inprogress"
          },
          {
            "id": "10027",
            "name": "Done",
            "category": "completed"
          },
          {
            "id": "10028",
            "name": "Design",
            "category": "inprogress"
          },
          {
            "id": "10029",
            "name": "Ready for Review",
            "category": "proposed"
          },
          {
            "id": "10030",
            "name": "Ready to Build",
            "category": "proposed"
          }
        ],
        "projects": [
          "10006"
        ],
        "projectNames": [
          "Creative"
        ]
      },
      {
        "id": "10025",
        "name": "Subtask",
        "steps": [
          {
            "id": "10025",
            "name": "To Do",
            "category": "proposed"
          },
          {
            "id": "10026",
            "name": "In Progress",
            "category": "inprogress"
          },
          {
            "id": "10027",
            "name": "Done",
            "category": "completed"
          },
          {
            "id": "10028",
            "name": "Design",
            "category": "inprogress"
          },
          {
            "id": "10029",
            "name": "Ready for Review",
            "category": "proposed"
          },
          {
            "id": "10030",
            "name": "Ready to Build",
            "category": "proposed"
          }
        ],
        "projects": [
          "10006"
        ],
        "projectNames": [
          "Creative"
        ]
      },
      {
        "id": "10026",
        "name": "Design Asset",
        "steps": [
          {
            "id": "10025",
            "name": "To Do",
            "category": "proposed"
          },
          {
            "id": "10026",
            "name": "In Progress",
            "category": "inprogress"
          },
          {
            "id": "10027",
            "name": "Done",
            "category": "completed"
          },
          {
            "id": "10028",
            "name": "Design",
            "category": "inprogress"
          },
          {
            "id": "10029",
            "name": "Ready for Review",
            "category": "proposed"
          },
          {
            "id": "10030",
            "name": "Ready to Build",
            "category": "proposed"
          }
        ],
        "projects": [
          "10006"
        ],
        "projectNames": [
          "Creative"
        ]
      },
      {
        "id": "10031",
        "name": "Content",
        "steps": [
          {
            "id": "1",
            "name": "New",
            "category": "proposed"
          },
          {
            "id": "10002",
            "name": "Done",
            "category": "completed"
          },
          {
            "id": "10003",
            "name": "Next",
            "category": "proposed"
          },
          {
            "id": "10041",
            "name": "Committed",
            "category": "proposed"
          },
          {
            "id": "10042",
            "name": "Content Outline",
            "category": "inprogress"
          },
          {
            "id": "10043",
            "name": "Content Production",
            "category": "inprogress"
          },
          {
            "id": "10044",
            "name": "Content Review",
            "category": "inprogress"
          },
          {
            "id": "10045",
            "name": "Marketing Review",
            "category": "inprogress"
          }
        ],
        "projects": [
          "10010"
        ],
        "projectNames": [
          "Content Creation"
        ]
      }
    ];
    console.log(combineDatabaseAndImportedData([], importedData));
  });
});
