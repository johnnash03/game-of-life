// "use client";
// import { getTodayScore } from "@/utils/api";
// import { useState, useEffect } from "react";
import { prisma } from "@/utils/db";
export const dynamic = "force-dynamic";
import smileIcon from "@/public/smile.svg";
import Image from "next/image";
// async function getData() {
//   const res = await fetch(`http://localhost:3000/api/misc/getTodayScore`);
//   const data = await res.json();
//   return data;
// }

async function getData() {
  const projectData = await prisma.$queryRaw`SELECT
        SUM(pt.points) AS total_points
    FROM
        "ProjectDetail" pd
    JOIN
        "ProgressType" pt ON "pd"."progressTypeId" = "pt"."id"
    WHERE
        DATE("pd"."createdAt") = CURRENT_DATE;
`;

  const oneThingTasksPoint = await prisma.$queryRaw`
      SELECT SUM(points) as total_points
        FROM onethingtasks ott
        WHERE DATE(ott.updatedat) = CURRENT_DATE and iscomplete=true`;
  console.log("oneThingTasksPoint", oneThingTasksPoint);
  const routineData = await prisma.routinedetail.aggregate({
    _sum: {
      points: true,
    },
    where: {
      createdat: new Date(),
    },
  });
  const uncomfortableData = await prisma.uncomfortabletask.aggregate({
    _sum: {
      points: true,
    },
    where: {
      createdat: new Date(),
    },
  });
  console.log("routineData", routineData, uncomfortableData);
  return {
    data:
      Number(projectData[0].total_points) +
      Number(oneThingTasksPoint[0].total_points) +
      (uncomfortableData._sum.points || 0) +
      (routineData._sum.points || 0),
  };
}
export default async function Home() {
  // const [todayScore, setTodayScore] = useState(0);
  // useEffect(() => {
  //   (async () => {
  //     const data = await getTodayScore();
  //     console.log("data in page", data);
  //     setTodayScore(data);
  //   })();
  // }, []);
  const { data: todaysScore } = await getData();
  return (
    <main className="flex h-full flex-col items-center bg-white px-8 pt-16">
      <div className="bg-pink h-[150px] w-full rounded-md p-3">
        <div>
          <Image
            src={smileIcon}
            width={24}
            height={24}
            alt="smile"
            className="m-0"
          />
        </div>
        <p className="mt-2 text-2xl font-bold text-black">
          Your today&apos; score
        </p>
        <p className="mt-2 text-4xl font-bold text-white">{todaysScore}</p>
      </div>
    </main>
  );
}
