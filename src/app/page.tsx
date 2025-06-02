import { getTodos } from "@/queries";
import { TodoList } from "@/components/todo-list";
import { Toaster } from "@/components/ui/sonner";

interface PageProps {
  searchParams: Promise<{ filter?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { filter = "all" } = await searchParams;
  const todos = await getTodos();

  const validFilter = ["all", "active", "completed"].includes(filter)
    ? (filter as "all" | "active" | "completed")
    : "all";

  return (
    <div className="min-h-screen bg-background p-4">
      <TodoList todos={todos} filter={validFilter} />
      <Toaster />
    </div>
  );
}
