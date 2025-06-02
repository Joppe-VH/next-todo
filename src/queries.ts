"use server";

import { NewTodo, UpdatedTodo, Todo } from "@/types";
import { GOOGLE_SHEETS_URL } from "@/env";

export const getTodos = async () => {
  const response = await fetch(GOOGLE_SHEETS_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  const data = (await response.json()) as Todo[];
  return data.map((todo) => ({
    ...todo,
    createdAt: new Date(todo.createdAt),
    updatedAt: new Date(todo.updatedAt),
  }));
};

export const createTodo = async (todo: NewTodo) => {
  const response = await fetch(`${GOOGLE_SHEETS_URL}?method=post`, {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }
};

export const updateTodo = async (todo: UpdatedTodo) => {
  const { id, ...values } = todo;
  const response = await fetch(`${GOOGLE_SHEETS_URL}?method=patch&id=${id}`, {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }
};

export const deleteTodo = async (id: Todo["id"]) => {
  const response = await fetch(`${GOOGLE_SHEETS_URL}?method=delete&id=${id}`, {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }
};
