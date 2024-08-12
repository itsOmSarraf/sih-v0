import {
  char,
  date,
  integer,
  pgSchema,
  serial,
  text,
  time,
  varchar,
  timestamp
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const mySchema = pgSchema('my_schema');

const singer = mySchema.table('singer', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  gender: char('gender', { length: 1 }),
  age: integer('age'),
  email: text('email').unique(),
  address: varchar('address', { length: 255 }),
  contactNo: varchar('contactNo', { length: 15 }),
  pfp: text('pfp'),
  upi_id: text('upi_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

const event = mySchema.table('event', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  eventDate: date('eventDate').notNull(),
  eventTime: time('eventTime').notNull(),
  venue: text('venue').notNull(),
  ticketLink: text('ticketLink'),
  image: text('image'),
  singerId: integer('singer_id')
    .references(() => singer.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

const songRequest = mySchema.table('song_request', {
  id: serial('id').primaryKey(),
  eventId: integer('event_id')
    .references(() => event.id)
    .notNull(),
  phoneNo: varchar('phone', { length: 15 }).notNull(),
  name: text('name').notNull(),
  dedicatedTo: text('dedicated_to'),
  payment: text('payment'),
  rating: integer('rating'),
  status: text('status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// Define relations
const singerRelations = relations(singer, ({ many }) => ({
  events: many(event)
}));

const eventRelations = relations(event, ({ one, many }) => ({
  singer: one(singer, {
    fields: [event.singerId],
    references: [singer.id]
  }),
  songRequests: many(songRequest)
}));

const songRequestRelations = relations(songRequest, ({ one }) => ({
  event: one(event, {
    fields: [songRequest.eventId],
    references: [event.id]
  })
}));

export {
  singer,
  event,
  songRequest,
  singerRelations,
  eventRelations,
  songRequestRelations
};

// Types for select and insert operations
export type Singer = typeof singer.$inferSelect;
export type NewSinger = typeof singer.$inferInsert;

export type Event = typeof event.$inferSelect;
export type NewEvent = typeof event.$inferInsert;

export type SongRequest = typeof songRequest.$inferSelect;
export type NewSongRequest = typeof songRequest.$inferInsert;
