import { integer, text, boolean, pgTable, serial } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: integer("id").primaryKey(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
});

export const exercise = pgTable("exercise", {
  id: serial("id").primaryKey(),
  day: text("day").notNull(),
  name: text("name").notNull(),
  sets: integer("sets").notNull(),
  reps: text("reps").notNull(),
  weight: integer("weight").notNull(),
});
