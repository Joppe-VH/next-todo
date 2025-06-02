import { Todo } from "@/types";
import { TodoItem } from "./todo-item";
import { TodoStats } from "./todo-stats";
import { AddTodoForm } from "./add-todo-form";
import { TodoFilters } from "./todo-filters";
import { Separator } from "@/components/ui/separator";
import { type FilterType } from "@/types";

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
}

export function TodoList({ todos, filter }: TodoListProps) {
  const stats = {
    all: todos.length,
    completed: todos.filter((todo) => todo.checked).length,
    active: todos.filter((todo) => !todo.checked).length,
  } satisfies Record<FilterType, number>;

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "active":
        return !todo.checked;
      case "completed":
        return todo.checked;
      default:
        return true;
    }
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Todo App</h1>
        <p className="text-muted-foreground mt-2">
          Stay organized and get things done
        </p>
      </div>

      <TodoStats {...stats} />

      <AddTodoForm />

      <Separator />

      <TodoFilters currentFilter={filter} counts={stats} />

      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {filter === "all" && "No todos yet. Add one above!"}
            {filter === "active" && "No active todos. Great job!"}
            {filter === "completed" && "No completed todos yet."}
          </div>
        ) : (
          filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>
    </div>
  );
}
