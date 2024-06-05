"use server";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
async function createTask(formData: FormData) {
  console.log("created", formData);
  const strategyId = Number(formData.get("strategyid"));
  const task = formData.get("task");
  const points = Number(formData.get("points"));
  // console.log(strategyId, name, points);
  try {
    const newTask = await prisma.onethingtasks.create({
      data: {
        strategyid: strategyId,
        name: task,
        points,
      },
    });
    revalidatePath(`/onething/strategy/${strategyId}`);
    return true;
  } catch (e) {
    console.log("error", e);
  }
  return false;
  // Logic to mutate data...
}

async function updateTask(
  taskId: number,
  time: number,
  isComplete: boolean,
  strategyId: number,
) {
  try {
    const updateTask = await prisma.onethingtasks.update({
      where: {
        id: taskId,
      },
      data: {
        time,
        iscomplete: isComplete,
      },
    });
    revalidatePath(`/onething/strategy/${strategyId}`);
  } catch (e) {
    console.log(e);
  }
}

export { createTask, updateTask };
