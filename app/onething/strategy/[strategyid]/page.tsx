import Task from "./Task";
import { getIncompleteTasks } from "./queries";
import React from "react";

const Strategy = async ({ params }: { params: { strategyid: string } }) => {
  const data = await getIncompleteTasks(Number(params.strategyid));
  return <Task data={data} />;
};

export default Strategy;
