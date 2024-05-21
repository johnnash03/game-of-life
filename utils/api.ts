export const createURL = (path: string) => {
  return window.location.origin + path;
};

export const getAllProjects = async () => {
  const res = await fetch(new Request(createURL(`/api/project`)));
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const getAllProgressTypes = async () => {
  const res = await fetch(new Request(createURL(`/api/progresstype`)));
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const createProjectDetail = async (
  projectId: string,
  progressTypeId: number,
  note: string,
) => {
  const data = {
    projectId,
    progressTypeId,
    note,
  };
  const res = await fetch(
    new Request(createURL("/api/projectdetail"), {
      method: "POST",
      body: JSON.stringify(data),
    }),
  );
  if (res.ok) {
    const data = await res.json();
    return data.data;
  } else {
  }
};

export const getProjectTimeline = async (projectId: string) => {
  const res = await fetch(
    new Request(createURL(`/api/projectdetail/${projectId}`)),
  );
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const getRoutines = async () => {
  const res = await fetch(new Request(createURL(`/api/routine`)));
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const createRoutineDetail = async (routineId) => {
  console.log("routineId", routineId);
  const res = await fetch(
    new Request(createURL(`/api/routine`), {
      method: "POST",
      body: JSON.stringify({ routineId }),
    }),
  );
  // if (res.ok) {
  //   const data = await res.json();
  //   return data.data;
  // } else {
  // }
};

export const addUncomfortableTask = async (name, points) => {
  const res = await fetch(
    new Request(createURL(`/api/discomfort`), {
      method: "POST",
      body: JSON.stringify({ name, points }),
    }),
  );
  console.log(res);
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const getUnfinishedUncomfortable = async () => {
  const res = await fetch(new Request(createURL(`/api/discomfort`)));
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const markUncomfortableFinished = async (id) => {
  const res = await fetch(
    new Request(createURL(`/api/discomfort/${id}`), {
      method: "PATCH",
    }),
  );
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const getTodayScore = async () => {
  const res = await fetch(new Request(createURL(`/api/misc/gettodayscore`)));
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const createNewProject = async (name: string) => {
  const res = await fetch(
    new Request(createURL(`/api/project`), {
      method: "POST",
      body: JSON.stringify({ name }),
    }),
  );
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
