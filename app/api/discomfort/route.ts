import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  const data = await prisma.uncomfortabletask.findMany({
    where: {
      done: false,
    },
  });
  return NextResponse.json({ data });
};
export const POST = async (request: Request) => {
  const postData = await request.json();
  console.log({ postData });
  try {
    prisma.uncomfortabletask.count;
    const insertedTask = await prisma.uncomfortabletask.create({
      data: {
        name: postData.name,
        points: postData.points,
      },
    });
    return NextResponse.json({ data: insertedTask });
  } catch (e) {
    console.log("error", e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
};
