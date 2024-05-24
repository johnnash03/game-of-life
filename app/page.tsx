// "use client";
// import { getTodayScore } from "@/utils/api";
// import { useState, useEffect } from "react";
import { prisma } from "@/utils/db";
export const dynamic = "force-dynamic";
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
    <main className="flex flex-col items-center">
      <h3>Your score today is</h3>
      <div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-content">
          {todaysScore}
        </div>
      </div>
    </main>
  );
}
