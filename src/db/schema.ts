import { boolean, timestamp } from "drizzle-orm/mysql-core";
import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const todosTable = mysqlTable("todos", {
  id: serial("id").primaryKey(),
  task: varchar({ length: 255 }).notNull(),
  checked: boolean().notNull().default(false),
  image: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});
