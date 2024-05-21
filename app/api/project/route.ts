import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export const GET = async () => {
  const projects = await prisma.project.findMany();
  console.log(projects);
  return NextResponse.json({ data: projects });
};

export const POST = async (request: Request) => {
  const postData = await request.json();
  const createdProject = await prisma.project.create({
    data: postData,
  });
  return NextResponse.json({ data: createdProject });
};
