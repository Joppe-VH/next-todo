export type Todo = {
  id: number;
  task: string;
  checked: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};
export type NewTodo = Pick<Todo, "task"> &
  Partial<Pick<Todo, "image" | "checked">>;
export type UpdatedTodo = Partial<Todo> & Pick<Todo, "id">;

export const filterTypes = ["all", "active", "completed"] as const;
export type FilterType = (typeof filterTypes)[number];

/*************
 * FormState *
 *************/
interface FormBaseState<T> {
  type: string;
  message: string | undefined;
  data: T;
}

interface FormSuccessState<T> extends FormBaseState<T> {
  type: "success";
  message: string;
}

interface FormErrorState<T> extends FormBaseState<T> {
  type: "error";
  message: string;
}

interface FormInitState<T> extends FormBaseState<T> {
  type: "init";
  message: undefined;
}

export type FormState<T> =
  | FormSuccessState<T>
  | FormErrorState<T>
  | FormInitState<T>;
