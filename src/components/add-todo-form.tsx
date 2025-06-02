"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addTodoFormAction } from "@/actions/todo-actions";
import { toast } from "sonner";
import { useActionState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function AddTodoForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [addTodoState, addTodoAction, pending] = useActionState(
    addTodoFormAction,
    {
      type: "init",
      message: undefined,
      data: { task: "" },
    }
  );

  useEffect(() => {
    if (addTodoState.type === "success") {
      toast.success(addTodoState.message);
      formRef.current?.reset();
    } else if (addTodoState.type === "error") {
      toast.error(addTodoState.message);
    }
  }, [addTodoState]);

  return (
    <div className="space-y-4">
      <form
        id="add-todo-form"
        ref={formRef}
        action={addTodoAction}
        className="space-y-4"
      >
        <div className="flex gap-2">
          <Input
            name="task"
            placeholder="What needs to be done?"
            className={cn(
              "flex-1",
              addTodoState.type === "error" &&
                "bg-red-50 border-red-300 focus:border-red-500 focus:ring-red-500"
            )}
            defaultValue={addTodoState.data.task}
            required
          />
          <Button type="submit" disabled={pending}>
            {pending ? "Adding..." : "Add Todo"}
          </Button>
        </div>
      </form>
    </div>
  );
}
