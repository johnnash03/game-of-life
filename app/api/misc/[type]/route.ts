import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);
  console.log({ pathname });

  if (pathname === "/api/misc/gettodayscore") {
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
    return NextResponse.json({
      message: "Hello, World!",
      data:
        Number(projectData[0].total_points) +
        (uncomfortableData._sum.points || 0) +
        (routineData._sum.points || 0),
    });
  } else if (pathname === "/api/misc/greet") {
    return NextResponse.json({ message: "Greetings!" });
  } else {
    return NextResponse.json({ message: "Route not found" }, { status: 404 });
  }
}
