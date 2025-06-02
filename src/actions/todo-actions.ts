"use server";

import { revalidatePath } from "next/cache";
import { createTodo, deleteTodo, updateTodo } from "@/queries";
import { UpdatedTodo, FormState } from "@/types";

const MAX_TASK_LENGTH = 100;
const MIN_TASK_LENGTH = 1;
const FORBIDDEN_WORDS = [
  "fuck",
  "shit",
  "asshole",
  "bitch",
  "cunt",
  "dick",
  "faggot",
  "nigga",
  "nigger",
  "pussy",
  "whore",
] as const;

export async function addTodoFormAction(
  _: FormState<{ task: string }>,
  formData: FormData
): Promise<FormState<{ task: string }>> {
  const task = formData.get("task") as string;
  const imageUrl = formData.get("imageUrl") as string;

  try {
    // Check if task is empty or too short
    if (!task || task.trim().length < MIN_TASK_LENGTH) {
      throw new Error(`Task cannot be less than ${MIN_TASK_LENGTH} character`);
    }

    // Check if task is too long
    if (task.length > MAX_TASK_LENGTH) {
      throw new Error(
        `Task cannot be longer than ${MAX_TASK_LENGTH} characters`
      );
    }

    // Check if task contains forbidden words
    const forbiddenWords = FORBIDDEN_WORDS.filter((word) =>
      task.toLowerCase().includes(word)
    );
    if (forbiddenWords.length > 0) {
      throw new Error(
        `Task contains forbidden words: ${forbiddenWords.join(", ")}`
      );
    }

    // Validate image URL if provided
    let validImageUrl: string | null = null;
    if (imageUrl && imageUrl.trim()) {
      try {
        const url = new URL(imageUrl.trim());
        if (url.protocol !== "http:" && url.protocol !== "https:") {
          throw new Error("Image URL must use HTTP or HTTPS protocol");
        }
        validImageUrl = url.toString();
      } catch {
        throw new Error("Invalid image URL format");
      }
    }

    await createTodo({
      task: task.trim(),
      ...(validImageUrl && { image: validImageUrl }),
    });
    revalidatePath("/");

    return {
      type: "success",
      message: "Todo added successfully!",
      data: { task: "" },
    };
  } catch (error) {
    return {
      type: "error",
      message: error instanceof Error ? error.message : "Failed to add todo",
      data: { task },
    };
  }
}

export async function editTodoFormAction(
  _: FormState<{ id: number; task: string }>,
  formData: FormData
): Promise<FormState<{ id: number; task: string }>> {
  const id = parseInt(formData.get("id") as string);
  const task = formData.get("task") as string;
  const imageUrl = formData.get("imageUrl") as string;

  try {
    // Check if task is empty or too short
    if (!task || task.trim().length < MIN_TASK_LENGTH) {
      throw new Error(`Task cannot be less than ${MIN_TASK_LENGTH} character`);
    }

    // Check if task is too long
    if (task.length > MAX_TASK_LENGTH) {
      throw new Error(
        `Task cannot be longer than ${MAX_TASK_LENGTH} characters`
      );
    }

    // Check if task contains forbidden words
    const forbiddenWords = FORBIDDEN_WORDS.filter((word) =>
      task.toLowerCase().includes(word)
    );
    if (forbiddenWords.length > 0) {
      throw new Error(
        `Task contains forbidden words: ${forbiddenWords.join(", ")}`
      );
    }

    const updateData: UpdatedTodo = {
      id,
      task: task.trim(),
    };

    // Validate and handle image URL
    if (imageUrl && imageUrl.trim()) {
      try {
        const url = new URL(imageUrl.trim());
        if (url.protocol !== "http:" && url.protocol !== "https:") {
          throw new Error("Image URL must use HTTP or HTTPS protocol");
        }
        updateData.image = url.toString();
      } catch {
        throw new Error("Invalid image URL format");
      }
    } else {
      // Remove image if URL is empty
      updateData.image = null;
    }

    await updateTodo(updateData);
    revalidatePath("/");

    return {
      type: "success",
      message: "Todo updated successfully!",
      data: { id, task: task.trim() },
    };
  } catch (error) {
    return {
      type: "error",
      message: error instanceof Error ? error.message : "Failed to update todo",
      data: { id, task },
    };
  }
}

export async function deleteTodoFormAction(
  _: FormState<{ id: number }>,
  formData: FormData
): Promise<FormState<{ id: number }>> {
  const id = parseInt(formData.get("id") as string);

  try {
    await deleteTodo(id);
    revalidatePath("/");

    return {
      type: "success",
      message: "Todo deleted successfully!",
      data: { id },
    };
  } catch (error) {
    return {
      type: "error",
      message: error instanceof Error ? error.message : "Failed to delete todo",
      data: { id },
    };
  }
}

export async function toggleTodoFormAction(
  _: FormState<{ id: number; checked: boolean }>,
  formData: FormData
): Promise<FormState<{ id: number; checked: boolean }>> {
  const id = parseInt(formData.get("id") as string);
  const checked = formData.get("checked") === "true";

  try {
    const updateData: UpdatedTodo = {
      id,
      checked,
    };

    await updateTodo(updateData);
    revalidatePath("/");

    return {
      type: "success",
      message: checked ? "Todo completed!" : "Todo unchecked!",
      data: { id, checked },
    };
  } catch (error) {
    return {
      type: "error",
      message: error instanceof Error ? error.message : "Failed to update todo",
      data: { id, checked: !checked },
    };
  }
}

// Legacy actions (keeping for backward compatibility)
// export async function toggleTodoAction(id: number, checked: boolean) {
//   const updateData: UpdatedTodo = {
//     id,
//     checked,
//   };

//   try {
//     await updateTodo(updateData);
//     revalidatePath("/");
//     return {
//       success: true,
//       message: checked ? "Todo completed!" : "Todo unchecked!",
//     };
//   } catch {
//     throw new Error("Failed to update todo");
//   }
// }

// export async function editTodoAction(id: number, task: string) {
//   if (!task || task.trim().length === 0) {
//     throw new Error("Task cannot be empty");
//   }

//   const updateData: UpdatedTodo = {
//     id,
//     task: task.trim(),
//   };

//   try {
//     await updateTodo(updateData);
//     revalidatePath("/");
//     return { success: true, message: "Todo updated successfully!" };
//   } catch {
//     throw new Error("Failed to update todo");
//   }
// }

// export async function deleteTodoAction(id: number) {
//   try {
//     await deleteTodo(id);
//     revalidatePath("/");
//     return { success: true, message: "Todo deleted successfully!" };
//   } catch {
//     throw new Error("Failed to delete todo");
//   }
// }
