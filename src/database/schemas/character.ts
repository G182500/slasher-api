import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { movie } from "./movie";
//import { boolean } from "drizzle-orm/gel-core";

export const character = pgTable('character', {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  //isAlive: boolean('is_alive').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  deletedAt: timestamp('deleted_at')
});

export const characterRelations = relations(character, ({ many }) => ({
  characterMovies: many(characterMovie),
}));

// Many to Many = Tabela de junção

export const characterMovie = pgTable('character_movie', {
  characterId: uuid('character_id')
    .notNull()
    .references(() => character.id, { onDelete: 'cascade' }),
  movieId: uuid('movie_id')
    .notNull()
    .references(() => movie.id, { onDelete: 'cascade' }),
});

// A opção CASCADE permite excluir ou atualizar os registros
// relacionados presentes na tabela filha automaticamente,
// quando um registro da tabela pai for atualizado (ON UPDATE) ou excluído