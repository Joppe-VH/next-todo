"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/types";
import { toggleTodoFormAction } from "@/actions/todo-actions";
import { toast } from "sonner";

interface ToggleCheckboxProps {
  todo: Todo;
}

export function ToggleCheckbox({ todo }: ToggleCheckboxProps) {
  const [toggleState, toggleAction, pending] = useActionState(
    toggleTodoFormAction,
    {
      type: "init",
      message: undefined,
      data: { id: todo.id, checked: todo.checked },
    }
  );

  useEffect(() => {
    switch (toggleState.type) {
      case "success":
        toast.success(toggleState.message);
        break;
      case "error":
        toast.error(toggleState.message);
    }
  }, [toggleState]);

  const handleCheckboxChange = () => {
    const formData = new FormData();
    formData.append("id", todo.id.toString());
    formData.append("checked", (!todo.checked).toString());
    toggleAction(formData);
  };

  return (
    <Checkbox
      checked={todo.checked}
      onCheckedChange={handleCheckboxChange}
      disabled={pending}
    />
  );
}
