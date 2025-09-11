import { pgTable, uuid, integer, numeric, timestamp, varchar } from "drizzle-orm/pg-core";

export const movie = pgTable('movie', {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  director: varchar('director', { length: 255 }).notNull(),
  year: integer('year').notNull(),
  budget: numeric('budget', { precision: 12, scale: 2 }).notNull(),
  profit: numeric('profit', { precision: 15, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  deletedAt: timestamp('deleted_at')
});