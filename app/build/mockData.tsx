export const mockProjectProgressType = [
  {
    id: 1,
    name: "Completed session",
    points: 1,
  },
  {
    id: 2,
    name: "Deliberate session",
    points: 2,
  },
  {
    id: 3,
    name: "Completed task",
    points: 2,
  },
  {
    id: 4,
    name: "Completed a feature",
    points: 3,
  },
  {
    id: 5,
    name: "Completed nth version of the project",
    points: 5,
  },
];

export type Progress = {
  id: number;
  progressTypeId: number;
  note: string;
};

export type Project = {
  id: number;
  name: string;
  data: {
    date: string;
    progress: {
      id: number;
      progressTypeId: number;
      note: string;
    }[];
  }[];
};
export const mockProjectData = [
  {
    id: 1,
    name: "Game of life",
    data: [
      {
        date: "09-05-24",
        progress: [
          { id: 1, progressTypeId: 2, note: "wireframe" },
          { id: 2, progressTypeId: 1, note: "worked on schema" },
        ],
      },
      {
        date: "10-05-24",
        progress: [{ id: 1, progressTypeId: 3, note: "design" }],
      },
    ],
  },
  {
    id: 2,
    name: "Faa se frontend",
    data: [
      {
        date: "10-05-24",
        progress: [{ id: 1, progressTypeId: 1, note: "design" }],
      },
    ],
  },
];
