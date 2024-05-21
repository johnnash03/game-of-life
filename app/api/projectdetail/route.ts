import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const postData = await request.json();
  console.log("postData", postData);
  try {
    const newProjectDetail = await prisma.projectDetail.create({
      data: {
        projectId: postData.projectId,
        note: postData.note,
        progressTypeId: postData.progressTypeId,
      },
    });
    console.log({ newProjectDetail });
    return NextResponse.json({ data: newProjectDetail });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
};
