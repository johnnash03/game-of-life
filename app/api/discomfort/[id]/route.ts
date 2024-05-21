import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request, { params }) => {
  try {
    const updatedData = await prisma.uncomfortabletask.update({
      where: {
        id: Number(params.id),
      },
      data: {
        done: true,
      },
    });
    return NextResponse.json({ data: updatedData });
  } catch (e) {}
};
