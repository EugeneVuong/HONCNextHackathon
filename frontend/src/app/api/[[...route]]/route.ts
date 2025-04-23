import { Hono } from "hono";
import { handle } from "hono/vercel";
import { db } from "@/db/drizzle";
import { exercise } from "@/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

app.get("/exercise", async (c) => {
  const workouts = await db.select().from(exercise);
  return c.json(workouts);
});

app.post("/exercise", async (c) => {
  const { day, name, sets, reps, weight } = await c.req.json();
  const result = await db
    .insert(exercise)
    .values({ day, name, sets, reps, weight })
    .returning();
  return c.json(result);
});

app.delete("/exercise/:id", async (c) => {
  const id = Number(c.req.param("id"));
  await db.delete(exercise).where(eq(exercise.id, id));
  return c.json({ success: true });
});

app.put("/exercise/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const { day, name, sets, reps, weight } = await c.req.json();
  await db
    .update(exercise)
    .set({ day, name, sets, reps, weight })
    .where(eq(exercise.id, id));
  return c.json({ success: true });
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
