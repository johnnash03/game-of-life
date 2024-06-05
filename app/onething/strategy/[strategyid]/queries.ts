import { prisma } from "@/utils/db";
export const getIncompleteTasks = async (strategyId: number) => {
  const incompleteTasks = await prisma.onethingtasks.findMany({
    where: {
      strategyid: strategyId,
      iscomplete: false,
    },
  });
  return incompleteTasks;
};
