import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export const GET = async () => {
  const progressTypes = await prisma.progressType.findMany();
  console.log(progressTypes);
  return NextResponse.json({ data: progressTypes });
};
