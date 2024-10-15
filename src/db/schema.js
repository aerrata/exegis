import { pgTable, integer, jsonb, text, timestamp, varchar, real } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 64 }).notNull().unique(),
  password: varchar({ length: 64 }),
})

export const chats = pgTable('chats', {
  id: text().primaryKey().notNull(),
  messages: jsonb().notNull(),
  user: integer()
    .notNull()
    .references(() => users.id),
  createdAt: timestamp().notNull(),
})

export const embeddings = pgTable('documents', {
  id: integer().primaryKey().notNull(),
  content: text().notNull(),
  filePath: text().notNull(),
  metadata: jsonb().notNull(),
  embedding: real('embedding').array().notNull(),
})
