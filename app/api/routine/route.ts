import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";
import dayjs from "dayjs";
export const GET = async () => {
  const allRoutines = await prisma.routine.findMany();

  const history = await prisma.$queryRaw`
    SELECT t.id, t.routineid, t.createdat, t.points
    FROM routinedetail t
    JOIN (
      SELECT routineId, MAX(createdat) AS latestcreatedat
      FROM routinedetail
      GROUP BY routineid
    ) latest
    ON t.routineid = latest.routineid AND t.createdat = latest.latestcreatedat`;

  console.log({ history });
  const todayRoutine = await prisma.routinedetail.findMany({
    where: {
      createdat: {
        equals: new Date(),
      },
    },
  });
  return NextResponse.json({ data: { allRoutines, todayRoutine, history } });
};

export const POST = async (request: Request) => {
  const postData = await request.json();
  console.log({ postData });
  try {
    let todayRoutine;
    if (postData.id) {
      console.log("id exists");
      todayRoutine = await prisma.routinedetail.update({
        where: {
          id: postData.id,
        },
        data: {
          // routineid: postData.routineid,
          points: Number(postData.points),
        },
      });
    } else {
      todayRoutine = await prisma.routinedetail.create({
        data: {
          routineid: postData.routineId,
          points: Number(postData.points),
        },
      });
    }
    // const todayRoutine = await prisma.routinedetail.upsert({
    //   where: {
    //     id: postData.id || "",
    //   },
    //   update: {
    //     points: Number(postData.points),
    //   },
    //   create: {
    //     routineid: postData.routineId,
    //     points: Number(postData.points),
    //   },
    // });
    return NextResponse.json({ data: todayRoutine });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
};
