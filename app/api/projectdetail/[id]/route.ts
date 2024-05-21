import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import dayjs from "dayjs";
export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await prisma.projectDetail.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      progress: true,
    },
    where: {
      projectId: params.id,
    },
  });
  const dataWithDate = data
    .map((entry) => {
      return {
        ...entry,
        createdAt: dayjs(entry.createdAt).format("DD-MM-YY"),
      };
    })
    .reduce((acc, value) => {
      if (acc.has(value.createdAt)) {
        acc.set(value.createdAt, [...acc.get(value.createdAt), value]);
      } else {
        acc.set(value.createdAt, [value]);
      }
      return acc;
    }, new Map());

  console.log({ data: dataWithDate });
  return NextResponse.json({ data: Object.fromEntries(dataWithDate) });
};
