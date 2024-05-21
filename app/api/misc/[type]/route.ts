import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);
  console.log({ pathname });

  if (pathname === "/api/misc/gettodayscore") {
    const data = await prisma.$queryRaw`SELECT
        SUM(pt.points) AS total_points
    FROM
        "ProjectDetail" pd
    JOIN
        "ProgressType" pt ON "pd"."progressTypeId" = "pt"."id"
    WHERE
        DATE("pd"."createdAt") = CURRENT_DATE;
`;
    console.log("data on server", data, Number(data[0].total_points));
    return NextResponse.json({
      message: "Hello, World!",
      data: Number(data[0].total_points),
    });
  } else if (pathname === "/api/misc/greet") {
    return NextResponse.json({ message: "Greetings!" });
  } else {
    return NextResponse.json({ message: "Route not found" }, { status: 404 });
  }
}
