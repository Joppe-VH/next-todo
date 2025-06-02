"use client";

import { Todo } from "@/types";
import { InlineEdit } from "./inline-edit";
import { DeleteForm } from "./delete-form";
import { ToggleCheckbox } from "./toggle-checkbox";
import { useState, useEffect } from "react";
import Image from "next/image";

interface TodoItemProps {
  todo: Todo;
}

// Helper function to validate if a string is a valid URL
function isValidUrl(urlString: string): boolean {
  if (!urlString || urlString.trim() === "") {
    return false;
  }
  try {
    new URL(urlString.trim());
    return true;
  } catch {
    return false;
  }
}

export function TodoItem({ todo }: TodoItemProps) {
  const [previewImageUrl, setPreviewImageUrl] = useState(todo.image || "");
  const [imageLoadError, setImageLoadError] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);

  // Update preview when todo.image changes (from successful updates)
  useEffect(() => {
    setPreviewImageUrl(todo.image || "");
    setImageLoadError(false);
  }, [todo.image]);

  const handleImageError = () => {
    setImageLoadError(true);
  };

  const handleImageLoad = () => {
    setImageLoadError(false);
  };

  const handlePreviewImageChange = (url: string) => {
    setPreviewImageUrl(url);
    setImageLoadError(false); // Reset error state when URL changes
  };

  // Show image container if:
  // 1. We have an original image, OR
  // 2. We're currently editing the image (to prevent layout shift)
  const showImageContainer = todo.image || isEditingImage;

  // Check if the preview URL is valid before passing to Image component
  const isValidPreviewUrl = isValidUrl(previewImageUrl);

  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
      <ToggleCheckbox todo={todo} />

      {showImageContainer && (
        <div className="flex-shrink-0 w-12 h-12">
          {isValidPreviewUrl && !imageLoadError ? (
            <Image
              src={previewImageUrl}
              alt="Todo thumbnail"
              className="w-12 h-12 object-cover rounded border"
              onError={handleImageError}
              onLoad={handleImageLoad}
              width={48}
              height={48}
            />
          ) : (
            <div className="w-12 h-12 rounded border border-dashed border-gray-300 flex items-center justify-center bg-gray-50 dark:bg-gray-800 dark:border-gray-600">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>
      )}

      <InlineEdit
        todo={todo}
        previewImageUrl={previewImageUrl}
        onPreviewImageChange={handlePreviewImageChange}
        onEditingImageChange={setIsEditingImage}
      />
      <DeleteForm todo={todo} />
    </div>
  );
}
