import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { todosTable } from "@/db/schema";

type insertTodo = InferInsertModel<typeof todosTable>;
type selectTodo = InferSelectModel<typeof todosTable>;

export type Todo = selectTodo;
export type NewTodo = Omit<insertTodo, "id" | "createdAt" | "updatedAt">;
export type UpdatedTodo = Partial<Todo> & Pick<Todo, "id">;
