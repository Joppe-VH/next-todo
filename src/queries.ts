"use server";

import { db } from "@/db";
import { todosTable } from "@/db/schema";
import { NewTodo, UpdatedTodo, Todo } from "@/types";
import { eq } from "drizzle-orm";

export const getTodos = async () => {
  const todos = await db.select().from(todosTable);
  return todos;
};

export const createTodo = async (todo: NewTodo) => {
  const newTodo = await db.insert(todosTable).values(todo);
  return newTodo;
};

export const updateTodo = async (todo: UpdatedTodo) => {
  const { id, ...values } = todo;

  const updatedTodo = await db
    .update(todosTable)
    .set(values)
    .where(eq(todosTable.id, id));
  return updatedTodo;
};

export const deleteTodo = async (id: Todo["id"]) => {
  const deletedTodo = await db.delete(todosTable).where(eq(todosTable.id, id));
  return deletedTodo;
};
