"use server";

import { db } from "@/db/drizzle";
import { exercise } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const getWorkouts = async () => {
  return db.select().from(exercise);
};

export const addExercise = async (
  day: string,
  name: string,
  sets: number,
  reps: string,
  weight: number
) => {
  await db.insert(exercise).values({ day, name, sets, reps, weight });
  revalidatePath("/plan");
};

export const deleteExercise = async (id: number) => {
  await db.delete(exercise).where(eq(exercise.id, id));
  revalidatePath("/plan");
};

export const updateExercise = async (
  id: number,
  day: string,
  name: string,
  sets: number,
  reps: string,
  weight: number
) => {
  await db
    .update(exercise)
    .set({ day, name, sets, reps, weight })
    .where(eq(exercise.id, id));
  revalidatePath("/plan");
};
