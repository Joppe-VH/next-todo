"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Todo } from "@/types";
import { deleteTodoFormAction } from "@/actions/todo-actions";
import { toast } from "sonner";

interface DeleteFormProps {
  todo: Todo;
}

export function DeleteForm({ todo }: DeleteFormProps) {
  const [deleteState, deleteAction, pending] = useActionState(
    deleteTodoFormAction,
    {
      type: "init",
      message: undefined,
      data: { id: todo.id },
    }
  );

  useEffect(() => {
    if (deleteState.type === "success") {
      toast.success(deleteState.message);
    } else if (deleteState.type === "error") {
      toast.error(deleteState.message);
    }
  }, [deleteState]);

  return (
    <form action={deleteAction}>
      <input type="hidden" name="id" value={todo.id} />
      <Button
        type="submit"
        size="sm"
        variant="ghost"
        disabled={pending}
        className="text-destructive hover:text-destructive"
      >
        {pending ? (
          <Trash2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
}
