"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Check, X, Pencil, ImageIcon } from "lucide-react";
import { Todo } from "@/types";
import { editTodoFormAction } from "@/actions/todo-actions";
import { toast } from "sonner";

interface InlineEditProps {
  todo: Todo;
  previewImageUrl: string;
  onPreviewImageChange: (url: string) => void;
  onEditingImageChange: (isEditing: boolean) => void;
}

function TextEditForm({
  todo,
  onCancel,
}: {
  todo: Todo;
  onCancel: () => void;
}) {
  const [editState, editAction, pending] = useActionState(editTodoFormAction, {
    type: "init",
    message: undefined,
    data: { id: todo.id, task: todo.task },
  });

  useEffect(() => {
    if (editState.type === "success") {
      toast.success(editState.message);
      onCancel(); // Close the edit form
    } else if (editState.type === "error") {
      toast.error(editState.message);
    }
  }, [editState, onCancel]);

  return (
    <div className="flex-1">
      <form action={editAction} className="flex gap-2 items-center" noValidate>
        <Input
          name="task"
          defaultValue={editState.data.task}
          className={`flex-1 ${
            editState.type === "error"
              ? "bg-red-50 border-red-500 focus:border-red-500"
              : ""
          }`}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Escape") onCancel();
          }}
          disabled={pending}
        />
        <input type="hidden" name="id" value={todo.id} />
        <input type="hidden" name="imageUrl" value={todo.image || ""} />

        <Button type="submit" size="sm" disabled={pending}>
          {pending ? (
            <Check className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onCancel}
          disabled={pending}
        >
          <X className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

function ImageEditForm({
  todo,
  onCancel,
  previewUrl,
  onPreviewChange,
}: {
  todo: Todo;
  onCancel: () => void;
  previewUrl: string;
  onPreviewChange: (url: string) => void;
}) {
  const [editState, editAction, pending] = useActionState(editTodoFormAction, {
    type: "init",
    message: undefined,
    data: { id: todo.id, task: todo.task },
  });

  useEffect(() => {
    if (editState.type === "success") {
      toast.success(editState.message);
      onCancel(); // Close the edit form
    } else if (editState.type === "error") {
      toast.error(editState.message);
    }
  }, [editState, onCancel]);

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    onPreviewChange(url);
  };

  return (
    <div className="flex-1">
      <form action={editAction} className="flex gap-2 items-center" noValidate>
        <Label htmlFor="edit-imageUrl" className="text-sm whitespace-nowrap">
          <ImageIcon className="h-4 w-4 inline mr-1" />
          URL:
        </Label>
        <Input
          id="edit-imageUrl"
          type="url"
          placeholder="https://example.com/image.jpg"
          value={previewUrl}
          onChange={handleImageUrlChange}
          disabled={pending}
          className={`flex-1 ${
            editState.type === "error"
              ? "bg-red-50 border-red-500 focus:border-red-500"
              : ""
          }`}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Escape") onCancel();
          }}
        />
        <input type="hidden" name="id" value={todo.id} />
        <input type="hidden" name="task" value={todo.task} />
        <input type="hidden" name="imageUrl" value={previewUrl} />

        <Button type="submit" size="sm" disabled={pending}>
          {pending ? (
            <Check className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onCancel}
          disabled={pending}
        >
          <X className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

export function InlineEdit({
  todo,
  previewImageUrl,
  onPreviewImageChange,
  onEditingImageChange,
}: InlineEditProps) {
  const [isEditingText, setIsEditingText] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);

  // Reset preview when not editing
  useEffect(() => {
    if (!isEditingImage) {
      onPreviewImageChange(todo.image || "");
    }
  }, [isEditingImage, todo.image, onPreviewImageChange]);

  // Notify parent about image editing state
  useEffect(() => {
    onEditingImageChange(isEditingImage);
  }, [isEditingImage, onEditingImageChange]);

  if (isEditingText) {
    return (
      <TextEditForm todo={todo} onCancel={() => setIsEditingText(false)} />
    );
  }

  if (isEditingImage) {
    return (
      <ImageEditForm
        todo={todo}
        onCancel={() => setIsEditingImage(false)}
        previewUrl={previewImageUrl}
        onPreviewChange={onPreviewImageChange}
      />
    );
  }

  return (
    <div className="flex items-center gap-2 flex-1">
      <span
        className={`flex-1 ${
          todo.checked ? "line-through text-muted-foreground" : ""
        }`}
      >
        {todo.task}
      </span>
      {todo.checked && <Badge variant="secondary">Done</Badge>}
      <Button size="sm" variant="ghost" onClick={() => setIsEditingText(true)}>
        <Pencil className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="ghost" onClick={() => setIsEditingImage(true)}>
        <ImageIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
