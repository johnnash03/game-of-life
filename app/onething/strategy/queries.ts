import { prisma } from "@/utils/db";
export const getStrategies = async () => {
  const activeOneThing = await prisma.onething.findFirst({
    where: {
      isactive: true,
    },
    include: {
      strategiesrel: true,
    },
  });
  return activeOneThing;
};
